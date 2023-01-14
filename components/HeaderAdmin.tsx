import { User } from 'pages/api/user'
import AddItem from './AddItem'
import styles from './Header.module.css'
import NavItem from './NavItem'
import NavItemLogout from './NavItemLogout'
import NewGallery from './NewGallery'


const  HeaderAdmin = ({galleriesList, setGalleriesList, user}:{galleriesList:any, setGalleriesList: any, user: User}) => {

   const handleRebuild = async () => {

        const res = await fetch('/api/rebuild')
        const data = await res.json()
        console.log(data)
    }
    const galleryNames = galleriesList.map( (gallery:any ) =>gallery.name)
    
    
    return (
        <header className={styles.main}>
            <h1>Admin Page</h1>
            <button onClick={handleRebuild}>Update Now!</button>
            <nav>
                <ul>
                    <NavItem name='about' />
                    {galleryNames && galleryNames.map((gallery: string ) => <NavItem name={gallery} key={gallery} />)}
                    <AddItem >
                    <NewGallery setGalleriesList={setGalleriesList} />
                    </AddItem>
                    <NavItem name='contact' />
                    <NavItemLogout user={user}/>
                </ul>
            </nav>
            
        </header>
    )
}
export default HeaderAdmin