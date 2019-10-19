// DrawTriangle.js (c) 2012 matsuda
// function main() {
// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +  // uniform変数
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' +
    '}\n';


window.onload = function () {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // var gl = getWebGLContext(canvas, opt_debug = true);
    var gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    //编译着色器
    
    // Get the storage location of a_Position
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    // Get the storage location of u_FragColor
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(1, 1, 0.9, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);




    //draw rectangle
    gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
    // Write the positions of vertices to a vertex shader
    var n = this.drawRectangle(this.backGround, gl);
    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);


    //draw bagua
    gl.uniform4f(u_FragColor, 0, 0, 0, 1.0);

    for (var i in bagua) {
        // Write the positions of vertices to a vertex shader
        var n = this.drawRectangle(this.bagua[i], gl);
    }
    //draw blue
    gl.uniform4f(u_FragColor, 0, 0, 1, 1.0);
    for(var i=1;i<180;i++){
        this.drawRectangle([0.2*this.Math.cos((i+146)/180*3.14159),0.2*this.Math.sin((i+146)/180*3.14159),
            0.2*this.Math.cos((i+145)/180*3.14159),0.2*this.Math.sin((i+145)/180*3.14159),
            0,0],gl);
    }
    
    //draw red
    gl.uniform4f(u_FragColor, 1, 0, 0, 1.0);
    for(var i=0;i<=180;i++){
        this.drawRectangle([0.2*this.Math.cos((i-34)/180*3.14159),0.2*this.Math.sin((i-34)/180*3.14159),
            0.2*this.Math.cos((i-35)/180*3.14159),0.2*this.Math.sin((i-35)/180*3.14159),
            0,0],gl);
    }

    //draw small red
    var x=0.1*Math.cos(145/180*3.14159);
    var y=0.1*Math.sin(145/180*3.14159);
    gl.uniform4f(u_FragColor, 1, 0, 0, 1.0);
    for(var i=1;i<180;i++){
        this.drawRectangle([0.1*this.Math.cos((i+146)/180*3.14159)+x,0.1*this.Math.sin((i+146)/180*3.14159)+y,
            0.1*this.Math.cos((i+145)/180*3.14159)+x,0.1*this.Math.sin((i+145)/180*3.14159)+y,
            0,0],gl);
    }


    //draw small blue
    var x=0.1*Math.cos(-35/180*3.14159);
    var y=0.1*Math.sin(-35/180*3.14159);
    
    gl.uniform4f(u_FragColor, 0, 0, 1, 1.0);
    for(var i=0;i<=180;i++){
        this.drawRectangle([0.1*this.Math.cos((i-34)/180*3.14159)+x,0.1*this.Math.sin((i-34)/180*3.14159)+y,
            0.1*this.Math.cos((i-35)/180*3.14159)+x,0.1*this.Math.sin((i-35)/180*3.14159)+y,
            0,0],gl);
    }




}


function drawRectangle(array, gl) {
    vertices = new Float32Array(array);
    var n = vertices.length / 2; // The number of vertices
    //console.log(n);
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    return n;
}