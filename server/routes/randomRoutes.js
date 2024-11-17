import express from 'express'
import { authMiddleWare } from '../middlewares/authMiddleware.js'
import { generateRandomPeople } from '../controllers/randomControllers.js'

const randomRouter = express.Router()


randomRouter.route('/r').get(authMiddleWare,generateRandomPeople)

export default randomRouter