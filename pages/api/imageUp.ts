// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { v2 as cloudinary } from 'cloudinary'


import { connect } from 'mongoose'
import ImageModel from '../../components/mongodb/imageModel'
import GalleryList from '../../components/mongodb/galleryList'

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import multer from 'multer'
import streamifier from 'streamifier'


type Data = {
  images: Image,
  galleries: {
    _id: any,
    name: string,
    images: [string]

  }
}
type Image = {
  _id: string,
  name: string,
  text: string,
  width: number,
  height: number,
  url: string
}
type ResponseData = {
  data: Data | Image,
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
export const config = {
  api: {
    bodyParser: false,
  },
}

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("imageFile");

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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorData>
) {
  const user = req.session.user
  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }
  await runMiddleware(req, res, uploadMiddleware);

  if (req.method === 'POST') {     

    const stream = await cloudinary.uploader.upload_stream(
      {
        folder: "demo",
      },
      (error, result) => {
        if (error) return console.error(error);
        
        const { public_id, width, height,  secure_url }:any = result;
        const  { imageName, imageText, galleryId }= req.body
       
       
       
      updateDB(  width, height, secure_url, public_id, imageName, galleryId, imageText)
        
      }
    );
    streamifier.createReadStream( (req as MulterRequest).file.buffer).pipe(stream);
  
        
       async function updateDB(width: number, height: number, url: string, _id: string, name: string, galleryId: string, text: string) {
         
         
          // const { imageName: name, imageText: text, galleryId } = fields
          if (process.env.MONGO_DB === undefined) {
            throw new Error('MONGO_DB is undefined')
          }
          await connect(process.env.MONGO_DB)

          const image = new ImageModel({
            _id,
            name,
            text,
            width,
            height,
            url
          })
          await image.save()


          const galleryList = await GalleryList.findOneAndUpdate({
            list: {

              $elemMatch: {
                name: galleryId
              }
            }
          }, {
            $push: {
              'list.$.images': {
                _id
              }
            }
          }, { new: true })
          const galist = await galleryList.save()



          res.status(200).json({
            statusCode: 200,
            message: 'Image Uploaded Successfully',
            data: {
              images: {
                _id,
                name,
                text,
                width,
                height,
                url
              },
              galleries: galist.list
            }
          })
        }


      
   
  } else if (req.method === 'DELETE') {
    const { id, gallery } = req.query
    if (id === undefined || id === null || Array.isArray(id)) {
      res.status(400).json({
        statusCode: 400,
        message: 'Bad Request',
        err: 'id is undefined'
      })
    } else {
      
      cloudinary.uploader.destroy(id, function (error) {
        if (error) {
          res.status(500).json({
            statusCode: 500,
            message: 'Cloudinary Server Error',
            err: error
          })
        }
      });
      if (process.env.MONGO_DB === undefined) {
        throw new Error('MONGO_DB is undefined')
      }
      await connect(process.env.MONGO_DB);
      const image = await ImageModel.findByIdAndDelete(id)

      const galleryList = await GalleryList.findOneAndUpdate({
        list: {

          $elemMatch: {
            name: gallery
          }
        }
      }, {
        $pull: {
          'list.$.images': id

        }
      }, { new: true })
      const galist = await galleryList.save()





      res.status(200).json({
        statusCode: 200,
        message: 'Image Deleted Successfully',
        data: {
          images: {
            _id: image._id,
            name: image.name,
            text: image.text,
            width: image.width,
            height: image.height,
            url: image.url
          },
          galleries: galist.list
        }
      })
    }
  } else if (req.method === 'PUT') {




    

    const { imageId, imageName, imageText } = req.body
    

    if (imageId === undefined || imageId === null || Array.isArray(imageId)) {
      res.status(400).json({
        statusCode: 400,
        message: 'Bad Request',
        err: 'id is undefined'
      })
    } else {
      if (process.env.MONGO_DB === undefined) {
        throw new Error('MONGO_DB is undefined')
      }
      await connect(process.env.MONGO_DB);
      const image = await ImageModel.findByIdAndUpdate(imageId, {
        name: imageName,
        text: imageText
      },{ new: true })


      res.status(200).json({
        statusCode: 200,
        message: 'Image Updated Successfully',
        data: {

          _id: image._id,
          name: image.name,
          text: image.text,
          width: image.width,
          height: image.height,
          url: image.url

        }
      })
    }


  }





}