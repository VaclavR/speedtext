// a key map of allowed keys
var cheatKeys = {
    68: 'd',
    71: 'g',
    73: 'i',
    81: 'q'
};

// the 'official' Konami Code sequence
var cheatCode = ['i', 'd', 'd', 'q', 'd'];

// a variable to remember the 'position' the user has reached so far.
var cheatCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
    // get the value of the key code from the key map
    var key = cheatKeys[e.keyCode];
    // get the value of the required key from the konami code
    var requiredKey = cheatCode[cheatCodePosition];

    // compare the key with the required key
    if (key === requiredKey) {

        // move to the next key in the konami code sequence
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
    alert('Degerlessnes mode on!');
}