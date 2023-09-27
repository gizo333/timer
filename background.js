let totalTime = 0;

// Функция для обновления общего времени и сохранения его в хранилище
function updateTotalTime() {
    chrome.idle.queryState(15, function (state) {
        if (state === 'active') {
            totalTime += 1;
            chrome.storage.local.set({totalTime: totalTime});
        }
    });
}

// Установка интервала обновления каждую секунду
setInterval(updateTotalTime, 1000);

// Загрузка сохраненного времени при запуске
chrome.storage.local.get(['totalTime'], function (result) {
    totalTime = result.totalTime || 0;
});

// Установка интервала определения неактивности пользователя
chrome.idle.setDetectionInterval(15);
