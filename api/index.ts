// Vercel entry point: every /api/* request is routed here and handled by the
// same Hono app the backend runs locally.
import { handle } from '@hono/node-server/vercel'
import app from '../backend/src/app.js'

export default handle(app)
