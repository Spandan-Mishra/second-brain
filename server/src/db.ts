import mongoose, { model, Schema } from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
})

const contentSchema = new Schema({
  link: String,
  title: String,
  type: { type: String, enum: ['twitter', 'youtube'], required: true },
  tags: [{ type: ObjectId, ref: 'Tag' }],
  userId: { type: ObjectId, ref: 'User', required: true }
})

const tagsSchema = new Schema({
  title: { type: String, required: true }
})

const linkSchema = new Schema({
  hash: String,
  userId: { type: ObjectId, ref: 'User', required: 'true', unique: 'true' }
})

export const UserModel = model("User", userSchema);
export const ContentModel = model("Content", contentSchema);
export const TagsModel = model("Tags", tagsSchema);
export const LinkModel = model("Link", linkSchema);
