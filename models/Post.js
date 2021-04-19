const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    type: { type: String, enum: ['public', 'private'], default: 'public' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory',
      required: true
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
