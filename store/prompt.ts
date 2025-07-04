import { create } from 'zustand'

interface PromptState {
    prompt: string
    setPrompt: (prompt: string) => void
}

export const usePromptStore = create<PromptState>((set) => ({
    prompt: "",
    setPrompt: (prompt: string) => set(() => ({ prompt })),
}))