import React, { Component } from "react";
import Webcam from "react-webcam";
import "./style.css";
import * as firebase from "firebase";

export default function App() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  var imgCount = "";
  var imgURL = "";

  const webcamRef = React.useRef(null);

  async function getImageCounter() {
    console.log("Start 1");

    await firebase
      .database()
      .ref("Counter/")
      .once("value")
      .then(function(snapshot) {
        imgCount = snapshot.val().Count;
        // console.log("snapshot.val().Count  " + snapshot.val().Count);
        console.log("f1");
      });
  }

   async function uploadImage(imageSrc) {
    console.log("Start 2");
    var uploadTask = firebase.storage().ref();
    await uploadTask
      .child("pic" + imgCount)
      .putString(imageSrc, "data_url")
      .then(function(snapshot) {
        // console.log("Uploaded a data_url string!");
        console.log("f2");
      });
  }

   async function getURL() {
    console.log("Start 3");
    var url = firebase.storage().ref();

    await url
      .child("pic" + imgCount)
      .getDownloadURL()
      .then(function(downloadURL) {
        imgURL = downloadURL;
        console.log("File available at", imgURL);
        console.log("f3");
      });
  }

   function updateCounter(){
    console.log("Start 4");
      imgCount++;
      firebase.database().ref('Counter/').set({
        Count: imgCount
      });
      console.log("f4");
  }

  async function capture () {
    // this will get the base64 code of the image
    const imageSrc = webcamRef.current.getScreenshot();
    await getImageCounter();
    await uploadImage(imageSrc);
    await getURL();
    await updateCounter();
  };


  return (
    <>
      <div className="webcam">
        <Webcam
          className="webcam"
          audio={false}
          ref={webcamRef}
          mirrored={true}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </div>
      <button onClick={capture}>Capture photo</button>
    </>
  );
}
// }
