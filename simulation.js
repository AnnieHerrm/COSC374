var facedata1;
let collectedFace1 = false;
let collectedFace2 = false;
var facedata2;
var username;
var phone;
var pin;

function openFaceDetectionWindow() {
    // Define the URL of your face detection HTML file
    const faceDetectionUrl = 'face.html';

    // Open a new small window with the face detection code
    window.open(faceDetectionUrl, 'FaceDetectionWindow', 'width=600,height=400');

    window.addEventListener('message', function (event){
        if(!collectedFace1){
            faceDetected1(event.data);
            collectedFace1 = true;
        }    
    });
}


function faceDetected1(face){
    console.log('Received face 1 data:', face);
    sessionStorage.setItem("facedata1",JSON.stringify(face));
    const submitButton = document.getElementById('submit-button');
    if (!submitButton)
    return;
    submitButton.removeAttribute('disabled');
    
    // Update a message in the form to indicate that face data has been collected
    const faceDataMessage = document.getElementById('face-data-message');
    if (!faceDataMessage)
    return;
    faceDataMessage.textContent = 'Face data collected successfully';

    collectedFace1 = true;
}

function submitForm1(event){
    event.preventDefault();
    // Get form data
    username = document.getElementById('name').value;
    phone = document.getElementById('phone').value;
    pin = document.getElementById('pin').value;

    // Store form data in sessionStorage
    sessionStorage.setItem("name", username);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("pin", pin);

    console.log(username + " " + phone + " " + pin);

    // Redirect to another page
    if(username && phone && pin){
        window.location.href = 'simulation2.html';
    }else {
        alert("Please fill all fields");
    }
 
}


function openFaceDetectionWindow2() {
    // Define the URL of your face detection HTML file
    const faceDetectionUrl = 'face.html';
    
    // Open a new small window with the face detection code
    window.open(faceDetectionUrl, 'FaceDetectionWindow', 'width=600,height=400');

    window.addEventListener('message', function (event){
        
        sessionStorage.removeItem('facedata2');        
        facedata2 = event.data;
        sessionStorage.setItem("facedata2",JSON.stringify(facedata2));
        facedata1 = JSON.parse(this.sessionStorage.getItem("facedata1"));
        facedata2 = JSON.parse(this.sessionStorage.getItem('facedata2'));
        console.log('Received face 2 data:', facedata2);
        console.log(facedata1);

        const threshold = 0.5; // You may need to adjust this threshold based on your use case

        
        const distance = compareFaces(facedata1, facedata2);
        this.name = this.sessionStorage.getItem('name');   
        if (distance < threshold) {
            afterVerfication();
        } else {
            alert("Faces Don't match");
        }
        
        document.getElementById('enter-vehicle').removeAttribute('disabled');
         
    });
    
}

function randomizeVerification(){
    let randNum = Math.floor((Math.random() * 3));
    document.getElementById('enter-vehicle').setAttribute('disabled', true);
    console.log(randNum);

    if(randNum === 0){
        openForm();
    }else{
        openFaceDetectionWindow2();
    }
    
}

function openForm() {
    document.getElementById("myForm").style.display = "block";  
    pin = parseInt(sessionStorage.getItem('pin'));
    console.log(pin); 
}
  
function submitForm(event) {
    event.preventDefault();
    
    pin2 = parseInt(document.getElementById('pin2').value);
    console.log(pin2);
    if(pin2){
        if(pin2 === pin){
            afterVerfication();
        }else{
            alert('Pin does not match! Please try again.');
        }
    }   
}

function compareFaces(face1, face2){
  const distance = euclideanDistance(Object.values(face1.descriptor), Object.values(face2.descriptor));
  return distance;
}

function euclideanDistance(arr1, arr2) {
    return Math.sqrt(
      arr1.reduce((sum, value, index) => sum + Math.pow(value - arr2[index], 2), 0)
    );
}

function afterVerfication(){
    window.location.href = 'verfied.html';

    Name = document.getElementById('greeting');
    Name.innerHTML = "Welcome " + sessionStorage.getItem('name');
}
