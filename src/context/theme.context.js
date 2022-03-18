import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeWrapper(props) {

  const [ darkMode, setDarkMode ] = useState(false)

  const darkTheme = {
    backgroundColor: "#252222",
    color: "#E3E6E9"
  }

  const lightTheme = {
    backgroundColor: "#E3E6E9",
    color: "#252222"
  }

  const switchTheme = () => {
    return darkMode ? darkTheme : lightTheme
  }

  const passedContext = {
    darkMode,
    setDarkMode,
    switchTheme,
  }
  
  return (
    <ThemeContext.Provider value={passedContext}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeWrapper }