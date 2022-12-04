import { Schema, model, models } from 'mongoose'

    const imageSchema = new Schema({
        image: {
        _id: String,
        name: String,       
        image: String,
        url: String,
        height: Number,
        width: Number
        }
    })
    export default models?.['Hero'] || model('Hero', imageSchema)