import * as functions from "firebase-functions";
import app from "./app";
import { handler } from "./handler";

export const api = functions
  .region("asia-northeast1")
  .runWith({
    maxInstances: 5,
    timeoutSeconds: 30,
  })
  .https.onRequest(handler(app));