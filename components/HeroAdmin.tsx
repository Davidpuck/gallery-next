import styles from './Hero.module.css'
import Image from 'next/image'
import { useState } from 'react'
import ImageEditAdmin from './imageEditAdmin'



const HeroAdmin = ({ hero, setHero }: any) => {
    const [showEdit, setShowEdit] = useState(false)
    const dummyHero = {
        name: 'dummy',
        url: '/red.png',
        height: 800,
        width: 800,
        _id: 'dummy',
    }
    if(!hero?._id ) {
        hero = dummyHero
    }
    
    const handleClick = (e: any) => {
        e.preventDefault()
        setShowEdit(true)

    }
    return (
        <div className={styles.main} >
            <Image src={hero.url} alt={hero.name} height={hero.height} width={hero.width} objectFit='contain' onClick={handleClick}/>
            { showEdit && <ImageEditAdmin image={hero} setShowEdit={setShowEdit} setHero={setHero} />}
        </div>
    )
}
export default HeroAdmin