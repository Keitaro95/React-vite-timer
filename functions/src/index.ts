// honoが定義したapp を Firebase Functions が処理できる形式に変換しています。
// 「エントリーポイント」です

import { onRequest } from "firebase-functions/https";
import { requestHandler } from "./handler";
import  app from "./server";
import { setGlobalOptions } from "firebase-functions/options";

setGlobalOptions({
  region: "asia-northeast1",
});

// これにより、https://<project>.cloudfunctions.net/api のようなエンドポイントが作られます。
// requestHandler(app) によって app を Firebase Functions が処理できる形式に変換しています。
export const api = onRequest(requestHandler(app));

// 実際に動かすルーティング（APIの中身）は app 側で書く
// handler を通じて Firebase 用のハンドラ形式に変換
// これにより、アプリ本体（app）と Firebase 関数のバインディング（index.ts）を分離し、構造をシンプルに保っています。



// ======================================================
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
