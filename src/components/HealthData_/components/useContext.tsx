// themeを管理するcomponent
import React, { useState, createContext } from 'react'
import Header from './header'
import Main from './main'

export const ThemeContext = createContext(0);

const useContextPattern = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Header />
      <Main />
    <ThemeContext.Provider/>
  )
}
export default useContextPattern