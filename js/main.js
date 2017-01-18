window.addEventListener('load', function() {
	fullscreen();
});

function fullscreen() {
    if (window.requestFullscreen) {
        window.requestFullscreen();
    } else if (window.msRequestFullscreen) {
        window.msRequestFullscreen();
    } else if (window.mozRequestFullScreen) {
        window.mozRequestFullScreen();
    } else if (window.webkitRequestFullscreen) {
        window.webkitRequestFullscreen();
    }
}