const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: {type: Number, default: 0},
    stats: [{ type: Types.ObjectId, ref: 'Stats' }],
    counters: [{type: Types.ObjectId, ref: 'Counter'}]
})

module.exports = model('User', schema)
