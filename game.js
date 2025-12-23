let shotInterval={
    interval:6,
    timer:0,
}

function ray(){
    for(let k=0; k<1; ++k){
        const s=9+k-player.dist;
    box(rot3([2.5,3.5,s]),[1,1,1],[1,0,0],"rays",{move:[-3*forward[1],-3*forward[2],-3*forward[3]]});
    box(rot3([-2.5,3.5,s]),[1,1,1],[1,0,0],"rays",{move:[-3*forward[1],-3*forward[2],-3*forward[3]]});
    }
}
function fire(){
    if(shotInterval.timer==0){
    ray();
    shotInterval.timer=shotInterval.interval;
    }
}
function gameloop(){
    if(shotInterval.timer>0){
        shotInterval.timer--;
    }
    for(const p of rays){
            //他点に衝突すれば削除する。
            //O(n^2)...ラグの温床になるよ
            for(const q of points){
                if(q.tag=="enemy" || q.tag=="sphere"){
                if((q.pos.x-p.pos.x)*(q.pos.x-p.pos.x)+(q.pos.y-p.pos.y)*(q.pos.y-p.pos.y)+(q.pos.z-p.pos.z)*(q.pos.z-p.pos.z)+(q.pos.w-p.pos.w)*(q.pos.w-p.pos.w)<0.1 && q.pos.length(p.pos)<0.1){
                    if(q.tag=="sphere"){
                        rays=deleteIndex(rays,rays.findIndex(e=>e.seed==p.seed));
                        break;
                    }
                    if(q.tag=="enemy"){
                    destroyEnemy(enemydata.findIndex(e=>e.seed==q.info.seed));
                    rays=deleteIndex(rays,rays.findIndex(e=>e.seed==p.seed));
                    break;
                    }
                }
                }
            }
    }
}
function destroyEnemy(id){
    for(const p of points){
        if(p.tag=="enemy" && p.info.seed==enemydata[id].seed){
            p.tag="debri";
        }
    }
    alert("you beat it!");
    enemydata=deleteIndex(enemydata,id);
}