import React, { Component } from 'react'
import { padStart } from 'lodash'
import { notify } from './helpers/notifications'

class Timer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // length: 20 * 60 * 1000,
      completed: null,
      length: 5 * 1000,
      start: null
    }
  }

  render () {
    const { now } = this.props

    const handleStart = (event) => {
      event.preventDefault()

      this.setState({
        completed: null,
        start: Date.now()
      })
    }

    const handleReset = (event) => {
      event.preventDefault()

      this.setState({
        start: null
      })
    }

    let hours
    let minutes
    let seconds

    if (this.state.start) {
      const end = Number(this.state.start) + this.state.length
      const difference = (end - Number(now)) / 1000

      if (difference <= 0) {
        notify('Timer Complete')

        this.setState({
          completed: Date.now(),
          start: null
        })
      }

      hours = Math.floor(difference / (60 * 60))
      minutes = Math.floor(difference / 60)
      seconds = difference % 60
    }

    const renderTime = (value) => {
      const asInteger = (value || 0).toFixed(0)
      const asString = asInteger.toString()

      return padStart(asString, 2, '0')
    }

    return (
      <div className='timer'>
        <div className='controls'>
          { this.state.start && <a href='#reset' onClick={handleReset}>Reset</a> }
          { !this.state.start && <a href='#start' onClick={handleStart}>Start</a> }
        </div>
        <div className='status'>
          <div>
            Interval: { this.state.length }
          </div>
          <div>
            Status: { this.state.start ? 'Running' : 'Not Started' }
          </div>
          <div>
            Remaining:
            { renderTime(hours) }:{ renderTime(minutes) }:{ renderTime(seconds) }
          </div>
        </div>
      </div>
    )
  }
}

export default Timer
