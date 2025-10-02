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

		// Check if user already exists
		const { data: existingUser, error: checkError } = await supabase
			.from('veefin_users')
			.select('id, email')
			.eq('email', body.email)
			.single();


		// send email
		await sendEmail({
		  email: body.email,
		  companyname: body.companyname,
		  pdfUrl: (body as any).pdfUrl,
		  name: body.username,
		  message: (body as any).message
		});
		if (checkError && checkError.code !== 'PGRST116') {
			// PGRST116 is "not found" error, which is expected
			console.error('Error checking existing user:', checkError);
			return NextResponse.json(
				{ error: 'Database error while checking user' },
				{ status: 500 }
			);
		}

		if (existingUser) {
			return NextResponse.json(
				{ error: 'User with this email already exists' },
				{ status: 409 }
			);
		}

		// Prepare user data for insertion
		const userData = {
			username: body.username,
			email: body.email,
			companyname: body.companyname,
			selections: body.selections,
			created_at: new Date().toISOString(),
		};

		// Insert user into veefin_users table
		const { data: insertedUser, error: insertError } = await supabase
			.from('veefin_users')
			.insert([userData])
			.select()
			.single();

		if (insertError) {
			console.error('Error inserting user:', insertError);
			if (insertError.code === '23505') {
				return NextResponse.json(
					{ error: 'User with this email already exists' },
					{ status: 409 }
				);
			}
			return NextResponse.json(
				{ error: 'Failed to register user' },
				{ status: 500 }
			);
		}

		// Return success response with user data
		return NextResponse.json({
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
				}
			}
		});

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
