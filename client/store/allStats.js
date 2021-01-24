import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DATE = 'GET_DATE'
const GET_YESTERDAY = 'GET_YESTERDAY'
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
export const getYesterday = date => ({
  type: GET_YESTERDAY,
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
export const fetchYesterday = date => {
  return async dispatch => {
    try {
      console.log('RUNNING getYesterday!')
      const res = await axios.get(`/api/allStats/${date}`)
      dispatch(getYesterday(res.data))
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

export const updateStatHP = (date, input, dbStat) => {
  return async dispatch => {
    try {
      dispatch(statHp(input))
      let HPRVal
      input + dbStat > 100 ? (HPRVal = 100) : (HPRVal = input + dbStat)
      await axios.put(`/api/allStats/${date}`, {
        HP: input + dbStat,
        RatioHP: HPRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatEnergy = (date, input, dbStat) => {
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
export const updateStatWisdom = (date, input, dbStat) => {
  return async dispatch => {
    try {
      dispatch(statWisdom(input))
      let WisdomRVal
      input + dbStat > 60 ? (WisdomRVal = 60) : (WisdomRVal = input + dbStat)
      await axios.put(`/api/allStats/${date}`, {
        Wisdom: input + dbStat,
        RatioWisdom: WisdomRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatSpeed = (date, input, dbStat) => {
  return async dispatch => {
    try {
      dispatch(statSpeed(input))
      let SpeedRVal
      input + dbStat > 30 ? (SpeedRVal = 30) : (SpeedRVal = input + dbStat)
      await axios.put(`/api/allStats/${date}`, {
        Speed: input + dbStat,
        RatioSpeed: SpeedRVal
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatStrength = (date, input, dbStat) => {
  return async dispatch => {
    try {
      dispatch(statStrength(input))
      let StrengthRVal
      input + dbStat > 45
        ? (StrengthRVal = 45)
        : (StrengthRVal = input + dbStat)
      await axios.put(`/api/allStats/${date}`, {
        Strength: input + dbStat,
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
  yesterdayDate: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATE:
      return {...state, date: action.date}
    case GET_YESTERDAY:
      return {...state, yesterdayDate: action.date}
    case STAT_HP:
      let updateHP = action.value + state.date.HP
      let updateHPR
      updateHP > 100 ? (updateHPR = 100) : (updateHPR = updateHP)
      return {...state, date: {...state.date, HP: updateHP, RatioHP: updateHPR}}
    case STAT_ENERGY:
      let valEnergyInt = parseInt(action.value)
      let updateEnergyR
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
      let updateWisdom = action.value + state.date.Wisdom
      let updateWisdomR
      updateWisdom > 60 ? (updateWisdomR = 60) : (updateWisdomR = updateWisdom)
      return {
        ...state,
        date: {...state.date, Wisdom: updateWisdom, RatioWisdom: updateWisdomR}
      }
    case STAT_SPEED:
      let updateSpeed = action.value + state.date.Speed
      let updateSpeedR
      updateSpeed > 30 ? (updateSpeedR = 30) : (updateSpeedR = updateSpeed)
      return {
        ...state,
        date: {...state.date, Speed: updateSpeed, RatioSpeed: updateSpeedR}
      }
    case STAT_STRENGTH:
      let updateStrength = action.value + state.date.Strength
      let updateStrengthR
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
