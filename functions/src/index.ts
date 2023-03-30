import * as functions from 'firebase-functions';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import PushService from './service/PushService';

initializeApp({ credential: credential.applicationDefault() });

export const sendPush = functions
  .runWith({ timeoutSeconds: 300 })
  // for local develop
  // .https.onRequest(async (request, response) => {
  .pubsub.schedule('every 1 minutes')
  .timeZone('Asia/Tokyo')
  .onRun(() => {
    const pushService = new PushService();
    pushService.sendPush();

    // for local develop
    // response.send('Hello from Firebase!');
    return;
  });
