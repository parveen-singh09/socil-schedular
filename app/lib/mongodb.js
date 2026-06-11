import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri && process.env.NODE_ENV !== "production") {
  // We only throw in non-production environments to alert the developer.
  // In production (build time), we might not have the URI yet, and we want to let the build proceed.
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else if (uri) {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
} else {
  // Fallback for build time where MONGODB_URI might be missing
  clientPromise = Promise.reject(new Error("MongoDB URI is missing. Ensure it is set in environment variables."));
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
