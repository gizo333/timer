document.addEventListener('DOMContentLoaded', function () {
    function updateTimeDisplay(hours, minutes, seconds) {
        document.getElementById('hours').textContent = (hours < 10 ? '0' : '') + hours;
        document.getElementById('minutes').textContent = (minutes < 10 ? '0' : '') + minutes;
        document.getElementById('seconds').textContent = (seconds < 10 ? '0' : '') + seconds;
    }
    
    function updateTime() {
        chrome.storage.local.get(['totalTime'], function (result) {
            let totalTime = result.totalTime || 0;
            let hours = Math.floor(totalTime / 3600);
            let minutes = Math.floor((totalTime % 3600) / 60);
            let seconds = totalTime % 60;
            updateTimeDisplay(hours, minutes, seconds);
        });
    }

    updateTime();
    setInterval(updateTime, 1000);
    
    document.getElementById('resetButton').addEventListener('click', function() {
        chrome.storage.local.set({totalTime: 0});
        updateTime();
    });
});
