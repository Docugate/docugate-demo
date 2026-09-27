// Prepares the static tour for the hosted demo, where no `docugate tour serve`
// runs: the tour as one JSON file and the pill script, both in frontend/public
// so Vercel serves them next to the app. Run it after changing the tour, and
// commit the two files it writes.
//
//   npm run tour:static
//
// The pill comes from the installed docugate package, or from a checkout of
// Docugate_package next to this repository.

import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'frontend', 'public')
mkdirSync(out, { recursive: true })

const sibling = join(root, '..', 'Docugate_package')
let pkg = existsSync(join(sibling, 'dist', 'cli.js')) ? sibling : null
if (!pkg) {
  try {
    pkg = dirname(createRequire(import.meta.url).resolve('docugate/package.json'))
  } catch {
    console.error('Install docugate first: npm i -D docugate (or clone Docugate_package next to this repository).')
    process.exit(1)
  }
}

execFileSync(process.execPath, [join(pkg, 'dist', 'cli.js'), 'tour', 'export', join(out, 'tour.json')], {
  cwd: root,
  stdio: 'inherit',
})
copyFileSync(join(pkg, 'pill', 'dist', 'pill.js'), join(out, 'pill.js'))
console.log('wrote  frontend/public/pill.js')
