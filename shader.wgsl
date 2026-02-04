struct Uniforms{
    curvature:f32,
    radius:f32,
    aspect:f32,
    constant:f32,
    camrot:vec4<f32>,
    cam:mat4x4<f32>
}
@binding(0) @group(0) var<uniform> uni:Uniforms;
struct VertexOutput{
  @builtin(position) Position:vec4<f32>,
  @location(0) fragColor:vec4<f32>,
  @location(1) normal:vec3<f32>
}
//* S^3 isometries
fn translate(p:vec3<f32>,u:vec3<f32>)->vec3<f32>{
  let pp:f32=dot(p,p);
  let pu:f32=dot(p,u);
  let uu:f32=dot(u,u);
  return ((1-uni.curvature*(2*pu+pp))*u+(1+uni.curvature*uu)*p)/(1-2*uni.curvature*pu+uni.curvature*uni.curvature*uu*pp);
}
fn translateMatrix(p:vec3<f32>,m:mat4x4<f32>)->vec3<f32>{
  return stereographic(m*hypersphere(p));
}
fn rotate(p:vec3<f32>,rot:vec4<f32>)->vec3<f32>{
  return qmul(qmul(rot,vec4<f32>(0,p)),qconj(rot)).yzw;
}
fn sphericaldistance(p:vec3<f32>)->f32{
  return 2*atan(length(p));
}
fn scale(p:vec3<f32>,s:f32)->vec3<f32>{
  return tan(s*atan(length(p)))*normalize(p);
}
fn scaling(p:vec3<f32>,a:vec3<f32>)->vec3<f32>{
  let len:f32=length(p);
  return tan(a*atan(len))*p/len;
}
//quaternion math for posture
fn qconj(p:vec4<f32>)->vec4<f32>{
  return vec4<f32>(p.x,-p.yzw);
}
fn qmul(p:vec4<f32>,q:vec4<f32>)->vec4<f32>{
  return p.x*q+vec4<f32>(-dot(p.yzw,q.yzw),cross(p.yzw,q.yzw)+q.x*p.yzw);
}
//projections
fn equidist(p:vec3<f32>)->vec3<f32>{
  return 2*atan(length(p))*normalize(p);
}
fn hypersphere(p:vec3<f32>)->vec4<f32>{
  return vec4<f32>(2*p,(uni.curvature*dot(p,p)-1)/(sign(uni.curvature)*sqrt(abs(uni.curvature))))/(1+uni.curvature*dot(p,p));
}
fn stereographic(p:vec4<f32>)->vec3<f32>{
  return p.xyz/(1-sign(uni.curvature)*p.w/uni.radius);
}
fn cliffordTorus(p:vec3<f32>)->vec3<f32>{
  let hyp=hypersphere(p);
  return -vec3<f32>(atan2(hyp.y,hyp.x),atan(length(hyp.zw)/length(hyp.xy))-uni.aspect/2,atan2(hyp.w,hyp.z));
}
fn sphericalperspective(p:vec3<f32>)->vec3<f32>{
  let hyp=hypersphere(p);
  return -hyp.xyz/(hyp.w);
}
fn orthographic(p:vec3<f32>)->vec3<f32>{
  return hypersphere(p).xyz;
}
fn hyperbolic(p:vec3<f32>)->vec3<f32>{
  return 2*p/(1+(1+dot(p,p))/(1-dot(p,p)));
}
fn expmap(p:vec3<f32>)->vec3<f32>{
  let hyp=hypersphere(p);
  let theta:f32=acos(hyp.w);
  return theta/sin(theta)*(hyp.xyz);
}
fn angleworld(p:vec3<f32>)->vec3<f32>{
  let hyp=hypersphere(p);
  return vec3<f32>(atan2(hyp.x,hyp.w),atan2(hyp.y,hyp.w),atan2(hyp.z,hyp.w));
}
@vertex
fn main(@location(0) position:vec3<f32>,@location(1) normal:vec3<f32>,@location(2) color:vec3<f32>,@location(3) pos:vec3<f32>,@location(4) format:f32,@location(5) scale:vec3<f32>)->VertexOutput{
  var output : VertexOutput;
  //視点制御
  var scz=scale;
  var p=scaling(position,scz);
  p=rotate(translateMatrix(translate(p,pos),uni.cam),uni.camrot);
  //perspective
  var v=p;
  v=vec3<f32>(v.xy/v.z,v.z*0.000001);
  v.y*=uni.aspect;
  if(abs(v.x)<2 && abs(v.y)<2 && v.z>0){
    var alpha:f32=1;
    if(format==0){
      alpha=0.5;
    }
    let dist:f32=sphericaldistance(p);
    v.z=dist*0.000001;
    output.Position=vec4<f32>(v,1);
    output.normal=rotate(normal,uni.camrot);
    output.fragColor=vec4<f32>(color*pow(0.5,dist),alpha);
  }
  return output;
}
@fragment
fn fragmain(@location(0) fragColor: vec4<f32>,@location(1) normal:vec3<f32>) -> @location(0) vec4<f32>{
    return vec4<f32>((dot(-normal,vec3<f32>(0,0,1))+1)/2*fragColor.xyz,fragColor.w);
}