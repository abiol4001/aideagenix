"use client"

import React from 'react'
import Typewriter from 'typewriter-effect'
type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter options={{
        loop: true,
    }}
    onInit={(typewriter) => {
        typewriter.typeString("🤖 Speed up the creation of your notes.")
        .pauseFor(1000).deleteAll()
            .typeString("🎯 Accurate idea generation with AI.")
        .start()
    }} />
  )
}

export default TypewriterTitle