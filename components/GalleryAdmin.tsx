
import styles from './Gallery.module.css'
import NewImage from './NewImage'
import AddItem from './AddItem'
import Frame from './FrameAdmin'

type Data = {
    name: string,
    text: string,
    width: number,
    height: number,
    url: string,
    _id: string
}

const GalleryAdmin = ({ images, setImages, setGalleriesList, gallery }: any) => {


    const data = images.filter((image: any) => gallery.images.includes(image._id))

    
    const handleDelete = async (e: any) => {
        if (confirm('delete')) {
           
            e.preventDefault()
            const settings = {
                method: 'DELETE',
                headers: {

                    // 'Authorization': `bearer ${token}`


                }                
        }
        try {
            const fetchResponse = await fetch(`/api/newGallery?gallery=${gallery.name}`, settings);
            const responseData = await fetchResponse.json()
            

            
            setGalleriesList(responseData.data)

        } catch (err) {
            console.log('💩💩', err);
            
        }
    }
    }
    return (
        <div className={styles.container}>
            <div className={styles.main} id={gallery.name}>
                
                
                
                {data.length !== 0 ? data.map((pic: Data) => {
    
    
                    return (
                        <div key={pic._id}>
                            <Frame pic={pic} setImages={setImages} setGalleriesList={setGalleriesList} gallery={gallery.name}/>
                        </div>
                   )
                })
                :  <button onClick={handleDelete}>Delete {gallery.name}</button>}
    
                <div className={styles.frame}>
                    <AddItem>
                        <NewImage gallery={gallery.name}  setImages={setImages} setGalleriesList={setGalleriesList}/>
                    </AddItem>
                </div>
            </div>
        </div>
    )
}

export default GalleryAdmin