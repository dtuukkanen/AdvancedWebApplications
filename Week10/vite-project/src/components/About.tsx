import { useEffect, useState } from 'react'
import '../styles/About.css'

interface Post {
  id: number
  title: string
  body: string
}

const About = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [visible, setVisible] = useState(12)

  useEffect(() => {
     fetch('https://jsonplaceholder.typicode.com/posts')
     .then(response => response.json())
     .then(json => setPosts(json))
  }, [])

  return (
    <div>
      <h1>About</h1>
      <div className='grid-container'>
      {posts.slice(0, visible).map(post => (
        <div key={post.id} className='grid-item'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      </div>
      <button onClick={ () => setVisible(visible + 12) }>Show more</button>
    </div>
  )
}

export default About