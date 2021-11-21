const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    serial_number: {type: String, required: true, unique: true},
    type_counter: {type: String, required: true},
    stats: [{ type: Types.ObjectId, ref: 'Stats' }],
    owner: {type: Types.ObjectId, ref: 'User'}

})

module.exports = model('Counter', schema)