# DocuGate tour format

A tour explains the screens of an app to a developer who is new to its code.
It lives in `.docugate/tour/`, one markdown file per screen.

## File

- Name the file after the screen's route: `/invoices/:id` becomes
  `invoices-id.md`, `/` becomes `home.md`.
- Front matter holds `route` (the URL pattern, with `:param` segments) and
  `title` (the screen's name).
- Then one `##` section per stop, in the order a person reads the screen.

## Stop

```md
## Total
target: [data-tour="invoice-total"]
data: GET /api/invoices/:id → total
code: frontend/src/screens/InvoiceDetail.tsx
source: backend/src/billing.ts
docs: https://example.com/docs/billing

The amount due: the subtotal plus tax, computed by `totals()` in the backend.
```

- `target`: a CSS selector for the element. Prefer `[data-tour="..."]`
  when the element has one. Otherwise use the most stable selector you can
  see, and add a line `suggest: add data-tour="name" in <file>`.
- `data`: the request the value comes from and the field in the response,
  as `METHOD /path → field`. Leave it out for elements that show no data.
- `code`: the file that renders the element, relative to the repository root.
- `source`: optional. The file where the value is computed or stored, when
  that is somewhere else, such as a backend service.
- `docs`: optional. A link that explains the concept.
- Then one or two sentences of plain prose: what the element is and why its
  value is what it is.

## Rules

- Only claim what the code shows. Every path must exist and every endpoint
  must appear in the code. If you are not sure where a value comes from,
  leave `data` and `source` out rather than guess.
- Pick the elements a new developer would ask about: numbers, statuses,
  actions and anything whose meaning is not obvious. Not every element.
- Never edit, rename or delete a tour file that already exists. Only add
  files for screens that have none.
- Change nothing outside `.docugate/tour/`.
