let inst=[];
async function getShaderCode(){
    const a=await fetch("shader.wgsl").then(e=>e.text());
    return a;
}
const geo=new geometry(1,3);
let wgpu;
async function init(){
    const code=await getShaderCode();
    wgpu=new WGPU(geo,8+16,code,"instance");
    wgpu.bindvertex(vertex);
    wgpu.bindindex(indexarray);
    await wgpu.initialize(document.querySelector(".canvas"),["float32x3","float32x3"],["float32x3","float32x3","float32","float32x3"]);
    wgpu.background=[0,0,0];
    function gameloop(){
        wgpu.uniform=[geo.curvature,geo.radius,screen.width/screen.height,0,...rotation,...mat4asarray(world)];
        wgpu.render(inst);
        translate();
        requestAnimationFrame(gameloop);
    }
    gameloop();
}
init();