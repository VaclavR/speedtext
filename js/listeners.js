textArea.addEventListener('input', function () {
    showStatistic();
});

speedInput.addEventListener('input', function () {
    showStatistic();
});

launchButton.addEventListener('click', function() {
    document.body.addEventListener('keydown', pause);
    console.time('timer');
    launch();
});

document.addEventListener('keydown', cheatChecker);