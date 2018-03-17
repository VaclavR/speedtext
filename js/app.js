var text;

const pause = function (ev) {
    if (ev.keyCode === 32) {
        alert('Press any key to continue...');
    }
};

function reset () {
    textArea.value = null;
    text = undefined;
    showStatistic();
}

function showStatistic () {
    processText();
    wordsSpan.innerText = ' ' + text.length;
    timeSpan.innerText = ' ' + Math.round((text.length) * speedInput.value * 0.01) / 10 + ' s';
}

function processText() {
    text = textArea.value.replace(/(\n\r\t|\n|\r\t|\s\s+)/gm, ' ').split(' ');
    if (text[text.length - 1] === '') {
        text.splice(text.length - 1, 1);
    }
}

function launch() {
    launchButton.blur();
    processText();
    runSpeedText(text.length, text, speedInput.value, speedTextDiv, secretInput.value);
    setTimeout(function() {
        document.body.removeEventListener('keydown', pause);
    }, (text.length + 1) * speedInput.value)
}

function runSpeedText (iterations, text, delay, display, secretMessage, wasLastWordSecret) {
    secretMessage = secretMessage || false;
    const index = text.length - iterations;
    if (typeof secretMessage === "boolean") {
        setTimeout(function () {
            if(index === 0) {
                console.time('timer');
                speedTextDiv.classList.remove('hide');
                overlayDiv.classList.remove('hide');
            }
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
            if(index === 0) {
                console.time('timer');
                speedTextDiv.classList.remove('hide');
                overlayDiv.classList.remove('hide');
            }
            if (index % 42 === 0 && index > 0) {
                if (wasLastWordSecret !== true) {
                    display.innerText = secretMessage;
                    iterations++;
                    wasLastWordSecret = true;
                } else {
                    display.innerText = text[index];
                    wasLastWordSecret = false;
                }
            } else {
                display.innerText = text[index];
            }
            if (iterations > 1) {
                iterations--;
                runSpeedText(iterations, text, delay, display, secretMessage, wasLastWordSecret);       // Call the loop again, and pass it the current value of iterations
            } else {
                console.timeEnd('timer');
                speedTextDiv.innerText = '';
                speedTextDiv.classList.add('hide');
                overlayDiv.classList.add('hide');
            }
        }, delay);
    }
}
