export const runtime = 'edge';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const supabase = await createClient();

		// Test database connection and schema
		console.log('Testing database connection...');

		// Check if table exists and get its structure
		const { data: tableInfo, error: tableError } = await supabase
			.rpc('get_table_info', { table_name: 'veefin_users' });

		if (tableError) {
			console.log('Table info error:', tableError);
		}

		// Try to select from the table to see what columns exist
		const { data: sampleData, error: selectError } = await supabase
			.from('veefin_users')
			.select('*')
			.limit(1);

		if (selectError) {
			console.log('Select error:', selectError);
			return NextResponse.json({
				error: 'Database connection failed',
				details: selectError.message
			}, { status: 500 });
		}

		// Try to insert a test record
		const testData = {
			username: 'test_user',
			email: 'test@example.com',
			companyname: 'Test Company',
			selections: { test: ['item1', 'item2'] },
			image_url: 'https://example.com/test.png',
			created_at: new Date().toISOString(),
		};

		console.log('Attempting to insert test data:', testData);

		const { data: insertedData, error: insertError } = await supabase
			.from('veefin_users')
			.insert([testData])
			.select()
			.single();

		if (insertError) {
			console.log('Insert error:', insertError);
			return NextResponse.json({
				error: 'Insert failed',
				details: insertError.message,
				code: insertError.code
			}, { status: 500 });
		}

		// Clean up test data
		await supabase
			.from('veefin_users')
			.delete()
			.eq('id', insertedData.id);

		return NextResponse.json({
			success: true,
			message: 'Database test successful',
			sampleData: sampleData,
			insertedData: insertedData,
			tableInfo: tableInfo
		});

	} catch (error) {
		console.error('Database test error:', error);
		return NextResponse.json({
			error: 'Database test failed',
			details: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 500 });
	}
}
