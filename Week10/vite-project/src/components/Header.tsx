import { Link } from "react-router-dom"
import '../styles/header.css'

const Header = () => {
  return (
    <header>
      <h1>ReactRouter</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><button>FI</button></li>
          <li><button>EN</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header