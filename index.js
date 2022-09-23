const express = require('express')
const multer = require('multer')

const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use('/images', express.static('images'))
app.use(express.json())


const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 Bytes'
	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '--' + file.originalname)
	},
})

const upload = multer({ storage })

app.post('/single', upload.single('image'), (req, res) => {
	console.log(req.file.path)
	res.send('OK')
})

app.post('/multiple', upload.array('images', 10), (req, res) => {
	const files = req.files
	let paths = []

	files.map((file, index) =>
		paths.push({
			_id: index,
			name: file.filename,
			path: `/${file.path}`,
			size: formatBytes(file.size),
		})
	)

	res.status(200).json({
		status: 'success',
		message: 'Файл успешно загружен',
		data: paths,
	})
})

app.listen(PORT, () => {
	console.log(`App is listening on Port ${PORT}`)
})
