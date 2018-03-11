const textArea = document.querySelector("textarea");
const numberInput = document.querySelector("input");
const button = document.querySelector("button");
const speedTextEl = document.querySelector('.speed-text-container');
const overlay = document.querySelector('.overlay');
var text;
var startTime;

button.addEventListener('click', function() {
    text = textArea.value.replace(/(\r\n\t|\n|\r\t)/gm,' ').split(' ');
    speedTextEl.classList.remove('hide');
    overlay.classList.remove('hide');
    startTime = new Date();
    runSpeedText(text.length + 1, text, numberInput.value, speedTextEl);
});

function runSpeedText (iterations, text, delay, display, secretMessage, wasSecretMessage) {
    secretMessage = secretMessage || false;
    const index = text.length + 1 - iterations;

    if (typeof secretMessage === "boolean") {
        setTimeout(function () {
            display.innerText = text[index];
            if (--iterations) {          // If iterations > 0, keep going
                runSpeedText(iterations, text, delay, display);       // Call the loop again, and pass it the current value of iterations
            } else {
                console.log('total reading time ' + (new Date() - startTime) / 1000 + 's');
                console.log('Theoretical reading time ' + ((text.length + 1) * delay) / 1000 + 's');
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
                console.log('total reading time ' + (new Date() - startTime) + 'ms');
                speedTextEl.innerText = '';
                speedTextEl.classList.add('hide');
                overlay.classList.add('hide');
            }
        }, delay);
    }

}