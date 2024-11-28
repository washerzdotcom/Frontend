// import React, { useState } from "react";
// import Camera from "react-html5-camera-photo";
// import "react-html5-camera-photo/build/css/index.css";

// const Webcamera = ({ onCapture }) => {
//   const [uri, setUri] = useState(null);
//   const [error, setError] = useState(null);

//   const handleTakePhoto = (dataUri) => {
//     setUri(dataUri);

//     // Convert the base64 data URI to Blob
//     fetch(dataUri)
//       .then((res) => res.blob())
//       .then((blob) => {
//         const file = new File([blob], "captured-image.jpg", {
//           type: "image/jpeg",
//         });
//         onCapture(file); // Pass the Blob file to the parent component
//       });
//   };

//   const handleCameraError = (error) => {
//     setError("Unable to access camera. Please check permissions.");
//     console.error("Camera error:", error);
//   };

//   return (
//     <div>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       <Camera
//         height={200}
//         onTakePhoto={handleTakePhoto} // Capture the photo and call handleTakePhoto
//         onCameraError={handleCameraError} // Catching camera errors
//       />
//       {uri && <img height={200} src={uri} alt="Captured" />}{" "}
//       {/* Display the captured image */}
//     </div>
//   );
// };

// export default Webcamera;

import React, { useState } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { MdCameraswitch } from "react-icons/md";
import { IoMdReverseCamera } from "react-icons/io";

const Webcamera = ({ onCapture }) => {
  const [uri, setUri] = useState(null); // Captured photo URI
  const [error, setError] = useState(null); // Camera error
  const [isCameraVisible, setCameraVisible] = useState(true); // Camera visibility
  const [cameraMode, setCameraMode] = useState("environment"); // "environment" for back, "user" for front

  const handleTakePhoto = (dataUri) => {
    setUri(dataUri); // Set the captured image
    setCameraVisible(false); // Hide the camera after photo capture

    // Convert base64 data URI to Blob
    fetch(dataUri)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
        onCapture(file); // Pass the Blob file to the parent component
      });
  };

  const handleCameraError = (error) => {
    setError("Unable to access camera. Please check permissions.");
    console.error("Camera error:", error);
  };

  const handleRetake = () => {
    setUri(null); // Clear the captured image
    setCameraVisible(true); // Show the camera again
  };

  const toggleCameraMode = () => {
    setCameraMode((prevMode) => (prevMode === "environment" ? "user" : "environment"));
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Show camera or captured image based on state */}
      {isCameraVisible ? (
        <div>
          <Camera
            idealFacingMode={cameraMode === "environment" ? "environment" : "user"} // Toggle camera mode
            height={200}
            onTakePhoto={handleTakePhoto}
            onCameraError={handleCameraError}
          />
          {/* <button onClick={toggleCameraMode} style={{ marginTop: "10px" }}>
            Switch to {cameraMode === "environment" ? "Front" : "Back"} Camera
            
          </button> */}
          <MdCameraswitch onClick={toggleCameraMode} style={{ marginTop: "10px", fontSize: "40px", cursor: "pointer" }} />
        </div>
      ) : (
        <div>
          <img height={200} src={uri} alt="Captured" /><br />
          {/* <button onClick={handleRetake} style={{ marginTop: "10px" }}>
            Retake Photo
          </button> */}
          <IoMdReverseCamera onClick={handleRetake} style={{ marginTop: "10px", fontSize: "40px", cursor: "pointer" }} />
        </div>
      )}
    </div>
  );
};

export default Webcamera;
