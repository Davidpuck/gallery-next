import Head from 'next/head'
import Footer from '../components/Footer'

import GalleryAdmin from '../components/GalleryAdmin'
import AboutAdmin from '../components/AboutAdmin'
import styles from '../styles/Admin.module.css'
import {  GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { connect } from 'mongoose'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'







import imageModel from '../components/mongodb/imageModel'
import galleryList from '../components/mongodb/galleryList'
import aboutModel from '../components/mongodb/aboutModel'
import { useState } from 'react'
import Top from '../components/Top'
import HeaderAdmin from '../components/HeaderAdmin'
import heroModel from 'components/mongodb/heroModel'
import HeroAdmin from 'components/HeroAdmin'



const Admin = ({ heroData, imageData, galleryData, aboutData, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [galleriesList, setGalleriesList] = useState(JSON.parse(galleryData))
    const [images, setImages] = useState(JSON.parse(imageData))
    const [about] = useState(JSON.parse(aboutData))
    const [hero, setHero] = useState(JSON.parse(heroData))







    return (
        <div className={styles.main}>
            <Head>
                <title>Gallery  🤡 Admin</title>
                <meta name="description" content="A simple gallery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderAdmin galleriesList={galleriesList} setGalleriesList={setGalleriesList} user={user}/>
            <div className={styles.content}>
                <HeroAdmin hero={hero} setHero={setHero}/>
                <AboutAdmin about={about}/>
                {galleriesList?.map((gallery: any) => <GalleryAdmin images={images} setImages={setImages} setGalleriesList={setGalleriesList} gallery={gallery} key={gallery.name} />)}
            </div>


            <Footer />
            <Top />


        </div>
    )
}

export const getServerSideProps : GetServerSideProps = withIronSessionSsr(async function ({ req, res })  {

    const user = req.session.user
    if (user === undefined) {
        res.setHeader('location', '/login')
        res.statusCode = 302
        res.end()
        // return {
        //   props: {
        //     user: { isLoggedIn: false, username: '' } as User,
        //   },
        // }
      }

    if (process.env.MONGO_DB === undefined) {
        throw new Error('MONGO_DB is not defined')
    }
    await connect(process.env.MONGO_DB)

    const imageData = await imageModel.find({})
    const galleries = await galleryList.find({})
    const about = await aboutModel.findOne({})
    const hero = await heroModel.findOne({})


    return { props: {heroData: JSON.stringify(hero?.image)  || null, imageData: JSON.stringify(imageData), galleryData: JSON.stringify(galleries[0]?.list || []), aboutData: JSON.stringify(about?.about) || null, user: req.session.user  } }
},sessionOptions)
export default Admin;
