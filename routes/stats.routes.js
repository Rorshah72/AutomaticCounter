const {Router} = require('express')
const Stats = require('../models/Stats')
const config = require('config')
const router = Router()
const auth = require('../middleware/auth.middleware')

router.post('/generate', auth, async  (req, res) => {
    try{

        const {indicator, counterId}= req.body


       /*
        �������� � ����� ����� �������� ���������

        const existing = await Stats.findOne({indicator})

        if(existing){
            return res.status(400).json({message:'This indicator is existing!'})
        }
        */
        const stats = new Stats({
            indicator, counter: counterId, owner: req.user.userId
        })

        await stats.save()

        res.status(201).json({stats})

    }catch (e) {
        res.status(500).json({ message: 'Сталась помилка, попробуйте ще раз'})
    }
})

router.get('/', auth, async (req, res) => {
    try{
        const stats = await  Stats.find({ owner: req.user.userId })
        res.json(stats)

    }catch (e) {
        res.status(500).json({ message: 'Сталась помилка, попробуйте ще раз'})
    }
})


//�������� �� ���������� �����������
router.get('/:id',auth, async  (req, res) => {
    try{
        const stats = await  Stats.find({counter: req.params.id})  // ?      
        res.json(stats)
    }catch (e) {
        res.status(500).json({ message: 'Сталась помилка, попробуйте ще раз'})
    }
})

module.exports = router
