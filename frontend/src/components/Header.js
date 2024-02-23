import styles from '../styles/Header.module.css'

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>My Todos</div>
        </div>
    )
}

export default Header;