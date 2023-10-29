import React, { Component } from "react";
class Clock extends Component {
  constructor() {
    super();
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render() {
    const { time } = this.state;
    const hour = time.getHours();
    const min = time.getMinutes();

    return (
      <div className="time">
        <div className="hour">
          {hour < 10 ? "0" : ""}
          {hour}
        </div>
        &nbsp; : &nbsp;
        <div className="minutes">
          {min < 10 ? "0" : ""}
          {min}
        </div>
        <div>&nbsp;{ hour >= 12 ? "PM" : "AM"}</div>
      </div>
    );
  }
}
export default Clock;
