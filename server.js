const http = require("node:http");
const PORT = process.env.PORT ?? 3000;
const { redirectToFileWithStreams } = require("./utils/utils");

const INDEX_HTML_ROUTE = "views/index.html";
const ABOUT_HTML_ROUTE = "views/about.html";
const CONTACT_ME_HTML_ROUTE = "views/contact-me.html";
const NOT_FOUND_HTML_ROUTE = "views/404.html";

// Map that links urls to redirect stream methods
const urlToFileMap = new Map();
urlToFileMap.set("/", (responseDestination) =>
  redirectToFileWithStreams(INDEX_HTML_ROUTE, responseDestination)
);
urlToFileMap.set("/contact-me", (responseDestination) =>
  redirectToFileWithStreams(CONTACT_ME_HTML_ROUTE, responseDestination)
);
urlToFileMap.set("/about", (responseDestination) =>
  redirectToFileWithStreams(ABOUT_HTML_ROUTE, responseDestination)
);

const server = http.createServer(processRequests);
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

function processRequests(req, res) {
  const { url, method } = req;
  if (method !== "GET") {
    res.statusCode = 405;
    return redirectToFileWithStreams(NOT_FOUND_HTML_ROUTE, res);
  }

  if (!urlToFileMap.has(url))
    return redirectToFileWithStreams(NOT_FOUND_HTML_ROUTE, res);
  return urlToFileMap.get(url)(res);
}
