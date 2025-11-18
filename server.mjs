import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname; // serve current folder

const server = http.createServer((req, res) => {
  // Required for SharedArrayBuffer
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  // Static file serving
  let filePath = path.join(ROOT, req.url === "/" ? "index.html" : req.url);
  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === ".html" ? "text/html" :
    ext === ".js"   ? "text/javascript" :
    ext === ".css"  ? "text/css" :
    ext === ".csv"  ? "text/csv" :
    "application/octet-stream";

  res.setHeader("Content-Type", contentType);
  fs.createReadStream(filePath).pipe(res);
});

server.listen(5500, () => {
  console.log("Serving at http://localhost:5500");
});

