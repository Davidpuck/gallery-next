import React from "react"
import styles from "./Top.module.css"

//create back to top button
const Top = () => {
    const handleScroll = () => {
        window.scrollTo(0, 0);
    };
    
    return (
        <div className={styles.main} onClick={handleScroll}>
        <span>⬆</span>
        </div>
    )
    }
export default Top