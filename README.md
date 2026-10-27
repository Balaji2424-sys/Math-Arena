# MATHFEST — The Mathematical Arena

A Vercel-ready, multi-device host tool for the MATHFEST Event 4 challenge. The team display is built with HTML, CSS, and vanilla JavaScript. Vercel Node functions and Upstash Redis provide protected, shared state.

## Deploy to Vercel

1. Push this project to a Git repository and import it into Vercel. `vercel.json` runs the dependency-free `build.js`, publishes only `dist/`, and leaves server-side scenario data out of the public files.
2. In the Vercel project, add **Upstash for Redis** from the Marketplace and connect a Redis database. The integration provides `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to the project.
3. Add the following environment variables in Vercel project settings. Keep their values private and set them for the production environment (and preview only if preview deployments should share the same event state).
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `ARENA_ADMIN_TOKEN` — a long random secret shared only with organizers. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
   - `ARENA_EVENT_ID` — optional namespace; defaults to `mathfest:event4`. Use a different value to start an independent event without deleting prior state.
4. Redeploy after adding environment variables. Open the deployed URL on the organizer and projector devices. The header shows whether the shared arena is connected.

The organizer enters `ARENA_ADMIN_TOKEN` the first time they choose a door or operate a control on each browser session. The browser keeps it in session storage for that tab. Never put the token in `script.js`, HTML, a public repository, or a Vercel client-side environment variable.

## Local development

For the shared arena locally, configure the Redis variables and `ARENA_ADMIN_TOKEN` in `.env` (copy `.env.example`; do not commit `.env`) and run `vercel dev`.

For a quick single-browser preview using VS Code Live Server, run `node build.js` once and refresh `index.html`. On `localhost` or `127.0.0.1`, the page loads the generated `local-preview-data.js` and runs the full Class 9 flow in memory. The page displays a persistent **LOCAL PREVIEW · NOT SHARED** notice. This generated file is git-ignored and excluded from Vercel's `dist/` output; the deployed app uses the Redis API and never falls back to per-device state.

## Live arena behavior

- A door claim is an atomic Redis operation. Only one challenge can be active at a time, so two organizers choosing at once cannot reserve separate doors. Every device sees the same active door and the doors become unavailable while the arena is in use.
- Reveal stage, completion, rule-changer, timer, reset, and door release are stored in Redis. Other open devices poll the shared state about every 1.6 seconds.
- The organizer’s **New Team · Reset Cards** action relocks the cards and keeps the current door reserved globally. **Release Door · Reset Arena** ends the shared challenge and frees the arena. Used-door history is kept, so with the default no-repeat policy, a released door remains used until all scenarios are exhausted or the organizer resets used-door history.
- Random selection uses JavaScript randomness over doors eligible under the configured policy.
- Card text is returned from the server only after its reveal stage. Answer keys are in `lib/arena-data.js` and are served only by the authenticated `/api/answer` endpoint.

## Class 9 challenge flow

Select **ENTER THE ARENA**, then **CLASS 9**. Choose a numbered door or **RANDOM MYSTERY**. The active card expands to fill the gold presentation frame; the other cards shrink to compact stage headers. Clicking an already revealed compact card expands it for comparison. Clicking a locked card never reveals it.

Use **REVEAL CARD 1**, **UNLOCK CARD 2**, and **UNLOCK CARD 3** in order. Mark the stage complete when ready. Introduce the rule-changer separately. The optional timer is shared across devices and never changes card locks.

To privately show an answer key, use **SHOW ANSWER KEY** on the organizer device, then hide it before projecting that device. The answer API requires the organizer key. Student devices receive only the selected scenario’s revealed card content.

## Add Classes 10–12

Edit the central `ARENA_CONFIG` object in [`lib/arena-data.js`](lib/arena-data.js). Add scenarios following the existing Class 9 schema and set the desired class `enabled` value to `true`. The API derives door counts and checks claim IDs against that server-side data. Do not add answer keys to the browser code. After editing, redeploy.

## State and access limits

Redis is the authoritative shared state. A failed API/Redis connection prevents claiming doors or changing the event; it does not silently fall back to per-device state. All organizer controls use one shared bearer key, so anyone who has that key can operate the event. This is organizer access control, not individual accounts or an audit log. Student pages can read the active challenge and cards already revealed, as required for the competition. Used-door history persists in Redis across browser reloads and deployments until reset or a new `ARENA_EVENT_ID` is used.
