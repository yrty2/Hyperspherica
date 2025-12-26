//定数のリスト
struct Uniforms{
    //画面のアスペクト比や、世界の半径などの定数。
    //Hypersphericaの世界は半径7である。スクリーンの横幅の長さの7倍に匹敵する。
    //体積は約6770.5、ここでいう1はPCの横幅の大きさなので、PCの横幅が50cmだとすると約0.846立方メートルであり、AIによるとドラム式洗濯機ぐらいの大きさだそうだ。かなり狭い世界であるため、長い距離をいったり来たりすると曲率のために錯覚が起こる。
    //円周はスクリーンの横幅のおよそ44個分の長さあたる。
    constants:vec4<f32>,
    //カメラの姿勢(四元数)
    rotation:vec4<f32>
}
@binding(0) @group(0) var<uniform> uniforms:Uniforms;
struct VertexOutput{
//頂点シェーダーがフラグメントシェーダーにわたす値
  @builtin(position) Position:vec4<f32>,
  @location(0) fragColor:vec4<f32>,
  @location(1) normal:vec3<f32>
}
//Cl0,4の積の配列による表現
fn mul(p:array<f32,16>,q:array<f32,16>)->array<f32,16>{return array<f32,16>(p[0]*q[0]-p[1]*q[1]-p[2]*q[2]-p[3]*q[3]-p[4]*q[4]-p[5]*q[5]-p[6]*q[6]-p[7]*q[7]-p[8]*q[8]-p[9]*q[9]-p[10]*q[10]+p[11]*q[11]+p[12]*q[12]+p[13]*q[13]+p[14]*q[14]+p[15]*q[15],p[0]*q[1]+p[1]*q[0]+p[2]*q[5]+p[3]*q[6]+p[4]*q[7]-p[5]*q[2]-p[6]*q[3]-p[7]*q[4]-p[8]*q[11]-p[9]*q[12]-p[10]*q[13]-p[11]*q[8]-p[12]*q[9]-p[13]*q[10]-p[14]*q[15]+p[15]*q[14],p[0]*q[2]-p[1]*q[5]+p[2]*q[0]+p[3]*q[8]+p[4]*q[9]+p[5]*q[1]+p[6]*q[11]+p[7]*q[12]-p[8]*q[3]-p[9]*q[4]-p[10]*q[14]+p[11]*q[6]+p[12]*q[7]+p[13]*q[15]-p[14]*q[10]-p[15]*q[13],p[0]*q[3]-p[1]*q[6]-p[2]*q[8]+p[3]*q[0]+p[4]*q[10]-p[5]*q[11]+p[6]*q[1]+p[7]*q[13]+p[8]*q[2]+p[9]*q[14]-p[10]*q[4]-p[11]*q[5]-p[12]*q[15]+p[13]*q[7]+p[14]*q[9]+p[15]*q[12],p[0]*q[4]-p[1]*q[7]-p[2]*q[9]-p[3]*q[10]+p[4]*q[0]-p[5]*q[12]-p[6]*q[13]+p[7]*q[1]-p[8]*q[14]+p[9]*q[2]+p[10]*q[3]+p[11]*q[15]-p[12]*q[5]-p[13]*q[6]-p[14]*q[8]-p[15]*q[11],p[0]*q[5]+p[1]*q[2]-p[2]*q[1]-p[3]*q[11]-p[4]*q[12]+p[5]*q[0]+p[6]*q[8]+p[7]*q[9]-p[8]*q[6]-p[9]*q[7]-p[10]*q[15]-p[11]*q[3]-p[12]*q[4]-p[13]*q[14]+p[14]*q[13]-p[15]*q[10],p[0]*q[6]+p[1]*q[3]+p[2]*q[11]-p[3]*q[1]-p[4]*q[13]-p[5]*q[8]+p[6]*q[0]+p[7]*q[10]+p[8]*q[5]+p[9]*q[15]-p[10]*q[7]+p[11]*q[2]+p[12]*q[14]-p[13]*q[4]-p[14]*q[12]+p[15]*q[9],p[0]*q[7]+p[1]*q[4]+p[2]*q[12]+p[3]*q[13]-p[4]*q[1]-p[5]*q[9]-p[6]*q[10]+p[7]*q[0]-p[8]*q[15]+p[9]*q[5]+p[10]*q[6]-p[11]*q[14]+p[12]*q[2]+p[13]*q[3]+p[14]*q[11]-p[15]*q[8],p[0]*q[8]-p[1]*q[11]+p[2]*q[3]-p[3]*q[2]-p[4]*q[14]+p[5]*q[6]-p[6]*q[5]-p[7]*q[15]+p[8]*q[0]+p[9]*q[10]-p[10]*q[9]-p[11]*q[1]-p[12]*q[13]+p[13]*q[12]-p[14]*q[4]-p[15]*q[7],p[0]*q[9]-p[1]*q[12]+p[2]*q[4]+p[3]*q[14]-p[4]*q[2]+p[5]*q[7]+p[6]*q[15]-p[7]*q[5]-p[8]*q[10]+p[9]*q[0]+p[10]*q[8]+p[11]*q[13]-p[12]*q[1]-p[13]*q[11]+p[14]*q[3]+p[15]*q[6],p[0]*q[10]-p[1]*q[13]-p[2]*q[14]+p[3]*q[4]-p[4]*q[3]-p[5]*q[15]+p[6]*q[7]-p[7]*q[6]+p[8]*q[9]-p[9]*q[8]+p[10]*q[0]-p[11]*q[12]+p[12]*q[11]-p[13]*q[1]-p[14]*q[2]-p[15]*q[5],p[0]*q[11]+p[1]*q[8]-p[2]*q[6]+p[3]*q[5]+p[4]*q[15]+p[5]*q[3]-p[6]*q[2]-p[7]*q[14]+p[8]*q[1]+p[9]*q[13]-p[10]*q[12]+p[11]*q[0]+p[12]*q[10]-p[13]*q[9]+p[14]*q[7]-p[15]*q[4],p[0]*q[12]+p[1]*q[9]-p[2]*q[7]-p[3]*q[15]+p[4]*q[5]+p[5]*q[4]+p[6]*q[14]-p[7]*q[2]-p[8]*q[13]+p[9]*q[1]+p[10]*q[11]-p[11]*q[10]+p[12]*q[0]+p[13]*q[8]-p[14]*q[6]+p[15]*q[3],p[0]*q[13]+p[1]*q[10]+p[2]*q[15]-p[3]*q[7]+p[4]*q[6]-p[5]*q[14]+p[6]*q[4]-p[7]*q[3]+p[8]*q[12]-p[9]*q[11]+p[10]*q[1]+p[11]*q[9]-p[12]*q[8]+p[13]*q[0]+p[14]*q[5]-p[15]*q[2],p[0]*q[14]-p[1]*q[15]+p[2]*q[10]-p[3]*q[9]+p[4]*q[8]+p[5]*q[13]-p[6]*q[12]+p[7]*q[11]+p[8]*q[4]-p[9]*q[3]+p[10]*q[2]-p[11]*q[7]+p[12]*q[6]-p[13]*q[5]+p[14]*q[0]+p[15]*q[1],p[0]*q[15]+p[1]*q[14]-p[2]*q[13]+p[3]*q[12]-p[4]*q[11]+p[5]*q[10]-p[6]*q[9]+p[7]*q[8]+p[8]*q[7]-p[9]*q[6]+p[10]*q[5]+p[11]*q[4]-p[12]*q[3]+p[13]*q[2]-p[14]*q[1]+p[15]*q[0]);}

