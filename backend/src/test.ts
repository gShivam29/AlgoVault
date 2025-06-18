// test.ts
import dotenv from "dotenv";
// Load .env file
dotenv.config({ path: "../.env" });

// Log the test variable
console.log("TEST_VAR:", process.env.TEST_VAR);
