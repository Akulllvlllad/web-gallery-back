

export const upload = (req, res) => {
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
}
