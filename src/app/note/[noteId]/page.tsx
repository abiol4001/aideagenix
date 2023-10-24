import TipTapEditor from '@/components/TipTapEditor'
import { Button } from '@/components/ui/button'
import { clerk } from '@/lib/clerk-server'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, Delete, DeleteIcon, LucideDelete } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        noteId: string
    }
}

const NotePage = async ({ params: { noteId } }: Props) => {
    const { userId } = await auth()

    if (!userId) {
        return redirect('/dashboard')
    }

    const user = await clerk.users.getUser(userId)
    // console.log(user)
    const notes = await db.select().from($notes).where(
        and(
            eq($notes.id, parseInt(noteId)),
            eq($notes.userId, userId)
        )
    )

    if(notes.length != 1) {
        return redirect('/dashboard')
    }

    // console.log(notes)
    const note = notes[0]
    return (
        <div className='min-h-screen grainy p-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex gap-5 items-center'>
                    <Link href={"/dashboard"}>
                        <Button className='bg-green-600' size="sm"><ArrowLeft /> Back</Button>
                    </Link>
                    <div>
                        <span className='font-semibold text-lg'>{user.firstName} {user.lastName}</span>
                        <span className='px-1'>/</span>
                        <span>{note.name}</span>
                    </div>
                    <Button>
                        <DeleteIcon />
                    </Button>
                </div>

                <div className='mt-5 border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full'>
                    <TipTapEditor note={note} />
                </div>
            </div>
        </div>
    )
}

export default NotePage