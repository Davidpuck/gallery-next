import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './NavItem.module.css'

const NavItemLogout = ({ user }: any) => {
    const { mutateUser } = useUser()
    const router = useRouter()


    return (
        <li className={styles.main} >
            {user?.isLoggedIn && <Link
                href="/api/logout"
                
            >
                <a onClick={async (e) => {
                    e.preventDefault()
                    mutateUser(
                        await fetchJson('/api/logout', { method: 'POST' }),
                        false
                    )
                    router.push('/login')
                }}>Logout</a>
            </Link>}
        </li>
    )
}

export default NavItemLogout