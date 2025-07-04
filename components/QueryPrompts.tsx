import React from 'react'
import { usePromptStore } from '../store/prompt'

interface QueryPromptsProps {
  icon: React.ElementType;
  boldedText: string;
  greyedText: string;
  iconColor?: string;
}

const QueryPrompts: React.FC<QueryPromptsProps> = ({ icon, boldedText, greyedText, iconColor }) => {

  const { setPrompt } = usePromptStore()

  const handleCopyPrompt = () => {
    setPrompt(greyedText)
  }

  return (
    <div onClick={handleCopyPrompt} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md rounded-2xl px-3 py-2 transition-all duration-300 cursor-pointer group flex items-start gap-3">
      <div className="text-blue-500 mt-1">
      {React.createElement(icon, { color: iconColor })}
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
          {boldedText}
        </p>
        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
          {greyedText}
        </p>
      </div>
    </div>
  )
}

export default QueryPrompts