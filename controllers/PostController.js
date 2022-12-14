import PostModel from '../models/Post.js'

export const getPromo = async (req, res) => {
	try {
		const posts = await PostModel.find()
		

    let promo = []
		for (const one of posts) {
      
      const { title, titleIMG, _id, sets, text} = one
      
      promo = [...promo, { title, titleIMG, _id, sets, text }]
      
      
		}
		

		
		res.json(promo)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить тэги',
		})
	}
}

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec()
		res.json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findOneAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось вернуть статью',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Статья не найдена',
					})
				}

				res.json(doc)
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findOneAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось удалить статью',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'Статья не найдена',
					})
				}

				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить статьи',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			images: req.body.images,
			sets: req.body.sets,
			user: req.userId,
			titleIMG: req.body.titleIMG,
		})

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать статью',
		})
	}
}


