// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const messages = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "Unused",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
};

// Mapping http status codes
const codes = Object.keys(messages).map(function (key) {
  return parseInt(key);
});

/**
 * Filter codes in range between `start` & `end`
 * @param {Number} start
 * @param {Number} end
 * @returns Array
 */
const filterCodes = function (start, end) {
  return codes.filter(function (code) {
    return code >= start && code <= end;
  });
};

/**
 * Filter message in range between `start` & `end`
 * @param {Number} start
 * @param {Number} end
 * @returns Array
 */
const filterMessage = function (start, end) {
  var list = {};
  filterCodes(start, end).forEach(function (code) {
    list[code] = messages[code];
  });

  return list;
};

// Grouping object http messages
const message = {
  informational: filterMessage(100, 199),
  successful: filterMessage(200, 299),
  redirection: filterMessage(300, 399),
  error: {
    all: filterMessage(400, 599),
    client: filterMessage(400, 499),
    server: filterMessage(500, 599),
  },
};

// Grouping object htttp status codes
const code = {
  informational: filterCodes(100, 199),
  successful: filterCodes(200, 299),
  redirection: filterCodes(300, 399),
  error: {
    all: filterCodes(400, 599),
    client: filterCodes(400, 499),
    server: filterCodes(500, 599),
  },
};

module.exports = {
  codes: codes,
  code: code,
  messages: messages,
  message: message,
};
