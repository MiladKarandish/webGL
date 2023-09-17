/** @type {HTMLCanvasElement} */
import { mat4 } from 'gl-matrix';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexData = [0, 1, 0, 1, -1, 0, -1, -1, 0];

const colorData = [
  1,
  0,
  0, // V1.color
  0,
  1,
  0, // V2.color
  0,
  0,
  1, // V3.color
];

// Position
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// Color buffer
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
precision mediump float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

uniform mat4 matrix;

void main() {
  vColor = color;
  gl_Position = matrix * vec4(position, 1);
}
`
);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragmentShader,
  `
precision mediump float;

varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1);
}
`
);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const posiitonLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(posiitonLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(posiitonLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const uniformLocation = {
  matrix: gl.getUniformLocation(program, 'matrix'),
};

const matrix = mat4.create();
// mat4.translate(matrix, matrix, [0.2, 0.5, 0]);
// mat4.scale(matrix, matrix, [0.25, 0.25, 0.25]);

const animate = () => {
  requestAnimationFrame(animate);

  mat4.rotateZ(matrix, matrix, Math.PI / 2 / 70);
  gl.uniformMatrix4fv(uniformLocation.matrix, false, matrix);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

animate();

// mat4.translate(matrix, matrix, [-1, -3, 0]);
