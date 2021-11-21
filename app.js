const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/stats', require('./routes/stats.routes'))
app.use('/api/counter', require('./routes/counter.routes'))

const PORT = config.get('port') || 6000

async function start () {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true //Якщо траб то тут

    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}....`))
  }catch(e){
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
