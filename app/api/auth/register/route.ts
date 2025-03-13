import { NextResponse } from 'next/server';
import { mockAuthService } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, drivingLicense } = body;

    // Validate required fields
    if (!name || !email || !password || !drivingLicense) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Register user using mock service
    const result = await mockAuthService.register(
      name,
      email,
      password,
      drivingLicense
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
} 