import {
  fetchShaderTexts,
  createProgram,
} from '../../../helpers/webglHelpers.js';

console.log('Some title');
const shaderTextPromise = fetchShaderTexts(
  'checkerboard.vert.glsl',
  'checkerboard.frag.glsl'
);
const CANVAS = document.getElementById('webgl-checkerboard');
const gl = CANVAS.getContext('webgl2');
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.frontFace(gl.CCW);
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
const shaderTexts = await shaderTextPromise;

const program = createProgram(
  gl,
  shaderTexts.vertexShaderText,
  shaderTexts.fragmentShaderText
);

gl.useProgram(program);

/*******************************\
* Interesting stuff goes here. *
\*******************************/

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleData), gl.STATIC_DRAW);

const vertexAttributeLocation = gl.getAttribLocation(
  program,
  'VERTEX_POSITION'
);
gl.vertexAttribPointer(
  vertexAttributeLocation,
  2,
  gl.FLOAT,
  false,
  2 * Float32Array.BYTES_PER_ELEMENT,
  0
);
gl.enableVertexAttribArray(vertexAttributeLocation);
gl.drawArrays(gl.TRIANGLES, 0, triangleData.length);
