import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  checkDate,
  postNewDay,
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

const characterData = [{hp: 7, energy: 6, wisdom: 0.5, speed: 15, strength: 20}]
const testdata = [
  {x: 'hp', y: 0.7},
  {x: 'energy', y: 0.75},
  {x: 'wisdom', y: 0.25},
  {x: 'speed', y: 0.5},
  {x: 'strength', y: 0.33}
]
const ciel = {hp: 10, energy: 8, wisdom: 2, speed: 30, strength: 30}
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
      this.props.date.allStats
    )
  }
  handleSubmitEnergy(evt) {
    evt.preventDefault()
    this.props.updateStatEnergy(
      currDate,
      evt.target.energy.value,
      this.props.date.allStats
    )
  }
  handleSubmitWisdom(evt) {
    evt.preventDefault()
    this.props.updateStatWisdom(
      currDate,
      evt.target.wisdom.value,
      this.props.date.allStats
    )
  }
  handleSubmitSpeed(evt) {
    evt.preventDefault()
    this.props.updateStatSpeed(
      currDate,
      evt.target.speed.value,
      this.props.date.allStats
    )
  }
  handleSubmitStrength(evt) {
    evt.preventDefault()
    this.props.updateStatStrength(
      currDate,
      evt.target.strength.value,
      this.props.date.allStats
    )
  }

  render() {
    console.log('STATE!:', this.props)
    if (this.props.date.allStats === null) {
      this.props.postNewDay(currDate)
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
              <VictoryArea data={testdata} />
            </VictoryGroup>
            {Object.keys(ciel).map((key, i) => {
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
                  tickFormat={t => Math.ceil(t * ciel[key])}
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
          <form onSubmit={this.handleSubmitHP}>
            <label htmlFor="HP">
              <small>HP</small>
            </label>
            <input name="HP" type="text" />
            <button>Power Up</button>
          </form>
          <form onSubmit={this.handleSubmitEnergy}>
            <label htmlFor="energy">
              <small>Energy</small>
            </label>
            <input name="energy" type="text" />
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
    date: state
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

{
  /* <div>
  <label htmlFor="HP">
    <small>HP</small>
  </label>
    <button
        type="button"
        onClick={() => {
        }}
      >
        -
      </button>
      <input name="HP" type="text" />
      <button
        type="button"
        onClick={() => {
        }}
      >
        +
      </button>
</div> */
}
