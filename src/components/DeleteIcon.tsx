"use client"
import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { NoteType } from '@/lib/db/schema'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'

type Props = {
    note: NoteType
}

const DeleteIcon = ({note}: Props) => {
    const { toast } = useToast()
    const router = useRouter()

    const deleteNote = useMutation({
        mutationFn: async (noteId: number) => {
            const response = await axios.post("/api/deleteNote", {
                noteId
            })
            return response.data
        }
    })

    const handleDeleteNote = async () => {
        if (note.id !== undefined) {
            deleteNote.mutate(note.id, {
                onSuccess: () => {
                    // queryClient.invalidateQueries({ exact: "notes" });
                    toast({
                        description: "Note deleted successfully.",
                    })
                    router.push("/dashboard")
                },
                onError: (error) => {
                    console.log(error)
                    toast({
                        description: "Unable to delete note.",
                    })
                }
            });
            toast({
                description: "Note deleted successfully.",
            })
            router.push("/dashboard")
        }


    }
  return (
      <Dialog>
        <DialogTrigger>
              <Button size={"sm"} variant={"destructive"} className='w-fit '>
                  <Trash className='' />
              </Button>
        </DialogTrigger>
        <DialogContent>
              <DialogHeader>
                  <DialogTitle>
                      Delete Note
                  </DialogTitle>
                  <div className='h-4'></div>
                  <DialogDescription className='text-base'>
                      This will delete <span className='font-medium'>{note?.name}</span> note.
                  </DialogDescription>
                  <div className='h-8'></div>
                  <div className='flex gap-4'>
                      <DialogClose asChild>
                          <Button type="button" variant="secondary">
                              Cancel
                          </Button>
                      </DialogClose>
                      <Button variant={"destructive"} onClick={() => {
                          if (note.id !== undefined) {
                              deleteNote.mutate(note.id, );
                              toast({
                                  description: "Note deleted successfully.",
                              })
                              router.push("/dashboard")
                          }
                      }}>Delete</Button>
                  </div>
              </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}

export default DeleteIcon