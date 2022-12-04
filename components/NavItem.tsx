
import styles from './NavItem.module.css'



const NavItem = ({ name }: { name: string }) => {
    


    const handleScroll = (id: string) => {
        
          
      
            var el: HTMLElement | null = document.getElementById(id)
            el !== null && el.scrollIntoView()
       
    }

    return (
        
            <li className={styles.main} onClick={() => handleScroll(name)}>
                <span>{name}</span>
            </li>
           
       
    )
}

export default NavItem