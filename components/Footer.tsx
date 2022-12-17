import styles from './Footer.module.css'
const Footer = () => {
    return (
        <footer className={styles.main} id='contact'>
            <div>
                <a
                    href={`mailto:${process.env.EMAIL}`}
                    target="_top"
                >
                    <p>{`📧 ${process.env.EMAIL}`}</p>
                </a>
                <a href={`tel: ${process.env.PHONE_NUMBER}`}>
                    <p>{`☎  ${process.env.PHONE_NUMBER}`}</p>
                </a>
            </div>
        </footer>
    );
};
export default Footer;
