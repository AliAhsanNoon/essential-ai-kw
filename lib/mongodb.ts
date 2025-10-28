// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_CONNECTION_URL!;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let connection = false;
// export async function connectDB() {
//   if (connection) return;

//   try {
//     if (!connection) {
//       const connected = await mongoose.connect(MONGODB_URI);
//       connection = true;
//       console.log("DATABASE CONNNECTED");
//     }
//   } catch (error) {
//     console.log({ error: "MONGODB CONNECTION FAILED" });
//   }
// }
