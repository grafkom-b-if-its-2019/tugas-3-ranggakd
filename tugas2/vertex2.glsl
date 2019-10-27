precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
// uniform float scale;

void main() {
  fColor = vColor;
  // gl_Position = vec4(vPosition, 0.0, 1.0);
  // p' = p
  // p' = T * p
  // mat4 skalasi = mat4(
  //   scale, 0.0, 0.0, 0.3,
  //   0.0, 1.0, 0.0, 0.0,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // );
  // gl_Position = vec4(vPosition, 0.0, 1.0) * skalasi;
  
  mat4 translasi = mat4(
    1.0, 0.0, 0.0, 0.15,   // dx = 0.5 (jarak titik tengah huruf)
    0.0, 1.0, 0.0, -0.4,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  // gl_Position = vec4(vPosition, 0.0, 1.0) * translasi;
  
  mat4 invtranslasi = mat4(
    1.0, 0.0, 0.0, -0.15,   // dx = 0.5 (jarak titik tengah huruf)
    0.0, 1.0, 0.0, 0.4,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 rotasi = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * translasi * rotasi * invtranslasi;
  // gl_Position = vec4(vPosition, 0.0, 1.0) * rotasi;
  
}
