import type { NextApiRequest, NextApiResponse } from 'next'

import { connect } from 'mongoose'
import GalleryList from '../../components/mongodb/galleryList'

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";



export default withIronSessionApiRoute(handler, sessionOptions)
async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const user = req.session.user
    if (!user || user.isLoggedIn === false) {
        res.status(401).end();
        return;
    }
    if (req.method === 'POST') {
        const { galleryName } = await req.body
        
        
        
            if (process.env.MONGO_DB === undefined) {
                throw new Error('MONGO_DB is undefined')
            } else {
                await connect(process.env.MONGO_DB);
            }
            try {
                const galleryList: any = await GalleryList.findOne({})
                if (galleryList === null) {
                    const newGallery = new GalleryList({
                        list: [{
                            name: galleryName,
                            images: []
                        }]
                    })
                    await newGallery.save()
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Success',
                        data: {
                            list: newGallery.list
                        }
                    })
                } else {
                    const newGallery = await GalleryList.findOneAndUpdate({}, {
                        $push: {
                            list: {
                                name: galleryName,
                                images: []
                            }
                        }
                    }, { new: true })
                    newGallery.save()
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Success',
                        data: {
                            list: newGallery.list
                        }
                    })
                }
            } catch (err) {
                res.status(500).json({
                    statusCode: 500,
                    message: 'Internal Server Error',
                    err
                })
            }
        
    } else if (req.method === 'DELETE') {
        const { gallery } = req.query
        if (gallery === undefined || gallery === null || Array.isArray(gallery)) {
            res.status(400).json({
                statusCode: 400,
                message: 'Bad Request',
                err: 'gallery is undefined'
            })
        }
        if (process.env.MONGO_DB === undefined) {
            throw new Error('MONGO_DB is undefined')
        }
        try {
            //find and delete
            const galleryList = await GalleryList.findOneAndUpdate({}, {
                $pull: {
                    list: {
                        name: gallery
                    }
                }
            }, { new: true })
            const galist = await galleryList.save()
            res.status(200).json({
                statusCode: 200,
                message: 'Image Deleted Successfully',
                data: galist.list
            })
        } catch (err) {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error',
                err
            })
        }
    }
}
