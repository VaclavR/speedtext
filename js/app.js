var text;

textArea.addEventListener('input', function () {
    showStatistic();
});

numberInput.addEventListener('input', function () {
    showStatistic();
});

button.addEventListener('click', function() {
    button.blur();
    text = textArea.value.replace(/\s\s+/g, ' ').split(' ');
    speedTextEl.classList.remove('hide');
    overlay.classList.remove('hide');
    const pause = function (ev) {
        if (ev.keyCode === 32) {
            alert('Press any key to continue...');
        }
    };
    document.body.addEventListener('keydown', pause);
    console.time('timer');
    removeSpaceAtEnd();
    runSpeedText(text.length, text, numberInput.value, speedTextEl, secretInput.value);
    setTimeout(function() {
        document.body.removeEventListener('keydown', pause);
    }, (text.length + 1) * numberInput.value)
});

function showStatistic () {
    text = textArea.value.replace(/\s\s+/g, ' ').split(' ');
    removeSpaceAtEnd();
    words.innerText = ' ' + text.length;
    time.innerText = ' ' + Math.round((text.length) * numberInput.value * 0.01) / 10 + 's';
}

function removeSpaceAtEnd() {
    if (text[text.length - 1] === '') {
        text.splice(text.length - 1, 1);
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
            if (iterations > 1) {
                iterations--;
                runSpeedText(iterations, text, delay, display, secretMessage, wasSecretMessage);       // Call the loop again, and pass it the current value of iterations
            } else {
                console.timeEnd('timer');
                speedTextEl.innerText = '';
                speedTextEl.classList.add('hide');
                overlay.classList.add('hide');
            }
        }, delay);
    }
}