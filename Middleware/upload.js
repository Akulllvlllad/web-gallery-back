import multer from 'multer'
import fs from 'fs'
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		 if (!fs.existsSync('images')) {
				fs.mkdirSync('images')
			}
		cb(null, './images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '--' + file.originalname)
	},
})

export const upload = multer({ storage })
