var text;

const pause = function (ev) {
    if (ev.keyCode === 32) {
        alert('Press any key to continue...');
    }
};

function launch() {
    launchButton.blur();
    speedTextDiv.classList.remove('hide');
    overlayDiv.classList.remove('hide');
    processText();
    runSpeedText(text.length, text, speedInput.value, speedTextDiv, secretInput.value);
    setTimeout(function() {
        document.body.removeEventListener('keydown', pause);
    }, (text.length + 1) * speedInput.value)
}

function showStatistic () {
    processText();
    wordsSpan.innerText = ' ' + text.length;
    timeSpan.innerText = ' ' + Math.round((text.length) * speedInput.value * 0.01) / 10 + 's';
}

function processText() {
    text = textArea.value.replace(/(\n\r\t|\n|\r\t|\s\s+)/gm, ' ').split(' ');
    if (text[text.length - 1] === '') {
        console.log(text);
        text.splice(text.length - 1, 1);
        console.log(text);
    }
}

function runSpeedText (iterations, text, delay, display, secretMessage, wasSecretMessage) {
    secretMessage = secretMessage || false;
    const index = text.length - iterations;
    if (typeof secretMessage === "boolean") {
        setTimeout(function () {
            if (index < text.length) {
                display.innerText = text[index];
                iterations--;
                runSpeedText(iterations, text, delay, display);
            } else {
                console.timeEnd('timer');
                speedTextDiv.innerText = '';
                speedTextDiv.classList.add('hide');
                overlayDiv.classList.add('hide');
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
            if (iterations > 1) {
                iterations--;
                runSpeedText(iterations, text, delay, display, secretMessage, wasSecretMessage);       // Call the loop again, and pass it the current value of iterations
            } else {
                console.timeEnd('timer');
                speedTextDiv.innerText = '';
                speedTextDiv.classList.add('hide');
                overlayDiv.classList.add('hide');
            }
        }, delay);
    }
}