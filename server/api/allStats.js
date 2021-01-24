const router = require('express').Router()
const {AllStats} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allStats = await AllStats.findAll()
    res.json(allStats)
  } catch (err) {
    next(err)
  }
})
router.get('/:date', async (req, res, next) => {
  try {
    const allStats = await AllStats.findOne({
      where: {
        Date: req.params.date //e.i 2021-01-21
      }
    })
    res.json(allStats)
  } catch (err) {
    next(err)
  }
})

router.post('/:date', async (req, res, next) => {
  try {
    console.log('%%%%%%', req.bodu)
    await AllStats.create(req.body)
  } catch (err) {
    next(err)
  }
})

router.put('/:date', async (req, res, next) => {
  try {
    console.log('Params--->', req.params.date)
    console.log('Body---------->', req.body)
    const updateAllStats = await AllStats.findOne({
      where: {
        Date: req.params.date
      }
    })
    await updateAllStats.update(req.body)
  } catch (err) {
    next(err)
  }
})
