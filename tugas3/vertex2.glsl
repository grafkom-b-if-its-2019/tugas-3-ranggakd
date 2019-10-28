precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;
uniform float scale;
uniform mat4 projection;
uniform mat4 modelview;

void main() {
  fColor = vColor;
  mat4 translasi = mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, -2.0, 1.0 // menjauhi 2 dari kamera
    );
  mat4 skalasi = mat4(
    1.5, 0.0, 0.0, 0.0,
    0.0, 1.5, 0.0, 0.0,
    0.0, 0.0, 1.5, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = projection * modelview * translasi * skalasi * vec4(vPosition, 1.0);

}
