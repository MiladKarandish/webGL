/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexData = [0, 1, 0, 1, -1, 0, -1, -1, 0];

// Position
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
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
`
);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(
  fragmentShader,
  ` 
  void main(void) {
    
    
    gl_FragColor = vec4(0, 1, 0 , 1);
  }
  `
);
// vec2 cPos = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;
// float cLength = length(cPos);

// vec2 uv = gl_FragCoord.xy/resolution.xy+(cPos/cLength)*cos(cLength*12.0-time*4.0)*0.03;
// vec3 col = texture2D(tex,uv).xyz;
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const posiitonLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(posiitonLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(posiitonLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
