import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import correct from "./sounds/correct-answer.wav";
import wrong from "./sounds/wrong-answer.wav";
import Test1 from "./testImgs/jackie.jpg";
import Test2 from "./testImgs/landscape.jpg";
import alligator from "./images/alligator.png";
import butterfly from "./images/butterfly.png";
import camel from "./images/camel.png";
import Whale from "./images/Whale.png";

class guideline extends Component {
  constructor() {
    super();
    this.state = {
      guide: "next",
      random: 4,
      seconds: 6,
      score: 0,
    };

    this.audio1 = new Audio(correct);
    this.audio2 = new Audio(wrong);
  }

  onChangeImage = () => {
    const { guide } = this.state;
    if (guide === "next") {
      this.setState({
        guide: "back",
      });
    } else {
      this.setState({
        guide: "next",
      });
    }
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds - 1 });
      if (this.state.seconds === 0) {
        this.setState({
          seconds: 6,
        });
        if (this.state.score > 0) {
          this.setState({
            score: this.state.score - 1,
          });
        } else {
          this.setState({
            score: 0,
          });
        }
      }
    }, 3000);
  }

  onClick = (e) => {
    e.preventDefault();

    if (e.target.value === "4") {
      this.setState({
        seconds: 6,
        score: this.state.score + 1,
        play1: true,
        pause1: false,
        play2: false,
        pause2: true,
      });
      this.audio1.play();
      this.audio2.pause();
    } else {
      this.setState({
        seconds: 6,
      });
      if (this.state.score > 0) {
        this.setState({
          score: this.state.score - 1,
          play1: false,
          pause1: true,
          play2: true,
          pause2: false,
        });
      } else {
        this.setState({
          score: 0,
        });
      }
      this.audio1.pause();
      this.audio2.play();
    }
  };

  render() {
    const { guide, random, seconds } = this.state;

    if (guide === "next") {
      this.ImageGuide = Test1;
    } else {
      this.ImageGuide = Test2;
    }

    if (random === 4) {
      this.nameImg = alligator;
    } else if (random === 5) {
      this.nameImg = butterfly;
    } else if (random === 6) {
      this.nameImg = camel;
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

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <h1>Guideline</h1>
            <img
              src={this.ImageGuide}
              className="img-fluid"
              alt="..."
              style={{ height: "80vh" }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger m-1"
              onClick={this.onChangeImage}
            >
              Back
            </button>
            <button
              className="btn btn-outline-success m-1"
              onClick={this.onChangeImage}
            >
              Next
            </button>
          </div>
        </div>

        {/* part of the trial */}

        <div className="container-fluid bg-light">
          <div className="row pt-5 p-2">
            <div
              className="col-md-3  align-items-center"
              style={{ height: "80vh" }}
            >
              <div
                className="row d-flex justify-content-around text-center"
                style={{ height: "100%" }}
              >
                <div>
                  <div>
                    <p
                      style={{
                        color: "DodgerBlue",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Score
                    </p>
                    <div
                      className="shadow-sm me-3 mb-5 bg-body"
                      style={mystyle}
                    >
                      <h1>{this.state.score}</h1>
                    </div>
                  </div>
                </div>

                <div>
                  <h5>Try pressing it before you press play.</h5>
                  <p>
                    1.Try pressing the button on the pillow to match the image
                    shown on the screen.
                  </p>
                  <p>
                    2.Try pressing the button on the pillow does not match the
                    image shown on the screen.
                  </p>
                </div>
                <Link to={{ pathname: "/menu" }}>
                  <button
                    type="button"
                    className="btn btn-success btn-lg me-2 "
                  >
                    เล่นเกมส์
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-9">
              <div
                className="row d-flex justify-content-center shadow p-3 mb-5 bg-body me-2"
                style={{ borderRadius: 40 }}
              >
                <div className="row d-flex justify-content-start mt-3">
                  <div
                    style={{
                      width: 100,
                      height: 100,
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

                <div style={{ width: 500, height: 550 }}>
                  <img src={alligator} alt="Whale" style={{ width: "100%" }} />
                </div>
                <div className="column d-flex  justify-content-center">
                  <button
                    type="button"
                    onClick={this.onClick}
                    value="4"
                    className="btn btn-lg btn-outline-primary me-2"
                  >
                    alligator
                  </button>
                  <button
                    type="button"
                    onClick={this.onClick}
                    value="5"
                    className="btn btn-lg btn-outline-success me-2"
                  >
                    butterfly
                  </button>
                  <button
                    type="button"
                    onClick={this.onClick}
                    value="6"
                    className="btn btn-lg btn-outline-dark me-2"
                  >
                    camel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default guideline;
const mystyle = {
  color: "DodgerBlue",
  backgroundColor: "#fff",
  borderRadius: "10px 10px 2px 2px",
  padding: "5px",
  fontFamily: "Arial",
  border: "3px solid DodgerBlue",
};
