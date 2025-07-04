import React from 'react'
import QueryPrompts from './QueryPrompts'
import { promptData } from '../data/prompt'

const GetStartedAI = () => {
  return (
    <div className='flex flex-col items-center justify-center px-6 py-10'>
      <h1 className="font-bold text-4xl text-gray-800 mb-10">How can I help?</h1>

      <div className='absolute bottom-48 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
        {promptData.map((prompt, index: React.Key | null | undefined) => (
          <QueryPrompts key={index} {...prompt} />
        ))}
      </div>
    </div>
  )
}

export default GetStartedAI
