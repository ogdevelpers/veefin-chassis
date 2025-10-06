export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pdfId: string }> }
) {
  try {
    const supabase = await createClient();
    const { pdfId } = await params;

    // Fetch the PDF URL from database
    const { data: pdfData, error } = await supabase
      .from('veefin_users')
      .select('image_url, created_at')
      .eq('id', pdfId)
      .single();

    if (error || !pdfData || !pdfData.image_url) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    // Redirect to the Supabase Storage URL
    return NextResponse.redirect(pdfData.image_url);
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
