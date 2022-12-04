import { useRef, useState } from 'react'
import styles from './NewImage.module.css'


const NewImage = ({setShowForm,gallery, setImages, setGalleriesList}:any) => {
    const [isLoading, setIsLoading] = useState(false)
    const form: any = useRef(null)

    const closeMe = () => {

        setShowForm(false)
    }
    const stopPropagation = (e: any) => {
        e.stopPropagation()
    }


    const submit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData(form.current)
        formData.append('galleryId', gallery)
        
        
        
        const settings = {
            method: 'POST',
            body: formData,
            headers: {

                // 'Authorization': `bearer ${token}`
            }
        }
        try {
            
            //todo: add hostname to config
            const fetchResponse = await fetch(`/api/imageUp`, settings);
            const responseData = await fetchResponse.json()
            setIsLoading(false)
            
            
            
            setShowForm(false)	
            setImages((prev:any) => [...prev, responseData.data.images])
            setGalleriesList(responseData.data.galleries)
        } catch (err) {
            setIsLoading(false)
            console.log('💩💩', err)
            setShowForm(false)
        }
    }
    return (
        <>
            <form ref={form} onSubmit={submit}>
                <div className={styles.main} onClick={closeMe}>
                    {!isLoading &&
                        <div className={styles.modal} onClick={stopPropagation}>
                            <p>
                                <label htmlFor='imageFile'><span>Picture:</span>
                                    <input type="file" name="imageFile" /></label>
                            </p>
                            <p>
                                <label htmlFor='imageName'><span>Name:</span>
                                    <input type="text" name="imageName" /></label>
                                <label htmlFor='imageText'><span>Extra text here:</span>
                                    <input type="text" name="imageText" /></label>
                            </p>

                            <input type="submit" name="Upload" value="Upload" />
                        </div>
                    }
                    {isLoading && <p>Loading...</p>}
                </div>
            </form>


        </>
    )
}
export default NewImage