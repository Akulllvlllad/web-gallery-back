import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		sets: {
			type: Number,
			required: true,
		},
		viewsCount: {
			type: Number,
			default: 0,
		},
		// user: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'User',
		// 	required: true,
		// },
		images: {
			type: Array,
			required: true,
		},
		titleIMG: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Post', PostSchema);
