"use client"
import React, { useEffect, useState } from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import Text from '@tiptap/extension-text'
import { StarterKit } from '@tiptap/starter-kit'
import TipTapMenu from './TipTapMenu'
import { Button } from './ui/button'
import { useDebounce } from '@/lib/useDebounce'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { NoteType } from '@/lib/db/schema'
import { Loader2 } from 'lucide-react'


type Props = {
    note: NoteType
}

const TipTapEditor = ({note}: Props) => {
    const [editorState, setEditorState] = useState(note.editorState || `<h1>${note.name}</h1>`)
    const [isLoading, setIsLoading] = useState(false)

    const saveNote = useMutation({
        mutationFn: async () => {
            setIsLoading(true)
            const response = await axios.post("/api/saveNote", {
                noteId: note.id,
                editorState
            })
            setIsLoading(false)
            return response.data
        }
    }) 

    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Shift-a': () => {
                    console.log('Activate AI')
                    return true
                }
            }
        },
    })
    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit, customText],
        content: editorState,
        onUpdate: ({editor}) => {
            setEditorState(editor.getHTML())
        }
    })

    const delayedState = useDebounce(editorState, 1000)

    // console.log(delayedState)

    useEffect(() => {
        if(delayedState === "") return
        saveNote.mutate(undefined, {
            onSuccess: (data) => {
                console.log("noted update",data)
                setIsLoading(false)
            },
            onError: error => {
                console.log(error)
                setIsLoading(false)
            }
        })
    
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delayedState])
    

  return (
    <>
    <div className='flex justify-between'>
       {editor && <TipTapMenu editor={editor} />}
        <Button disabled>{isLoading && <Loader2 className='mr-1 animate-spin' />}{isLoading ? "Saving" : "Saved"}</Button>
    </div>
        <div className='prose'>
            <EditorContent editor={editor} />
        </div>
    </>
  )
}

export default TipTapEditor