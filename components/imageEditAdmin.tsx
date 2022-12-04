import { useRef, useState } from "react"
import styles from './ImageEdit.module.css'

const ImageEditAdmin = ({ image, setShowEdit, setHero }: any) => {

    const [imageName, setImageName] = useState(image.name)
console.log(imageName)


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



    const submit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault()

        const formData = new FormData(form.current)


        formData.append('oldImageId', image._id)



        const settings = {
            method: 'POST',
            body: formData,
            headers: {

                // 'Authorization': `bearer ${token}`
            }
        }
        try {
            const fetchResponse = await fetch(`/api/heroUp`, settings);
            const responseData = await fetchResponse.json()
            setIsLoading(false)
            
            setHero(responseData.data.image)
            setShowEdit(false)

        } catch (err) {
            setIsLoading(false)
            console.log('💩💩', err)
            setShowEdit(false)
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
                            <label htmlFor='imageFile'><span>Picture:</span>
                                <input type="file" name="imageFile" required/></label>
                        </p>
                        <p>
                            <label htmlFor='imageName'><span>Name:</span>

                                <input type="text" name="imageName"  onChange={handleName} required/></label>


                        </p>
                        {!isLoading && <input type="submit" name="Update" value="Update" />}

                    </div>
                </div>
            </form>)
        </>
    )
}
export default ImageEditAdmin