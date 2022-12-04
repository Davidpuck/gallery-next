import styles from './ImageEdit.module.css'

const ImageShow = ({ image, setShowImage }: any) => {
   window.onpopstate = () => {
        setShowImage(false)

    }
   

    
    const closeMe = (e: any) => {
        e.preventDefault()
        setShowImage(false)
        history.replaceState(null, '', '/')
    }
    return (
        <div className={styles.main} onClick={closeMe}>
            <div className={styles.pic}  style={{
                backgroundImage: `url(${image.url})`, backgroundSize: `contain`, backgroundRepeat: `no-repeat`, backgroundPosition: 'center'
            }}>
                <div className={styles.info}><h2>{image.name}</h2><p>{image.text}</p></div>
            </div>
        </div>
        )
    }
    export default ImageShow