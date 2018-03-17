const cheatKeys = {
    68: 'd',
    71: 'g',
    73: 'i',
    81: 'q'
};
const cheatCode = ['i', 'd', 'd', 'q', 'd'];
var cheatCodePosition = 0;

document.addEventListener('keydown', function(e) {
    const key = cheatKeys[e.keyCode];
    const requiredKey = cheatCode[cheatCodePosition];

    if (key === requiredKey) {

        cheatCodePosition++;

        // if the last key is reached, activate cheats
        if (cheatCodePosition === cheatCode.length) {
            activateCheats();
            cheatCodePosition = 0;
        }
    } else {
        cheatCodePosition = 0;
    }
});

function activateCheats() {
    console.log('Degrelessnes mode on!');
    secretInput.classList.remove('hide');
}