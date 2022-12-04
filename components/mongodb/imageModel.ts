import { Schema, model, models } from 'mongoose'

    const imageSchema = new Schema({
        _id: String,
        name: String,
        text: String,
        image: String,
        url: String,
        height: Number,
        width: Number
    })
    export default models?.['Frame'] || model('Frame', imageSchema)
    
