//旋回速度は限度があるようにする。
//また、物体の姿勢を追加。四元数
let trueview=true;
let moveVector=[0,0,1];
let rotVelocity=[0,0];
let rotation=[1,0,0,0];
let forward=[0,0,0,0];
let enemydata=[];
let stars=[];
let points=[];
let rays=[];

function translate(){
    keycontrol();
    forward=qmul(qmul([rotation[0],-rotation[1],-rotation[2],-rotation[3]],[0,0,0,player.speed]),[rotation[0],rotation[1],rotation[2],rotation[3]]);
    for(const s of stars){
        //s.pos.translate(forward[1],-forward[2],forward[3]);
        s.pos.translate(forward[1],-forward[2],forward[3]);
    }
    for(const p of rays){
        p.pos.translate(forward[1]+p.info.move[0],-forward[2]-p.info.move[1],forward[3]+p.info.move[2]);
    }
    for(const p of points){
        if(p.tag=="fighter"){
            let up=-rotVelocity[1]/2;
            p.posture=rotor3([up,rotVelocity[0]/2,rotVelocity[0]]);
        }else{
        p.pos.translate(forward[1],-forward[2],forward[3]);//ブーストで二倍
        //p.pos.rotate(1/240,0,0);
        }
    }
    gameloop();
    instantiate();
}
function instantiate(){
    inst=[];
    for(const q of points){
        let type=0;
        if(q.tag=="fighter"){
            type=1;
        }
        if(q.tag=="enemy"){
            type=4;
        }
        inst.push(...q.color,q.pos.x,q.pos.y,q.pos.z,q.pos.w,type,...q.posture,q.joint.x,q.joint.y,q.joint.z,q.joint.w);
    }
    for(const q of stars){
        inst.push(1,1,1,q.pos.x,q.pos.y,q.pos.z,q.pos.w,3,1,0,0,0,q.joint.x,q.joint.y,q.joint.z,q.joint.w);
    }
    for(const r of rays){
        inst.push(1,0,0,r.pos.x,r.pos.y,r.pos.z,r.pos.w,2,1,0,0,0,r.joint.x,r.joint.y,r.joint.z,r.joint.w);
    }
}
generate();
function generate(){
    const S=24;//12
    for(let x=1; x<S; ++x){
    for(let y=1; y<S; ++y){
    for(let z=1; z<S; ++z){
        const pos=new spherical4D(r,new cartesian4D(
            Math.cos(2*Math.PI*x/S)*Math.sin(2*Math.PI*y/S)*Math.sin(2*Math.PI*z/S),
            Math.sin(2*Math.PI*x/S)*Math.sin(2*Math.PI*y/S)*Math.sin(2*Math.PI*z/S),
            Math.cos(2*Math.PI*y/S)*Math.sin(2*Math.PI*z/S),
            Math.cos(2*Math.PI*z/S)).scale(r));
        plot(pos,[1,1,1],"stars");
        if(Math.random()<0.03/9 && lengthFromPlayer(pos)>2){
        sphere(pos,"sphere",math.randInt(2,6));
        }
    }
    }
    }
    instantiate();
}
function plot(spherical,color,tag,info,joint,posture){
    if(!tag){
        tag="global";
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
        info:info,
        joint:joint,
        seed:Math.random()
    });
    }else{
    points.push({
        posture:posture,
        color:color,
        pos:spherical,
        tag:tag,
        info:info,
        joint:joint,
        seed:Math.random()
    });
    }
}
function getrotor(p){
    //諸悪の根源
    const g=center.rotor(p);
    if(g==-1){
        return [[1,0,0,0,0,0,0,0],0];
    }
    const t=center.arg(p)/2;
    const sint=Math.sin(t);
    return [
        [Math.cos(t),g[0]*sint,g[1]*sint,g[2]*sint,g[3]*sint,g[4]*sint,g[5]*sint,0],
        t*2*p.r
        ];
}
function lengthFromPlayer(p){
    const d=p.r*(Math.PI-Math.acos(p.w/Math.sqrt(p.x*p.x+p.y*p.y+p.z*p.z+p.w*p.w)));
    if(isNaN(d)){
        return 0;
    }
    return d;
}
function sphere(p,tag,s){
    const C=[Math.random(),Math.random(),Math.random()];
    for(let i=-s; i<=s; ++i){
    for(let j=-s; j<=s; ++j){
    for(let k=-s; k<=s; ++k){
        if(Math.abs(i*i+j*j+k*k-s*s)<s && Math.abs(r*Math.PI/2-center.length(p))>3){
    plot(p.translateBack(i/100,j/100,k/100),C,tag);
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
function box(pos,size,color,tag,info,joint,posture){
    //size should be in N
    const offset=[size[0]/2,size[1]/2,size[2]/2];
    for(let i=0; i<size[0]; ++i){
    for(let j=0; j<size[1]; ++j){
    for(let k=0; k<size[2]; ++k){
        plot(center.translateBack((pos[0]-offset[0]+0.5)/100+i/100,(pos[1]-offset[1]+0.5)/100+j/100,(pos[2]-offset[2]+0.5)/100+k/100),color,tag,info,joint,posture);
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
    const a=qmul(qmul([rotation[0],-rotation[1],-rotation[2],-rotation[3]],[0,v[0],v[1],-v[2]]),[rotation[0],rotation[1],rotation[2],rotation[3]]);
    return [a[1],-a[2],a[3]];
}
function rotor3(v){
    const s=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
    if(s>0){
    const sint=Math.sin(s);
    return [Math.cos(s),sint*v[0]/s,sint*v[1]/s,sint*v[2]/s];
    }
    return [1,0,0,0];
}
fighter();
function spawnEnemy(amount){
    for(let k=0; k<amount; ++k){
        const p=[Math.random(),Math.random(),Math.random(),Math.random()];
        const s=Math.sqrt(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]+p[3]*p[3]);
        enemyfighter(northpole,[p[0]/s,p[1]/s,p[2]/s,p[3]/s]);
    }
}
//spawnEnemy(20);
enemyfighter(center,[1,0,0,0])
enemyfighter(center,[1/Math.sqrt(2),1/Math.sqrt(2),0,0])
enemyfighter(center,[0,1,0,0])
main();