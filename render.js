const r=7;
const center=new spherical4D(r,new cartesian4D(0,0,0,-r));
const northpole=new spherical4D(r,new cartesian4D(0,0,0,r));
let inst=[];
const canvas=document.querySelector(".canvas");
canvas.width=screen.width;
canvas.height=screen.height;
async function main(){
// webgpuコンテキストの取得
const context = canvas.getContext('webgpu');

// deviceの取得
const g_adapter = await navigator.gpu.requestAdapter();
const g_device = await g_adapter.requestDevice();
//デバイスを割り当て
const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
context.configure({
  device: g_device,
  format: presentationFormat,
  alphaMode: 'opaque'
});

//深度テクスチャ
var depthTexture;
      depthTexture =g_device.createTexture({
    size: [canvas.width,canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
});
    
const WGSL=`
struct Uniforms {
    constants:vec4<f32>,
    rotation:vec4<f32>
}
@binding(0) @group(0) var<uniform> uniforms:Uniforms;
struct VertexOutput{
  @builtin(position) Position:vec4<f32>,
  @location(0) fragColor:vec4<f32>,
  @location(1) normal:vec3<f32>
}
fn mul(p:array<f32,16>,q:array<f32,16>)->array<f32,16>{return array<f32,16>(p[0]*q[0]-p[1]*q[1]-p[2]*q[2]-p[3]*q[3]-p[4]*q[4]-p[5]*q[5]-p[6]*q[6]-p[7]*q[7]-p[8]*q[8]-p[9]*q[9]-p[10]*q[10]+p[11]*q[11]+p[12]*q[12]+p[13]*q[13]+p[14]*q[14]+p[15]*q[15],p[0]*q[1]+p[1]*q[0]+p[2]*q[5]+p[3]*q[6]+p[4]*q[7]-p[5]*q[2]-p[6]*q[3]-p[7]*q[4]-p[8]*q[11]-p[9]*q[12]-p[10]*q[13]-p[11]*q[8]-p[12]*q[9]-p[13]*q[10]-p[14]*q[15]+p[15]*q[14],p[0]*q[2]-p[1]*q[5]+p[2]*q[0]+p[3]*q[8]+p[4]*q[9]+p[5]*q[1]+p[6]*q[11]+p[7]*q[12]-p[8]*q[3]-p[9]*q[4]-p[10]*q[14]+p[11]*q[6]+p[12]*q[7]+p[13]*q[15]-p[14]*q[10]-p[15]*q[13],p[0]*q[3]-p[1]*q[6]-p[2]*q[8]+p[3]*q[0]+p[4]*q[10]-p[5]*q[11]+p[6]*q[1]+p[7]*q[13]+p[8]*q[2]+p[9]*q[14]-p[10]*q[4]-p[11]*q[5]-p[12]*q[15]+p[13]*q[7]+p[14]*q[9]+p[15]*q[12],p[0]*q[4]-p[1]*q[7]-p[2]*q[9]-p[3]*q[10]+p[4]*q[0]-p[5]*q[12]-p[6]*q[13]+p[7]*q[1]-p[8]*q[14]+p[9]*q[2]+p[10]*q[3]+p[11]*q[15]-p[12]*q[5]-p[13]*q[6]-p[14]*q[8]-p[15]*q[11],p[0]*q[5]+p[1]*q[2]-p[2]*q[1]-p[3]*q[11]-p[4]*q[12]+p[5]*q[0]+p[6]*q[8]+p[7]*q[9]-p[8]*q[6]-p[9]*q[7]-p[10]*q[15]-p[11]*q[3]-p[12]*q[4]-p[13]*q[14]+p[14]*q[13]-p[15]*q[10],p[0]*q[6]+p[1]*q[3]+p[2]*q[11]-p[3]*q[1]-p[4]*q[13]-p[5]*q[8]+p[6]*q[0]+p[7]*q[10]+p[8]*q[5]+p[9]*q[15]-p[10]*q[7]+p[11]*q[2]+p[12]*q[14]-p[13]*q[4]-p[14]*q[12]+p[15]*q[9],p[0]*q[7]+p[1]*q[4]+p[2]*q[12]+p[3]*q[13]-p[4]*q[1]-p[5]*q[9]-p[6]*q[10]+p[7]*q[0]-p[8]*q[15]+p[9]*q[5]+p[10]*q[6]-p[11]*q[14]+p[12]*q[2]+p[13]*q[3]+p[14]*q[11]-p[15]*q[8],p[0]*q[8]-p[1]*q[11]+p[2]*q[3]-p[3]*q[2]-p[4]*q[14]+p[5]*q[6]-p[6]*q[5]-p[7]*q[15]+p[8]*q[0]+p[9]*q[10]-p[10]*q[9]-p[11]*q[1]-p[12]*q[13]+p[13]*q[12]-p[14]*q[4]-p[15]*q[7],p[0]*q[9]-p[1]*q[12]+p[2]*q[4]+p[3]*q[14]-p[4]*q[2]+p[5]*q[7]+p[6]*q[15]-p[7]*q[5]-p[8]*q[10]+p[9]*q[0]+p[10]*q[8]+p[11]*q[13]-p[12]*q[1]-p[13]*q[11]+p[14]*q[3]+p[15]*q[6],p[0]*q[10]-p[1]*q[13]-p[2]*q[14]+p[3]*q[4]-p[4]*q[3]-p[5]*q[15]+p[6]*q[7]-p[7]*q[6]+p[8]*q[9]-p[9]*q[8]+p[10]*q[0]-p[11]*q[12]+p[12]*q[11]-p[13]*q[1]-p[14]*q[2]-p[15]*q[5],p[0]*q[11]+p[1]*q[8]-p[2]*q[6]+p[3]*q[5]+p[4]*q[15]+p[5]*q[3]-p[6]*q[2]-p[7]*q[14]+p[8]*q[1]+p[9]*q[13]-p[10]*q[12]+p[11]*q[0]+p[12]*q[10]-p[13]*q[9]+p[14]*q[7]-p[15]*q[4],p[0]*q[12]+p[1]*q[9]-p[2]*q[7]-p[3]*q[15]+p[4]*q[5]+p[5]*q[4]+p[6]*q[14]-p[7]*q[2]-p[8]*q[13]+p[9]*q[1]+p[10]*q[11]-p[11]*q[10]+p[12]*q[0]+p[13]*q[8]-p[14]*q[6]+p[15]*q[3],p[0]*q[13]+p[1]*q[10]+p[2]*q[15]-p[3]*q[7]+p[4]*q[6]-p[5]*q[14]+p[6]*q[4]-p[7]*q[3]+p[8]*q[12]-p[9]*q[11]+p[10]*q[1]+p[11]*q[9]-p[12]*q[8]+p[13]*q[0]+p[14]*q[5]-p[15]*q[2],p[0]*q[14]-p[1]*q[15]+p[2]*q[10]-p[3]*q[9]+p[4]*q[8]+p[5]*q[13]-p[6]*q[12]+p[7]*q[11]+p[8]*q[4]-p[9]*q[3]+p[10]*q[2]-p[11]*q[7]+p[12]*q[6]-p[13]*q[5]+p[14]*q[0]+p[15]*q[1],p[0]*q[15]+p[1]*q[14]-p[2]*q[13]+p[3]*q[12]-p[4]*q[11]+p[5]*q[10]-p[6]*q[9]+p[7]*q[8]+p[8]*q[7]-p[9]*q[6]+p[10]*q[5]+p[11]*q[4]-p[12]*q[3]+p[13]*q[2]-p[14]*q[1]+p[15]*q[0]);}
fn vec2cliff(v:vec4<f32>)->array<f32,16>{
return array<f32,16>(0,v.x,v.y,v.z,v.w,0,0,0,0,0,0,0,0,0,0,0);
}
fn cliff2vec(v:array<f32,16>)->vec4<f32>{
return vec4<f32>(v[1],v[2],v[3],v[4]);
}
fn conjugate(u:array<f32,16>)->array<f32,16>{
return array<f32,16>(u[0],u[1],u[2],u[3],u[4],-u[5],-u[6],-u[7],-u[8],-u[9],-u[10],-u[11],-u[12],-u[13],-u[14],u[15]);
}
fn rotate(v:vec4<f32>,rot:array<f32,16>)->vec4<f32>{
return cliff2vec(mul(mul(rot,vec2cliff(v)),conjugate(rot)));
}
fn cliff2rotor(p:vec4<f32>,q:vec4<f32>)->array<f32,8>{
let v=mul(vec2cliff(p),vec2cliff(q));
let s:f32=sqrt(v[5]*v[5]+v[6]*v[6]+v[7]*v[7]+v[8]*v[8]+v[9]*v[9]+v[10]*v[10]);
let P=array<f32,6>(v[5]/s,v[6]/s,v[7]/s,v[8]/s,v[9]/s,v[10]/s);
let t:f32=acos(dot(p,q)/(uniforms.constants.x*uniforms.constants.x))/2;
let sint:f32=sin(t);
return array<f32,8>(cos(t),sint*P[0],sint*P[1],sint*P[2],sint*P[3],sint*P[4],sint*P[5],2*t*uniforms.constants.x);
}
fn qmul(p:vec4<f32>,q:vec4<f32>)->vec4<f32>{
return vec4<f32>(p.x*q.x-dot(p.yzw,q.yzw),
           p.x*q.y+p.y*q.x+p.z*q.w-p.w*q.z,
           p.x*q.z+p.z*q.x+p.w*q.y-p.y*q.w,
           p.x*q.w+p.w*q.x+p.y*q.z-p.z*q.y);
}
@vertex
fn main(@location(0) position: vec4<f32>,@location(1) normal: vec3<f32>,@location(2) color:vec3<f32>,@location(3) pos:vec4<f32>,@location(4) format:f32,@location(5) posture:vec4<f32>) -> VertexOutput {
  let r=uniforms.constants.x;
  let center=vec4<f32>(0,0,0,-r);
  //posからrotを生成。
  let rotor=cliff2rotor(center,pos);
  var rot=array<f32,16>(rotor[0],0,0,0,0,rotor[1],rotor[4],rotor[3],rotor[2],rotor[5],rotor[6],0,0,0,0,0);
  var output : VertexOutput;
  var q=position;
  q=rotate(q,rot);
  //ステレオグラフィック
  var p=q.xyz/(1-q.w/r);
  //姿勢制御
  var n=normal;
  if(format==0 || format==2 || format==3){
  p=qmul(qmul(uniforms.rotation,vec4<f32>(0,p)),vec4<f32>(uniforms.rotation.x,-uniforms.rotation.yzw)).yzw;
  n=qmul(qmul(uniforms.rotation,vec4<f32>(0,normal)),vec4<f32>(uniforms.rotation.x,-uniforms.rotation.yzw)).yzw;
  }
  p=(qmul(qmul(posture,vec4<f32>(0,p)),vec4<f32>(posture.x,-posture.yzw)).yzw);
  //パースペクティブ
  p=vec3<f32>(p.x/p.z,uniforms.constants.y*p.y/p.z,p.z*rotor[7]/100000);
  if(abs(p.x)<=1.5 && abs(p.y)<=1.5){
  output.Position=vec4<f32>(p,1);
  output.normal=n;
  var alpha:f32=1;
  if(format==2 || format==3){
  alpha=0;
  }
  output.fragColor=vec4<f32>(color/pow(rotor[7],0.5),alpha);
  }
  return output;
}
@fragment
fn fragmain(@location(0) fragColor: vec4<f32>,@location(1) normal:vec3<f32>) -> @location(0) vec4<f32> {
    return vec4<f32>((dot(-normal,vec3<f32>(0,0,1))+1)/2*fragColor.xyz,fragColor.w);
}
`;
function render(){
const quadVertexArray=vertex;
// 頂点データを作成.
const verticesBuffer=g_device.createBuffer({
  size: quadVertexArray.byteLength,
  usage: GPUBufferUsage.VERTEX,
  mappedAtCreation: true,
});
new Float32Array(verticesBuffer.getMappedRange()).set(quadVertexArray);
verticesBuffer.unmap();

//インデックス配列
const quadIndexArray=indexarray;
const indicesBuffer=g_device.createBuffer({
  size: quadIndexArray.byteLength,
  usage: GPUBufferUsage.INDEX,
  mappedAtCreation: true,
});
//マップしたバッファデータをセット
new Uint16Array(indicesBuffer.getMappedRange()).set(quadIndexArray);
indicesBuffer.unmap();

//Uniformバッファ
const uniformBufferSize = 4*(4+4);
  const uniformBuffer = g_device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});
var bufferPosition=0;
function bind(a){
const p=new Float32Array(a);
g_device.queue.writeBuffer(
  uniformBuffer,
  bufferPosition,
  p.buffer,
  p.byteOffset,
  p.byteLength
);
bufferPosition+=p.byteLength;
}
    bind([r,canvas.width/canvas.height,0,0]);
    bind(rotation);
//レンダーパイプラインの設定
const pipeline = g_device.createRenderPipeline({
  layout: 'auto',
  vertex: {
    module: g_device.createShaderModule({
      code: WGSL,
    }),
    entryPoint: 'main',
    buffers: [
      {
        arrayStride: 4*(4+3),
        attributes: [
          {
            shaderLocation: 0,
            offset: 0,
            format: 'float32x4',
          },
          {
            shaderLocation: 1,
            offset: 4*(4),
            format: 'float32x3',
          }
        ],
      },
        {//インスタンス
       	  arrayStride: 4*(3+4+1+4),
          stepMode: 'instance',
          attributes: [
            {
                //color
			  shaderLocation:2,
              offset: 0,
              format: 'float32x3'
            },
              //rotor <-important
              {
			  shaderLocation:3,
              offset: 4*(3),
              format: 'float32x4'
            },
              {
			  shaderLocation:4,
              offset: 4*(3+4),
              format: 'float32'
            },
              {
			  shaderLocation:5,
              offset: 4*(3+4+1),
              format: 'float32x4'
            }
          ]
        }
    ],
  },
  fragment: {
    module: g_device.createShaderModule({
      code: WGSL,
    }),
    entryPoint: 'fragmain',
    //canvasのフォーマットを指定
    targets: [
      {
        format: presentationFormat,
          //アルファブレンディング
          
        blend: {
              color: {
                srcFactor: 'one',
                dstFactor: 'one-minus-src-alpha'
              },
              alpha: {
                srcFactor: 'one',
                dstFactor: 'one-minus-src-alpha'
              },
            },
      },
    ],
  },
  primitive: {
    topology: 'triangle-list',
  },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
});

//インスタンスバッファを作成
const instancePositions=new Float32Array(inst);
  const instancesBuffer = g_device.createBuffer({
    size: instancePositions.byteLength,
    usage: GPUBufferUsage.VERTEX,
    mappedAtCreation: true,
  });
  new Float32Array(instancesBuffer.getMappedRange()).set(instancePositions);
  instancesBuffer.unmap();

//バインドグループを作成
const bindGroup = g_device.createBindGroup({
  layout: pipeline.getBindGroupLayout(0),
  entries: [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
      }
    }
  ],
});
//コマンドバッファの作成
const commandEncoder = g_device.createCommandEncoder();
//レンダーパスの設定
const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor= {
    colorAttachments: [
      {
        view: textureView,
        clearValue:{r:0,g:0,b:0,a:1},
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
      //depthStencil
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthClearValue: 1,
      depthLoadOp: 'clear',
      depthStoreOp: 'store',
    },
  };
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  //レンダーパイプラインを与える
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.setVertexBuffer(0,verticesBuffer);
  passEncoder.setIndexBuffer(indicesBuffer, 'uint16');
  passEncoder.setVertexBuffer(1,instancesBuffer);
  passEncoder.drawIndexed(quadIndexArray.length,Math.floor(instancePositions.length/(3+4+1+4)));
  passEncoder.end();
  g_device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(render);
    translate();
}
    render();
}