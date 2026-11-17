# Panther Productions — source code

Latest saved website source, including all pages, styles, animation code, images, fonts and the enquiry server.

## Edit
- web/: HTML pages, CSS, JavaScript and assets.
- worker/index.js: server and /api/enquiry endpoint.
- scripts/build-worker.mjs: dependency-free Worker build (Node.js required).
- dist/server/index.js: generated deployment output.

## Frontend preview
Run `python -m http.server 8000 --directory web` and open http://localhost:8000 .
This static preview shows the website; /api/enquiry requires the Worker server and will not work on Python's static server.

## Build
Run from the project folder:
`node scripts/build-worker.mjs`
`node scripts/validate-artifact.mjs`
Deploy dist/server/index.js to a compatible Cloudflare Workers runtime.
.openai/hosting.json identifies the existing ChatGPT Site; it is not an authentication credential.

## Known outstanding issue
The enquiry endpoint currently uses FormSubmit for pantherproductionofficial@gmail.com.
The last live delivery tests failed with email-service-unavailable responses.
Mail delivery is NOT verified. Configure and verify a working email provider before relying on the form for customer enquiries.

Source commit: 531411684c50ebfd745769d542d7e668a5f5b743
