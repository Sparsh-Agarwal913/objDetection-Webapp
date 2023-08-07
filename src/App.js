import "./App.css";
import Webcam from "react-webcam";
import * as tfjs from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Particlebg from "./components/particle";
import Footer from "./components/Footer";
function App() {
  const webcamref = useRef(null);
  const canvasref = useRef(null);
  let modelref = useRef(null);
  useEffect(() => {
    (async function () {
      console.log("model loading...");
      modelref.current = await cocossd.load();
      console.log("model loaded..");
      setInterval(() => {
        predict(modelref.current);
      }, 10);
    })();
  }, []);

  async function predict(model) {
    if (
      webcamref.current !== null &&
      webcamref.current.video.readyState === 4
    ) {
      const video = webcamref.current.video;
      const videoWidth = webcamref.current.video.videoWidth;
      const videoHeight = webcamref.current.video.videoHeight;

      webcamref.current.video.width = videoWidth;
      webcamref.current.video.height = videoHeight;

      canvasref.current.width = videoWidth;
      canvasref.current.height = videoHeight;

      const predictions = await model.detect(video);
      // console.log(predictions);
      const ctx = canvasref.current.getContext("2d");
      // convertnum();
      // console.log(predictions);
      // const ctx = canvasref.current.getContext("2d");
      drawrect(predictions, ctx);
    }
  }

  async function convertnum(num) {
    const convertednum = Math.floor(111111 + num * 15728639).toString(16);
    return convertednum;
  }

  async function drawrect(prediction, ctx) {
    prediction.forEach(async (element) => {
      const colornum = await convertnum(element.score);
      const color = "#" + colornum;
      const [x, y, width, height] = element.bbox;
      const text = element.class;

      // ctx.strokeStyle = color;
      ctx.strokeStyle = "#00000";
      ctx.font = "18px Arial";

      ctx.beginPath();
      ctx.lineWidth = 5;
      // ctx.fillStyle = color;
      ctx.fillStyle = "#000";
      ctx.fillText(text, x, y - 10);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  }

  return (
    <div className="App">
      <Particlebg />

      <div class="text">
        <h1>Object Detection</h1>
      </div>
      <Webcam
        ref={webcamref}
        className="webcam"
        style={{
          position: "absolute",
          // right:"50%"
        }}
      />
      <canvas
        ref={canvasref}
        className="boxcanvas"
        style={{
          position: "absolute",
          // width: "640px",
          // height: "480px",
          // right: "50%"
        }}
      />
      <Footer/>
    </div>
  );
}

export default App;
