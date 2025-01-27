import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IJoke } from "../types";

// FrontPageProps interface
interface FrontPageProps {
  saveJoke: (joke: IJoke) => void;
}

// FrontPage component
const FrontPage = ({ saveJoke }: FrontPageProps) => {
  const [joke, setJoke] = useState<IJoke | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch new joke function
  const fetchNewJoke = async (signal?: AbortSignal) => {
    setLoading(true)
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke', { signal })
      const data: IJoke = await response.json()
      setJoke(data)
      setLoading(false)
    } catch (error) {
      if (!signal?.aborted) {
        console.error(error)
        setLoading(false)
      }
    }
  }

  // useEffect hook
  useEffect(() => {
    const abortController = new AbortController()
    fetchNewJoke(abortController.signal)
    return () => abortController.abort()
  }, [])

  return (
    <div>
      <Button variant="contained" onClick={() => fetchNewJoke()}>Get Joke</Button>
      <Button variant="contained" onClick={ () => joke && saveJoke(joke) }>Save Joke</Button>
      <Card sx={{ maxWidth: 345, margin: '2rem auto' }}>
        <CardContent>
          {loading ? (
            <Typography>Loading a joke...</Typography>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                {joke?.setup}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {joke?.punchline}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default FrontPage