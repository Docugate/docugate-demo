# Ledgerly: a demo app for DocuGate tours

Ledgerly is a small, made-up billing app. It exists so you can see
[DocuGate](https://www.trydocugate.site) tours working on something that looks
like a real product: a React frontend, a separate backend, and numbers on screen
whose origin a new developer would have to go looking for.

Where does the **Total** on an invoice come from? Why is an invoice
**overdue**? What makes up **Monthly recurring revenue**? The answers are spread
across the frontend and the backend. A DocuGate tour puts them next to the
element on screen.

The tour tooling itself lives in the
[docugate package](https://github.com/Docugate/Docugate_package).

## Run it

```sh
npm install
npm run dev
```

The frontend runs on http://localhost:5173 and the backend on
http://localhost:8787. Vite forwards `/api` from the frontend to the backend.

## What's where

| Folder | What it is |
| --- | --- |
| `frontend/` | React app. One file per screen in `src/screens/`, and every request in `src/api.ts`. |
| `backend/` | Hono API. Routes in `src/routes/`; all money maths in `src/billing.ts`. |
| `api/` | Vercel entry point that serves the backend in production. |

| Screen | Route | Data |
| --- | --- | --- |
| Overview | `/` | `GET /api/stats`, `GET /api/invoices?status=overdue` |
| Invoices | `/invoices` | `GET /api/invoices?status=` |
| Invoice | `/invoices/:id` | `GET /api/invoices/:id`, `POST /api/invoices/:id/pay` |
| Customers | `/customers` | `GET /api/customers` |

Elements worth explaining carry a `data-tour="..."` attribute, which is what a
tour stop points at.

The data is in memory (`backend/src/data.ts`) and resets whenever the server
restarts. The customers and invoices are invented.

## Deploy

The repository deploys to Vercel as one project: the frontend is built to
`frontend/dist`, and `/api/*` is served by `api/index.ts`. No environment
variables are needed.

## License

MIT
