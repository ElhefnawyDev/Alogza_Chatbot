    import { auth } from '../../auth';
    import { db } from '@/lib/db/db';
    import { user } from '@/lib/db/schema';
    import { eq } from 'drizzle-orm';
    import { NextResponse } from 'next/server';

    export async function GET() {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Fetch user's token count using Drizzle
        const result = await db
        .select({ tokens: user.tokens })
        .from(user)
        .where(eq(user.id, session.user.id!));

        if (result.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ tokens: result[0].tokens });
    } catch (error) {
        console.error('Error fetching tokens:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    }
