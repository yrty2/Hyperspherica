let world=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
//4次正方行列である必要がある？
let debug=false;
let dir=[0,0,1];
let rotVelocity=[0,0];
let rotation=[1,0,0,0];
let enemydata=[];
let stars=[];
let points=[];
let rays=[];
const sc=document.querySelector(".screencanvas");
sc.width=screen.width;
sc.height=screen.height;
const ctx=sc.getContext("2d");
ctx.font = "bold 22px serif";
function translate(){
    dir=rot3([0,0,1]);
    ctx.clearRect(0,0,sc.width,sc.height);
    ctx.fillStyle="#ffffff";
    /*for(const p of points){
        if(p.tag=="sphere"){
            //p.pos=geo.translate(p.pos,vectormul(dir,0.002));
        }
    }
    for(const p of stars){
        //p.pos=geo.translate(p.pos,vectormul(dir,0.002));
    }*/
    world=mat.prod(world,geo.translateMatrix(vectormul(dir,0.002)));
    instantiate();
}
function instantiate(){
    inst=[];
    for(const q of points){
        let type=1;
        if(q.tag=="fighter"){
            type=1;
        }
        if(q.tag=="enemy"){
            type=4;
        }
        inst.push(...q.color,...q.pos,type,...q.scale);
    }
    for(const q of stars){
        inst.push(1,1,1,...q.pos,0,...q.scale);
    }
    for(const r of rays){
        inst.push(1,0,0,r.pos.x,r.pos.y,r.pos.z,r.pos.w,2,1,0,0,0,r.joint.x,r.joint.y,r.joint.z,r.joint.w);
    }
}
function poler4D(a,b,c){
    const r=geo.radius;
    let sinc=Math.sin(c);
    let cosc=Math.cos(c);
    if(geo.curvature<0){
        sinc=Math.sinh(c);
        cosc=Math.cosh(c);
    }
    return geo.projected([r*Math.cos(a)*Math.sin(b)*sinc,r*Math.sin(a)*Math.sin(b)*sinc,r*Math.cos(b)*sinc,r*cosc]);
}
generate();
function generate(){
    const S=24;//12
    for(let x=1; x<S; ++x){
    for(let y=1; y<S; ++y){
    for(let z=1; z<S; ++z){
        const pos=poler4D(2*Math.PI*x/S,2*Math.PI*y/S,2*Math.PI*z/S);
        plot(pos,[1,1,1],"stars",[0.1,0.1,0.1]);
    }
    }
    }
    instantiate();
}
function plot(spherical,color,tag,scale,info,joint,posture){
    if(!tag){
        tag="global";
    }
    if(!scale){
        scale=[1,1,1];
    }
    if(!posture){
        posture=[1,0,0,0];
    }
    if(!joint){
        joint=spherical;
    }
    if(tag=="rays"){
        rays.push({
        posture:posture,
        color:color,
        pos:spherical,
        tag:tag,
        info:info,
        joint:joint,
        seed:Math.random()
        });
    }else if(tag=="stars"){
    stars.push({
        posture:posture,
        color:color,
        pos:spherical,
        tag:tag,
        scale:scale,
        info:info,
        joint:joint,
        seed:Math.random()
    });
    }else{
    points.push({
        posture:posture,
        color:color,
        scale:scale,
        pos:spherical,
        tag:tag,
        info:info,
        joint:joint,
        seed:Math.random()
    });
    }
}
function sphere(p,tag,s){
    const C=[Math.random(),Math.random(),Math.random()];
    //球球対応
    const a=0.04;
    for(let i=-s; i<=s; i+=a){
    for(let j=-s; j<=s; j+=a){
    for(let k=-s; k<=s; k+=a){
        if(Math.abs(i*i+j*j+k*k-s*s)<0.02){
            const q=vectormul(vectornormalize([i,j,k]),geo.pd(vectorlength([i,j,k])));
            plot(geo.translate(q,p),C,tag,[1,1,1]);
        }
    }
    }
    }
}
//for modeling
function boxp(p,pos,size,color,tag,info,joint,posture){
    const offset=[size[0]/2,size[1]/2,size[2]/2];
    for(let i=0; i<size[0]; ++i){
    for(let j=0; j<size[1]; ++j){
    for(let k=0; k<size[2]; ++k){
        plot(p.translateBack((pos[0]-offset[0]+0.5)/100+i/100,(pos[1]-offset[1]+0.5)/100+j/100,(pos[2]-offset[2]+0.5)/100+k/100),color,tag,info,joint,posture);
    }
    }
    }
}
function qmul(p,q){
    return [p[0]*q[0]-p[1]*q[1]-p[2]*q[2]-p[3]*q[3],
           p[0]*q[1]+p[1]*q[0]+p[2]*q[3]-p[3]*q[2],
           p[0]*q[2]+p[2]*q[0]+p[3]*q[1]-p[1]*q[3],
           p[0]*q[3]+p[3]*q[0]+p[1]*q[2]-p[2]*q[1]];
}
function rot3(v){
    return qmul(qmul([rotation[0],-rotation[1],-rotation[2],-rotation[3]],vectorneg([0,...v])),rotation).slice(1);
}
function rotor3(v){
    const s=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    if(s>0){
    const sint=Math.sin(s);
    return [Math.cos(s),sint*v[0]/s,sint*v[1]/s,sint*v[2]/s];
    }
    return [1,0,0,0];
}
//fighter();
function spawnEnemy(amount){
    for(let k=0; k<amount; ++k){
        const p=[Math.random(),Math.random(),Math.random(),Math.random()];
        const s=Math.sqrt(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]+p[3]*p[3]);
        enemyfighter(center,[p[0]/s,p[1]/s,p[2]/s,p[3]/s]);
    }
}
function mat4asarray(A){
    const res=[];
    for(let i=0; i<4; ++i){
        for(let j=0; j<4; ++j){
            res.push(A[i][j]);
        }
    }
    return res;
}
//spawnEnemy(20);
//enemyfighter(center,[1,0,0,0])
//enemyfighter(center,[Math.sqrt(2)/2,Math.sqrt(2)/2,0,0])
//enemyfighter(center,[0,1,0,0])
sphere([0,0,0],"sphere",0.5);
sphere([0,0,0.99],"sphere",0.5);
//ほもとぴーの修正が必須。
//main();