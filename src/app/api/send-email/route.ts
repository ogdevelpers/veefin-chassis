import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { veefinSchema } from "@/lib/constants";
import { sendEmail } from './sendmail';

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


		// send email
		await sendEmail({
		  email: body.email,
		  companyname: body.companyname,
		  pngData: (body as any).pngData,
		  name: body.username,
		  message: (body as any).message
		});

		// Upload image to Supabase Storage if provided
		let imageUrl = null;
		if ((body as any).pngData) {
			try {
				console.log('Starting image upload to Supabase Storage...');
				
				// Convert base64 to buffer
				const base64Data = (body as any).pngData.split(',')[1];
				const buffer = Buffer.from(base64Data, 'base64');
				console.log('Buffer size:', buffer.length);
				
				// Generate unique filename
				const timestamp = Date.now();
				const filename = `architecture_${timestamp}.png`;
				console.log('Uploading file:', filename);
				
				// Upload to Supabase Storage
				const { data: uploadData, error: uploadError } = await supabase.storage
					.from('architecture-images')
					.upload(filename, buffer, {
						contentType: 'image/png',
						upsert: false
					});

				if (uploadError) {
					console.error('Error uploading image:', uploadError);
					// Continue without image URL if upload fails
				} else {
					console.log('Image uploaded successfully:', uploadData);
					
					// Get public URL
					const { data: urlData } = supabase.storage
						.from('architecture-images')
						.getPublicUrl(filename);
					
					imageUrl = urlData.publicUrl;
					console.log('Image URL:', imageUrl);
				}
			} catch (error) {
				console.error('Error processing image upload:', error);
				// Continue without image URL if upload fails
			}
		} else {
			console.log('No PNG data provided for upload');
		}

		// Prepare user data for insertion
		const userData = {
			username: body.username,
			email: body.email,
			companyname: body.companyname,
			selections: body.selections,
			image_url: imageUrl,
			created_at: new Date().toISOString(),
		};

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
			// Update existing user with image URL
			console.log('Updating existing user with image URL...');
			const { data: updatedUser, error: updateError } = await supabase
				.from('veefin_users')
				.update({ 
					image_url: imageUrl,
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

		// Image data is already stored in the user record
		const imageId = insertedUser.id;

		// Return success response with user data and image URL
		const responseData = {
			success: true,
			data: {
				message: 'Successfully registered user',
				user: {
					id: insertedUser.id,
					username: insertedUser.username,
					email: insertedUser.email,
					companyname: insertedUser.companyname,
					selections: insertedUser.selections,
					createdAt: insertedUser.created_at,
				},
				imageId: imageId,
				imageUrl: imageUrl
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
export const runtime = 'edge';
