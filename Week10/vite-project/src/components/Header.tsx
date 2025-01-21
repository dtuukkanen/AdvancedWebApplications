import { Link } from "react-router-dom"
import '../styles/header.css'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <header className="header">
      <h1>ReactRouter</h1>
      <nav>
        <ul>
          <li><Link to="/">{t('Home')}</Link></li>
          <li><Link to="/about">{t('About')}</Link></li>
          <li><button id="fi" onClick={() => handleLanguageChange('fi')}>FI</button></li>
          <li><button id="en" onClick={() => handleLanguageChange('en')}>EN</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header