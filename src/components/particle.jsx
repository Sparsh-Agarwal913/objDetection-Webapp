import React from "react";
// import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const Particlebg = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container) => {};

  return (
    <Particles
      id="tsparticles"
      className="bgparticle"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#333",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "repulse",
            },
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 200,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.1,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
// return(
//     <div><h1>"bhbhbkjbkj"</h1></div>
// );
};

export default Particlebg;
