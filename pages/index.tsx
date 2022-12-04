import Head from 'next/head'
import Footer from '../components/Footer'

import Gallery from '../components/Gallery'
import styles from '../styles/Home.module.css'
import { GetStaticProps, NextPage,  InferGetStaticPropsType } from 'next'
import { connect } from 'mongoose'

import imageModel from '../components/mongodb/imageModel'
import galleryList from '../components/mongodb/galleryList'

import Top from '../components/Top'
import aboutModel from '../components/mongodb/aboutModel'
import About from '../components/About'
import Header from '../components/Header'
import Hero from 'components/Hero'
import heroModel from 'components/mongodb/heroModel'

const Index: NextPage = ({ heroData, imageData, galleryData, aboutData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const galleriesList = JSON.parse(galleryData)
    const images = JSON.parse(imageData)
    const hero = JSON.parse(heroData)

    return (
        <div className={styles.main}>
            <Head>
                <title>Gallery </title>
                <meta name="description" content="A simple gallery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header galleriesList={JSON.parse(galleryData)} />

            <div className={styles.content}>
                {/* todo ipdate hero source */}
                <Hero hero={hero} />
                <About about={aboutData} />
                {galleriesList?.map((gallery: any) => <Gallery images={images} gallery={gallery} key={gallery.name} />)}
            </div>

            <Footer />
            <Top />


        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    if (process.env.MONGO_DB === undefined) {
        throw new Error('MONGO_DB is not defined')
    }
    await connect(process.env.MONGO_DB)

    const imageData = await imageModel.find({})
    const galleries = await galleryList.find({})
    const about = await aboutModel.findOne({})
    const hero = await heroModel.findOne({})

    return { props: { heroData: JSON.stringify(hero?.image || {}), imageData: JSON.stringify(imageData), galleryData: JSON.stringify(galleries[0]?.list || []), aboutData: JSON.stringify(about?.about) || null } }
}
export default Index;