//4次元ベクトルをCl0,4に変換
fn vec2cliff(v:vec4<f32>)->array<f32,16>{
return array<f32,16>(0,v.x,v.y,v.z,v.w,0,0,0,0,0,0,0,0,0,0,0);
}

//Cl0,4を4次元ベクトルに変換
fn cliff2vec(v:array<f32,16>)->vec4<f32>{
return vec4<f32>(v[1],v[2],v[3],v[4]);
}

//Cl0,4の共役写像
fn conjugate(u:array<f32,16>)->array<f32,16>{
return array<f32,16>(u[0],u[1],u[2],u[3],u[4],-u[5],-u[6],-u[7],-u[8],-u[9],-u[10],-u[11],-u[12],-u[13],-u[14],u[15]);
}

//等長写像
fn rotate(v:vec4<f32>,rot:array<f32,16>)->vec4<f32>{
return cliff2vec(mul(mul(rot,vec2cliff(v)),conjugate(rot)));
}

//任意の2点から回転面成分を計算
fn cliff2rotor(p:vec4<f32>,q:vec4<f32>)->array<f32,16>{
let v=mul(vec2cliff(p),vec2cliff(q));
let s:f32=sqrt(v[5]*v[5]+v[6]*v[6]+v[7]*v[7]+v[8]*v[8]+v[9]*v[9]+v[10]*v[10]);
if(s>0){
let P=array<f32,6>(v[5]/s,v[6]/s,v[7]/s,v[8]/s,v[9]/s,v[10]/s);
let t:f32=acos(dot(p,q)/(uniforms.constants.x*uniforms.constants.x))/2;
let sint:f32=sin(t);
return array<f32,16>(cos(t),0,0,0,0,sint*P[0],sint*P[3],sint*P[2],sint*P[1],sint*P[4],sint*P[5],0,0,0,0,0);
}
return array<f32,16>(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
}

//上のものと同じだが、計算時間短縮のためついでに球面上の2点間の距離を近似する裏技的なことを行っている
fn cliff2rotorL(p:vec4<f32>,q:vec4<f32>)->array<f32,16>{
let v=mul(vec2cliff(p),vec2cliff(q));
let s:f32=sqrt(v[5]*v[5]+v[6]*v[6]+v[7]*v[7]+v[8]*v[8]+v[9]*v[9]+v[10]*v[10]);
if(s>0){
let P=array<f32,6>(v[5]/s,v[6]/s,v[7]/s,v[8]/s,v[9]/s,v[10]/s);
let t:f32=acos(dot(p,q)/(uniforms.constants.x*uniforms.constants.x))/2;
let sint:f32=sin(t);
return array<f32,16>(cos(t),0,0,0,0,sint*P[0],sint*P[3],sint*P[2],sint*P[1],sint*P[4],sint*P[5],0,0,0,0,2*t*uniforms.constants.x);
}
return array<f32,16>(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
}

//四元数の積
fn qmul(p:vec4<f32>,q:vec4<f32>)->vec4<f32>{
return p.x*q+vec4<f32>(-dot(p.yzw,q.yzw),cross(p.yzw,q.yzw)+q.x*p.yzw);
}

//立体射影を拡張したもの
fn stereographic(v:vec4<f32>)->vec3<f32>{
return v.xyz/(1-v.w/uniforms.constants.x);
}

//頂点シェーダーと呼ばれる、未加工の点群データを加工し、座標変換や射影を行う部分
@vertex
fn main(@location(0) position: vec4<f32>,@location(1) normal: vec3<f32>,@location(2) color:vec3<f32>,@location(3) pos:vec4<f32>,@location(4) format:f32,@location(5) posture:vec4<f32>,@location(6) joint:vec4<f32>)->VertexOutput{
  let r=uniforms.constants.x;
  let center=vec4<f32>(0,0,0,-r);//center 立体射影すると原点となる点

  //立方体ごとに与えられる4D座標posから、centerをposまで回転させるための回転面成分rotを生成。
  var rotor=cliff2rotorL(center,pos);
  let dist:f32=rotor[15];
  rotor[15]=0;
  let look=array<f32,16>(uniforms.rotation.x,0,0,0,0,uniforms.rotation.w,-uniforms.rotation.z,0,uniforms.rotation.y,0,0,0,0,0,0,0);
  if(format==0 || format==2 || format==3 || format==4){
  rotor=mul(look,rotor);
  }
  var output : VertexOutput;
  //4D点、position(これは定数)に等長変換を行い位置を適切な場所に移動させ、立体射影する。
  var p=stereographic(rotate(position,rotor));
  //姿勢制御
  var n=normal;
  //format 1はプレイヤー,2はレーザー,3は小さな星,4は敵。
  //敵には独立した四元数による姿勢(posture)が与えられる。
  //pはある物体を構成する単位球面立方体(ボクセル)それぞれの中心座標であり、jointは敵の中心を表す球面上の4D点。
  //敵がある方向を向いているようにみせるためには、敵を構成するボクセル全体がjoint周りに回転する必要があるが、これがなかなかうまくいってくれない。
  //ちなみにjointとpostureは敵ごとに同じ値が与えられる。
  if(format==1){
    p=qmul(qmul(posture,vec4<f32>(0,p)),vec4<f32>(posture.x,-posture.yzw)).yzw;
  }
  if(format==4){
  //敵の姿勢制御
  //関節位置を3D点に変換
    let j=stereographic(rotate(joint,mul(look,cliff2rotor(center,joint))));
    //j周りの回転。
    p=qmul(qmul(posture,vec4<f32>(0,p-j)),vec4<f32>(posture.x,-posture.yzw)).yzw+j;
  }
  //透視投影 3D->2D
  p=vec3<f32>(p.xy/p.z,p.z*dist/100000);
  //アスペクト比の調節。
  p.y*=uniforms.constants.y;
  //効率化のためスクリーンからはみ出る不要な点をフィルターする。 なおここでのx,yはクリップ座標系であり、画面上に入る点はx,yが-1~1の範囲にあるような点のみ。z値が負の値になっている場合、深度バッファによって不要な部分のみ自動で削除される。
  if(abs(p.x)<=1.3 && abs(p.y)<=1.3){
  output.Position=vec4<f32>(p,1);
  output.normal=n;
  var alpha:f32=1;
  if(format==2 || format==3){
  alpha=0;
  }
  //見かけ上近くにあるものを目立たなくさせるために、球面上の距離が遠いほど背景色と同化するようにしている。
  output.fragColor=vec4<f32>(color*pow(dist,-0.5),alpha);
  }
  return output;
}

//フラグメントシェーダーと呼ばれる、スクリーン上の決まった位置(頂点シェーダーによって与えられる)につける色を計算する部分。
//単純な光の計算も行っているが、重要ではない。
@fragment
fn fragmain(@location(0) fragColor: vec4<f32>,@location(1) normal:vec3<f32>) -> @location(0) vec4<f32>{
    return vec4<f32>((dot(-normal,vec3<f32>(0,0,1))+1)/2*fragColor.xyz,fragColor.w);
}