import { useState } from 'react'
import { IJoke } from '../types'

// useJokes hook
export const useJokes = () => {
    const [savedJokes, setSavedJokes] = useState<IJoke[]>([])

    const saveJoke = (joke: IJoke) => {
        setSavedJokes(prev => [...prev, joke])
    }

    const deleteJoke = (id: number) => {
        setSavedJokes(prev => prev.filter(joke => joke.id !== id))
    }

    return { savedJokes, saveJoke, deleteJoke }
}
