import Link from 'next/link';
import styles from './styles.module.css';



const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">News Feed</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
