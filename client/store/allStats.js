import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DATE = 'GET_DATE'

/**
 * ACTION CREATORS
 */
const getDate = date => ({
  type: GET_DATE,
  date
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
      console.log('RUNNING checkDate!')
      const res = await axios.post(`/api/allStats/`, {
        HP: 0,
        Energy: 0,
        Wisdom: 0,
        Speed: 0,
        Strength: 0,
        Date: date
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateStatHP = (date, input, allStats) => {
  return async dispatch => {
    try {
      const inputInt = parseInt(input)
      const allStatHPInt = parseInt(allStats.HP)
      await axios.put(`/api/allStats/${date}`, {HP: inputInt + allStatHPInt})
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatEnergy = (date, input, allStats) => {
  return async dispatch => {
    try {
      const inputInt = parseInt(input)
      const allStatEnergyInt = parseInt(allStats.Energy)
      await axios.put(`/api/allStats/${date}`, {
        Energy: inputInt + allStatEnergyInt
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatWisdom = (date, input, allStats) => {
  return async dispatch => {
    try {
      const inputInt = parseInt(input)
      const allStatWisdomInt = parseInt(allStats.Wisdom)
      await axios.put(`/api/allStats/${date}`, {
        Wisdom: inputInt + allStatWisdomInt
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatSpeed = (date, input, allStats) => {
  return async dispatch => {
    try {
      const inputInt = parseInt(input)
      const allStatSpeedInt = parseInt(allStats.Speed)
      await axios.put(`/api/allStats/${date}`, {
        Speed: inputInt + allStatSpeedInt
      })
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateStatStrength = (date, input, allStats) => {
  return async dispatch => {
    try {
      const inputInt = parseInt(input)
      const allStatStrengthInt = parseInt(allStats.Strength)
      await axios.put(`/api/allStats/${date}`, {
        Stregnth: inputInt + allStatStrengthInt
      })
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATE:
      return action.date
    default:
      return state
  }
}
