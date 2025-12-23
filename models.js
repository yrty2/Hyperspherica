function fighter(){
    const dist=player.dist;
    const j=center;
    box([0,-3,-12+dist],[2,1,13],[0.7,0.7,0.7],"fighter",j);
    box([0,-2.5,-7+dist],[1,2,1],[0.4,0.4,0.4],"fighter",j);
    box([0,-3,-22.5+dist],[1,1,5],[0.7,0.7,0.7],"fighter",j);

    box([0,-2.5,-5+dist],[1,2,1],[0.7,0.7,1],"fighter",j);
    box([0,-2,-11+dist],[1,1,3],[0.7,0.7,1],"fighter",j);
    //wings
    box([1,-3.2,-8+dist],[1,1,4],[0.7,0.7,0.7],"fighter",j);
    box([2,-3.2,-7+dist],[1,1,2],[0.7,0.7,0.7],"fighter",j);
    box([3,-3.3,-7+dist],[1,1,2],[0.7,0.7,0.7],"fighter",j);
    box([-1,-3.2,-8+dist],[1,1,4],[0.7,0.7,0.7],"fighter",j);
    box([-2,-3.2,-7+dist],[1,1,2],[0.7,0.7,0.7],"fighter",j);
    box([-3,-3.3,-7+dist],[1,1,2],[0.7,0.7,0.7],"fighter",j);

    //firearm
    box([2.5,-3.5,-9+dist],[1,1,2],[0.5,0.5,0.5],"fighter",j);
    box([-2.5,-3.5,-9+dist],[1,1,2],[0.5,0.5,0.5],"fighter",j);
    box([2.5,-3.2,-7+dist],[1,1,1],[0.1,0.1,0.8],"fighter",j);
    box([-2.5,-3.2,-7+dist],[1,1,1],[0.1,0.1,0.8],"fighter",j);

    //jet
    box([0,-2.3,-4+dist],[1,1,1],[0.2,0.2,0.2],"fighter",j);

    box([0,-2.3,-3.5+dist],[1,1,1],[0.5,0.5,0.5],"fighter",j);
}
function enemyfighter(p,posture){
    const seed=Math.random();
    enemydata.push({
        identifer:"jetfighter",
        seed:seed,
        posture:posture,
    });
    const info={
        seed:seed
    };
    const j=p.copy();
    boxp(p,[0,-3,-12],[2,1,13],[0.7,0.7,0.7],"enemy",info,j,posture);
    boxp(p,[0,-2.5,-7],[1,2,1],[0.4,0.4,0.4],"enemy",info,j,posture);
    boxp(p,[0,-3,-20],[1,1,5],[0.7,0.7,0.7],"enemy",info,j,posture);

    boxp(p,[0,-2.5,-5],[1,2,1],[0.7,0.7,1],"enemy",info,j,posture);
    boxp(p,[0,-2,-11],[1,1,3],[0.7,0.7,1],"enemy",info,j,posture);
    //wings
    boxp(p,[1,-3.2,-8],[1,1,4],[0.7,0.7,0.7],"enemy",info,j,posture);
    boxp(p,[2,-3.2,-7],[1,1,2],[0.7,0.7,0.7],"enemy",info,j,posture);
    boxp(p,[3,-3.3,-7],[1,1,2],[0.7,0.7,0.7],"enemy",info,j,posture);
    boxp(p,[-1,-3.2,-8],[1,1,4],[0.7,0.7,0.7],"enemy",info,j,posture);
    boxp(p,[-2,-3.2,-7],[1,1,2],[0.7,0.7,0.7],"enemy",info,j,posture);
    boxp(p,[-3,-3.3,-7],[1,1,2],[0.7,0.7,0.7],"enemy",info,j,posture);

    //firearm
    boxp(p,[2.5,-3.5,-9],[1,1,2],[0.5,0.5,0.5],"enemy",info,j,posture);
    boxp(p,[-2.5,-3.5,-9],[1,1,2],[0.5,0.5,0.5],"enemy",info,j,posture);
    boxp(p,[2.5,-3.2,-7],[1,1,1],[0.5,0.5,0],"enemy",info,j,posture);
    boxp(p,[-2.5,-3.2,-7],[1,1,1],[0.5,0.5,0],"enemy",info,j,posture);

    //jet
    boxp(p,[0,-2.3,-4],[1,1,1],[0.2,0.2,0.2],"enemy",info,j,posture);

    boxp(p,[0,-2.3,-3.5],[1,1,1],[0.5,0.5,0.5],"enemy",info,j,posture);
}