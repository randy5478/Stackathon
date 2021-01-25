import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  checkDate,
  fetchOtherDay,
  fetchDescription,
  updateStatHP,
  updateStatEnergy,
  updateStatWisdom,
  updateStatSpeed,
  updateStatStrength
} from '../store/allStats'
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryLabel,
  VictoryPie,
  VictoryAnimation
} from 'victory'

const upToDate = new Date()
const yesterday = new Date(upToDate)
const threeDay = new Date(upToDate)
const fourDay = new Date(upToDate)
const fiveDay = new Date(upToDate)
const sixDay = new Date(upToDate)
const sevenDay = new Date(upToDate)
yesterday.setDate(yesterday.getDate() - 1)
threeDay.setDate(threeDay.getDate() - 2)
fourDay.setDate(fourDay.getDate() - 3)
fiveDay.setDate(fiveDay.getDate() - 4)
sixDay.setDate(sixDay.getDate() - 5)
sevenDay.setDate(sevenDay.getDate() - 6)

const currDate = upToDate.toDateString()
const yestDate = yesterday.toDateString()
const threeDays = threeDay.toDateString()
const fourDays = fourDay.toDateString()
const fiveDays = fiveDay.toDateString()
const sixDays = sixDay.toDateString()
const sevenDays = sevenDay.toDateString()

class IndivStat extends Component {
  componentDidMount() {
    this.props.fetchDescription(this.props.match.params.stat)
    this.props.checkDate(currDate)
    this.props.fetchOtherDay(yestDate, 2)
    this.props.fetchOtherDay(threeDays, 3)
    this.props.fetchOtherDay(fourDays, 4)
    this.props.fetchOtherDay(fiveDays, 5)
    this.props.fetchOtherDay(sixDays, 6)
    this.props.fetchOtherDay(sevenDays, 7)
  }

  render() {
    const {
      date,
      yesterdayDate,
      threeDate,
      fourDate,
      fiveDate,
      sixDate,
      sevenDate,
      description
    } = this.props.myStats.allStats
    const ceil = {HP: 100, Energy: 7, Wisdom: 60, Speed: 30, Strength: 45}
    console.log('---->', typeof date[`Ratio${this.props.match.params.stat}`])
    console.log('====>', typeof ceil[this.props.match.params.stat])
    const loaded = Object.keys(sevenDate).length > 0
    if (loaded === false) {
      return <div>Loading your Stats</div>
    }
    return (
      <div>
        <h1>My {this.props.match.params.stat} Stat</h1>
        <div>
          <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={<VictoryVoronoiContainer />}
            domainPadding={{x: 0, y: 0}}
          >
            <VictoryLine
              style={{
                data: {stroke: 'red'}
              }}
              labels={({datum}) => `y: ${datum.y}`}
              labelComponent={<VictoryTooltip style={{fontSize: 10}} />}
              data={[
                {
                  x: sevenDate.Date.slice(4, 11),
                  y: sevenDate[this.props.match.params.stat]
                },
                {
                  x: sixDate.Date.slice(4, 11),
                  y: sixDate[this.props.match.params.stat]
                },
                {
                  x: fiveDate.Date.slice(4, 11),
                  y: fiveDate[this.props.match.params.stat]
                },
                {
                  x: fourDate.Date.slice(4, 11),
                  y: fourDate[this.props.match.params.stat]
                },
                {
                  x: threeDate.Date.slice(4, 11),
                  y: threeDate[this.props.match.params.stat]
                },
                {
                  x: yesterdayDate.Date.slice(4, 11),
                  y: yesterdayDate[this.props.match.params.stat]
                },
                {x: 'Today', y: date[this.props.match.params.stat]}
              ]}
            />
            <VictoryScatter
              data={[
                {x: 1, y: sevenDate[this.props.match.params.stat]},
                {x: 2, y: sixDate[this.props.match.params.stat]},
                {x: 3, y: fiveDate[this.props.match.params.stat]},
                {x: 4, y: fourDate[this.props.match.params.stat]},
                {x: 5, y: threeDate[this.props.match.params.stat]},
                {x: 6, y: yesterdayDate[this.props.match.params.stat]},
                {x: 7, y: date[this.props.match.params.stat]}
              ]}
              size={({active}) => (active ? 9 : 4)}
            />
          </VictoryChart>
        </div>
        <div>
          <h3>Today's {this.props.match.params.stat} Level</h3>
          <svg viewBox="0 0 400 400" width="100%" height="100%">
            <VictoryPie
              standalone={false}
              animate={{duration: 1000}}
              width={400}
              height={400}
              data={[
                {
                  x: 1,
                  y:
                    date[`Ratio${this.props.match.params.stat}`] /
                    ceil[this.props.match.params.stat] *
                    100
                },
                {
                  x: 2,
                  y:
                    date[`Ratio${this.props.match.params.stat}`] /
                    (100 - ceil[this.props.match.params.stat]) *
                    100
                }
              ]}
              innerRadius={120}
              cornerRadius={25}
              labels={() => null}
              style={{
                data: {
                  fill: ({datum}) => {
                    const color = datum.y > 30 ? 'green' : 'red'
                    return datum.x === 1 ? color : 'transparent'
                  }
                }
              }}
            />
            <VictoryAnimation duration={1000}>
              {() => {
                return (
                  <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x={200}
                    y={200}
                    text={`${Math.round(
                      date[`Ratio${this.props.match.params.stat}`] /
                        ceil[this.props.match.params.stat] *
                        100
                    )}%`}
                    style={{fontSize: 45}}
                  />
                )
              }}
            </VictoryAnimation>
          </svg>
        </div>
        <div>
          <h4>Description</h4>
          <div>{description}</div>
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
    fetchDescription(name) {
      dispatch(fetchDescription(name))
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

export default connect(mapState, mapDispatch)(IndivStat)
