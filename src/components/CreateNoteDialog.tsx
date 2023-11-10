"use client"
import { Loader2, Plus } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

type Props = {}

const CreateNoteDialog = (props: Props) => {
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()

    const createNote = useMutation({
        mutationFn: async () => {
            setIsLoading(true)
            const response = await axios.post("/api/createNote", {
                name: input
            })
            return response.data
        }
    })

    const uploadToFirebase = useMutation({
        mutationFn: async (noteId: string) => {
            const response = await axios.post("/api/uploadToFirebase", {
                noteId: noteId
            })
            return response.data
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        }
    })

    // Checking why isLoading is not among the attributes
    // console.log(createNote)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(input === "") {
            alert("Please enter a name for your note")
            return
        }

        createNote.mutate(undefined, {
            onSuccess: ({note_id}) => {
                console.log("Note created!")
                console.log("Image uploading to FB")
                uploadToFirebase.mutate(note_id)
                console.log("Image uploaded to FB!")
                // queryClient.invalidateQueries({ exact: "notes" });
                router.push(`/note/${note_id}`)
                setIsLoading(false)
            },
            onError: (error) => {
                console.log(error)
                setIsLoading(false)
            }
        })
    }
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 border-green-600 h-full rounded-lg flex items-center justify-center hover:shadow-xl transition hover:-translate-y-[2px] sm:flex-col flex-row p-4'>
                <Plus className='w-6 h-6 text-green-600' strokeWidth={3} />
                <h2 className='font-semibold text-green-600 '>New Note</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                        New Note
                </DialogTitle>
                <DialogDescription>
                      You can create a new note by clicking on the button below.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input placeholder='Name...' value={input} onChange={(e)=> setInput(e.target.value)} />
                <div className='h-4'></div>
                <div className="flex items-center gap-4">
                    {/* <Button type='reset' variant={"secondary"}>Cancel</Button> */}
                      <DialogClose asChild>
                          <Button type="button" variant="secondary">
                              Cancel
                          </Button>
                      </DialogClose>
                    <Button className='bg-green-600' disabled={isLoading}>
                          {isLoading && <Loader2 className='w-4 h-4 animate-spin mr-2' />}
                        Create</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog