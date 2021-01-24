import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DATE = 'GET_DATE'
const STAT_HP = 'STAT_HP'
const STAT_ENERGY = 'STAT_ENERGY'
const STAT_WISDOM = 'STAT_WISDOM'
const STAT_SPEED = 'STAT_SPEED'
const STAT_STRENGTH = 'STAT_STRENGTH'

/**
 * ACTION CREATORS
 */
export const getDate = date => ({
  type: GET_DATE,
  date
})
export const statHp = value => ({
  type: STAT_HP,
  value
})
export const statEnergy = value => ({
  type: STAT_ENERGY,
  value
})
export const statWisdom = value => ({
  type: STAT_WISDOM,
  value
})
export const statSpeed = value => ({
  type: STAT_SPEED,
  value
})
export const statStrength = value => ({
  type: STAT_STRENGTH,
  value
})

/**
 * THUNK CREATORS
 */
export const checkDate = date => {
  return async dispatch => {
    try {
      console.log('RUNNING checkDate!')
      const res = await axios.get(`/api/allStats/${date}`)
      dispatch(getDate(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const postNewDay = date => {
  return async dispatch => {
    try {
      console.log('RUNNING POSTDate!')
      const res = await axios.post(`/api/allStats/${date}`, {Date: date})
      dispatch(getDate(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateStatHP = (date, input, allStats) => {
  return async dispatch => {
    try {
      dispatch(statHp(input))
      let HPRVal
      const inputInt = parseInt(input)
      const allStatHPInt = parseInt(allStats.HP)
      if (inputInt + allStatHPInt > 100) {
        HPRVal = 100
      } else {
        HPRVal = inputInt + allStatHPInt
      }
      await axios.put(`/api/allStats/${date}`, {
        HP: inputInt + allStatHPInt,
        RatioHP: HPRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatEnergy = (date, input, allStats) => {
  return async dispatch => {
    try {
      dispatch(statEnergy(input))
      let EnergyRVal
      const inputInt = parseInt(input)
      if (inputInt > 15) {
        EnergyRVal = 0
      } else if (inputInt > 9) {
        EnergyRVal = 7 - (inputInt - 9)
      } else if (inputInt === 7 || inputInt === 8 || inputInt === 9) {
        EnergyRVal = 7
      } else {
        EnergyRVal = inputInt
      }
      await axios.put(`/api/allStats/${date}`, {
        Energy: inputInt,
        RatioEnergy: EnergyRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatWisdom = (date, input, allStats) => {
  return async dispatch => {
    try {
      dispatch(statWisdom(input))
      let WisdomRVal
      const inputInt = parseInt(input)
      const allStatWisdomInt = parseInt(allStats.Wisdom)
      if (inputInt + allStatWisdomInt > 60) {
        WisdomRVal = 60
      } else {
        WisdomRVal = inputInt + allStatWisdomInt
      }
      await axios.put(`/api/allStats/${date}`, {
        Wisdom: inputInt + allStatWisdomInt,
        RatioWisdom: WisdomRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatSpeed = (date, input, allStats) => {
  return async dispatch => {
    try {
      dispatch(statSpeed(input))
      let SpeedRVal
      const inputInt = parseInt(input)
      const allStatSpeedInt = parseInt(allStats.Speed)
      if (inputInt + allStatSpeedInt > 30) {
        SpeedRVal = 30
      } else {
        SpeedRVal = inputInt + allStatSpeedInt
      }
      await axios.put(`/api/allStats/${date}`, {
        Speed: inputInt + allStatSpeedInt,
        RatioSpeed: SpeedRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatStrength = (date, input, allStats) => {
  return async dispatch => {
    try {
      dispatch(statStrength(input))
      let StrengthRVal
      const inputInt = parseInt(input)
      const allStatStrengthInt = parseInt(allStats.Strength)
      if (inputInt + allStatStrengthInt > 45) {
        StrengthRVal = 45
      } else {
        StrengthRVal = inputInt + allStatStrengthInt
      }
      await axios.put(`/api/allStats/${date}`, {
        Strength: inputInt + allStatStrengthInt,
        RatioStrength: StrengthRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  date: {},
  statRatio: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATE:
      return {...state, date: action.date}
    case STAT_HP:
      let updateHPR
      let valHpInt = parseInt(action.value)
      let dateHpInt = parseInt(state.date.HP)
      let updateHP = valHpInt + dateHpInt
      updateHP > 100 ? (updateHPR = 100) : (updateHPR = updateHP)
      return {...state, date: {...state.date, HP: updateHP, RatioHP: updateHPR}}
    case STAT_ENERGY:
      let updateEnergyR
      let valEnergyInt = parseInt(action.value)
      console.log('!!!!!!!!!', valEnergyInt > 15)
      if (valEnergyInt > 15) {
        updateEnergyR = 0
      } else if (valEnergyInt > 9) {
        updateEnergyR = 7 - (valEnergyInt - 9)
      } else if (
        valEnergyInt === 7 ||
        valEnergyInt === 8 ||
        valEnergyInt === 9
      ) {
        updateEnergyR = 7
      } else {
        updateEnergyR = valEnergyInt
      }
      return {
        ...state,
        date: {...state.date, Energy: valEnergyInt, RatioEnergy: updateEnergyR}
      }
    case STAT_WISDOM:
      let updateWisdomR
      let valWisdomInt = parseInt(action.value)
      let dateWisdomInt = parseInt(state.date.Wisdom)
      let updateWisdom = valWisdomInt + dateWisdomInt
      updateWisdom > 60 ? (updateWisdomR = 60) : (updateWisdomR = updateWisdom)
      return {
        ...state,
        date: {...state.date, Wisdom: updateWisdom, RatioWisdom: updateWisdomR}
      }
    case STAT_SPEED:
      let updateSpeedR
      let valSpeedInt = parseInt(action.value)
      let dateSpeedInt = parseInt(state.date.Speed)
      let updateSpeed = valSpeedInt + dateSpeedInt
      updateSpeed > 30 ? (updateSpeedR = 30) : (updateSpeedR = updateSpeed)
      return {
        ...state,
        date: {...state.date, Speed: updateSpeed, RatioSpeed: updateSpeedR}
      }
    case STAT_STRENGTH:
      let updateStrengthR
      let valStrengthInt = parseInt(action.value)
      let dateStrengthInt = parseInt(state.date.Strength)
      let updateStrength = valStrengthInt + dateStrengthInt
      updateStrength > 45
        ? (updateStrengthR = 45)
        : (updateStrengthR = updateStrength)
      return {
        ...state,
        date: {
          ...state.date,
          Strength: updateStrength,
          RatioStrength: updateStrengthR
        }
      }
    default:
      return state
  }
}
