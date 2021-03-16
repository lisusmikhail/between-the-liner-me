
A prototype application that analyzes the emotions of text using natural language understanding
https://betweentheliner.me/


## Scripts
### develop
npm start

### build
npm run build

### public
firebase deploy

### functions
firebase emulators:start --only functions
firebase deploy --only functions:textToCheck
functions.useEmulator("localhost", 5001) (app.js)

### env functions
set env example: firebase functions:config:set watson.key=abc123 watson.url=https://test.test
unset env: firebase functions:config:unset watson.key watson.url
check: firebase functions:config:get
before start in dev mode: firebase functions:config:get > .runtimeconfig.json (cd functions folder)
