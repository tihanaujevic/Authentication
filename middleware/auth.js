import jwt from "jsonwebtoken"
import config from '../config/database.js'

const provjeriToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.get("Authorization")

  if (!token) {
    return res.status(403).send("Potreban je token za autentikaciju")
  }
  try {
    const dekodiran = jwt.verify(token, config.SECRET)
    req.user = dekodiran
  } catch (err) {
    return res.status(401).send("Neispravan Token")
  }
  return next()
};

export default provjeriToken