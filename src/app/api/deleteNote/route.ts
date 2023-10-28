import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();
    await db.delete($notes).where(eq($notes.id, noteId));
    return new NextResponse("ok", {status: 200})
  } catch (error) {
    console.log(error)
    return new NextResponse("error", {status: 500})
  }
}
