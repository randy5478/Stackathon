import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  checkDate,
  postNewDay,
  statHp,
  statEnergy,
  statWisdom,
  statSpeed,
  statStrength,
  updateStatHP,
  updateStatEnergy,
  updateStatWisdom,
  updateStatSpeed,
  updateStatStrength
} from '../store/allStats'
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryLabel
} from 'victory'

const upToDate = new Date()
const currDate = `${upToDate.getFullYear()}-${upToDate.getMonth() +
  1}-${upToDate.getDate()}`

class AllStats extends Component {
  constructor(props) {
    super(props)
    this.handleSubmitHP = this.handleSubmitHP.bind(this)
    this.handleSubmitEnergy = this.handleSubmitEnergy.bind(this)
    this.handleSubmitWisdom = this.handleSubmitWisdom.bind(this)
    this.handleSubmitSpeed = this.handleSubmitSpeed.bind(this)
    this.handleSubmitStrength = this.handleSubmitStrength.bind(this)
  }

  componentDidMount() {
    this.props.checkDate(currDate)
  }

  handleSubmitHP(evt) {
    evt.preventDefault()
    this.props.updateStatHP(
      currDate,
      evt.target.HP.value,
      this.props.myStats.allStats.date
    )
  }
  handleSubmitEnergy(evt) {
    evt.preventDefault()
    this.props.updateStatEnergy(
      currDate,
      evt.target.energy.value,
      this.props.myStats.allStats.date
    )
  }
  handleSubmitWisdom(evt) {
    evt.preventDefault()
    this.props.updateStatWisdom(
      currDate,
      evt.target.wisdom.value,
      this.props.myStats.allStats.date
    )
  }
  handleSubmitSpeed(evt) {
    evt.preventDefault()
    this.props.updateStatSpeed(
      currDate,
      evt.target.speed.value,
      this.props.myStats.allStats.date
    )
  }
  handleSubmitStrength(evt) {
    evt.preventDefault()
    this.props.updateStatStrength(
      currDate,
      evt.target.strength.value,
      this.props.myStats.allStats.date
    )
  }

  render() {
    const {date} = this.props.myStats.allStats
    const ceil = {hp: 100, energy: 7, wisdom: 60, speed: 30, strength: 45}
    if (this.props.myStats.allStats.date === null) {
      this.props.postNewDay(currDate)
      window.location.reload()
    }
    if (this.props.myStats.allStats.date === null) {
      return <div>Loading your Stats</div>
    }
    return (
      <div>
        <div>
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            domain={{y: [0, 1]}}
          >
            <VictoryGroup
              colorScale={['red']}
              style={{data: {fillOpacity: 0.2, strokeWidth: 2}}}
            >
              <VictoryArea
                data={[
                  {x: 'hp', y: date.RatioHP / 100},
                  {x: 'energy', y: date.RatioEnergy / 7},
                  {x: 'wisdom', y: date.RatioWisdom / 60},
                  {x: 'speed', y: date.RatioSpeed / 30},
                  {x: 'strength', y: date.RatioStrength / 45}
                ]}
              />
            </VictoryGroup>
            {Object.keys(ceil).map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  style={{
                    axisLabel: {padding: 20},
                    axis: {stroke: 'none'},
                    grid: {stroke: 'grey', strokeWidth: 0.25, opacity: 0.5}
                  }}
                  tickLabelComponent={
                    <VictoryLabel labelPlacement="vertical" />
                  }
                  labelPlacement="perpendicular"
                  axisValue={i + 1}
                  label={key}
                  tickFormat={t => Math.ceil(t * ceil[key])}
                  tickValues={[0.25, 0.5, 0.75, 1]}
                />
              )
            })}
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={() => ''}
              style={{
                axis: {stroke: 'none'},
                grid: {stroke: 'grey', opacity: 0.5}
              }}
            />
          </VictoryChart>
        </div>
        <div>
          <form onSubmit={this.handleSubmitEnergy}>
            <label htmlFor="energy">
              <small>Energy</small>
            </label>
            <input name="energy" type="text" />
            <button>Power Up</button>
          </form>
          <form onSubmit={this.handleSubmitHP}>
            <label htmlFor="HP">
              <small>HP</small>
            </label>
            <input name="HP" type="text" />
            <button>Power Up</button>
          </form>
          <form onSubmit={this.handleSubmitWisdom}>
            <label htmlFor="wisdom">
              <small>Wisdom</small>
            </label>
            <input name="wisdom" type="text" />
            <button>Power Up</button>
          </form>
          <form onSubmit={this.handleSubmitSpeed}>
            <label htmlFor="speed">
              <small>Speed</small>
            </label>
            <input name="speed" type="text" />
            <button>Power Up</button>
          </form>
          <form onSubmit={this.handleSubmitStrength}>
            <label htmlFor="strength">
              <small>Strength</small>
            </label>
            <input name="strength" type="text" />
            <button>Power Up</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    myStats: state
  }
}

const mapDispatch = dispatch => {
  return {
    checkDate(date) {
      dispatch(checkDate(date))
    },
    postNewDay(date) {
      dispatch(postNewDay(date))
    },
    statHp(value) {
      dispatch(statHp(value))
    },
    statEnergy(value) {
      dispatch(statEnergy(value))
    },
    statWisdom(value) {
      dispatch(statWisdom(value))
    },
    statSpeed(value) {
      dispatch(statSpeed(value))
    },
    statStrength(value) {
      dispatch(statStrength(value))
    },
    updateStatHP(date, input, allStats) {
      dispatch(updateStatHP(date, input, allStats))
    },
    updateStatEnergy(date, input, allStats) {
      dispatch(updateStatEnergy(date, input, allStats))
    },
    updateStatWisdom(date, input, allStats) {
      dispatch(updateStatWisdom(date, input, allStats))
    },
    updateStatSpeed(date, input, allStats) {
      dispatch(updateStatSpeed(date, input, allStats))
    },
    updateStatStrength(date, input, allStats) {
      dispatch(updateStatStrength(date, input, allStats))
    }
  }
}

export default connect(mapState, mapDispatch)(AllStats)
