import React, { Component } from 'react';


class Airdrop extends Component {

    // airdrop to have a timer that counts down
    // initialize the countdown after the investor stake min 50 tokens (mUSD)
    // timer functionality, countdown, startTimer, start for the timer to work

    constructor() {
        super();
        this.state ={
            time:{},
            seconds: 20
        }
        this.timer = 0;
        // enable startTime function to be called in the rendering part
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    countDown() {
        // this function will called every second till the seconds = 0
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        });
        // clear the timer when seconds hit zero
        if(seconds == 0) {
            clearInterval(this.timer);
        }
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds >0) {
            // the second argument is the rate of the timer, which is 1 second
            // at every 1 sec this function will call the countDown function
            this.timer = setInterval(this.countDown, 1000)
        }
    }

    secondsToTime(secs) {
        let hours, minutes, seconds;
        hours = Math.floor(secs/3600);
        minutes = Math.floor((secs % 3600)/60);
        seconds = (secs % 3600) % 60;
        let obj = {
            'h': hours,
            'm': minutes,
            's': seconds
        }
        return obj
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time:timeLeftVar});
    }

    airdropReleaseTokens() {
        let stakingBal = this.props.stakingBal;
        if (stakingBal >= '20000000000000000000') {
            this.startTimer();
        }
        if (this.state.seconds == 0) {
            // window.alert('the timer hits zero....');
        }
    }

    render() {
        this.airdropReleaseTokens();
        return(
            <div style={{color: 'black'}}>
                {this.state.time.h}h : {this.state.time.m}m : {this.state.time.s}s
                {/* {this.startTimer()} */}
            </div>
        );
    }
}

export default Airdrop;