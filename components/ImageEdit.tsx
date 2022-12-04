
import { useRef, useState } from 'react'
import styles from './ImageEdit.module.css'

const ImageEdit = ({ image, setShowEdit, setImages, setGalleriesList, gallery }: any) => {

    const [imageName, setImageName] = useState(image.name)
    const [imageText, setImageText] = useState(image.text)
    const form: any = useRef(null)
    const [isLoading, setIsLoading] = useState(false)



    const closeMe = () => {
        setShowEdit(false)
    }
    const stopPropagation = (e: any) => {
        e.stopPropagation()
    }
    const handleName = (e: any) => {
        setImageName(e.target.value)
    }
    const handleText = (e: any) => {
        setImageText(e.target.value)
    }


    const submit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault()

        const formData = new FormData(form.current)


        formData.append('imageId', image._id)


        const settings = {
            method: 'PUT',
            body: formData,
            headers: {

                // 'Authorization': `bearer ${token}`
            }
        }
        try {
            const fetchResponse = await fetch(`http://${window.location.host}/api/imageUp`, settings);
            const responseData = await fetchResponse.json()
            setIsLoading(false)
            

            setShowEdit(false)
            setImages((prevImages: any) => {
                return prevImages.map((prevImage: any) => {
                    if (prevImage._id === image._id) {
                        return {
                            ...prevImage,
                            name: responseData.data.name,
                            text: responseData.data.text,
                        }
                    }
                    return prevImage
                }
                )
            }
            )
        } catch (err) {
            setIsLoading(false)
            console.log('💩💩', err)
            setShowEdit(false)
        }
    }
    const handledelete = async (e: any) => {
        if (confirm('delete')) {
            setIsLoading(true)
            e.preventDefault()
            const settings = {
                method: 'DELETE',
                headers: {

                    // 'Authorization': `bearer ${token}`
                }
            }
            try {
                const fetchResponse = await fetch(`/api/imageUp?id=${image._id}&gallery=${gallery}`, settings);
                const responseData = await fetchResponse.json()
                setIsLoading(false)
                

                setShowEdit(false)
                setImages((prevImages: any) => {
                    return prevImages.filter((prevImage: any) => prevImage._id !== responseData.data.images._id)
                })
                setGalleriesList(responseData.data.galleries)

            } catch (err) {
                setIsLoading(false)
                console.log('💩💩', err)
                setShowEdit(false)
            }
        } else {
            setShowEdit(false)
            setIsLoading(false)
        }
    }

    return (
        <>
            (<form ref={form} onSubmit={submit}>
                <div className={styles.main} onClick={closeMe} style={{
                    backgroundImage: `url(${image.url})`, backgroundSize: `contain`, backgroundRepeat: `no-repeat`, backgroundPosition: 'center'
                }}>

                    <div className={styles.modal} onClick={stopPropagation}>
                        <p>
                            <label htmlFor='imageName'><span>Name:</span>
                                <input type="text" name="imageName" value={imageName} onChange={handleName} /></label>
                            <label htmlFor='imageText'><span>Extra text here:</span>
                                <input type="text" name="imageText" value={imageText} onChange={handleText} /></label>
                        </p>
                        {!isLoading && <input type="submit" name="Update" value="Update" />}
                        {!isLoading && <button onClick={handledelete}>Delete</button>}
                    </div>
                </div>
            </form>)
        </>
    )
}
export default ImageEdit