import styles from './Hero.module.css'
import Image from 'next/image'

const Hero = ({ hero }: any) => {
    


    
    return (
        <div className={styles.main} >
            <Image src={hero.url} alt={hero.name} height={hero.height} width={hero.width} objectFit='contain' />
            
        </div>
    )
}
export default Hero