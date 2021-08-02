import React, { Component } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import socketIOClient from "socket.io-client";
import { Link, Redirect } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";

import { GoHome } from "react-icons/go";
import { BsFillXCircleFill, BsStarFill } from "react-icons/bs";

import Pillow from "./images/pillow.png";
import Rooster from "./images/rooster.png";
import Cat from "./images/Cat.png";
import Dog from "./images/Dog.png";
import Whale from "./images/Whale.png";

import correct from "./sounds/correct-answer.wav";
import wrong from "./sounds/wrong-answer.wav";
import Catsound from "./sounds/kitty-meow.wav";
import Bark from "./sounds/bark.wav";
import Crowing from "./sounds/rooster-crowing.wav";

class game extends Component {
  constructor() {
    super();
    this.state = {
      random: null,
      seconds: 6,
      score: 0,
      message: null,
      socket: null,
      incorrect: 0,
      // play: false,
    };

    // this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    this.audioCorrect = new Audio(correct);
    this.audioWrong = new Audio(wrong);
    this.audio1 = new Audio(Catsound);
    this.audio2 = new Audio(Bark);
    this.audio3 = new Audio(Crowing);
  }
  componentWillUnmount() {
    window.removeEventListener("massage", this.handleMesssage);
  }

  componentDidMount() {
    const socket = socketIOClient("localhost:5000");

    this.setState({
      socket: socket,
    });

    socket.on("message", (data) => this.handleMesssage(data));

    if (this.props.location.levels === 1) {
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds - 1 });
        if (this.state.seconds === 0) {
          this.RandomNumber();
          this.setState({
            seconds: 6,
          });
          if (this.state.score > 0) {
            this.setState({
              score: this.state.score - 1,
              incorrect: this.state.incorrect + 1,
            });
          } else {
            this.setState({
              score: 0,
            });
          }
        }
      }, 800);
    } else if (this.props.location.levels === 2) {
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds - 1 });
        if (this.state.seconds === 0) {
          this.RandomNumber();
          this.setState({
            seconds: 6,
          });
          if (this.state.score > 0) {
            this.setState({
              score: this.state.score - 1,
              incorrect: this.state.incorrect + 1,
            });
          } else {
            this.setState({
              score: 0,
            });
          }
        }
      }, 500);
    } else {
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds - 1 });
        if (this.state.seconds === 0) {
          this.RandomNumber();
          this.setState({
            seconds: 6,
          });
          if (this.state.score > 0) {
            this.setState({
              score: this.state.score - 1,
              incorrect: this.state.incorrect + 1,
            });
          } else {
            this.setState({
              score: 0,
            });
          }
        }
      }, 300);
    }
  }

  RandomNumber = () => {
    const rand = Math.floor(Math.random() * 3) + 1;
    this.setState({
      random: rand,
    });
  };

  handleMesssage = (data) => {
    this.setState({
      message: data.message,
    });

    if (data.message <= 3 && data.message !== 0) {
      if (this.state.random === data.message) {
        this.RandomNumber();
        this.setState({
          seconds: 6,
          score: this.state.score + 1,
        });

        if (this.state.score >= 10) {
          clearInterval(this.state.seconds);
          this.setState({
            score: 10,
          });
        }
        this.audioCorrect.play();
      } else {
        this.setState({
          seconds: 6,
        });
        if (this.state.score > 0) {
          this.RandomNumber();
          this.setState({
            score: this.state.score - 1,
            incorrect: this.state.incorrect + 1,
          });
        } else {
          this.setState({
            score: 0,
          });
        }

        this.audioWrong.play();
      }
    }
  };

  Reset = () => {
    this.setState({
      random: null,
      seconds: 6,
      score: 0,
      message: null,
      socket: null,
      incorrect: 0,
      play: false,
    });
    if (this.props.location.levels === 1) {
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds - 1 });
        if (this.state.seconds === 0) {
          this.RandomNumber();
          this.setState({
            seconds: 6,
          });
          if (this.state.score > 0) {
            this.setState({
              score: this.state.score - 1,
              incorrect: this.state.incorrect + 1,
            });
          } else {
            this.setState({
              score: 0,
            });
          }
        }
      }, 800);
    } else if (this.props.location.levels === 2) {
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds - 1 });
        if (this.state.seconds === 0) {
          this.RandomNumber();
          this.setState({
            seconds: 6,
          });
          if (this.state.score > 0) {
            this.setState({
              score: this.state.score - 1,
              incorrect: this.state.incorrect + 1,
            });
          } else {
            this.setState({
              score: 0,
            });
          }
        }
      }, 500);
    } else {
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds - 1 });
        if (this.state.seconds === 0) {
          this.RandomNumber();
          this.setState({
            seconds: 6,
          });
          if (this.state.score > 0) {
            this.setState({
              score: this.state.score - 1,
              incorrect: this.state.incorrect + 1,
            });
          } else {
            this.setState({
              score: 0,
            });
          }
        }
      }, 300);
    }
  };

  render() {
    if (this.props.location.levels == null) {
      return <Redirect to="/menu" />;
    }
    const { random, seconds, score, incorrect } = this.state;
    if (random === 1) {
      this.nameImg = Cat;
      if (seconds === 5) {
        this.audio1.play();
      }
    } else if (random === 2) {
      this.nameImg = Dog;
      if (seconds === 5) {
        this.audio2.play();
      }
    } else if (random === 3) {
      this.nameImg = Rooster;
      if (seconds === 5) {
        this.audio3.play();
      }
    } else {
      this.nameImg = Whale;
    }

    if (seconds === 3 || seconds === 2 || seconds === 1 || seconds === 0) {
      this.colorBack = "red";
    } else {
      this.colorBack = "#3e98c7";
    }

    let anw = (seconds * 100) / 100;
    anw = anw / 6;
    anw = anw * 100;
    this.percentage = anw;

    if (score === 10 && incorrect === 0) {
      clearInterval(this.state.seconds);
      this.statusScore = (
        <h1
          style={{
            fontSize: "50px",
            color: "green",
            fontWeight: "bold",
          }}
        >
          เยี่ยมจริง!
        </h1>
      );
    } else if (incorrect === 3) {
      clearInterval(this.state.seconds);
      this.statusScore = (
        <h1
          style={{
            fontSize: "50px",
            color: "green",
            fontWeight: "bold",
          }}
        >
          แพ้แล้ว!!
        </h1>
      );
    } else if (incorrect > 3 && score <= 10) {
      clearInterval(this.state.seconds);
      this.statusScore = (
        <h1
          style={{
            fontSize: "50px",
            color: "green",
            fontWeight: "bold",
          }}
        >
          แพ้แล้ว!!
        </h1>
      );
    } else {
      this.statusScore = (
        <h1
          style={{
            fontSize: "50px",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          มาสู้กัน
        </h1>
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row pt-4 p-2">
            <div className="col-lg-9 col-md-9 col-sm-12">
              <div
                className="row d-flex justify-content-center shadow p-1  bg-body ms-1 me-1"
                style={{ borderRadius: 40 }}
              >
                <div className="row d-flex justify-content-start mt-3">
                  <div className="col-2 ">
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        // border: "1px solid #000",
                      }}
                    >
                      <CircularProgressbar
                        value={this.percentage}
                        text={seconds}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                          backgroundColor: this.colorBack,
                          textColor: "#fff",
                          textSize: "40px",
                          pathColor: "#fff",
                          trailColor: "transparent",
                        })}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="row d-flex justify-content-center">
                      <div style={{ width: "50%" }}>
                        <img
                          src={this.nameImg}
                          alt="Whale"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <h2>กดปุ่มบนหมอนตามสีที่เห็น</h2>
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                      <div
                        className="d-flex justify-content-center p-5"
                        style={{
                          // border: "1px solid red",
                          backgroundImage: `url(${Pillow})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "100% 100%",
                        }}
                      >
                        <div
                          className=" d-flex justify-content-center align-items-center m-2"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "4px solid #ccc",
                            backgroundColor:
                              random === 1 ? "#001E6C" : "#f1f1f1",
                            fontWeight: "bold",
                            color: random === 1 ? "#fff" : "#000",
                          }}
                        >
                          1
                        </div>
                        <div
                          className=" d-flex justify-content-center align-items-center m-2"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "4px solid #ccc",
                            backgroundColor:
                              random === 2 ? "#81B214" : "#f1f1f1",
                            fontWeight: "bold",
                            color: random === 2 ? "#fff" : "#000",
                          }}
                        >
                          2
                        </div>
                        <div
                          className=" d-flex justify-content-center align-items-center m-2"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "4px solid #ccc",
                            backgroundColor:
                              random === 3 ? "#810000" : "#f1f1f1",
                            fontWeight: "bold",
                            color: random === 3 ? "#fff" : "#000",
                          }}
                        >
                          3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3  align-items-center">
              <div
                className="row d-flex justify-content-around text-center  shadow p-1  bg-body me-2"
                style={{ height: "100%", borderRadius: 40 }}
              >
                <div>
                  <div>
                    <h1 className="mt-5 mb-3 font-weight-bold">คะแนน</h1>
                    <div
                      className="shadow-sm ms-3 me-3 mb-2 bg-body"
                      style={mystyle}
                    >
                      <h1>{score}/10</h1>
                    </div>

                    <div
                      className="shadow-sm ms-3 me-3 mb-5 bg-body"
                      style={mystyle}
                    >
                      <BsFillXCircleFill
                        size="40"
                        className="me-2"
                        color={incorrect ? "red" : "#ccc"}
                      />
                      <BsFillXCircleFill
                        size="40"
                        className="me-2"
                        color={incorrect > 1 ? "red" : "#ccc"}
                      />
                      <BsFillXCircleFill
                        size="40"
                        className="me-2"
                        color={incorrect > 2 ? "red" : "#ccc"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {this.statusScore}

                  <div className="d-flex justify-content-center align-items-center">
                    <BsStarFill
                      color={score > 4 ? "#ffcc00" : "#ccc"}
                      className="me-2"
                      fontSize="50"
                    />

                    <BsStarFill
                      color={score > 6 ? "#ffcc00" : "#ccc"}
                      className="me-2"
                      fontSize="50"
                    />
                    <BsStarFill
                      color={score > 9 ? "#ffcc00" : "#ccc"}
                      className="me-2"
                      fontSize="50"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end align-items-center pe-4">
                  <Link to={{ pathname: "/" }}>
                    <div style={mybox}>
                      <GoHome size="40" style={{ color: "#000" }} />
                    </div>
                  </Link>
                  <div style={mybox} onClick={this.Reset}>
                    <GrPowerReset size="40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default game;
const mystyle = {
  borderRadius: "10px",
  padding: "5px",
  fontFamily: "Arial",
  border: "3px solid #ccc",
};
const mybox = {
  width: 60,
  height: 60,
  border: "5px solid #000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "5px",
  borderRadius: "10px",
};
