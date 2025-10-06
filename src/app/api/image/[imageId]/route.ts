export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ imageId: string }> }
) {
  try {
    const supabase = await createClient();
    const { imageId } = await params;

    // Fetch the image URL from database
    const { data: imageData, error } = await supabase
      .from('veefin_users')
      .select('image_url, created_at')
      .eq('id', imageId)
      .single();

    if (error || !imageData || !imageData.image_url) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Redirect to the Supabase Storage URL
    return NextResponse.redirect(imageData.image_url);
  } catch (error) {
    console.error('Error serving image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
