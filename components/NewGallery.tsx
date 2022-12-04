import { FormEvent} from 'react'
import styles from './NewGallery.module.css'

const NewGallery = ({ setShowForm, setGalleriesList }: any) => {

    const closeMe = () => {
        setShowForm(false)
    }
    const stopPropagation = (e: any) => {
        e.stopPropagation()
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            galleryName: e.currentTarget.galleryName.value
        }
        const settings = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }
        try {
            const fetchResponse = await fetch(`/api/newGallery`, settings);
            const retData = await fetchResponse.json()
            setGalleriesList(retData.data.list)

            closeMe()
        } catch (err) {
            console.log('🥶', err)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.main} onClick={closeMe}>
                <div className={styles.modal} onClick={stopPropagation}>
                    <p>
                        <label htmlFor='galleryName'><span>New Gallery Name:</span>
                            <input type="text" name="galleryName" /></label>
                        <button type="submit" name="Create" >Create</button>
                    </p>
                </div>
            </div>
        </form>
    )
}
export default NewGallery