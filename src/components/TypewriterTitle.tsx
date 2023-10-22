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
        typewriter.typeString("Getting started to work.")
        .pauseFor(1000).deleteAll()
            .typeString("Making impact with AI")
        .start()
    }} />
  )
}

export default TypewriterTitle