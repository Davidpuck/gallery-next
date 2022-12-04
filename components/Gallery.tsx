import styles from './Gallery.module.css'
import Frame from './Frame'

const Gallery = ({ images, gallery }: any) => {
    const data = images.filter((image: any) => gallery.images.includes(image._id))
    return (
        <div className={styles.container}>
            <div className={styles.main} id={gallery.name}>
                {data.length !== 0 ? data.map((pic: any) => {
                    return (
                        <div key={pic._id}>
                            <Frame pic={pic} />
                        </div>
                    )
                }
                ) : <p>no images in {gallery.name} yet</p>}
            </div>
        </div>
    )
}
export default Gallery