const {Router} = require('express')
const Counter = require('../models/Counter')
const config = require('config')
const router = Router()
const auth = require('../middleware/auth.middleware')

router.post('/generate', auth, async  (req, res) => {
    try{

        const {serial_number,type_counter}= req.body


        const existing = await Counter.findOne({serial_number})

        if(existing){

            return res.status(400).json({message:'This counter is existing!'})
        }

        const counter = new Counter({
            serial_number, type_counter, owner: req.user.userId
        })

        await counter.save()

        res.status(201).json({counter})

    }catch (e) {
        res.status(500).json({ message: 'Сталась помилка, попробуйте щераз!'})
    }
})

router.get('/', auth, async (req, res) => {
    try{
        const counters = await  Counter.find({ owner: req.user.userId })          
        res.json(counters)

    }catch (e) {
        res.status(500).json({ message: 'Сталась помилка, попробуйте щераз!!'})
    }
})


//�������� �� ���������� �����������
router.get('/:id',auth, async  (req, res) => {
    try{
        const counter = await  Counter.findById(req.params.id)  // ?
        res.json(counter)
    }catch (e) {
        res.status(500).json({ message: 'Сталась помилка, попробуйте щераз'})
    }
})

module.exports = router
