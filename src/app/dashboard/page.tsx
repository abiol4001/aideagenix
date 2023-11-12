"use client"
import CreateNoteDialog from '@/components/CreateNoteDialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { UserButton, auth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { eq } from 'drizzle-orm'
import { ArrowLeftCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'


interface NoteType {
    updatedAt: any
    id: number;
    name: string;
    imageUrl: string;
    createdAt: string;
    // Add other properties if present in your notes
}


const DashboardPage  = () => {

    // const { userId } = await auth()

    // const notes = await db.select().from($notes).where(
    //         eq($notes.userId, userId!)
    // )

    // console.log(notes)
    // if(!notes) return
    // let notes: any[] = []
    // console.log(notes)

    const { data, isLoading } = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const response = await axios(`/api/getNotes`);

            // if (!response.ok) {
            //     throw new Error("Network response was not ok");
            // }

            // const data = await response.json();
            // console.log(data)
            // console.log(response.data.notes)
            // setUserData(data.data); // Assuming you want to set some user data based on the response

            return response.data.notes; // Return the parsed data
            // return data; // Return the parsed data
        },
        // refetchInterval: 3000
    });

    // if(isLoading) {
    //     return <div>
    //         loading
    //     </div>
    // }


    let notes: any[] = []
    return (
        <>
            <div className="grainy min-h-screen">
                <div className="max-w-7xl mx-auto p-10">
                    <div className="h-14"></div>
                    <div className="flex justify-between items-center md:flex-row flex-col">
                        <div className="flex items-center">
                            <Link href="/">
                                <Button className="bg-green-600" size="sm">
                                    <ArrowLeftCircleIcon className="mr-1 w-4 h-4" />
                                    Back
                                </Button>
                            </Link>
                            <div className="w-4"></div>
                            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
                            <div className="w-4"></div>
                            <UserButton />
                        </div>
                    </div>

                    <div className="h-8"></div>
                    <Separator />
                    <div className="h-8"></div>
                    {/* list all the notes */}
                    {/* if no notes, display this */}
                    {data?.length === 0 && (
                    <div className="text-center">
                        <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
                    </div>
                    )}

                    {/* display all the notes */}
                    <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
                        <CreateNoteDialog />
                        {data && data.sort((a: { updatedAt: any }, b: { updatedAt: any }) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() )
                        .map((note: NoteType) => (
                            <a href={`/note/${note.id}`} key={note.id}>
                                <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                                    <Image
                                        width={400}
                                        height={200}
                                        alt={note.name}
                                        src={note.imageUrl || ""}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {note.name}
                                        </h3>
                                        <div className="h-1"></div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(note.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>


                </div>
            </div>
        </>
    )
}

export default DashboardPage