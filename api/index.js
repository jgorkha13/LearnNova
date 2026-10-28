import app from "../server/index.js";

export default function handler(req, res) {
  const queryIndex = (req.url || "").indexOf("?");
  const queryString = queryIndex >= 0 ? req.url.slice(queryIndex + 1) : "";
  const query = new URLSearchParams(queryString);
  const routePath = (query.get("path") || "").replace(/^\/+/, "");
  query.delete("path");
  const remainingQuery = query.toString();
  req.url = `/api/${routePath}${remainingQuery ? `?${remainingQuery}` : ""}`;
  return app(req, res);
}
