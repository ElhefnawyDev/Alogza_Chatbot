import cron from 'node-cron';
import { db } from '@/lib/db/db';
import { user } from '@/lib/db/schema';

// Function to reset tokens
async function resetTokens() {
  try {
    await db.update(user).set({ tokens: 100 }).execute();
    console.log('Tokens reset to 100 successfully.');
  } catch (error) {
    console.error('Error resetting tokens:', error);
  }
}

// Run the cron job every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  await resetTokens();
});

console.log('Token reset scheduler started.');
