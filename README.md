# http-message-json

List of HTTP status message based on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Installation

```
npm install http-message-json --save
```

## Usage

```JS
const { messages, message, codes, code } = require('http-message-json');

/**
 * Get all collection HTTP status message
 * {
 *   100: 'Continue',
 *   101: 'Switching Protocols',
 *   ...
 *   511: 'Network Authentication Required'
 * }
**/
console.log(messages)

// Get HTTP message on specific code
console.log(messages['404'])

/**
 * Grouped HTTP status message
 * {
 *   informational: {
 *     100: 'Continue',
 *     ...
 *     103: 'Early Hints'
 *   },
 *   successful: {
 *     200: 'OK',
 *     ...
 *     226: 'IM Used'
 *   },
 *   redirection: {
 *     300: 'Multiple Choices',
 *     ...
 *     308: 'Permanent Redirect'
 *   },
 *   error: {
 *     all: {
 *       400: 'Bad Request',
 *       ...
 *       511: 'Network Authentication Required'
 *     },
 *     client: {
 *       400: 'Bad Request',
 *       ...
 *       451: 'Unavailable For Legal Reasons'
 *     },
 *     server: {
 *       500: 'Internal Server Error',
 *       ...
 *       511: 'Network Authentication Required'
 *     },
 *   },
 * }
**/
console.log(message)

/**
 * Get all HTTP status codes
 * [100, ..., 200, ..., 300, ..., 400, 500, ...]
**/
console.log(codes)

/**
 * Grouped HTTP status codes
 * {
 *   informational: [100, ..., 103],
 *   successful: [200, ..., 226],
 *   redirection: [300, ..., 308],
 *   error: {
 *     all: [400, ..., 511],
 *     client: [400, ..., 451],
 *     server: [500, ..., 511],
 *   },
 * }
**/
console.log(code)
```

### Example using express.js

```JS
const express = require('express');
const fs = require('fs');
const { codes, messages } = require('http-message-json');
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/file', (req, res, next) => {
  try {
    const data = fs.readFileSync('/maybe-valid-file.txt', 'utf8');
    console.log(data);
    res.send('File opened');
  } catch (err) {
   return next({ code: 500 });
  }
});

app.get('/valid', (req, res, next) => {
  if (!req.query.id) {
    return next({ code: 404 });
  }

  res.send('Valid page');
});

app.use((err, req, res, next) => {
  let status = codes.indexOf(err.code) !== -1 ? err.code : 500;
  res.status(status).send(messages[status]);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```
