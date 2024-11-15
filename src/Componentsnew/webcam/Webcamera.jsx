import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const Webcamera = ({ onCapture }) => {
  const [uri, setUri] = useState(null);
  const [error, setError] = useState(null);

  const handleTakePhoto = (dataUri) => {
    setUri(dataUri);

    // Convert the base64 data URI to Blob
    fetch(dataUri)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "captured-image.jpg", {
          type: "image/jpeg",
        });
        onCapture(file); // Pass the Blob file to the parent component
      });
  };

  const handleCameraError = (error) => {
    setError("Unable to access camera. Please check permissions.");
    console.error("Camera error:", error);
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Camera
        height={200}
        onTakePhoto={handleTakePhoto} // Capture the photo and call handleTakePhoto
        onCameraError={handleCameraError} // Catching camera errors
      />
      {uri && <img height={200} src={uri} alt="Captured" />}{" "}
      {/* Display the captured image */}
    </div>
  );
};

export default Webcamera;
