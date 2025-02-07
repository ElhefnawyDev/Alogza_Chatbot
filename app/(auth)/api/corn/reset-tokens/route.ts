import { NextResponse } from 'next/server';
import cron from 'node-cron';
import { db } from '@/lib/db/db';
import { user } from '@/lib/db/schema'; // Import your users table

// Function to reset tokens
async function resetTokens() {
  try {
    await db.update(user).set({ tokens: 100 }).execute();
    console.log('Tokens reset to 100 successfully.');
  } catch (error) {
    console.error('Error resetting tokens:', error);
  }
}

// Schedule job to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  await resetTokens();
});

export async function GET() {
  return NextResponse.json({ message: 'Token reset scheduled' });
}
