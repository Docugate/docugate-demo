// Vercel entry point: every /api/* request is routed here and handled by the
// same Hono app the backend runs locally. Hono speaks the web standard Request
// and Response that Vercel functions take, so no adapter package is needed
// (@hono/node-server 2 no longer ships the old /vercel one).
import app from '../backend/src/app.js'

const handler = (request: Request) => app.fetch(request)

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
