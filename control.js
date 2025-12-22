let pointerlock=false;
const key={
    w:false,
    a:false,
    s:false,
    d:false,
    space:false,
    shift:false,
}
window.addEventListener("keydown",e=>{
    if(e.code=="KeyW"){
        key.w=true;
    }
    if(e.code=="KeyS"){
        key.s=true;
    }
    if(e.code=="KeyA"){
        key.a=true;
    }
    if(e.code=="KeyD"){
        key.d=true;
    }
    if(e.code=="Space"){
        key.space=true;
    }
    if(e.code=="ShiftLeft"){
        key.shift=true;
    }
    if(e.code=="KeyP"){
        pointerlock=!pointerlock;
    }
    if(e.code=="KeyQ"){
        trueview=!trueview;
    }
});
window.addEventListener("keyup",e=>{
    if(e.code=="KeyW"){
        key.w=false;
    }
    if(e.code=="KeyS"){
        key.s=false;
    }
    if(e.code=="KeyA"){
        key.a=false;
    }
    if(e.code=="KeyD"){
        key.d=false;
    }
    if(e.code=="Space"){
        key.space=false;
    }
    if(e.code=="ShiftLeft"){
        key.shift=false;
    }
});
function keycontrol(){
    const gensui=0.9;
    rotVelocity[0]=rotVelocity[0]*gensui;
    rotVelocity[1]=rotVelocity[1]*gensui;
    if(key.w){
        moveVector[2]+=1;
    }
    if(key.s){
        moveVector[2]-=1;
    }
    if(key.a){
        moveVector[0]-=1;
    }
    if(key.d){
        moveVector[0]+=1;
    }
    if(key.space){
        moveVector[1]-=1;
    }
    if(key.shift){
        moveVector[1]+=1;
    }
    if(key.leftClick){
        fire();
    }
    //moveVector should be normalize
    const size=Math.sqrt(moveVector[0]*moveVector[0]+moveVector[1]*moveVector[1]+moveVector[2]*moveVector[2]);
    for(let k=0; k<3; ++k){
        moveVector[k]=moveVector[k]/(size*2);
    }
}
window.addEventListener("mousedown",e=>{
    key.leftClick=true;
});
window.addEventListener("mouseup",e=>{
    key.leftClick=false;
});
window.addEventListener("mousemove",e=>{
    if(pointerlock){
    canvas.requestPointerLock =canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();
    }
    const x=-e.movementX/400;
    const y=-e.movementY/400;
    const s=Math.hypot(x,y);
    rotVelocity=[rotVelocity[0]+x,rotVelocity[1]+y];
    const vs=rotVelocity[0]*rotVelocity[0]+rotVelocity[1]*rotVelocity[1];
    if(vs>1){
        const rvs=1/Math.sqrt(vs);
        rotVelocity[0]=rotVelocity[0]*rvs;
        rotVelocity[1]=rotVelocity[1]*rvs;
    }
    if(s>0){
    rotation=qmul([Math.cos(s),y*Math.sin(s)/s,x*Math.sin(s)/s,0],rotation);
    }
});