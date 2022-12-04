import React, { cloneElement, useState } from 'react'
import styles from './AddItem.module.css'



const AddItem = ({ children }: any) => {
    const [showForm, setShowForm] = useState(false)


    const handleClick = (e: any) => {
        e.preventDefault()
        setShowForm(true)


    }

    return (

        <>
            <li className={styles.main} onClick={handleClick}>
                <span>+</span>
            </li>
            {showForm && cloneElement(children, { setShowForm })}
        </>


    )
}

export default AddItem