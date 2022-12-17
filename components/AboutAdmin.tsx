import dynamic from 'next/dynamic'
import React, { useState } from 'react'



import styles from './About.module.css'
import 'react-quill/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],


  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',

]
const About = ({ about }: any) => {
  const [value, setValue] = useState(about)


  const handleSave = async () => {

    const settings = {
      method: 'POST',
      headers: {
      }
    }
    try {
      const fetchResponse = await fetch(`/api/about?about=${value}`, settings);
      await fetchResponse.json()


    } catch (err) {
      console.log('about💩💩', err);

    }
  }


  return (
    <div className={styles.main} id='about'>
      <QuillNoSSRWrapper modules={modules} formats={formats} value={value} onChange={setValue} theme="snow" />
      <button onClick={handleSave}>Save About Text</button>

    </div>
  )
}

export default About
