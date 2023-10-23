"use client"
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'

type Props = {}

const CreateNoteDialog = (props: Props) => {
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
            <form action="">
                <Input placeholder='Name...' />
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog