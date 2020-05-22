import axios from "axios";

export function getTranscript(videoId) {
  return axios
    .get("https://video.google.com/timedtext?lang=en&v=" + videoId)
    .then(response => response.data)
    .catch(error => console.log(error));
}