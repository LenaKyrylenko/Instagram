import React from 'react'
import { ThemeContext, themes } from '../contexts/ThemeContext'

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`
  if (Object.values(themes).includes(theme)) return theme

    const userMedia = window.matchMedia(
        '(prefers-color-scheme: light)')
  if (userMedia.matches) return themes.light

  return themes.dark
}

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = React.useState(getTheme)

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])
  console.log('theme ', theme)

  document.documentElement.classList.add('theme-transition')
  document.documentElement.setAttribute('data-theme', theme)
  window.setTimeout(function() {
    document.documentElement.classList.remove('theme-transition')
  }, 100)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider