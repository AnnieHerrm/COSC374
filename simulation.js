function openFaceDetectionWindow() {
    // Define the URL of your face detection HTML file
    const faceDetectionUrl = 'face.html';

    // Open a new small window with the face detection code
    window.open(faceDetectionUrl, 'FaceDetectionWindow', 'width=600,height=400');
}

var facedata1 = null;

window.addEventListener('message', function (event) {
    // Handle the received face data
    facedata1 = event.data;
    console.log('Received face data:', facedata1);
    
    // Enable the submit button
    const submitButton = document.getElementById('submit-button');
    submitButton.removeAttribute('disabled');
    
    // Update a message in the form to indicate that face data has been collected
    const faceDataMessage = document.getElementById('face-data-message');
    faceDataMessage.textContent = 'Face data collected successfully';
});


const form = document.getElementById('authentication-form');

const name = document.getElementById('name');
const phone = document.getElementById('phone');
const bin = document.getElementById('bin');
