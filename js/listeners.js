textArea.addEventListener('input', function () {
    showStatistic();
});

speedInput.addEventListener('input', function () {
    showStatistic();
});

resetButton.addEventListener('click', function () {
    reset();
});

launchButton.addEventListener('click', function() {
    document.body.addEventListener('keydown', pause);
    launch();
});

document.body.addEventListener('keydown', cheatChecker);
