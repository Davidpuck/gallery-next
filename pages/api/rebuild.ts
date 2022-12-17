// rebuild vercel from api

import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = req.session.user;

    if (!user || user.isLoggedIn === false) {
        res.status(401).end();
        return;
    }
   
    try {
       const reply = await fetch(process.env.DEPLOY || "")
         const data = await reply.json()
            console.log("☁️rebuild", data)
    } catch (err) {
        console.log("😒rebuild", err)
    }
}

