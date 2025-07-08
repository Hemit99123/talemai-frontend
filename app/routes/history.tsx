import React, { useEffect, useState } from 'react'
import httpAIHeader from 'services/httpAIHeader'

type Message = {
    role: string
    content: string
}

type Chat = {
    messages: Message[]
    // add other properties if needed
}

const ChatHistory = () => {
    const [history, setHistory] = useState<Chat[]>([])

    useEffect(() => {
        const handleGetHistory = async () => {
            const response = await httpAIHeader.get("/chat-history/")
            const result = response.data.response
            setHistory(result)
        }

        handleGetHistory()
    }, [])

    return (
        <div>
            <div className="max-w-3xl mx-auto space-y-6 overflow-auto pb-60">
                {history.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">No chat history found.</div>
                ) : (
                    history.map((chat, chatIdx) => (
                        <div key={chatIdx} className="mb-8">
                            {chat.messages && chat.messages.length > 0 ? (
                                chat.messages.map((message, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                                    >
                                        <div
                                            className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                                                message.role === "user"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-400 text-sm">No messages in this chat.</div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ChatHistory