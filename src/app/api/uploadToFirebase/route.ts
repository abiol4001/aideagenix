import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();

    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));

    if (!notes[0].imageUrl) {
      return new NextResponse("no image url", { status: 404 });
    }

    const firebase_url = await uploadFileToFirebase(
      notes[0].imageUrl,
      notes[0].name
    );

    //update the note with a permanent URL from firebase
    await db
      .update($notes)
      .set({
        imageUrl: firebase_url,
      })
      .where(eq($notes.id, noteId));

    return new NextResponse("Upload to firebase successful", {status: 200})
  } catch (error) {
    console.log(error)
    return new NextResponse("error", {status: 500})
  }
}
