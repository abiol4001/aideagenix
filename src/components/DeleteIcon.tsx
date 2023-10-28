"use client"
import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { NoteType } from '@/lib/db/schema'

type Props = {
    note: NoteType
}

const DeleteIcon = ({note}: Props) => {

    console.log(note)

    const deleteNote = useMutation({
        mutationFn: async (noteId: number) => {
            const response = await axios.post("/api/deleteNote", {
                noteId
            })
            return response.data
        }
    })
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
                              deleteNote.mutate(note.id);
                          }
                      }}>Delete</Button>
                  </div>
              </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}

export default DeleteIcon