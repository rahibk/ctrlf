import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import * as YoutubeClient from "../Clients/YoutubeClient";

export default function SearchResult({ youtubeUrl, keyword }) {
  const [activeStep, setActiveStep] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [timeStamps, setTimeStamps] = useState([]);
  const theme = useTheme();
  const [tutorialSteps, setTutorialSteps] = useState([]);
  const [videoTranscript, setVideoTranscript] = useState({});

  function extractVideoID(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      alert("Invalid Youtube URL");
    }
  }

  useEffect(() => {
    const videoId = extractVideoID(youtubeUrl);
    callYoutubeClient(videoId);
  }, []);

  function callYoutubeClient(id) {
    YoutubeClient.getTranscript(id)
      .then(function (response) {
        setVideoTranscript(response);

        var parser, xmlDoc;
        var text = response;c

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");

        var x = xmlDoc.getElementsByTagName("text");
        for (var i = 0; i < x.length; i++) {
          if (x[i].childNodes[0]) {
            var textSegment = x[i].childNodes[0].nodeValue.toLowerCase();
            var isFound = textSegment.search(keyword.toLowerCase());
            if (isFound !== -1) {
              var timeStamp = timeStamps;
              timeStamp.push(x[i].getAttribute("start"));
              setTimeStamps(timeStamp);
            }
          }
        }
        createTutorialSteps(id);
        console.log(timeStamps);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function createTutorialSteps(id) {
    const baseUrl = "https://www.youtube.com/watch?v=" + id + "&t=";
    var stepsObj = [];
    for (var i = 0; i < timeStamps.length; i++) {
      var stepObj = {
        imgPath: baseUrl + timeStamps[i],
      };
      stepsObj.push(stepObj);
    }
    setVideoUrl(stepsObj[0].imgPath);
    setTutorialSteps(stepsObj);
  }

  const handleNext = () => {
    var nextStep = activeStep + 1;
    setActiveStep(nextStep);
    setVideoUrl(tutorialSteps[nextStep].imgPath);
  };

  const handleBack = () => {
    var prevStep = activeStep - 1;
    setActiveStep(prevStep);
    setVideoUrl(tutorialSteps[prevStep].imgPath);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Found {timeStamps.length} results of keyword "{keyword}"
        </Typography>
        <div id="result">
          <ReactPlayer
            url={videoUrl}
            className="react-player"
            playing
            width="auto"
            controls={true}
          />
        </div>
        <MobileStepper
          steps={timeStamps.length}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === timeStamps.length - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Container>
      <Typography variant="h5" align="center" color="textSecondary">
        Search for another word?
      </Typography>
    </div>
  );
}
