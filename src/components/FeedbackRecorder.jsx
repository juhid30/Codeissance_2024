import React, { useState } from "react";
import axios from "axios";

const FeedbackRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [recorder, setRecorder] = useState(null);

  const handleStartRecording = async () => {
    if (isRecording) return; // Prevent starting another recording

    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const audioURL = URL.createObjectURL(blob);
      setAudioURL(audioURL);

      // Convert blob to WAV
      const wavBlob = await convertToWav(blob);

      // Send audio to Flask backend for analysis
      const formData = new FormData();
      formData.append("audio", wavBlob, "audio.wav");

      axios
        .post("http://127.0.0.1:5000/analyze-sentiment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSentiment(response.data.sentiment);
        })
        .catch((error) => {
          console.error("Error sending audio to backend:", error);
        });

      // Reset state
      setIsRecording(false);
      setRecorder(null);
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);

    // Automatically stop recording after a short period of silence (e.g., 1 second)
    const silenceTimeout = setTimeout(() => {
      mediaRecorder.stop();
      clearTimeout(silenceTimeout);
    }, 5000); // Stop recording after 5 seconds (or adjust as needed)

    // Optional: You can also use an end-of-speech detection logic here
  };

  const convertToWav = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        audioContext.decodeAudioData(event.target.result, (buffer) => {
          const wavBlob = bufferToWave(buffer, buffer.length);
          resolve(wavBlob);
        });
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const bufferToWave = (abuffer, len) => {
    const numOfChannels = abuffer.numberOfChannels;
    const length = len * numOfChannels * 2 + 44; // 16-bit PCM
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];

    for (let i = 0; i < numOfChannels; i++) {
      channels[i] = abuffer.getChannelData(i);
    }

    writeUTFBytes(view, 0, "RIFF");
    view.setUint32(4, length - 8, true);
    writeUTFBytes(view, 8, "WAVE");
    writeUTFBytes(view, 12, "fmt ");
    view.setUint32(16, 16, true); // PCM
    view.setUint16(20, 1, true); // audio format
    view.setUint16(22, numOfChannels, true); // number of channels
    view.setUint32(24, 44100, true); // sample rate
    view.setUint32(28, 44100 * 2, true); // byte rate
    view.setUint16(32, numOfChannels * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    writeUTFBytes(view, 36, "data");
    view.setUint32(40, length - 44, true); // data length

    let offset = 44;
    for (let i = 0; i < len; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, channels[channel][i]));
        view.setInt16(
          offset,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true
        );
        offset += 2;
      }
    }

    return new Blob([view], { type: "audio/wav" });
  };

  const writeUTFBytes = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return (
    <div>
      <h2>Record Your Feedback</h2>
      <button onClick={handleStartRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>

      {audioURL && (
        <div>
          <h3>Recorded Audio</h3>
          <audio src={audioURL} controls />
        </div>
      )}

      {sentiment && (
        <div>
          <h3>Sentiment Analysis</h3>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackRecorder;
