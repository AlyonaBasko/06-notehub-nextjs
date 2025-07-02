import { NextResponse } from 'next/server';

const BASE_URL = 'https://notehub-app.onrender.com';

export async function GET() {
  const res = await fetch(`${BASE_URL}/notes`);
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
