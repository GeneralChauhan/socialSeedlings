// components/Header.tsx
import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './styles.module.css';


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
            <Link href="/">News Feed</Link>
          </li>
        </ul>
      </nav>
      <button className={styles.themeButton} onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
      </button>
    </header>
  );
};

export default Header;
