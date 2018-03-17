var cheatCodePosition = 0;

const cheatChecker = function (ev) {
    const cheatKeys = {
        68: 'd',
        71: 'g',
        73: 'i',
        81: 'q'
    };
    const key = cheatKeys[ev.keyCode];
    const cheatCode = ['i', 'd', 'd', 'q', 'd'];
    const requiredKey = cheatCode[cheatCodePosition];

    if (key === requiredKey) {
        cheatCodePosition++;
        if (cheatCodePosition === cheatCode.length) {
            activateCheats();
            cheatCodePosition = 0;
        }
    } else {
        cheatCodePosition = 0;
    }
};

function activateCheats() {
    console.log('Degreelessness mode on!');
    secretInput.classList.remove('hide');
}
