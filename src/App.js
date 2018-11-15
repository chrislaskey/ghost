import React, { Component } from 'react'
import './app/electron'
import { clearBadge } from './helpers/electron'
import Timer from './Timer'

class App extends Component {
  constructor (props) {
    super(props)

    this.timer = this.timer.bind(this)

    this.state = {
      interval: null,
      now: Date.now()
    }
  }

  componentDidMount () {
    const interval = setInterval(this.timer, 100)

    clearBadge()

    this.setState({ interval: interval })
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
  }

  timer () {
    this.setState({ now: Date.now() })
  }

  render () {
    return (
      <div id='app'>
        <div id='draggable-top-bar' />
        <Timer now={this.state.now} />
      </div>
    )
  }
}

export default App
