const waitingScreen = document.querySelector('.screensaver');

function ShowWaitingScreen() {
    waitingScreen.style.display = 'block';
}

function HideWaitingScreen() {
    waitingScreen.style.display = 'none';
}

waitingScreen.addEventListener('click', function() {
    HideWaitingScreen();
});

ShowWaitingScreen();
