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
    const spd=10;
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
    //moveVector should be normalize
    const size=Math.sqrt(moveVector[0]*moveVector[0]+moveVector[1]*moveVector[1]+moveVector[2]*moveVector[2]);
    for(let k=0; k<3; ++k){
        moveVector[k]=moveVector[k]/(size*2);
    }
}
window.addEventListener("mousemove",e=>{
    if(pointerlock){
    canvas.requestPointerLock =canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();
    }
    rotation[1]=-e.movementY/400;
    rotation[2]=e.movementX/400;
});