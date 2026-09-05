import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth/server";
import { ensureAuthSchema } from "@/lib/ensure-auth-schema";

async function handle({ request }: { request: Request }) {
  try {
    await ensureAuthSchema();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Database is not configured";
    return Response.json({ message }, { status: 503 });
  }
  try {
    return await auth.handler(request);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Auth failed";
    console.error("[auth]", err);
    return Response.json({ message }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
    },
  },
});
