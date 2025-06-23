
import { useContext } from 'react';
import { ThemeContext } from '../HealthReport';


const Header = () => {

    const [theme, setTheme] = useContext(ThemeContext);
    const THEMES = ['light', 'dark', 'red'];
    const changeTheme = (e) => setTheme(e.target.value)

    return (
      <header className={`content-${theme}`}>
        {THEMES.map(_theme => {
          return (
            <label>
              <input type="radio" key={_theme} value={_theme} checked={theme === _theme} onChange={changeTheme}/>
              {_theme}
            </label>
          )
        })}
      </header>
  )
}
export default Header