## NEXT AUTH ##
- Next auth looks for a folder in app/api/auth/[...nextauth]/route.js and /options.js

- You need the route.js/route.ts but you may also have the options.js/ts

- To generate a random secure secret, you can type: openssl rand -base64 32

- At commit (Protect client page), we have individually protected each page. If you don't want to be doing that, you can use a middleware. Make sure the middleware.js file is in the src folder