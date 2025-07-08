import { useEffect, useState } from 'react'
import httpAIHeader from 'services/httpAIHeader'
import { ChevronDown, Trash2 } from 'lucide-react' 

type Message = {
    role: string
    content: string
}

type Chat = {
    messages: Message[]
    _id: any 
}

const groupMessagesIntoSegments = (messages: Message[]): Message[][] => {
    const segments: Message[][] = []
    let currentSegment: Message[] = []

    messages.forEach((msg) => {
        currentSegment.push(msg)
        if (msg.role === 'assistant') {
            segments.push(currentSegment)
            currentSegment = []
        }
    })

    if (currentSegment.length > 0) {
        segments.push(currentSegment)
    }

    return segments
}

const ChatHistory = () => {
    const [history, setHistory] = useState<Chat[]>([])
    const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set())

    useEffect(() => {
        const handleGetHistory = async () => {
            const response = await httpAIHeader.get("/chat-history/")
            const result = response.data.response
            setHistory(result)
        }

        handleGetHistory()
    }, [])

    const toggleOpen = (idx: number) => {
        setOpenIndexes(prev => {
            const newSet = new Set(prev)
            newSet.has(idx) ? newSet.delete(idx) : newSet.add(idx)
            return newSet
        })
    }

    const handleDelete = async (chat_id: string) => {
        await httpAIHeader.delete("/chat-history", {
            data: {
                chat_id
            }
        })
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 overflow-auto pb-60">
            {history.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No chat history found.</div>
            ) : (
                history.map((chat, chatIdx) => {
                    const isOpen = openIndexes.has(chatIdx)
                    const segments = groupMessagesIntoSegments(chat.messages)

                    return (
                        <div
                            key={chatIdx}
                            className="border rounded-2xl shadow hover:shadow-md transition duration-200 bg-white"
                        >
                            <div className="flex items-center justify-between w-full">
                                <button
                                    onClick={() => toggleOpen(chatIdx)}
                                    className="flex-1 text-left p-4 flex items-center justify-between"
                                >
                                    <span className="font-medium text-lg text-gray-800">
                                        Chat {chatIdx + 1}
                                    </span>
                                    <ChevronDown
                                        className={`h-5 w-5 text-gray-500 transition-transform ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <button
                                    onClick={() => handleDelete(chat._id.$oid)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full mr-4"
                                    title="Delete chat"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>

                            {isOpen && (
                                <div className="px-4 pb-4 space-y-4">
                                    {segments.map((segment, segmentIdx) => (
                                        <div key={segmentIdx} className="p-4 space-y-2 r">
                                            {segment.map((message, msgIdx) => (
                                                <div
                                                    key={msgIdx}
                                                    className={`flex ${
                                                        message.role === "user" ? "justify-end" : "justify-start"
                                                    }`}
                                                >
                                                    <div
                                                        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                                                            message.role === "user"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {message.content}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default ChatHistory
