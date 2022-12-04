import dynamic from 'next/dynamic'
import styles from './About.module.css'
import 'react-quill/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  })

const About = ({ about }: any) => {
    
    return (
    <div className={styles.main} id='about'> 
        <QuillNoSSRWrapper    readOnly value={JSON.parse(about)} theme="bubble"/>
    </div>
    )
}

export default About