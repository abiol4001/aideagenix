import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function GET() {
    try {

        const { userId } = await auth();
        // console.log(userId)
        const notes = await db.select().from($notes).where(
            eq($notes.userId, userId!)
        )
        if(!userId) {
            return NextResponse.json({error: true,message: "No user found"}, {status: 404})
        }
        return NextResponse.json({notes}, {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse("error",{status: 400})
    }
}