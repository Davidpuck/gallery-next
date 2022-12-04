import styles from './Header.module.css'
import NavItem from './NavItem'

const Header = ({ galleriesList}:{ galleriesList: any}) => {
    const galleryNames = galleriesList.map( (gallery:any ) =>gallery.name)
    return (
        <header className={styles.main}>
            <h1>Coming Soon</h1>
            <nav>
                <ul>
                    <NavItem name='about' />
                    {galleryNames && galleryNames.map((gallery: string ) => <NavItem name={gallery} key={gallery} />)}
                    
                    <NavItem name='contact' />
                </ul>
            </nav>
            
        </header>
    )
}
export default Header