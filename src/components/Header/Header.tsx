import styles from './styles.module.css';
import ImgLogo from '../../assets/logo.svg';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src={ImgLogo} alt="" />
      </div>
    </header>
  );
};
