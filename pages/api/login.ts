import type { User } from './user'


import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'


async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body

  try {
   
    if (username !== process.env.LOGIN_NAME || password !== process.env.LOGIN_PASSWORD) {
      throw new Error(`Invalid username or password😒`)
    }
    const user = { username, isLoggedIn: true } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)