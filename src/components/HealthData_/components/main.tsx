import { useContext } from 'react';
import { ThemeContext } from './HealthReport';

const Main = () => {
  const [theme, setTheme] = useContext(ThemeContext);
    return (
        <>
          <main className={`content-${theme}`}>
            <h1>テーマの切り替え</h1>
          </main>
        </>
    )
}
export default Main;