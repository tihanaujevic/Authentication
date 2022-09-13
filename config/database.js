import 'dotenv/config'

const PORT = process.env.PORT

const password = process.env.ATLAS_PASS
const user = process.env.ATLAS_USER
const dbname = process.env.ATLAS_NAME
const DB_URI = `mongodb+srv://${user}:${password}@cluster0.ntf9m.mongodb.net/${dbname}?retryWrites=true&w=majority`

const SECRET=process.env.SECRET_JWT
export default {PORT, DB_URI, SECRET}