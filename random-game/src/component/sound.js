import React, { Component } from "react";
import Cat from "./images/Cat.png";
import Dog from "./images/Dog.png";
import Rooster from "./images/rooster.png";
import Guide from "./images/guide.png";
import Catsound from "./sounds/kitty-meow.wav";
import Bark from "./sounds/bark.wav";
import Crowing from "./sounds/rooster-crowing.wav";
import GuideSound from "./sounds/guide.mp3";
import { Link, Redirect } from "react-router-dom";
import { RiPlayCircleLine, RiPauseCircleLine } from "react-icons/ri";
import { VscUnmute, VscMute } from "react-icons/vsc";

class sound extends Component {
  constructor() {
    super();
    this.state = {
      idIcon1: 1,
      idIcon2: 1,
      idIcon3: 1,
      guideSound: 1,
    };
    this.audio1 = new Audio(Catsound);
    this.audio2 = new Audio(Bark);
    this.audio3 = new Audio(Crowing);
    this.audio4 = new Audio(GuideSound);
  }

  onGuide = () => {
    const { guideSound } = this.state;
    if (guideSound === 1) {
      this.setState({
        guideSound: 2,
      });
      this.audio4.play();
    } else {
      this.setState({
        guideSound: 1,
      });

      this.audio4.pause();
    }
  };

  onClick1 = () => {
    const { idIcon1 } = this.state;
    if (idIcon1 === 1) {
      this.setState({
        idIcon1: 2,
      });
      this.audio1.play();

      this.timer = setInterval(() => {
        this.setState({
          idIcon1: 1,
        });
      }, 1000);
    } else {
      this.setState({
        idIcon1: 1,
      });

      this.audio1.pause();
    }
  };

  onClick2 = () => {
    const { idIcon2 } = this.state;
    if (idIcon2 === 1) {
      this.setState({
        idIcon2: 2,
      });
      this.audio2.play();

      this.timer = setInterval(() => {
        this.setState({
          idIcon2: 1,
        });
      }, 1000);
    } else {
      this.setState({
        idIcon2: 1,
      });

      this.audio2.pause();
    }
  };

  onClick3 = () => {
    const { idIcon3 } = this.state;
    if (idIcon3 === 1) {
      this.setState({
        idIcon3: 2,
      });
      this.audio3.play();

      this.timer = setInterval(() => {
        this.setState({
          idIcon3: 1,
        });
      }, 1000);
    } else {
      this.setState({
        idIcon3: 1,
      });

      this.audio3.pause();
    }
  };

  render() {
    let { idIcon1, idIcon2, idIcon3, guideSound } = this.state;

    if (this.props.location.levels == null) {
      return <Redirect to="/menu" />;
    }

    const { levels } = this.props.location;
    return (
      <div>
        <div className="container">
          <div className="row m-5 pe-2">
            <h1 className="mb-3 ms-3"> เกมส์กดปุ่มทายเสียงของสัตว์</h1>
            <p className="card-text  ms-3">
              ฟังเสียงของฉันสิ! แล้วทายดูสิว่าฉันคือตัวอะไร
            </p>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div
                className="card m-3 p-2 shadow-sm  bg-body"
                style={{ width: "18rem", borderRadius: 10 }}
              >
                <img src={Cat} className="card-img-top" alt="Cat" />

                <div className="card-body d-flex justify-content-center align-items-center">
                  <div onClick={this.onClick1}>
                    {" "}
                    {idIcon1 === 1 ? (
                      <RiPlayCircleLine size="60" style={myCicle} />
                    ) : (
                      <RiPauseCircleLine size="60" style={myCicle} />
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <div
                className="card m-3 p-2 shadow-sm  bg-body"
                style={{ width: "18rem", borderRadius: 10 }}
              >
                <img src={Dog} className="card-img-top" alt="Dog" />

                <div className="card-body d-flex justify-content-center align-items-center">
                  <div onClick={this.onClick2}>
                    {idIcon2 === 1 ? (
                      <RiPlayCircleLine size="60" style={myCicle} />
                    ) : (
                      <RiPauseCircleLine size="60" style={myCicle} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <div
                className="card m-3 p-2 shadow-sm  bg-body"
                style={{ width: "18rem", borderRadius: 10 }}
              >
                <img src={Rooster} className="card-img-top" alt="Rooster" />

                <div className="card-body d-flex justify-content-center align-items-center">
                  <div onClick={this.onClick3}>
                    {" "}
                    {idIcon3 === 1 ? (
                      <RiPlayCircleLine size="60" style={myCicle} />
                    ) : (
                      <RiPauseCircleLine size="60" style={myCicle} />
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mb-5">
            <Link to={{ pathname: "/game", levels: levels }}>
              <button type="button" className="btn btn-outline-success btn-lg">
                เล่นเกมส์
              </button>
            </Link>
          </div>
        </div>
        <div className="fixed-bottom d-flex p-2" style={{ width: "60%" }}>
          <img
            src={Guide}
            alt="Guide"
            style={{ width: "10%", height: "auto" }}
          />
          <div style={{ backgroundColor: "#f1f1f1", borderRadius: "10px" }}>
            <p className="ms-2 me-2 p-2 row">
              &nbsp; สวัสดีค่ะ ยินดีต้อนรับเข้าสู่เกมทายเสียงของสัตว์!
              มาทายกันเถอะว่าฉันคือสัตว์ชนิดไหนกันนะ
              แล้วคุณสามารถเลือกฉันได้ทันเวลาได้หรือไม่ ลองกดฟังเสียงของฉันดูเลย
              แล้วจำให้ได้ว่าฉันคือใคร เกมนี้มีทั้งหมด 3 เลเวล ด้วยกัน
              หากคุณทำคะแนนได้เต็ม 10 ทั้ง 3 เลเวล คุณจะเก่งมาก!
            </p>
            <div className="d-flex justify-content-end p-1">
              <div onClick={this.onGuide}>
                {guideSound === 1 ? (
                  <VscMute size="40" style={myCicle} />
                ) : (
                  <VscUnmute size="40" style={myCicle} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default sound;
const myCicle = {
  color: "DodgerBlue",
};
