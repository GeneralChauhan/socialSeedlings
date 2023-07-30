// components/ThemeSwitcher.tsx
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      setTheme(storedTheme);
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  

  return (
    <div className={styles.themeSwitcher}>
      <label className={styles.switch}>
        <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeToggle} />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
    </div>
  );
};

export default ThemeSwitcher;
