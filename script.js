document.getElementById("locationButton").addEventListener("click", getLocation);

let locationGranted = false;

function getLocation() {
    if (navigator.geolocation) {
        if (!locationGranted) {
            navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });
        } else {
            navigator.geolocation.getCurrentPosition(showPosition, null, { enableHighAccuracy: true });
        }
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Got position:", position);
    const { latitude, longitude } = position.coords;
    const data = {
        latitude: latitude,
        longitude: longitude
    };
    
    console.log("Sending data to bot:", data);
    Telegram.WebApp.sendData(JSON.stringify(data));
    locationGranted = true;
}

function showError(error) {
    let errorMessage;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
    }
    console.log("Error:", errorMessage);
    Telegram.WebApp.sendData(JSON.stringify({ error: errorMessage }));
}
