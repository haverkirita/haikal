import serverless from "serverless-http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initializeApp } from "../server/index";

let handler: any | null = null;

async function getHandler() {
  if (!handler) {
    const app = await initializeApp();
    handler = serverless(app);
  }
  return handler;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const h = await getHandler();
  return h(req, res);
}
