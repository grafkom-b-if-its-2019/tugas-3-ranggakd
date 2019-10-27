(function(global) {

  var canvas, gl, program, program2;
  var theta = 0,
      scale = 1,
      membesar = 1;
  var linesVertices, triangleVertices;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // UI Event
    window.addEventListener('resize', resizer);
    
    // Get canvas element and check if WebGL enabled
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);
    
    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
    fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);

    resizer();
    render();
  }

  function render() {
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Bersihkan buffernya canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //kanan
    gl.useProgram(program);
    initBuffers('triangle');
    var scaleLoc = gl.getUniformLocation(program, 'scale');    
    if (scale >= 1) membesar = -1;
    else if (scale <= -1) membesar = 1;
    scale = scale + (membesar * 0.0120);
    gl.uniform1f(scaleLoc, scale);
    draw('triangle');

    // kiri
    gl.useProgram(program2);
    initBuffers('line');
    var thetaLoc = gl.getUniformLocation(program2, 'theta');
    theta += Math.PI * 0.0120;
    gl.uniform1f(thetaLoc, theta);
    draw('line');

    requestAnimationFrame(render); 
  }

  // draw!
  function draw(str) {
    // Draw
    if (str == 'line') {
      drawA(gl.LINE_LOOP, linesVertices);  
    }else{
      drawA(gl.TRIANGLE_STRIP, triangleVertices);
    }
  }

  function drawA(type, vertices) {
    var n = vertices.length / 5;
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(type, 0, n);
  }

  function initBuffers(str) {
    if (str == 'line') {
      // Definisi verteks dan buffer
      linesVertices = new Float32Array([
        -0.2, 0.2,    1.0, 1.0, 0.0,
        0.0, 0.0,     1.0, 1.0, 0.0,
        0.0, 0.2,     1.0, 1.0, 0.0,
        -0.1, 0.3,    1.0, 1.0, 0.0,
        0.0, 0.4,     1.0, 1.0, 0.0,
        0.0, 0.6,     1.0, 1.0, 0.0,
        -0.2, 0.8,    1.0, 1.0, 0.0,
        -0.3, 0.7,    1.0, 1.0, 0.0,
        -0.3, 0.1,    1.0, 1.0, 0.0,
        -0.2, 0.0,    1.0, 1.0, 0.0,
        -0.2, 0.4,    1.0, 1.0, 0.0,
        -0.2, 0.6,    1.0, 1.0, 0.0,
        -0.1, 0.5,    1.0, 1.0, 0.0,
        -0.2, 0.4,    1.0, 1.0, 0.0
      ]);  
    }else{
      // Definisi verteks dan buffer
      triangleVertices = new Float32Array([
        // x, y       r, g, b
        0.5, 0.0,     1.0, 1.0, 0.0,
        0.5, 0.2,     0.7, 0.0, 1.0,
        0.4, 0.1,     0.1, 1.0, 0.6,
        0.4, 0.3,     1.0, 1.0, 0.0,
        0.3, 0.2,     0.7, 0.0, 1.0,
        0.3, 0.4,     0.1, 1.0, 0.6,
        0.4, 0.3,     1.0, 1.0, 0.0,
        0.4, 0.5,     0.7, 0.0, 1.0,
        0.5, 0.4,     0.1, 1.0, 0.6,
        0.5, 0.6,     1.0, 1.0, 0.0,
        0.4, 0.5,     0.7, 0.0, 1.0,
        0.3, 0.8,     0.1, 1.0, 0.6,
        0.3, 0.6,     1.0, 1.0, 0.0,
        0.2, 0.7,     0.7, 0.0, 1.0,
        0.3, 0.4,     0.1, 1.0, 0.6,
        0.2, 0.1,     1.0, 1.0, 0.0,
        0.3, 0.0,     0.7, 0.0, 1.0
      ]);
    }
    var vertexBuffer = gl.createBuffer();      
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    if (str == 'line') {
      gl.bufferData(gl.ARRAY_BUFFER, linesVertices, gl.STATIC_DRAW);
      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
    }else{
      gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
    }
    if (vPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }
    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      2,          // jumlah elemen per attribute
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // draw();
  }

})(window || this);
