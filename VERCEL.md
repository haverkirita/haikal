Deployment notes for Vercel

- Add the following environment variables in your Vercel project settings:
  - `DATABASE_URL`: Postgres connection string
  - `ADMIN_USERNAME` and `ADMIN_PASSWORD`
  - `SESSION_SECRET` (strong random string)
  - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` (for GitHub Action deploy, or set via the Vercel dashboard)

- To enable automatic deployments from this repository, add the following GitHub Actions secrets in your repo settings:
  - `VERCEL_TOKEN` (Personal token from Vercel)
  - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

- The default workflow is configured to run on a self-hosted runner. Make sure you have a self-hosted runner registered with your repository or organization that has:
  - Node.js (>=20), `npm` and `tsx` available
  - Access to Docker/network to reach your database and Vercel APIs if needed
  - Sufficient disk space to run `npm ci` and `vite` builds

- Alternatively, you can connect the GitHub repo in the Vercel dashboard to enable automatic deployments on push to `main`.

- The build step will run `npm run build` which:
  1. Builds the client with Vite and copies the result into `public/`.
  2. Bundles the server into `dist/index.cjs` (unused by Vercel functions but left for compatibility).

- The server API runs as a Vercel Serverless Function at `/api`.

- Note: Serverless functions are stateless — session persistence requires an external session store.
