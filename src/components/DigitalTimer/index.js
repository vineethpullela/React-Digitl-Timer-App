import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeLimit: 25, currentRunningSeconds: 0}

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  onClickDecrease = () => {
    const {timeLimit, isTimerRunning} = this.state
    if (timeLimit > 1) {
      if (isTimerRunning === false) {
        this.setState(prevState => ({
          timeLimit: prevState.timeLimit - 1,
        }))
      }
    }
  }

  onCLickIncrement = () => {
    this.setState(prevState => ({timeLimit: prevState.timeLimit + 1}))
  }

  startTimerCountDown = () => {
    const {currentRunningSeconds, timeLimit} = this.state
    const isTimeCompleted = currentRunningSeconds === timeLimit * 60
    if (isTimeCompleted) {
      this.setState({isTimerRunning: false, currentRunningSeconds: 0})
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        currentRunningSeconds: prevState.currentRunningSeconds + 1,
      }))
    }
  }

  OnclickStartButton = () => {
    const {isTimerRunning, currentRunningSeconds, timeLimit} = this.state
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))

    const isTimeCompleted = currentRunningSeconds === timeLimit * 60
    if (isTimeCompleted) {
      this.setState({isTimerRunning: false})
      this.clearTimer()
    }
    if (isTimerRunning) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
  }

  onClickRestTimer = () => {
    this.setState({
      timeLimit: 25,
      isTimerRunning: false,
      currentRunningSeconds: 0,
    })
    this.clearTimer()
  }

  getTime = () => {
    const {timeLimit, currentRunningSeconds} = this.state
    const timeInSeconds = timeLimit * 60 - currentRunningSeconds
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`
    return {minutesInStringFormat, secondsInStringFormat}
  }

  render() {
    const {isTimerRunning, timeLimit} = this.state
    const time = this.getTime()
    const {minutesInStringFormat, secondsInStringFormat} = time

    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="timer-app-container">
          <div className="timer-bg-container">
            <div className="timer-text-container">
              <h1 className="timer-text">
                {minutesInStringFormat}:{secondsInStringFormat}
              </h1>
              <p className="timer-status-text">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-controller-content-container">
            <div className="timer-control-container">
              <button
                type="button"
                className="pause-start-button-container"
                onClick={this.OnclickStartButton}
              >
                <img src={imgUrl} className="pause-start-img" alt={altText} />
                <p className="timer-start-pause-text">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                type="button"
                className="rest-button-container"
                onClick={this.onClickRestTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="rest-img"
                  alt="reset icon"
                />
                <p className="rest-text">Rest</p>
              </button>
            </div>

            <div className="set-timer-limit-container">
              <p className="set-timer-text">Set Timer Limit</p>
              <div className="set-timer-limit-button-container">
                <button
                  type="button"
                  className="decrease-button"
                  onClick={this.onClickDecrease}
                >
                  -
                </button>
                <p className="timer-limit-text-container">{timeLimit}</p>
                <button
                  type="button"
                  className="increase-button"
                  onClick={this.onCLickIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
