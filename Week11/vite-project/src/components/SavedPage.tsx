import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IJoke } from "../types"

interface SavedPageProps {
  savedJokes: IJoke[]
}

const SavedPage = ({ savedJokes }: SavedPageProps) => {
  if (savedJokes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">No saved jokes yet.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
      {savedJokes.map((joke: IJoke) => (
        <Card key={joke.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {joke.setup}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {joke.punchline}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default SavedPage