import express from 'express'
import cors from 'cors'

import mongoose from 'mongoose'


import { upload } from './Middleware/upload.js'
import {
	loginValidation,
	registerValidation,
	galleryValidation,
} from './validations.js'


import checkAuth from './Middleware/checkAuth.js'

import { UserController, UploadController, PostController } from './controllers/index.js'

const app = express()
mongoose
	.connect(
		'mongodb+srv://admin:admin@cluster0.svqmubd.mongodb.net/gallery?retryWrites=true&w=majority'
	)
	.then(() => console.log('BD is OK'))
	.catch(err => console.log('BD is ERROR', err))

const PORT = process.env.PORT || 5000

app.use(cors())
app.use('/images', express.static('images'))
app.use(express.json())

app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', loginValidation, UserController.login)

app.post('/create', checkAuth, galleryValidation, PostController.create)

app.post('/multiple', upload.array('images', 10), UploadController.upload)

app.listen(PORT, () => {
	console.log(`App is listening on Port ${PORT}`)
})
