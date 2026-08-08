import dotenv from "dotenv";
dotenv.config();

import sendEmail from './utils/sendEmail.js';

// Test running the function
async function runTest() {
  try {
    await sendEmail(
      process.env.EMAIL_USER, // Sends the test email to yourself
      'Welcome to Our Platform!',
      '<h1>Hello!</h1><p>Your email system has been configured successfully.</p>'
    );
    console.log("Test email script finished.");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

runTest();