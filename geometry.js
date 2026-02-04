//任意曲率にチェンジ
class geometry{
    constructor(curvature,dim){
        this.curvature=curvature;
        this.dim=dim;
        if(this.curvature==0){
            this.radius=1;//本当は∞にするべきだが悪さをするので
        }else{
            this.radius=1/Math.sqrt(Math.abs(curvature));
        }
    }
    length(p){
        return this.apd(vectorlength(p));
    }
    distance(p,q){
        return this.length(this.translate(p,vectorneg(q)));
    }
    translate(p,q){
        if(this.curvature==0){
            return vectorsum(p,q);
        }
        if(this.dim==2){
            return c128.quot(c128.sum(p,q),c128.sub([1,0],c128.prod(c128.mul(p,c128.conjugate(q)),this.curvature)));
        }
        if(this.dim==3){
            const qq=vectordot(q,q);
            const pq=vectordot(p,q);
            const pp=vectordot(p,p);
            return vectormul(
                vectorsum(
                    vectormul(p,1+this.curvature*qq),
                    vectormul(q,1-this.curvature*(pp+2*pq))
                ),
                1/(1+this.curvature*(this.curvature*pp*qq-2*pq))
            );
            }
    }
    translateMatrix(p){
        //何かをp移動させるための行列
        if(this.dim==3){
            const pp=vectordot(p,p);
            const c=1/(1+this.curvature*pp);
            const qw=c*(1-this.curvature*pp);
            const u=vectormul(p,2*c);
            const K=this.curvature/(1+qw);
            return [
                [1-K*u[0]*u[0],-K*u[0]*u[1],-K*u[0]*u[2],u[0]],
                [-K*u[1]*u[0],1-K*u[1]*u[1],-K*u[1]*u[2],u[1]],
                [-K*u[2]*u[0],-K*u[2]*u[1],1-K*u[2]*u[2],u[2]],
                [-this.curvature*u[0],-this.curvature*u[1],-this.curvature*u[2],qw]
            ]
        }
    }
    scale(p,s){
        if(this.curvature==0){
            return vectormul(p,s);
        }
        const t=vectorlength(p);
        return vectormul(p,this.pd(s*this.apd(t))/t);
    }
    pd(d){
        if(this.curvature==0){
            return d;
        }
        if(this.curvature>0){
            return this.radius*Math.tan(d/(2*this.radius));
        }else{
            return this.radius*Math.tanh(d/(2*this.radius));
        }
    }
    apd(d){
        if(this.curvature==0){
            return d;
        }
        if(this.curvature>0){
            return 2*this.radius*Math.atan(d/this.radius);
        }else{
            return 2*this.radius*Math.atanh(d/this.radius);
        }
    }
    midpoint(P){
        if(this.curvature==0){
            let p=Array(this.dim).fill(0);
            for(let k=0; k<P.length; ++k){
                p=vectorsum(p,P[k]);
            }
            return vectormul(p,1/P.length);
        }
        //Pのネイティブの和の正規化を射影
        let v=Array(this.dim+1).fill(0);
        for(const p of P){
            v=vectorsum(v,this.native(p));
        }
        if(this.curvature<0){
            v=vectormul(v,this.radius/Math.sqrt(-vectormot(v,v)));
        }else{
        v=vectormul(vectornormalize(v),this.radius);
        }
        return this.projected(v);
    }
    geodesic(p,q,d,twiced){
        if(this.curvature==0){
            return [p,q];
        }
        const res=[];
        if(!d){
            d=8;
        }
        const pq=this.translate(p,vectorneg(q));
        const t=vectorlength(pq);
        if(twiced){
            for(let k=d; k>=1; --k){
                res.push(this.translate(vectormul(pq,this.pd(k/d*this.apd(t))/t),q));
                res.push(this.translate(vectormul(pq,this.pd((k-1)/d*this.apd(t))/t),q));
            }
        }else{
            for(let k=d; k>=0; --k){
                res.push(this.translate(vectormul(pq,this.pd(k/d*this.apd(t))/t),q));
            }
        }
        return res;
    }
    refrection(p,q,c){
        if(!c){
            c=Array(this.dim).fill(0);
        }
        const pc=this.translate(p,vectorneg(c));
        const qc=this.translate(q,vectorneg(c));
        const mirror=vectorsub(pc,vectormul(qc,2*vectordot(pc,qc)/vectordot(qc,qc)));
        return this.translate(this.translate(mirror,vectorneg(c)),this.scale(q,2));
    }
    refrectionGroup(P,q,m){
        //cはPの中点。
        if(!m){
        m=this.midpoint(P);
        }
        const res=[];
        for(const p of P){
            res.push(this.refrection(p,q,m));
        }
        return res;
    }
    cliffordtranslate(p,q){
        //球面移動をクリフォード代数で行う場合(S^3限定)
        const t=vectorlength(q);
        const sint=Math.sin(t)/t;
        const rotor=[Math.cos(t),0,0,0,0,
            0,0,0,
            q[0]*sint,q[1]*sint,q[2]*sint,
            0,0,0,0,0
        ];
        return this.projected(clifford.rotate4D(this.native(p),rotor));
    }
    projected(p){
        //p is this.dim+1 dimensional
        return vectormul(p.slice(0,p.length-1),1/(1-Math.sign(this.curvature)*p[p.length-1]/this.radius));
    }
    native(p){
        const rev=1/this.curvature;
        const pp=vectordot(p,p);
        const v=vectormul(p,2*rev);
        v.push(Math.sign(this.curvature)*this.radius*(pp-rev));
        return vectormul(v,1/(rev+pp));
    }
    honeycombcurvature(p,q){
        const d=(p-2)*(q-2);
        if(d==4){
            return 0;
        }
        if(d>4){
            return -1;
        }
        return 1;
    }
    generalizedHoneycomb(poly,curvature,dim,level,limit){
        //2-dimentional!
        if(!level){
            level=3;
        }
        const geo=new geometry(curvature,dim);
        //鏡映
        const base=poly;
        let stk=[base];
        let pdata=[base];
        function create(){
            const newdata=[];
            for(const p of pdata){
            //pdataの周りで。
            for(let k=0; k<p.normal.length; ++k){
                const n=p.normal[k];
                let safe=true;
                const cent=geo.refrection(p.center,n,p.center);
                if(stk.findIndex(e=>geo.distance(e.center,cent)<0.3)!=-1){
                    safe=false;
                }
                if(safe){
                    newdata.push({
                        center:cent,
                        vertex:geo.refrectionGroup(p.vertex,n,p.center),
                        segment:p.segment,
                        normal:geo.refrectionGroup(p.normal,n,p.center)
                    });
                }
            }
        }
        stk.push(...newdata);
        pdata=newdata;
        }
        if(!limit){
        for(let k=0; k<level-1; ++k){
            create();
        }
        }else{
            //limitがある
            while(stk.length<limit){
                const prev=stk.slice();
                create();
                if(stk.length==prev.length){
                    stk=prev;
                    break;
                }
            }
        }
        return stk;
    }
    honeycomb(p,q,level,limit){
        //2-dimentional!
        if(!level){
            level=3;
        }
        //{p,q}
        let R=1;
        const geo=new geometry(this.honeycombcurvature(p,q),2);
        if(geo.curvature!=0){
            const tan=Math.tan(Math.PI/p)*Math.tan(Math.PI/q);
            R=Math.sqrt(Math.abs(tan-1)/(tan+1));
        }
        const vert=[];
        const segm=[];
        const norm=[];
        for(let k=0; k<p; ++k){
            vert.push(c128.poler(R,2*Math.PI*k/p));
            norm.push(geo.midpoint([c128.poler(R,2*Math.PI*k/p),c128.poler(R,2*Math.PI*(k+1)/p)]));
            segm.push([k,(k+1)%p]);
        }
        //鏡映
        const base={center:[0,0],vertex:vert,segment:segm,normal:norm};
        return this.generalizedHoneycomb(base,geo.curvature,2,level,limit);
    }
    honeycomb3(p,q,r,level,limit){
        let curve=1;
        let R=0;
        const sin=Math.sin(Math.PI/q);
        const cos=1/Math.cos(Math.PI/r);
        const tan=Math.tan(Math.PI/p);
        R=Math.tan(Math.acos(1/Math.sqrt(2*(tan*tan*sin*sin*cos*cos-1)))/2);
        console.log(R);
        const poly=this.polyhedra(p,q,R,curve);
        return this.generalizedHoneycomb(poly,curve,3,level,limit);
    }
    polyhedra(p,q,scale,curvature){
        if(!curvature){
            curvature=0;
        }
        const geo=new geometry(curvature,3);
        const res={vertex:[],segment:[],normal:[],center:[0,0,0]};
        const curve=this.honeycombcurvature(p,q);
        if(curve==1){
            const sphere=new geometry(1,2);
            const poly=this.honeycomb(p,q,0,120);//while ending
            //点をネイティブに変換するだけ
            for(const p of poly){
                const surface=[];
                for(const v of p.vertex){
                    surface.push(vectormul(sphere.native(v),scale));
                }
                const offset=res.segment.length;
                for(const s of p.segment){
                    res.segment.push([s[0]+offset,s[1]+offset]);
                }
                res.vertex.push(...surface);
                res.normal.push(geo.midpoint(surface));//これはどうだ？
            }
        }
        return res;
    }
    polychora(p,q,r,scale){
        if(!scale){
            scale=1;
        }
        const res={vertex:[],segment:[],normal:[],center:[0,0,0,0]};
        const curve=1;
        if(curve==1){
            const sphere=new geometry(1,3);
            const poly=this.honeycomb3(p,q,r,0,120);//while ending
            //点をネイティブに変換するだけ
            for(const p of poly){
                const cell=[];
                for(const v of p.vertex){
                    cell.push(vectormul(sphere.native(v),scale));
                }
                const offset=res.segment.length;
                for(const s of p.segment){
                    res.segment.push([s[0]+offset,s[1]+offset]);
                }
                res.vertex.push(...cell);
                res.normal.push(this.midpoint(cell));//これはどうだ？
            }
        }
        return res;
    }
}
function vectormid(V){
    let res=Array(V[0].length).fill(0);
    for(const v of V){
        res=vectorsum(res,v);
    }
    return vectormul(res,1/V.length);
}
function vectormul(v,a){
    const res=[];
    for(let k=0; k<v.length; ++k){
        res.push(v[k]*a);
    }
    return res;
}
function vectorneg(v){
    const res=[];
    for(let k=0; k<v.length; ++k){
        res.push(-v[k]);
    }
    return res;
}
function vectorsum(v,u){
    const res=[];
    for(let k=0; k<v.length; ++k){
        res.push(v[k]+u[k]);
    }
    return res;
}
function vectorsub(v,u){
    const res=[];
    for(let k=0; k<v.length; ++k){
        res.push(v[k]-u[k]);
    }
    return res;
}
function vectorlength(a){
    let res=0;
    for(let k=0; k<a.length; ++k){
        res+=a[k]*a[k];
    }
    return Math.sqrt(res);
}
function vectordot(a,b){
    let res=0;
    for(let k=0; k<a.length; ++k){
        res+=a[k]*b[k];
    }
    return res;
}
function vectormot(a,b){
    let res=-a[a.length-1]*b[a.length-1];
    for(let k=0; k<a.length-1; ++k){
        res+=a[k]*b[k];
    }
    return res;
}
function vectornormalize(a){
    const s=vectorlength(a);
    if(s>0){
        const res=[];
        for(let k=0; k<a.length; ++k){
            res.push(a[k]/s);
        }
        return res;
    }
    return Array(a.length).fill(0)
}
const projection={
    //射影
    orthogonal(v){
        if(v && v[v.length-1]>0){
        return v.slice(0,v.length-1);
        }
    },
    multiOrthogonal(v){
        let res=v.slice();
        for(let k=0; k<v.length-2; ++k){
            res=this.orthogonal(res);
        }
        return res;
    },
    perspective(v,factor){
        if(!factor){
            factor=0;
        }
        if(v && v[v.length-1]+factor>0){
            return vectormul(v.slice(0,v.length-1),1.8/(factor+v[v.length-1]));
        }
    },
    persp(v){
        if(v.length==4){
            const p=vectormul(v.slice(0,3),10/(4-v[3]));
            return vectormul(p.slice(0,2),1.8/(2+p[2]));
            //return this.perspective(this.perspective(v,-1),1);
        }
        return this.multiPerspective(v,1);
    },
    multiPerspective(v,f){
        let res=v.slice();
        for(let k=0; k<v.length-2; ++k){
            res=this.perspective(res,f*k);
        }
        return res;
    },
    spherical(p,r){
        if(!r){
            r=1;
        }
        const len2=vectordot(p,p);
        const v=vectormul(p,2);
        v.push(len2-1);
        return vectormul(v,1/(len2+1));
    },
    stereographic(p,r){
        if(!r){
            r=1;
        }
        return vectormul(p.slice(0,p.length-1),1/(1-p[p.length-1]/r));
    },
    poincareDisk(hyp){
        return hyp;
    },
    klein(hyp){
        //ベルトラミ・クラインモデル
        const abs=c128.abs(hyp);
        return c128.prod(c128.prod(hyp,2),1/(1+abs*abs));
    },
    upperhalf(hyp){
        //上半平面
        const z=[hyp[1],-hyp[0]];   
        return c128.sum(c128.mul(c128.quot(c128.sum([1,0],z),c128.sub([1,0],z)),[0,-1]),[0,1]);
    },
    disk(hyp,f){
        //0でクライン、1でポアンカレ
        const abs=c32.abs(hyp)[0];
        return c32.prod(c32.prod(hyp,2),1/(1+f+abs*abs*(1-f)));
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
const q256={
    const(a,b,c,d){
        return [a,b,c,d];
    },
    mul(p,q){
        return [
            p[0]*q[0]-p[1]*q[1]-p[2]*q[2]-p[3]*q[3],
            p[0]*q[1]+p[1]*q[0]+p[2]*q[3]-p[3]*q[2],
            p[0]*q[2]+p[2]*q[0]+p[3]*q[1]-p[1]*q[3],
            p[0]*q[3]+p[3]*q[0]+p[1]*q[2]-p[2]*q[1]
        ]
    },
    conj(p){
        return [p[0],-p[1],-p[2],-p[3]];
    },
    camrot(v){
        const t=vectorlength(v);
        if(t==0){
            return [1,0,0,0];
        }
        return [Math.cos(t),-v[1]*Math.sin(t)/t,-v[0]*Math.sin(t)/t,0];
    },
    rotate(v,r){
        const q=this.mul(this.mul(r,[0,...v]),this.conj(r));
        return q.slice(1,4);
    }
}
const c128={
    const(a,b){
        return [a,b];
    },
    one:[1,0],
    real(a){
        return [a,0];
    },
    imag(a){
        return [0,a];
    },
    i:[0,1],
    zero:[0,0],
    neg(z){
        return [-z[0],-z[1]];
    },
    poler(radius,theta){
        return [radius*Math.cos(theta),radius*Math.sin(theta)];
    },
    prod(z,x){
        return [z[0]*x,z[1]*x];
    },
    exp(z){
        const r=Math.exp(z[0]);
        return [r*Math.cos(z[1]),r*Math.sin(z[1])];
    },
    mul(z,w){
        return [z[0]*w[0]-z[1]*w[1],z[0]*w[1]+z[1]*w[0]]
    },
    sum(z,w){
        return [z[0]+w[0],z[1]+w[1]];
    },
    sub(z,w){
        return [z[0]-w[0],z[1]-w[1]];
    },
    abs(z){
        return Math.sqrt(z[0]*z[0]+z[1]*z[1]);
    },
    normalize(z){
        return this.prod(z,1/Math.sqrt(z[0]*z[0]+z[1]*z[1]));
    },
    conjugate(z){
        return [z[0],-z[1]];
    },
    quot(z,w){
        if(w[1]==0){
            return [z[0]/w[0],z[1]/w[0]];
        }
        return this.prod(this.mul(z,this.conjugate(w)),1/(w[0]*w[0]+w[1]*w[1]));
    },
    arg(z){
        return Math.atan2(z[1],z[0]);
    },
    log(z){
        return [Math.log(z[0]*z[0]+z[1]*z[1])/2,Math.atan2(z[1],z[0])];
    },
    pow(z,w){
        if(w[1]==0){
            const theta=w[0]*Math.atan2(z[1],z[0]);
            const r=Math.pow(z[0]*z[0]+z[1]*z[1],w[0]/2);
            return [r*Math.cos(theta),r*Math.sin(theta)];
        }else{
            const theta=Math.atan2(z[1],z[0]);
            const lnr=Math.log(z[0]*z[0]+z[1]*z[1])/2;
            const r=Math.exp(w[0]*lnr-w[1]*theta);
            const phi=w[0]*theta+w[1]*lnr;
            return [r*Math.cos(phi),r*Math.sin(phi)];
        }
    }
}
//!for rendering
const GPUworkflow=[];
class WGPU{
    constructor(geometry,uniformsize,wgsl,method){
        this.method=method;
        if(["instance","point","segment","raymerch"].indexOf(this.method)==-1){
            console.warn(`methodはinstance,raymerch,point,segmentのいずれかである必要があります。\n'${this.method}'が見つかりました。`);
            this.method="instance";
        }
        if(this.method=="instance"){
            this.webGPUtopology="triangle-list";
        }
        if(this.method=="raymerch"){
            this.webGPUtopology="triangle-strip";
        }
        if(this.method=="point"){
            this.webGPUtopology="point-list";
        }
        if(this.method=="segment"){
            this.webGPUtopology="line-list";
        }
        this.inst=[];
        this.geometry=geometry;
        this.uniform=Array(uniformsize).fill(0);
        this.wgsl=wgsl;
        this.inst=new Float32Array(1);
        this.vertex=new Float32Array(1);
        this.index=new Uint16Array(1);
    }
    bindvertex(v){
        this.vertex=new Float32Array(v);
    }
    bindindex(u){
        this.index=new Uint16Array(u);
    }
    async initialize(canvas,vertconfig,instanceconfig){
        canvas.width=screen.width;
        canvas.height=screen.height;
        this.vertconfig=vertconfig;
        this.instanceconfig=instanceconfig;
        this.canvas=canvas;
        this.background=[1,1,1];
        this.context=canvas.getContext('webgpu');
        this.adapter=await navigator.gpu.requestAdapter();
        this.device=await this.adapter.requestDevice();
        this.presentationFormat=navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: this.device,
            format: this.presentationFormat,
            alphaMode: 'opaque'
        });
        this.depthTexture=this.device.createTexture({
            size: [this.canvas.width,this.canvas.height],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });
        //ランタイムで内容を変化させたい。
        let bufferposition=0;
        let shaderLocations=0;
        const pipelinebuffers={vertex:{arrayStride:0,attributes:[]},instance:{arrayStride:0,stepMode:"instance",attributes:[]}}
        for(let k=0; k<this.vertconfig.length; ++k){
            pipelinebuffers.vertex.attributes.push({shaderLocation:shaderLocations,offset:bufferposition,format:this.vertconfig[k]});
            switch (this.vertconfig[k]){
                case "float32":
                    bufferposition+=4;
                    break;
                case "float32x2":
                    bufferposition+=8;
                    break;
                case "float32x3":
                    bufferposition+=12;
                    break;
                case "float32x4":
                    bufferposition+=16;
                    break;
            }
            shaderLocations++;
        }
        pipelinebuffers.vertex.arrayStride=bufferposition;
        bufferposition=0;
        if(this.method=="instance"){
        for(let k=0; k<this.instanceconfig.length; ++k){
            pipelinebuffers.instance.attributes.push({shaderLocation:shaderLocations,offset:bufferposition,format:this.instanceconfig[k]});
            switch (this.instanceconfig[k]){
                case "float32":
                    bufferposition+=4;
                    break;
                case "float32x2":
                    bufferposition+=8;
                    break;
                case "float32x3":
                    bufferposition+=12;
                    break;
                case "float32x4":
                    bufferposition+=16;
                    break;
            }
            shaderLocations++;
        }
        pipelinebuffers.instance.arrayStride=bufferposition;
        }
        let bufferstructure;
        if(this.method=="instance"){
            bufferstructure=[pipelinebuffers.vertex,pipelinebuffers.instance];
        }else{
            bufferstructure=[pipelinebuffers.vertex];
        }
        this.inststructurecount=pipelinebuffers.instance.arrayStride/4;
        this.vertstructurecount=pipelinebuffers.vertex.arrayStride/4;
        this.pipeline=this.device.createRenderPipeline({
            layout:'auto',
            vertex:{
                module:this.device.createShaderModule({code: this.wgsl}),
                entryPoint:'main',
                buffers:bufferstructure,
            },
            fragment:{
                module:this.device.createShaderModule({code:this.wgsl}),
                entryPoint:'fragmain',
                targets:[
                    {
                        format:this.presentationFormat,
                        blend:{
                            color:{
                                srcFactor:'one',
                                dstFactor:'one-minus-src-alpha'
                            },
                            alpha:{
                                srcFactor: 'one',
                                dstFactor: 'one-minus-src-alpha'
                            }
                        }
                    }
                ]
            },
            primitive:{
                topology:this.webGPUtopology
            },
            depthStencil:{
                depthWriteEnabled:true,
                depthCompare:'less',
                format:'depth24plus',
            }
        });
        this.verticesBuffer=this.device.createBuffer({size:268435456/10,usage:GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST});
        if(this.method=="instance"){
        this.indicesBuffer=this.device.createBuffer({
            size: this.index.byteLength,
            usage: GPUBufferUsage.INDEX,
            mappedAtCreation: true,
        });
        new Uint16Array(this.indicesBuffer.getMappedRange()).set(this.index);
        this.indicesBuffer.unmap();
        this.instanceBuffer=this.device.createBuffer({size:268435456/10,usage:GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST});
        }
    }
    //毎フレーム呼び出される。
    render(inst){
        const uniformBuffer=this.device.createBuffer({
            size:4*this.uniform.length,
            usage:GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        const p=new Float32Array(this.uniform);
        this.device.queue.writeBuffer(
            uniformBuffer,
            0,
            p.buffer,
            p.byteOffset,
            p.byteLength
        );
        let instp;
        if(this.method=="instance"){
            instp=new Float32Array(inst);
            this.device.queue.writeBuffer(this.instanceBuffer,0,instp);
        }
        this.device.queue.writeBuffer(this.verticesBuffer,0,this.vertex);
        const bindGroup=this.device.createBindGroup({
            layout: this.pipeline.getBindGroupLayout(0),
            entries: [{binding:0,resource:{buffer:uniformBuffer}}]
        });
        const commandEncoder=this.device.createCommandEncoder();
        const renderPassDescriptor={
            colorAttachments: [
                {
                    view:this.context.getCurrentTexture().createView(),
                    clearValue:{r:this.background[0],g:this.background[1],b:this.background[2],a:1},loadOp:'clear',storeOp:'store'
                }
            ],
            depthStencilAttachment:{view: this.depthTexture.createView(),depthClearValue: 1,depthLoadOp: 'clear',depthStoreOp: 'store'}
        };
        const passEncoder=commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(this.pipeline);
        passEncoder.setBindGroup(0, bindGroup);
        passEncoder.setVertexBuffer(0,this.verticesBuffer);
        if(this.method=="instance"){
            passEncoder.setIndexBuffer(this.indicesBuffer,"uint16");
            passEncoder.setVertexBuffer(1,this.instanceBuffer);
            passEncoder.drawIndexed(this.index.length,instp.length/this.inststructurecount);
        }
        if(this.method=="segment"){
            passEncoder.draw(this.vertex.length/this.vertstructurecount);
        }
        passEncoder.end();
        this.device.queue.submit([commandEncoder.finish()]);
    }
    library(geometry){
        if(geometry.type[0]=="E"){
            if(geometry.dim==2){
            }
            if(geometry.dim==3){
            }
        }
    }
}
class easyKey{
    constructor(src){
        this.key={};
        src.addEventListener("keydown",e=>{
            this.key[e.code]=true;
        });
        src.addEventListener("keyup",e=>{
            this.key[e.code]=false;
        });
    }
    get wasdvector(){
        const v=[0,0];
        if(this.key.KeyW){
            v[1]++;
        }
        if(this.key.KeyA){
            v[0]--;
        }
        if(this.key.KeyS){
            v[1]--;
        }
        if(this.key.KeyD){
            v[0]++;
        }
        if(v[0]==0 && v[1]==0){
            return [0,0];
        }
        return vectornormalize(v);
    }
    get wasdssvector(){
        const v=[0,0,0];
        if(this.key.KeyW){
            v[2]++;
        }
        if(this.key.KeyA){
            v[0]--;
        }
        if(this.key.KeyS){
            v[2]--;
        }
        if(this.key.KeyD){
            v[0]++;
        }
        if(this.key.ShiftLeft){
            v[1]--;
        }
        if(this.key.Space){
            v[1]++;
        }
        if(v[0]==0 && v[1]==0 && v[2]==0){
            return [0,0,0,0];
        }
        return vectornormalize(v);
    }
    get wasdsseqvector(){
        const v=[0,0,0,0];
        if(this.key.KeyW){
            v[2]++;
        }
        if(this.key.KeyA){
            v[0]--;
        }
        if(this.key.KeyS){
            v[2]--;
        }
        if(this.key.KeyD){
            v[0]++;
        }
        if(this.key.KeyE){
            v[3]++;
        }
        if(this.key.KeyQ){
            v[3]--;
        }
        if(this.key.ShiftLeft){
            v[1]--;
        }
        if(this.key.Space){
            v[1]++;
        }
        if(v[0]==0 && v[1]==0 && v[2]==0 && v[3]==0){
            return [0,0,0,0];
        }
        return vectornormalize(v);
    }
}
class easyViz{
    constructor(canvas,geometry){
        this.canvas=canvas;
        this.camera=Array(geometry.dim).fill(0);
        this.ctx=canvas.getContext("2d");
        this.geo=geometry;
        this.scaler=Math.min(canvas.width,canvas.height)/2;
        this.clipRadius=1;
        this.perspectivefactor=0;
    }
    clip(p){
        const q=projection.persp(vectorsub(p,this.camera));
        if(q){
        const v=vectormul(q,this.scaler/this.clipRadius);
        return [v[0]+this.canvas.width/2,this.canvas.height/2-v[1]];
        }else{
            return [undefined,undefined];
        }
    }
    point(p,radius){
        if(!radius){
            radius=10;
        }
        const v=this.clip(p);
        this.ctx.beginPath();
        this.ctx.arc(v[0],v[1],radius,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
    }
    line(p,q,onlypath){
        if(!onlypath){
        this.ctx.beginPath();
        }
        const path=this.geo.geodesic(p,q,8);
        for(const p of path){
            const cp=this.clip(p);
            this.ctx.lineTo(cp[0],cp[1]);
        }
        if(!onlypath){
        this.ctx.stroke();
        this.ctx.closePath();
        }
    }
    get width(){
        return this.canvas.width;
    }
    get height(){
        return this.canvas.height;
    }
    clear(){
        this.ctx.clearRect(0,0,this.width,this.height);
    }
    strokeObject(poly){
        for(const s of poly.segment){
            this.line(poly.vertex[s[0]],poly.vertex[s[1]]);
        }
    }
    strokeStruct(str){
        for(const s of str){
            this.strokeObject(s);
        }
    }
    pastelcolor(){
        return `hsla(${math.rand(0,360)},75%,75%)`;
    }
    fillObject(poly,stared){
        this.polygon(poly.vertex,poly.segment,poly.color,stared);
    }
    polygon(vert,segm,color,stared){
        if(!color){
            color="#ffffff";
        }
        const bl=(this.geo.curvature>0) && this.geo.length(this.geo.midpoint(vert))>Math.PI*0.8;
        if(bl){
            stared=false;
        }
        this.ctx.fillStyle=color;
        this.ctx.beginPath();
        for(const s of segm){
            const path=this.geo.geodesic(vert[s[0^stared]],vert[s[1^stared]],8);
            for(const p of path){
                const cp=this.clip(p);
                this.ctx.lineTo(cp[0],cp[1]);
            }
        }
        if(bl){
            this.ctx.rect(0, 0, this.width, this.height);
            this.ctx.fill("evenodd");
        }else{
            this.ctx.fill();
        }
        this.ctx.closePath();
    }
    fillStruct(str,stared){
        for(const s of str){
            this.pastelcolor();
            this.fillObject(s,stared);
        }
    }
    paint(poly,color){
        poly.color=color;
    }
    pastelpaint(polylist){
        for(const poly of polylist){
            this.paint(poly,this.pastelcolor());
        }
    }
}