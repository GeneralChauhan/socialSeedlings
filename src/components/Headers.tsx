// components/Header.tsx
import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './styles.module.css';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">Social Seedlings</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.themeButton} onClick={toggleTheme}>
        {theme === 'light' ?<WbSunnyIcon/> : <ModeNightIcon/> }
      </div>
    </header>
  );
};

export default Header;
