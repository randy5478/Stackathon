const router = require('express').Router()
const {IndivStat} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const indivStat = await IndivStat.findAll()
    res.json(indivStat)
  } catch (err) {
    next(err)
  }
})
router.get('/:name', async (req, res, next) => {
  try {
    const indivStat = await IndivStat.findOne({
      where: {
        Name: req.params.name
      }
    })
    res.json(indivStat)
  } catch (err) {
    next(err)
  }
})
