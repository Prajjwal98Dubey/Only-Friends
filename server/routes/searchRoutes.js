import express from 'express'
import { userSearch } from '../controllers/searchControllers.js'

const searchRouter = express.Router()


searchRouter.route('/users').get(userSearch)


export default searchRouter