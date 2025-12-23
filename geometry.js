//geometric library created by yrty2
//require geometric algebra in mathematics.js
//処理速度は考えられていない。(でもnewはそんなにコストにならないらしい)

//coordinate systems
class cartesian2D{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    get length(){
        return Math.hypot(this.x,this.y);
    }
    get arg(){
        return Math.atan2(this.y,this.x);
    }
    add(v){
        return new cartesian2D(this.x+v.x,this.y+v.y);
    }
    sub(v){
        return new cartesian2D(this.x-v.x,this.y-v.y);
    }
    get poler(){
        return new spherical2D(this.length,this.arg);
    }
    scale(x){
        return new cartesian2D(this.x*x,this.y*x);
    }
    get vector(){
        const a=new Float64Array(2);
        a[0]=this.x;
        a[1]=this.y;
        return a;
    }
}
class cartesian{
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
    }
    scale(x){
        return new cartesian(this.x*x,this.y*x,this.z*x);
    }
    mul(cart){
        return new cartesian(this.x*cart.x,this.y*cart.y,this.z*cart.z);
    }
    normalize(){
        return this.normal;
    }
    get normal(){
        return this.scale(1/this.length);
    }
    get length(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
    }
    get vector(){
        return [this.x,this.y,this.z];
    }
}
class cartesian4D{
    constructor(x,y,z,w){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w;
    }
    scale(x){
        return new cartesian4D(this.x*x,
        this.y*x,
        this.z*x,
        this.w*x)
    }
    get length(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
    }
}
class spherical2D{
    constructor(radius,theta){
        this.radius=radius;
        this.theta=theta;
    }
    convertCartesian(){
        return new cartesian2D(this.radius*Math.cos(this.theta),this.radius*Math.sin(this.theta));
    }
    get cartesian(){
        return this.convertCartesian();
    }
}
class polerSpherical{
    constructor(r,p,s){
        this.radius=r;
        this.theta=p;
        this.phi=s;
    }
    get cartesian(){
        //極はy軸とする。
        return (new cartesian(Math.cos(this.theta)*Math.sin(this.phi),Math.cos(this.phi),Math.sin(this.theta)*Math.sin(this.phi))).scale(this.radius);
    }
    translate(x,y){
        this.phi+=y;
        this.theta+=x;
    }
    get stereographic(){
        projection.stereographic(this);
    }
}
class spherical{
    //極が存在しない球面座標系
    constructor(r,v){
        this.r=r;
        this.x=v.x;
        this.y=v.y;
        this.z=v.z;
    }
    copy(){
        return new spherical(this.r,this.cartesian);
    }
    get clifford(){
        this.cliff=[0,this.x,this.y,this.z,0,0,0,0];
    }
    translate(x,y){
        //x=rで2piに相当
        const s=Math.hypot(x,y);
        if(s!=0){
        const rot=[Math.cos(Math.PI*s/this.r),0,0,0,0,y*Math.sin(Math.PI*s/this.r)/s,-x*Math.sin(Math.PI*s/this.r)/s,0];
        const v=clifford.rotate3D(new vector(this.x,this.y,this.z),rot);
        this.x=v.x;
        this.y=v.y;
        this.z=v.z;
        }
    }
    rotate(rot){
        const v=clifford.rotate3D(new vector(this.x,this.y,this.z),rot);
        this.x=v.x;
        this.y=v.y;
        this.z=v.z;
    }
    puremove(x,y){
        //x=rで2piに相当
        const s=Math.hypot(x,y);
        if(s!=0){
        const rot=[Math.cos(s/2),0,0,0,0,y*Math.sin(s/2)/s,-x*Math.sin(s/2)/s,0];
        const v=clifford.rotate3D(new vector(this.x,this.y,this.z),rot);
        this.x=v.x;
        this.y=v.y;
        this.z=v.z;
        }
    }
    rotor(p){
        //p,qの回転面(球面では単に軸)
        const c=clifford.product3D([0,this.x,this.y,this.z,0,0,0,0],[0,p.x,p.y,p.z,0,0,0,0]);
        const s=Math.sqrt(c[4]*c[4]+c[5]*c[5]+c[6]*c[6]);
        return [c[4]/s,c[5]/s,c[6]/s];
    }
    arg(p){
        //p,qの角度
        const l=Math.acos((this.x*p.x+this.y*p.y+this.z*p.z)/(this.r*p.r))
        if(isNaN(l)){
            return 0;
        }
        return l;
    }
    length(p){
        const l=Math.acos((this.x*p.x+this.y*p.y+this.z*p.z)/(this.r*p.r))*this.r;
        if(isNaN(l)){
            return 0;
        }
        return l;
    }
    translateBack(x,y){
        //x=rで2piに相当
        const s=Math.hypot(x,y);
        const rot=[Math.cos(Math.PI*s/this.r),0,0,0,0,y*Math.sin(Math.PI*s/this.r)/s,x*Math.sin(Math.PI*s/this.r)/s,0];
        const v=clifford.rotate3D(new vector(this.x,this.y,this.z),rot);
        return new spherical(this.r,v);
    }
    get cartesian(){
        return new cartesian(this.x,this.y,this.z);
    }
}
class spherical4D{
    constructor(r,v){
        this.r=r;
        this.x=v.x;
        this.y=v.y;
        this.z=v.z;
        this.w=v.w;
    }
    copy(){
        return new spherical4D(this.r,this.cartesian)
    }
    arg(p){
        //p,qの角度
        const l=Math.acos((this.x*p.x+this.y*p.y+this.z*p.z+this.w*p.w)/(this.r*p.r));
        if(isNaN(l)){
            return 0;
        }
        return l;
    }
    rotor(p){
        //p,qの回転面(球面では単に軸)
        const c=clifford.product4D([0,this.x,this.y,this.z,this.w,0,0,0,0,0,0,0,0,0,0,0],[0,p.x,p.y,p.z,p.w,0,0,0,0,0,0,0,0,0,0,0]);
        const s=Math.sqrt(c[5]*c[5]+c[6]*c[6]+c[7]*c[7]+c[8]*c[8]+c[9]*c[9]+c[10]*c[10]);
        if(s>0){
        return [c[5]/s,c[6]/s,c[7]/s,c[8]/s,c[9]/s,c[10]/s];
        }
        return -1;
    }
    get vector(){
        return [this.x,this.y,this.z,this.w];
    }
    cliffordrotate(rot){
        const v=clifford.rotate4D(this.vector,rot);
        this.x=v[0];
        this.y=v[1];
        this.z=v[2];
        this.w=v[3];
    }
    length(p){
        const l=this.arg(p)*this.r;
        if(isNaN(l)){
            return 0;
        }
        return l;
    }
    translate(x,y,z){
        const s=Math.sqrt(x*x+y*y+z*z);
        if(s>0){
        const theta=Math.PI*(s/this.r);
        const ss=Math.sin(theta)/s;
        //x=rで2piに相当
        const v=clifford.rotate4D([this.x,this.y,this.z,this.w],[Math.cos(theta),0,0,0,0,0,0,0,-x*ss,y*ss,-z*ss,0,0,0,0,0]);
        this.x=v[0];
        this.y=v[1];
        this.z=v[2];
        this.w=v[3];
        }
    }
    translateBack(x,y,z){
        //x=rで2piに相当
        const s=Math.sqrt(x*x+y*y+z*z);
        if(s>0){
        const theta=Math.PI*(s/this.r);
        const ss=Math.sin(theta)/s;
        //x=rで2piに相当
        const v=clifford.rotate4D([this.x,this.y,this.z,this.w],[Math.cos(theta),0,0,0,0,0,0,0,-x*ss,y*ss,-z*ss,0,0,0,0,0]);
        return new spherical4D(this.r,new cartesian4D(v[0],v[1],v[2],v[3]));
        }
        return this.copy();
    }
    rotate(xy,yz,zx){
        const s=Math.sqrt(xy*xy+yz*yz+zx*zx);
        if(s>0){
        const ss=Math.sin(s)/s;
        const v=clifford.rotate4D([this.x,this.y,this.z,this.w],[Math.cos(s),0,0,0,0,xy*ss,yz*ss,zx*ss,0,0,0,0,0,0,0,0]);
        this.x=v[0];
        this.y=v[1];
        this.z=v[2];
        this.w=v[3];
        }
    }
    get cartesian(){
        return new cartesian4D(this.x,this.y,this.z,this.w);
    }
}
class hyperbolic{
    //双曲面
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        if(!z){
        this.z=Math.sqrt(1+x*x+y*y);
        }else{
            this.z=z;
        }
    }
    translate(x,y){
        x=-x;
        y=y;
        const s=Math.sqrt(x*x+y*y);
        const t=Math.atan2(y,x);
        //xだけ回転
        //yだけ回転
        let a=hyperbolicAlgebra.lorentz([this.x,this.y,this.z],[Math.cosh(x),0,Math.sinh(x),0]);
        a=hyperbolicAlgebra.lorentz(a,[Math.cosh(y),0,0,Math.sinh(y)]);
        return new hyperbolic(a[0],a[1],a[2]);
    }
}
class topology{
}
const projection={
    //射影
    orthogonal(cart){
        if(cart.z>0){
        return new cartesian2D(cart.x,cart.y);
        }
    },
    perspective(cart){
        if(cart.z>0){
            return new cartesian2D(cart.x/cart.z,cart.y/cart.z);
        }
    },
    stereographic(pole){
        if(pole.constructor==polerSpherical){
        return (new cartesian2D(Math.cos(pole.theta)*Math.sin(pole.phi),
                Math.sin(pole.theta)*Math.sin(pole.phi))).scale(pole.radius/(1-Math.cos(pole.phi)));
        }
        return (new cartesian2D(pole.x,pole.y)).scale(1/(1-pole.z/pole.r));
    },
    stereographic3D(pole){
        return (new cartesian(pole.x,pole.y,pole.z)).scale(1/(1-pole.w/pole.r));
    },
    poincareDisk(hyp){
        return this.orthogonal(hyp);
        //return (new cartesian2D(hyp.x,-hyp.y)).scale(1/(1+Math.sqrt(1+hyp.x*hyp.x+hyp.y*hyp.y)));
    }
}
const hyperbolicAlgebra={
    //Cl(2,1) even biquaternion
    //[scalar,x(spherical),y(hyperbolic),z(hyperbolic),xy,yz,zx,xyz]
    //let xy is i , yz is j , zx is k
    //i^2=1,j^2=-1,k^2=1, mean one rotation and 2 movedirection in hyperbolic surface
    //ij=xyyz=xz=-k
    mul(p,q){
        return [p[0]*q[0]+p[1]*q[1]+p[2]*q[2]-p[3]*q[3]-p[4]*q[4]+p[5]*q[5]+p[6]*q[6]+p[7]*q[7],p[0]*q[1]+p[1]*q[0]-p[2]*q[4]+p[3]*q[5]+p[4]*q[2]-p[5]*q[3]+p[6]*q[7]+p[7]*q[6],p[0]*q[2]+p[1]*q[4]+p[2]*q[0]+p[3]*q[6]-p[4]*q[1]-p[5]*q[7]-p[6]*q[3]-p[7]*q[5],p[0]*q[3]+p[1]*q[5]+p[2]*q[6]+p[3]*q[0]-p[4]*q[7]-p[5]*q[1]-p[6]*q[2]-p[7]*q[4],p[0]*q[4]+p[1]*q[2]-p[2]*q[1]-p[3]*q[7]+p[4]*q[0]+p[5]*q[6]-p[6]*q[5]-p[7]*q[3],p[0]*q[5]+p[1]*q[3]-p[2]*q[7]-p[3]*q[1]+p[4]*q[6]+p[5]*q[0]-p[6]*q[4]-p[7]*q[2],p[0]*q[6]+p[1]*q[7]+p[2]*q[3]-p[3]*q[2]-p[4]*q[5]+p[5]*q[4]+p[6]*q[0]+p[7]*q[1],p[0]*q[7]+p[1]*q[6]-p[2]*q[5]+p[3]*q[4]+p[4]*q[3]-p[5]*q[2]+p[6]*q[1]+p[7]*q[0]];
    },
    conjugate(p){
        //自己同型写像
        return [p[0],p[1],p[2],p[3],-p[4],-p[5],-p[6],-p[7]];
    },
    rotorConjugate(u){
        return [u[0],-u[1],-u[2],-u[3]];
    },
    rotorToCl(u){
        return [u[0],0,0,0,u[1],u[2],u[3],0];
    },
    vectorToCl(v){
        return [0,v[0],v[1],v[2],0,0,0,0];
    },
    clToVector(p){
        return [p[1],p[2],p[3]];
    },
    clToCartesian(p){
        return new cartesian(p[1],p[2],p[3]);
    },
    lorentz(vector,rotor){
        //transformation
        return this.clToVector(this.mul(this.mul(this.rotorToCl(rotor),this.vectorToCl(vector)),this.rotorToCl(this.rotorConjugate(rotor))));
    },
    cartesianLorentz(cartesian,rotor){
        //transformation
        return this.clToCartesian(this.mul(this.mul(this.rotorToCl(rotor),this.vectorToCl(cartesian.vector)),this.rotorToCl(this.rotorConjugate(rotor))));
    }
}
function Cl(hyperbolic,imaginary){
    let V=Array(hyperbolic).fill(1);
    V.push(...Array(imaginary).fill(-1));
    //v is like [1,1,-1] [-1,-1,-1]
    const n=hyperbolic+imaginary;
    let cl=Array(n);
    for(let k=0; k<n; k++){
        cl[k]=k;
    }
    cl=maths.power(cl);
    //返すのは数式
    function Clmul(u,v){
        //u,v->[0,1,2] これは基底の積。最終的に昇順に。
        let a=[...u,...v];//[0,1,1,2],[1]^2は？
        let h=1;
        //入れ替えソート(符号反転が行われる。)
        while(true){
            let zyun=true;
            let hold=0;
            for(let k=0; k<a.length; ++k){
                if(hold<=a[k]){
                }else{
                    zyun=false;
                    break;
                }
                hold=a[k];
            }
            if(zyun){
                break;
            }
            //ここに処理
            for(let k=1; k<a.length; ++k){
                if(a[k-1]>a[k]){
                    const holder=a[k-1];
                    a[k-1]=a[k];
                    a[k]=holder;
                    h*=(-1);
                }
            }
        }
        //2乗項を探す。(場合によっては符号反転が行われる)
        for(let k=1; k<a.length; ++k){
            if(a[k-1]==a[k]){
                h*=V[a[k]];
                a=[...a.slice(0,k-1),...a.slice(k+1,a.ength)]
                k--;
            }
        }
        return [a,h];
    }
    const tapes=Array(cl.length).fill("");
    //冪集合の積
    let tape="return [";
    for(let i=0; i<cl.length; ++i){
    for(let j=0; j<cl.length; ++j){
        const a=Clmul(cl[i],cl[j]);
        const id=cl.findIndex(e=>e.join()==a[0].join());
        if(id!=-1){
            let hugou="+";
            if(a[1]==-1){
                hugou="-";
            }else if(tapes[id].length==0){
                hugou="";
            }
            tapes[id]+=`${hugou}p[${i}]*q[${j}]`;
        }else{
            console.warn("おい！おかしいぞ！");
        }
    }
    }
    for(let k=0; k<tapes.length; ++k){
        tape+=tapes[k];
        if(k+1<tapes.length){
            tape+=",";
        }
    }
    return tape+"]";
}