const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const UserSchema = new Schema({
//     id: { type: [String], index: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: Schema.Types.ObjectId, ref: "address" }
});

module.exports = mongoose.model('User', UserSchema);