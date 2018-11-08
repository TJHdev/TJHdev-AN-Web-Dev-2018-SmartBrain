import React from "react";
import Particles from "react-particles-js";

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

export default class ParticleNoRerender extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return <Particles className="particles" params={ParticlesOptions} />;
  }
}
