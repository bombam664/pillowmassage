import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BsFlagFill, BsChevronRight } from "react-icons/bs";
import Level1 from "./images/level1.png";
import Level2 from "./images/level2.png";
import Level3 from "./images/level3.png";

class menuGame extends Component {
  state = {
    Icon: "Next",
  };

  onClick = (e) => {
    e.preventDefault();
    const { Icon } = this.state;
    if (Icon === "Next") {
      this.setState({
        Icon: "Back",
      });
    } else {
      this.setState({
        Icon: "Next",
      });
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row m-5 pe-2">
            <h1 className="mb-3"> เลือกระดับการเล่น </h1>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <div
                className="card m-3 p-2 "
                style={{ width: "18rem", borderRadius: 10 }}
              >
                <div className="card-body position-relative text-center">
                  <img src={Level1} alt="level1" className="img-fluid" />
                  <h2>ระดับที่ 1</h2>
                  <div
                    className="position-absolute start-0 translate-middle d-flex justify-content-center align-items-center"
                    style={myBox}
                  >
                    <BsFlagFill size="30" />
                  </div>
                  <Link to={{ pathname: "/sound", levels: 1 }}>
                    <div
                      className="position-absolute top-50 start-100 translate-middle d-flex justify-content-center align-items-center"
                      style={myCicle}
                    >
                      <BsChevronRight size="30" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div
                className="card m-3 p-2 "
                style={{ width: "18rem", borderRadius: 10 }}
              >
                <div className="card-body position-relative text-center">
                  <img src={Level2} alt="level2" className="img-fluid" />
                  <h2>ระดับที่ 2</h2>
                  <div
                    className="position-absolute  start-0 translate-middle d-flex justify-content-center align-items-center"
                    style={myBox}
                  >
                    <BsFlagFill size="30" />
                  </div>
                  <Link to={{ pathname: "/sound", levels: 2 }}>
                    <div
                      className="position-absolute top-50 start-100 translate-middle d-flex justify-content-center align-items-center"
                      style={myCicle}
                    >
                      <BsChevronRight size="30" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div
                className="card m-3 p-2 "
                style={{ width: "18rem", borderRadius: 10 }}
              >
                <div className="card-body position-relative text-center">
                  <img src={Level3} alt="level3" className="img-fluid" />
                  <h2>ระดับที่ 3</h2>
                  <div
                    className="position-absolute start-0 translate-middle d-flex justify-content-center align-items-center"
                    style={myBox}
                  >
                    <BsFlagFill size="30" />
                  </div>
                  <Link to={{ pathname: "/sound", levels: 3 }}>
                    <div
                      className="position-absolute top-50 start-100 translate-middle d-flex justify-content-center align-items-center"
                      style={myCicle}
                    >
                      <BsChevronRight size="30" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default menuGame;

const myBox = {
  color: "orange",
  border: "1px solid #ccc",
  width: "50px",
  height: "50px",
  backgroundColor: "#fff",
  borderRadius: 10,
  top: "90%",
};
const myCicle = {
  color: "DodgerBlue",
  border: "1px solid #ccc",
  width: "50px",
  height: "50px",
  backgroundColor: "#fff",
  borderRadius: 40,
};
