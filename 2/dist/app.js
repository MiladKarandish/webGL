(() => {
  // src/app.js
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl");
  var vertexData = [0, 1, 0, 1, -1, 0, -1, -1, 0];
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D tex;

attribute vec3 position;

varying highp vec2 vTextureCoord;

void main() {
  gl_Position = vec4(position, 1);
}
`);
  gl.compileShader(vertexShader);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, ` 
  void main(void) {
    
    
    gl_FragColor = vec4(0, 1, 0 , 1);
  }
  `);
  gl.compileShader(fragmentShader);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var posiitonLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(posiitonLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(posiitonLocation, 3, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
})();
