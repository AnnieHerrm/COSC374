async function startFaceDetection() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const displaySize = { width: video.width, height: video.height };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Load the face-api.js models
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('face-api.js-master/weights');
      await faceapi.nets.faceLandmark68Net.loadFromUri('face-api.js-master/weights');
      await faceapi.nets.faceRecognitionNet.loadFromUri('face-api.js-master/weights');
      startFaceDetection();
    } catch (error) {
      console.error('Error loading models:', error);
    }

    video.addEventListener("play", async () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        // Check if a face is detected
        if (detections.length > 0) {
          // Get the detected face data
          const detectedFaceData = detections[0];
          
          // Send the face data to the parent window
          window.opener.postMessage(detectedFaceData, '*'); // '*' allows posting to any origin

          // Close the current window
          window.close();
        }

        // Clear the canvas for the next frame
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      }, 100);
    });
  }

  startFaceDetection();