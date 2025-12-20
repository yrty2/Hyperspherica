let moveVector=[0,0,1];
let rotation=[0,0,0];
const r=450;
let frames=0;
let auto=false;
const camera=[0,0,0];//pos-cam->viewpos
const canvas=document.querySelector(".canvas");
canvas.width=screen.width-4;
canvas.height=screen.height-4;
canvas.style.border="2px solid";
const ctx=canvas.getContext("2d");
function clip(u,b){
    const v=projection.stereographic3D(u);
    v.x-=camera[0];
    v.y=-(v.y+camera[1]);
    v.z-=camera[2];
    if(v.z>0){
        const p=projection.perspective(v).scale(canvas.height).add(new cartesian2D(canvas.width/2,canvas.height/2));
        if(b){
            return new cartesian(p.x,p.y,canvas.height/v.z);
        }
    return p;
    }
}
function point(p){
    if(p!==undefined){
    ctx.beginPath();
    ctx.arc(p.x,p.y,5,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    }
}
function pointwithSize(p){
    if(p!==undefined && p.z<200){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.z*0.15,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    }
}
function plot(v){
    pointwithSize(clip(v,true));
}
const points=[];
const colors=[];
function translate(){
    ctx.strokeStyle="#ffffff";
    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let k=0; k<points.length; ++k){
        let p=points[k];
        p.rotate(rotation[0],rotation[1],rotation[2]);
        p.translate(0,0,1);
        ctx.fillStyle=`rgba(${255*colors[k][0]},${255*colors[k][1]},${255*colors[k][2]},0.66)`;
        plot(p);
        //line(p,[1,0,0],r);line(p,[0,1,0],r);line(p,[0,0,1],r);
        //cube(p,10);
    }
    keycontrol();
    frames++;
    requestAnimationFrame(translate);
    rotation=[0,0,0]
}
translate();
generate();
function generate(){
    const S=24;//12
    for(let x=0; x<S; ++x){
    for(let y=0; y<S; ++y){
    for(let z=0; z<S; ++z){
        colors.push([x/S,y/S,z/S]);
        points.push(new spherical4D(r,new cartesian4D(
            Math.cos(2*Math.PI*x/S)*Math.sin(2*Math.PI*y/S)*Math.sin(2*Math.PI*z/S),
            Math.sin(2*Math.PI*x/S)*Math.sin(2*Math.PI*y/S)*Math.sin(2*Math.PI*z/S),
            Math.cos(2*Math.PI*y/S)*Math.sin(2*Math.PI*z/S),
            Math.cos(2*Math.PI*z/S)).scale(r)));
    }
    }
    }
}