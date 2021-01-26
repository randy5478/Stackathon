import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  checkDate,
  fetchOtherDay,
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
const yesterday = new Date(upToDate)
yesterday.setDate(yesterday.getDate() - 1)
const currDate = upToDate.toDateString()
const yestDate = yesterday.toDateString()

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
    this.props.fetchOtherDay(yestDate, 2)
    this.props.checkDate(currDate)
  }

  handleSubmitHP(evt) {
    evt.preventDefault()
    this.props.updateStatHP(
      currDate,
      parseInt(evt.target.HP.value),
      parseInt(this.props.myStats.allStats.date.HP)
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
      parseInt(evt.target.wisdom.value),
      parseInt(this.props.myStats.allStats.date.Wisdom)
    )
  }
  handleSubmitSpeed(evt) {
    evt.preventDefault()
    this.props.updateStatSpeed(
      currDate,
      parseInt(evt.target.speed.value),
      parseInt(this.props.myStats.allStats.date.Speed)
    )
  }
  handleSubmitStrength(evt) {
    evt.preventDefault()
    this.props.updateStatStrength(
      currDate,
      parseInt(evt.target.strength.value),
      parseInt(this.props.myStats.allStats.date.Strength)
    )
  }

  render() {
    const {date, yesterdayDate} = this.props.myStats.allStats
    const ceil = {HP: 100, Energy: 7, Wisdom: 60, Speed: 30, Strength: 45}
    if (this.props.myStats.allStats.date === null) {
      this.props.postNewDay(currDate)
      window.location.reload()
    }
    // const loaded = Object.keys(date).length > 0
    if (this.props.myStats.allStats.date === null) {
      return <div>Loading your Stats</div>
    }
    return (
      <div>
        <div className="allStatsChartContainer">
          <VictoryChart
            className="allStatsChart"
            polar
            animate={{duration: 1000}}
            theme={VictoryTheme.material}
            domain={{y: [0, 1]}}
          >
            <VictoryGroup
              colorScale={['#eb2d56', 'lightBlue']}
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
              <VictoryArea
                data={[
                  {x: 'hp', y: yesterdayDate.RatioHP / 100},
                  {x: 'energy', y: yesterdayDate.RatioEnergy / 7},
                  {x: 'wisdom', y: yesterdayDate.RatioWisdom / 60},
                  {x: 'speed', y: yesterdayDate.RatioSpeed / 30},
                  {x: 'strength', y: yesterdayDate.RatioStrength / 45}
                ]}
              />
            </VictoryGroup>
            {Object.keys(ceil).map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  style={{
                    axisLabel: {padding: 30},
                    axis: {stroke: 'none'},
                    grid: {stroke: 'grey', strokeWidth: 0.25, opacity: 0.5}
                  }}
                  tickLabelComponent={
                    <VictoryLabel
                      text="Today:Red  Yesterday:Blue"
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={320}
                      y={10}
                      style={{fontSize: 9}}
                      labelPlacement="vertical"
                    />
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
        <div className="allStatsButtonTop">
          <form onSubmit={this.handleSubmitEnergy} className="EnergyBtn">
            <label htmlFor="energy">
              <medium>Energy</medium>
            </label>
            <input
              className="allStatsButtonInput"
              name="energy"
              placeholder="Hours"
              type="text"
            />
            <button className="allStatsClickButton BtnEnergy">Power Up</button>
          </form>
          <form onSubmit={this.handleSubmitWisdom} className="WisdomBtn">
            <label htmlFor="wisdom">
              <medium>Wisdom</medium>
            </label>
            <input
              className="allStatsButtonInput"
              name="wisdom"
              placeholder="Minutes"
              type="text"
            />
            <button className="allStatsClickButton BtnWisdom">Power Up</button>
          </form>
        </div>
        <div className="allStatsButtonMiddle">
          <form onSubmit={this.handleSubmitHP} className="HPBtn">
            <label htmlFor="HP">
              <medium>HP</medium>
            </label>
            <input
              className="allStatsButtonInput"
              name="HP"
              placeholder="Ounces"
              type="text"
            />
            <button className="allStatsClickButton BtnHP">Power Up</button>
          </form>
        </div>
        <div className="allStatsButtonBottom">
          <form onSubmit={this.handleSubmitStrength} className="StrengthBtn">
            <label htmlFor="strength">
              <medium>Strength</medium>
            </label>
            <input
              className="allStatsButtonInput"
              name="strength"
              placeholder="Minutes"
              type="text"
            />
            <button className="allStatsClickButton BtnStrength">
              Power Up
            </button>
          </form>
          <form onSubmit={this.handleSubmitSpeed} className="SpeedBtn">
            <label htmlFor="speed">
              <medium>Speed</medium>
            </label>
            <input
              className="allStatsButtonInput"
              name="speed"
              placeholder="Minutes"
              type="text"
            />
            <button className="allStatsClickButton BtnSpeed">Power Up</button>
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
    fetchOtherDay(date, value) {
      dispatch(fetchOtherDay(date, value))
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
