precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
// uniform float theta;
uniform float scale;

void main() {
  fColor = vColor;
  // gl_Position = vec4(vPosition, 0.0, 1.0);
  // p' = p
  // p' = T * p

  // mat4 translasi = mat4(
  //   1.0, 0.0, 0.0, 0.001,   // dx = 0.5
  //   0.0, 1.0, 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // );
  // gl_Position = vec4(vPosition, 0.0, 1.0) * translasi;
    mat4 to_origin = mat4(
    1.0, 0.0, 0.0, -0.35,
    0.0, 1.0, 0.0, -0.4,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * to_origin;

  mat4 skalasi = mat4(
    scale, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = gl_Position * skalasi;  

  mat4 inv_to_origin = mat4(
    1.0, 0.0, 0.0, 0.35,
    0.0, 1.0, 0.0, 0.4,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = gl_Position * inv_to_origin;  

  // gl_Position = vec4(vPosition, 0.0, 1.0) * skalasi;
  
  // mat4 rotasi = mat4(
  //   cos(theta), -sin(theta), 0.0, 0.0,
  //   sin(theta), cos(theta), 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // );
  // gl_Position = gl_Position * rotasi;
  
}
