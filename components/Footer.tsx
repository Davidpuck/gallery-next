import styles from './Footer.module.css'
const Footer = () => {
    return (
        <footer className={styles.main} id='contact'>
           <div>
                <a
                    href="mailto:artymcartface@gmail.com?Subject=Hi%20Arty"
                    target="_top"
                >
                    <p>📧 coming soon</p>
                </a>
                <a href="tel:5555555555">
                    <p>☎ coming soon</p>
                </a>
           </div>
        </footer>
    );
};
export default Footer;
