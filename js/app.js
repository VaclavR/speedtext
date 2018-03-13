const textArea = document.querySelector('textarea');
const numberInput = document.querySelector('input');
const words = document.querySelector('.words');
const time = document.querySelector('.time');
const button = document.querySelector("button");
const speedTextEl = document.querySelector('.speed-text-container');
const overlay = document.querySelector('.overlay');
var text;

textArea.addEventListener('input', function () {
    showStatistic();
});

numberInput.addEventListener('input', function () {
    showStatistic();
});

button.addEventListener('click', function() {
    button.blur();
    text = textArea.value.replace(/(\r\n\t|\n|\r\t)/gm,' ').split(' ');
    speedTextEl.classList.remove('hide');
    overlay.classList.remove('hide');
    const pause = function (ev) {
        if (ev.keyCode === 32) {
            alert('Press any key to continue...');
        }
    };
    document.body.addEventListener('keydown', pause);
    runSpeedText(text.length + 1, text, numberInput.value, speedTextEl);
    setTimeout(function() {
        document.body.removeEventListener('keydown', pause);
    }, (text.length + 1) * numberInput.value)
});

function showStatistic () {
    text = textArea.value.replace(/(\r\n\t|\n|\r\t)/gm,' ').split(' ');
    words.innerText = ' ' + text.length;
    time.innerText = ' ' + Math.round((text.length + 1) * numberInput.value * 0.01) / 10 + 's';
}

function runSpeedText (iterations, text, delay, display, secretMessage, wasSecretMessage) {
    secretMessage = secretMessage || false;
    const index = text.length + 1 - iterations;

    if (typeof secretMessage === "boolean") {
        setTimeout(function () {
            display.innerText = text[index];
            if (--iterations) {          // If iterations > 0, keep going
                runSpeedText(iterations, text, delay, display);       // Call the loop again, and pass it the current value of iterations
            } else {
                speedTextEl.innerText = '';
                speedTextEl.classList.add('hide');
                overlay.classList.add('hide');
            }
        }, delay);
    }

    else {
        setTimeout(function () {
            if (index % 42 === 0 && index > 0) {
                if (wasSecretMessage !== true) {
                    display.innerText = secretMessage;
                    iterations++;
                    wasSecretMessage = true;
                } else {
                    display.innerText = text[index];
                    wasSecretMessage = false;
                }
            } else {
                display.innerText = text[index];
            }
            if (--iterations) {          // If iterations > 0, keep going
                runSpeedText(iterations, text, delay, display, secretMessage, wasSecretMessage);       // Call the loop again, and pass it the current value of iterations
            } else {
                speedTextEl.innerText = '';
                speedTextEl.classList.add('hide');
                overlay.classList.add('hide');
            }
        }, delay);
    }
}