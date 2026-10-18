import { eq } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Uploaded files never change (a new upload gets a new id), so they can be cached for a year.
export async function GET(_request: Request, { params }: RouteContext<"/media/[id]">) {
  const { id } = await params;
  if (!UUID.test(id)) return new Response("Not found", { status: 404 });

  const [file] = await db
    .select({ data: media.data, mimeType: media.mimeType })
    .from(media)
    .where(eq(media.id, id))
    .limit(1);

  if (!file) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": file.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
