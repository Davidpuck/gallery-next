import styles from './Frame.module.css'
import Image from 'next/image'
import { useState } from 'react'
import ImageEdit from './ImageEdit'

const FrameAdmin = ({ pic, setImages, setGalleriesList, gallery }: any) => {
    const [showEdit, setShowEdit] = useState(false)
    const handleClick = (e: any) => {
        e.preventDefault()
        setShowEdit(true)

    }
    return (
        <div className={styles.main} >
            <Image src={pic.url} alt={pic.name} height={pic.height} width={pic.width} objectFit='contain' onClick={handleClick}/>
            { showEdit && <ImageEdit image={pic} setShowEdit={setShowEdit}  setImages={setImages} setGalleriesList={setGalleriesList} gallery={gallery}/>}
        </div>
    )
}
export default FrameAdmin