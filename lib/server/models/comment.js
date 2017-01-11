import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  date: {
    type: String,
    required: true,
    default: new Date()
  },
  text: {
    type: String,
    required: true
  }
});

export default mongoose.model('Comment', commentSchema);
