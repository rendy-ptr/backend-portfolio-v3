import { Hono } from "hono";
import { cors } from "hono/cors";
import indexRoute from "./routes/index.route";
import type { Bindings } from "./types/binding.type";


const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "/*",
  cors({
    origin: ["http://localhost:5173", "https://rendydev.net", "https://portfolio.rendydev.net"],
  }),
);

app.route("/api", indexRoute);

export default app;
