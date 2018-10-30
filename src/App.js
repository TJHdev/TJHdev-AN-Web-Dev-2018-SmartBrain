import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkform from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "./App.css";

window.BACKEND_PATH =
  process.env.NODE_ENV === "production"
    ? "https://smart-brain-backend.herokuapp.com"
    : "https://smart-brain-backend.herokuapp.com";

const ParticlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  box: [{}, {}],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map(faceArea => {
      faceArea = faceArea.region_info.bounding_box;
      return {
        leftCol: faceArea.left_col * width,
        topRow: faceArea.top_row * height,
        rightCol: width - faceArea.right_col * width,
        bottomRow: height - faceArea.bottom_row * height
      };
    });
  };

  displayFaceBox = boxs => {
    this.setState({ boxs: boxs });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(`${window.BACKEND_PATH}/imageurl`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(data => data.json())
      .then(response => {
        if (response.rawData.outputs[0].data.regions) {
          fetch(`${window.BACKEND_PATH}/image`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id, // currently logged in user
              count: response.rawData.outputs[0].data.regions.length
            })
          })
            .then(response => response.json())
            .then(count => {
              // will update the display on the fly without having to relogin
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
          this.displayFaceBox(this.calculateFaceLocation(response.rawData));
        } else {
          this.displayFaceBox({}); // clears the box if no data returned
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
      route = "signin";
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { name, entries } = this.state.user;
    const { isSignedIn, imageUrl, route, boxs } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={ParticlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={name} entries={entries} />
            <ImageLinkform
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onPictureSubmit}
            />
            <FaceRecognition boxs={boxs} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
