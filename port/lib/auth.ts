import { cookies, headers } from 'next/headers';

const ADMIN_TOKEN_COOKIE = 'vaibhav_admin_token';
const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || 'vaibhav-secure-portfolio-jwt-secret-key-999';

export function createAdminToken(email: string): string {
  // Simple HMAC-like signed token with timestamp
  const payload = Buffer.from(JSON.stringify({ email, timestamp: Date.now() })).toString('base64');
  const signature = Buffer.from(payload + ADMIN_SECRET).toString('base64').slice(0, 16);
  return `${payload}.${signature}`;
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expectedSig = Buffer.from(payload + ADMIN_SECRET).toString('base64').slice(0, 16);
  if (sig !== expectedSig) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    // Token valid for 7 days
    if (Date.now() - data.timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function isAuthenticatedAdmin(): boolean {
  try {
    // 1. Check cookies
    const cookieStore = cookies();
    const cookieToken = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;
    if (verifyAdminToken(cookieToken)) return true;

    // 2. Check Authorization or x-admin-token header
    const headersList = headers();
    const authHeader = headersList.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const headerToken = authHeader.slice(7);
      if (verifyAdminToken(headerToken)) return true;
    }

    const customToken = headersList.get('x-admin-token');
    if (customToken && verifyAdminToken(customToken)) return true;

    return false;
  } catch {
    return false;
  }
}
