import type { NextApiRequest, NextApiResponse } from 'next'
import About from '../../components/mongodb/aboutModel'
import { connect } from 'mongoose'
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = req.session.user;


    if (!user || user.isLoggedIn === false) {
        res.status(401).end();
        return;
    }
    const newabout = req.query.about
    
    if (process.env.MONGO_DB === undefined) {
        throw new Error('MONGO_DB is undefined')
    }
    await connect(process.env.MONGO_DB)
    try {
        const about = await About.findOneAndUpdate({}, { about: newabout }, { new: true, upsert: true })
        const returndata = await about.save()
        res.status(200).json({
            statusCode: 200,
            message: 'About updated',
            data: returndata
        })
    } catch (err) {
        console.log("☁️about", err)
    }
}


