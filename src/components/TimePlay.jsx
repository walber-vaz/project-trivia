import React, { Component } from 'react';
import { func, bool } from 'prop-types';

class TimePlay extends Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    const mileseconds = 1000;
    const { handleTimer } = this.props;
    this.timerInterval = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1 }), () => {
        const { timer } = this.state;
        handleTimer(timer);
      });
    }, mileseconds);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  clearTimer = () => {
    const { isTimeOut } = this.props;
    const { timer } = this.state;
    if (isTimeOut || timer === 0) return clearInterval(this.timerInterval);
  };

  render() {
    const { timer } = this.state;
    this.clearTimer();
    return (
      <div>
        <p>{timer}</p>
      </div>
    );
  }
}

TimePlay.propTypes = {
  handleTimer: func,
  isTimeOut: bool,
}.isRequired;

export default TimePlay;
