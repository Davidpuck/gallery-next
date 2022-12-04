import  { Schema, model, models } from 'mongoose'

const aboutSchema = new Schema({
    about: String,
})
export default models?.['About'] || model('About', aboutSchema)