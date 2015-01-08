function getWebGLData(glcanvas, height, width) {
    var canvas = document.createElement('canvas');
    canvas.id = 'mycanvas';
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    var imageData = context.createImageData(width, height);
    imageData.data.set(glcanvas.getContext('webgl').readPixels());
    context.putImageData(imageData, 0, 0)

    $(document.body).append(canvas);
    $(glcanvas).css('display', 'none');

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

    $(document.body).append(newcanvas);
    var url = newcanvas.toDataURL();
    $(canvas, newcanvas).remove();
    $(glcanvas).css('display', 'block');
    return url;
}