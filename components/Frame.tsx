import styles from './Frame.module.css'
import Image from 'next/image'
import { useState } from 'react'
import ImageShow from './ImageShow'
const Frame = ({ pic }: any) => {
    const [showImage, setShowImage] = useState(false)
    const handleClick = (e: any) => {
        e.preventDefault()
        setShowImage(true)
        history.pushState(null, '', `#${pic.name}`)


    }
    return (
        <div className={styles.main} >
            <Image src={pic.url} alt={pic.name} height={pic.height} width={pic.width} objectFit='contain' onClick={handleClick}/>
            {showImage && <ImageShow image={pic} setShowImage={setShowImage} />}
        </div>
    )
}
export default Frame