// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import streamifier from 'streamifier'
import {v2 as cloudinary} from 'cloudinary'

import { connect } from 'mongoose'
import HeroModel from '../../components/mongodb/heroModel'

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

type Image = {
  _id: string,
  name: string,

  width: number,
  height: number,
  url: string
}
type ResponseData = {
  data: Image,
  statusCode: number,
  message: string,
}
type ErrorData = {

  statusCode: number,
  message: string,
  err: any,
}
interface MulterRequest extends NextApiRequest {
  file:{
    buffer: any
  }
}

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("imageFile");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
function runMiddleware(req: NextApiRequest, res: NextApiResponse<ResponseData | ErrorData>, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default withIronSessionApiRoute(handler, sessionOptions);


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorData>
) {
  const user = req.session.user;
  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }
  

  await runMiddleware(req, res, uploadMiddleware);
 
  
  const stream = await cloudinary.uploader.upload_stream(
    {
      folder: "demo",
    },
    (error, result) => {
      if (error) return console.error(error);
      
      const { public_id, width, height,  secure_url }:any = result;
      const  { imageName, oldImageId }= req.body
      
      if (!(oldImageId === "dummy")) {
        cloudinary.uploader.destroy(oldImageId, function (error:any) {
          if (error) {
            res.status(500).json({
              statusCode: 500,
              message: 'Cloudinary Server Error',
              err: error
            })
          }
        })
      }
    updateDB( imageName, width, height, secure_url, public_id,)
      
    }
  );
  streamifier.createReadStream( (req as MulterRequest).file.buffer).pipe(stream);

  

   
    const updateDB = async (name: string, width: number, height: number, url: string, _id: string) => {

    if(process.env.MONGO_DB ) {
       await connect(process.env.MONGO_DB)
    const hero = await HeroModel.findOneAndUpdate({}, { image: { name, width, height, url, _id } }, { new: true, upsert: true })
    const returndata = await hero.save()
    res.status(200).json({
      statusCode: 200,
      message: 'Hero updated',
      data: returndata
    })
  }
  }
    
   
    
    
  




  }
  export const config = {
    api: {
      bodyParser: false,
    },
  };












