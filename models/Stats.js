const {Schema, model, Types} = require('mongoose')

const schema = new Schema({   
   indicator: {type: String, required: true},
   date: {type: Date, default: Date.now()},   
   owner: {type: Types.ObjectId, ref: 'User'},
   counter: {type: Types.ObjectId, ref: 'Counter'}
})

module.exports = model('Stats', schema)