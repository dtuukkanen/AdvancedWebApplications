import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Post {
  id: number
  title: string
  body: string
}

const About = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const { t } = useTranslation()

  useEffect(() => {
     fetch('https://jsonplaceholder.typicode.com/posts')
     .then(response => response.json())
     .then(json => setPosts(json))
  }, [])

  return (
    <div>
      <h1>{t('About')}</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default About