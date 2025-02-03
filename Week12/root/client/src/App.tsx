import './App.css'

function App() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault()

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);

    // Use fetch to send the form data to the server
    try {
      const response = await fetch('/api/book', {
        method: form.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log('Book added successfully');
        form.reset();
      } else {
        console.error('Failed to add book');
      }
    } catch (error: any) {
      console.error('Error:', error)
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h1>books</h1>

      <label>
        Name of the book:
        <input id='name' name='name' type='string' />
      </label>

      <br />

      <label>
        Author of the book:
        <input id='author' name='author' type='string' />
      </label>

      <br />

      <label>
        Number of pages:
        <input id='pages' name='pages' type='number' />
      </label>

      <br />

      <input id='submit' type='submit' />
    </form>
  )
}

export default App
