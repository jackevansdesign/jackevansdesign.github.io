var canvas = document.getElementById('static');
window.ctx = canvas.getContext('2d');
function noise(ctx) {
    var w = 336,
        h = 240,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0;
    for(; i < len;)
        buffer32[i++] = ((144 * Math.random())|0) << 24;
    window.ctx.putImageData(idata, 0, 0);
}
var toggle = true;
(function loop() {
    toggle = !toggle;
    if (toggle) {
        requestAnimationFrame(loop);
        return;
    }
    noise(window.ctx);
    requestAnimationFrame(loop);
})();
