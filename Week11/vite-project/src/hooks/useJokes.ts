import { useState } from 'react'
import { IJoke } from '../types'

export const useJokes = () => {
  const [savedJokes, setSavedJokes] = useState<IJoke[]>([])

  const saveJoke = (joke: IJoke) => {
    setSavedJokes(prev => [...prev, joke])
  }

  return { savedJokes, saveJoke }
}
