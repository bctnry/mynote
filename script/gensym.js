
// gensym.
var symCounter = 0;
var symBuffer = [];
function gensym() {
    if (symBuffer && symBuffer.length) {
        return symBuffer.shift();
    } else {
        return symCounter++;
    }
}
function putback(sym) {
    symBuffer.unshift(sym);
}
