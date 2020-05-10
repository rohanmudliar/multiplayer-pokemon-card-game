/*
* This function converts number into 3 digit number.
* @param _id is of type number. Pass the number that needs to be converted to 3 digits.
* Ex: _id = 3: returns 003
*/
function threeDigitConverter(_id) {
    return ('00' + _id).slice(-3);
};
/*
* Durstenfeld shuffle algorithim to shuffle a given array.
* @param _array is of type array. Pass the array that needs to be shuffled.
*/
function shuffleArray(_array) {
    // This is implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates.
    for (let i = _array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = _array[i];
        _array[i] = _array[j];
        _array[j] = temp;
    };
};