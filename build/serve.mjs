import http from "node:http";
import fs from "node:fs";
import path from "node:path";

// Minimal static server used only to exercise index.html over HTTP, since the
// browser tool refuses file:// URLs. Serves exactly one file.
const file = path.resolve(process.argv[2]);
const port = Number(process.argv[3] || 4321);

const types = { ".html": "text/html; charset=utf-8" };

http
  .createServer((req, res) => {
    const body = fs.readFileSync(file);
    res.writeHead(200, {
      "content-type": types[path.extname(file)] || "application/octet-stream",
      "content-length": body.length,
      "cache-control": "no-store",
    });
    res.end(body);
  })
  .listen(port, () => console.log("serving", file, "on", port));