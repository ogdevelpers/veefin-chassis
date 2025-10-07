// Removed edge runtime to support Node.js features (SMTP with nodemailer, Buffer, PDF generation)
export const runtime = 'edge';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { veefinSchema } from "@/lib/constants";
import { sendEmail } from './sendmail';
import { generatePDF, generatePDFFilename } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
	try {
		const supabase = await createClient();
		const body: veefinSchema = await request.json();

		// Validate required fields
		if (!body.username || !body.email || !body.companyname || !body.selections) {
			return NextResponse.json(
				{ error: 'Missing required fields: username, email, companyname, selections are required' },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(body.email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Note: User existence check moved to after image upload


		// Generate PDF if image data provided
		let pdfUrl = null;
		let pdfBase64 = null;
		let pdfFilename = null;
		
		if ((body as any).pngData) {
			try {
				console.log('Generating PDF...');
				
				// Generate PDF with image and metadata
				pdfBase64 = await generatePDF({
					imageData: (body as any).pngData,
					companyName: body.companyname,
					userName: body.username,
					email: body.email,
					selections: body.selections,
					phone: body.phone
				});
				
				console.log('PDF generated successfully, base64 length:', pdfBase64.length);
				
				// Convert base64 to buffer
				const pdfBuffer = Buffer.from(pdfBase64, 'base64');
				console.log('PDF buffer size:', pdfBuffer.length);
				
				// Generate filename
				pdfFilename = generatePDFFilename(body.companyname);
				console.log('Uploading PDF:', pdfFilename);
				
				// Upload to Supabase Storage
				const { data: uploadData, error: uploadError } = await supabase.storage
					.from('architecture-images')
					.upload(pdfFilename, pdfBuffer, {
						contentType: 'application/pdf',
						upsert: true // Allow overwriting if file exists
					});

				if (uploadError) {
					console.error('Error uploading PDF:', uploadError);
					// Continue without PDF URL if upload fails
				} else {
					console.log('PDF uploaded successfully:', uploadData);
					
					// Get public URL
					const { data: urlData } = supabase.storage
						.from('architecture-images')
						.getPublicUrl(pdfFilename);
					
					pdfUrl = urlData.publicUrl;
					console.log('PDF URL:', pdfUrl);
				}
			} catch (error) {
				console.error('Error processing PDF generation:', error);
				console.error('Error details:', error);
				// Continue without PDF URL if generation fails
			}
		} else {
			console.log('No PNG data provided for PDF generation');
		}

		// send email with PDF attachment
		try {
			await sendEmail({
				email: body.email,
				companyname: body.companyname,
				pngData: (body as any).pngData,
				pdfData: pdfBase64 || undefined, // Pass PDF data for attachment
				pdfFilename: pdfFilename || undefined,
				name: body.username,
				selections: body.selections,
				message: (body as any).message
			});
			console.log('Email sent successfully with PDF attachment');
		} catch (emailError) {
			console.error('Error sending email:', emailError);
			// Continue even if email fails
		}

		// Prepare user data for insertion
		const userData = {
			username: body.username,
			email: body.email,
			companyname: body.companyname,
			selections: body.selections,
			phone: body.phone,
			image_url: pdfUrl, // PDF URL stored in image_url field
			created_at: new Date().toISOString(),
		};

		console.log('User data with PDF URL:', { ...userData, image_url: pdfUrl });

		// Check if user already exists and update or insert
		console.log('Checking for existing user...');
		const { data: existingUser, error: checkError } = await supabase
			.from('veefin_users')
			.select('id, email')
			.eq('email', body.email)
			.single();

		let insertedUser;
		let insertError;

		if (existingUser) {
			// Update existing user with PDF URL
			console.log('Updating existing user with PDF URL:', pdfUrl);
			const { data: updatedUser, error: updateError } = await supabase
				.from('veefin_users')
				.update({ 
					image_url: pdfUrl, // PDF URL stored in image_url field
					selections: body.selections,
					companyname: body.companyname,
					username: body.username,
					phone: body.phone
				})
				.eq('id', existingUser.id)
				.select()
				.single();
			
			insertedUser = updatedUser;
			insertError = updateError;
		} else {
			// Insert new user
			console.log('Inserting new user data:', userData);
			const { data: newUser, error: newUserError } = await supabase
				.from('veefin_users')
				.insert([userData])
				.select()
				.single();
			
			insertedUser = newUser;
			insertError = newUserError;
		}

		if (insertError) {
			console.error('Error with user operation:', insertError);
			return NextResponse.json(
				{ error: 'Failed to save user data: ' + insertError.message },
				{ status: 500 }
			);
		}

		// PDF data is already stored in the user record
		const imageId = insertedUser.id;

		// Return success response with user data and PDF URL
		const responseData = {
			success: true,
			data: {
				message: 'Successfully generated PDF and registered user',
				user: {
					id: insertedUser.id,
					username: insertedUser.username,
					email: insertedUser.email,
					companyname: insertedUser.companyname,
					selections: insertedUser.selections,
					createdAt: insertedUser.created_at,
				},
				imageId: imageId,
				imageUrl: pdfUrl, // PDF URL
				pdfUrl: pdfUrl // Also include as pdfUrl for clarity
			}
		};
		
		console.log('Returning response:', responseData);
		return NextResponse.json(responseData);

	} catch (error) {
		console.error('API error:', error);
		if (error instanceof SyntaxError) {
			return NextResponse.json(
				{ error: 'Invalid JSON in request body' },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
