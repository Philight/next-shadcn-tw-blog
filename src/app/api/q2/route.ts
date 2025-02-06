import {
  NextRequest, NextResponse 
} from 'next/server';

// pages/api/proxy/[...path].js
// app/api/q2/:path
export async function POST(req: NextRequest): Promise<NextResponse> {
  let path = req.nextUrl.searchParams.get('path');
  path = Array.isArray(path) ? path.join('/') : path;

  const apiUrl = `https://external-api.com/${path}`;

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward any necessary headers
        ...req.headers,
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    return NextResponse.json(data, { statusText: 'Fetched resource succesfully.', status: 200 });
  } catch (error) {
    return NextResponse.json({ statusText: 'Error proxying request' }, { status: 500 });
  }
}
