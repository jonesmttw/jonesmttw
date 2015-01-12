function getWebGLData(glcanvas, height, width) {
    var canvas = document.createElement('canvas');
    canvas.id = 'mycanvas';
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    var imageData = context.createImageData(width, height);
    var pixels = new Uint8Array(width * height * 4);
    // IMPORTANT - if the preserveDrawingBuffer property is set to false - this will not print
    var gl = glcanvas.getContext('webgl');
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
    imageData.data.set(pixels);
    context.putImageData(imageData, 0, 0)

    document.body.appendChild(canvas);
    glcanvas.style.display = 'none';

    // due to limitations in the data url length -
    // new canvas is half of the size so that large screens can still print
    var newcanvas = document.createElement('canvas');
    newcanvas.width = canvas.width * .5;
    newcanvas.height = canvas.height * .5;
    var newcontext = newcanvas.getContext('2d');

    // this may vary project to project
    //  - have had issues where my canvas was a vertical mirror, this will fix that issue
    //  newcontext.scale(.5, -.5)
    //  newcontext.drawImage(canvas, 0, -canvas.height);
    newcontext.scale(.5, .5)
    newcontext.drawImage(canvas, 0, 0);

    document.body.appendChild(newcanvas);
    var url = newcanvas.toDataURL();
    canvas.remove();
    newcanvas.remove();
    glcanvas.style.display = 'block';
    return url;
}