import { Schema, model, models } from 'mongoose'

const gallerySchema = new Schema({
    list: [
        {
            name: String,
            images: [String]
        }
    ]
})
export default models?.['GalleryList'] || model('GalleryList', gallerySchema)
