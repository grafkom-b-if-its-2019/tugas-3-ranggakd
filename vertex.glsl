precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 theta;
uniform float scale;
uniform mat4 projection;
uniform mat4 modelview;
uniform vec3 bounce;
uniform float center;

void main() {
  fColor = vColor;
  mat4 to_origin = mat4(
    1.0, 0.0, 0.0, -0.35,
    0.0, 1.0, 0.0, -0.4,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, -2.0, 1.0
  );

  mat4 bounce = mat4(
    1.0, 0.0, 0.0, bounce.x,
    0.0, 1.0, 0.0, bounce.y,
    0.0, 0.0, 1.0, bounce.z,
    0.0, 0.0, 0.0, 1.0
  );

  vec4 vecCenter = vec4(center,0,0,1.0);

  mat4 skalasi = mat4(
    scale, 0.0, 0.0, -(vecCenter.x)*scale + (vecCenter.x),
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  // mat4 inv_to_origin = mat4(
  //   1.0, 0.0, 0.0, 0.35,
  //   0.0, 1.0, 0.0, 0.4,
  //   0.0, 0.0, 1.0, 0.0,
  //   0.0, 0.0, 0.0, 1.0
  // );

  gl_Position = vec4(vPosition, 0.0, 1.0) * bounce * skalasi;
  gl_Position = projection * modelview * to_origin * gl_Position;
  
}
