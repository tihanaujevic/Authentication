import mongoose from 'mongoose'
import validator from 'mongoose-unique-validator'
const Schema = mongoose.Schema

const KorisnikSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String}
})

KorisnikSchema.plugin(validator)
const Korisnik = mongoose.model('Korisnik', KorisnikSchema)
 
export default Korisnik