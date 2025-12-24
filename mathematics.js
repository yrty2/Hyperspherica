const math={
    /*コンピューターならではの関数*/
  primeNumbers(a){
      if(!a){
          a=500;
      }
      let found=0;
      let res=[];
      let x=1;
      while(found<a){
          x++;
          let ans=[];
          let k=0;
          while(ans.length<2){
              k++;
      if(x/k==Math.trunc(x/k)){
        ans.push(k);
      }
    }
          if(ans[1]==x){
          res.push(x);
          found++;
          }
      }
      return res;
  },
  prime(a){
      let res=this.primeNumbers(a);
      return res[a-1];
  },
  chance(a){
    if(Math.random()*100<=a){
        return true;
        }else{
        return false;
     }
  },
    factors(n){
        if(maths.inZ(n)){
            const primelist=this.primeNumbers(30);
            //素因数分解する。
            var res=[];
            while(true){
                var led=false;
                for(const p of primelist){
                    if(n%p==0){
                        led=true;
                        res.push(p);
                        n*=1/p;
                        break;
                    }
                }
                if(!led){
                    return res;
                }
            }
        }else{
            console.error(`入力された値:${n}は自然数ではありません！`);
        }
    },
    bi(n){
        //約数
        if(maths.inZ(n)){
            var res=[];
            for(let k=1; k<9999; ++k){
                if(n%k==0){
                    res.push(k);
                }
            }
            return res;
        }else{
            console.error(`入力された値:${n}は自然数ではありません！`);
        }
    },
    cobi(nlist){
        //公約数
        var res=[];
        //総積集合
        for(const n of nlist){
            const f=this.bi(n);
            if(res.length==0){
                res=f.slice();
            }else{
                res=maths.prod(res,f);
            }
        }
        return res;
    },
    hsl2rgb(h,s,l){
        h=this.mod(h,360);
        const H=h/60;
        const C=(1-Math.abs(2*l-1))*s;
        const X=C*(1-Math.abs(math.mod(H,2)-1));
        const m=l-C/2;
        if(h<60){
            return [m+C,m+X,m];
        }else if(h<120){
            return [m+X,m+C,m];
        }else if(h<180){
            return [m,m+C,m+X];
        }else if(h<240){
            return [m,m+X,m+C];
        }else if(h<300){
            return [m+X,m,m+C];
        }else{
            return [m+C,m,m+X];
        }
    },
    rand(min,max){
        return Math.random()*(max-min)+min;
    },
    randInt(min,max){
        return Math.floor(this.rand(min,max+1));
    },
    randSign(){
        return (-1)**this.randInt(0,1);
    },
    triangle(a){
        return Math.abs(Math.round(a)-a);
    },
    piecewiseLinear(conditiontree){
        for(const c of conditiontree){
            if(c.condition){
                return c.res;
            }
        }
        return 0;
    },
    /*三角関数*/
  csc(a){
  return 1/Math.sin(a);
  },
  sec(a){
  return 1/Math.cos(a);
  },
  cot(a){
  return 1/Math.tan(a);
  },
    acsc(a){
        return Math.asin(1/a);
    },
    asec(a){
        return Math.acos(1/a);
    },
    acot(a){
        return (Math.PI/2)-Math.atan(a);
    },
    acsch(a){
        return Math.asinh(1/a);
    },
    asech(a){
        return Math.acosh(1/a);
    },
    acoth(a){
        return Math.atanh(1/a);
    },
    /*基本関数*/
    log(n,x){
        return Math.log(x)/Math.log(n);
    },
    ln(n){
        return Math.log1p(n-1);
    },
  sum(n,N,callback){
    let res=0;
    for(let loop=n; loop<=N; ++loop){
        res+=callback(loop);
    }
  return res;
},
prod(n,N,callback){
    let res=1;
    for(let loop=n; loop<=N; ++loop){
        res=res*callback(loop);
    }
  return res;
},
fact(a){
  if(a==Math.round(a) && a>=0){
  return this.prod(1,a,k=>k);
  }else{
  return this.gamma(a+1);
  }
},
gamma(a,b){
  if(!b){
    b=20;
  }
if(a>=1){
  return this.int(0,b,x=>Math.pow(x,a-1)*Math.exp(-x),500);
    }else{
    return this.gamma(a+1)/a;
    }
},
    mean(...args){
  let ans=0;
  for(const a of args){
    ans+=eval(a);
  }
  return ans/args.length;
},
geomean(...args){
  let ans=1;
  for(const a of args){
    ans=ans*eval(a);
  }
  return Math.pow(ans,1/args.length);
},
  median(...args){
    return (args[Math.floor((args.length-1)/2)]+args[Math.ceil((args.length-1)/2)])/2;
  },
    divisor(N){
    if(N!=Math.trunc(N)){
      console.error("小数に対応していません");
    }
    let ans=[];
    for(let k=1; k<=N; ++k){
      if(N/k==Math.trunc(N/k)){
        ans.push(k);
      }
    }
    return ans;
  },
  mod(a,b){
    return a-(b*Math.floor(a/b));
  },
  quartile(a){
    let mid1=(a.length+1)/2;
    let mid2=(a.length+1)/2;
    if(mid1!=Math.trunc(mid1)){
    mid1=mid1+0.5;
    mid2=mid2-0.5;
    }
    return [this.median(a.slice(0,mid1-1)),this.median(a),this.median(a.slice(mid2,a.length))];
  },
  syntax(f,vars,varsnum){
      for(let index=0; index<vars.length; ++index){
      f=f.replaceAll(vars[index],varsnum[index]);
          }
      f=f.replaceAll("--","+");
      return eval(f);
  },
/*場合の数*/
nPr(n,r){
  return this.fact(n)/this.fact(n-r);
},
nCr(n,r){
  return this.fact(n)/(this.fact(r)*this.fact(n-r));
},
nSk1(n,k){
if(k>n){
console.error("invalid input!");
return;
}
if(k==0){
return 0;
}else if(k==1){
return this.fact(n-1);
}else if(n==k){
return 1;
}else{
return this.nSk1(n-1,k-1)+(n-1)*this.nSk1(n-1,k)
}
},
nSk2(n,k){
    let res=0;
    for(let m=1; m<=k; ++m){
        res+=Math.pow(-1,k-m)*this.nCr(k,m)*Math.pow(m,n);
    }
    return res/this.fact(k);
},
    /*微分積分学*/
  euler(term,x,y,h,f){
    let Yarray=[y];
    function F(x,y){
      return eval(f);
    }
    for(let n=1; n<=term; ++n){
      Yarray[n]=Yarray[n-1]+h*F(x,Yarray[n-1]);
      x+=h;
    }
    return Yarray[term];
  },
  trapezoidal(a,b,f,n){
    if(!n){
    n=10001;
    }
    function F(x){
      return eval(f);
    }
    let an=[a];
    for(let i=1; i<=n; ++i){
      an[i]=an[i-1]+((b-a)/n);
    }
    let ans=0;
    for(let k=1; k<=n; ++k){
      ans+=(an[k]-an[k-1])*(F(an[k])+F(an[k-1]))/2;
    }
    return ans;
  },
  int(a,b,callback,mix){
    if(!mix){
    return ((b-a)/6)*(callback(a)+4*callback((a+b)/2)+callback(b));
    }else{
    if(mix/2!=Math.ceil(mix/2)){
      mix=2*Math.ceil(mix/2);
    }
    let an=[0];
    let h=(b-a)/mix;
    for(let i=1; i<mix; ++i){
      an[i]=a+i*h;
    }
    let ans1=0;
    for(let i=1; i<=mix/2-1; ++i){
      ans1+=callback(an[2*i]);
    }
    let ans2=0;
    for(let i=1; i<=mix/2; ++i){
      ans2+=callback(an[2*i-1]);
    }
    return (h/3)*(callback(a)+2*ans1+4*ans2+callback(b));
    }
  },
    /*近似的な微分を計算する*/
    d(X,callback,n,h){
        let res=0;
        if(!n){
        /*何回微分するか*/
        n=1;
            }
        if(!h){
        /*コンピュータに教える極めて0に近い数字は任意に変更可能。デフォで1/100000*/
        h=0.000001;
            }
        /*中心差分近似法を用いる*/
        res=(callback(X+h)-callback(X-h))/(2*h);
        //res=(f(X+h)-f(X))/(h);
        return res;
    },
    newton(Function,init,h){
        let res=init;
        function f(x){
            return eval(Function);
        }
        for(let k=0; k<h; ++k){
            res=res-(f(res)/this.d(res,Function));
        }
        return res;
    },
    Rd(X,Y,which,F,h){
        let res=0;
        if(!h){
        h=0.000001;
            }
        if(which=="x"){
        function f(x){
            var y=Y;
            return eval(F);
        }
        res=(f(X+h)-f(X-h))/(2*h);
        }
        if(which=="y"){
        function f(y){
            var x=X;
            return eval(F);
        }
        res=(f(Y+h)-f(Y-h))/(2*h);
        }
        return res;
    },
    beta(a,b){
        return this.int(0,1,`Math.pow(x,${a-1})*Math.pow(1-x,${b}-1)`);
    },
    zeta(s,n){
        if(s==0){
            return -1/2;
        }else if(s==2){
            return Math.pow(Math.PI,2)/6;
        }else{
        if(!n){
            n=10000;
        }
        return this.sum(1,n,`1/Math.pow(k,${s})`);
        }
    },
    multiZeta(a,precision){
        if(!precision){
            //precision=5000*Math.pow(2/25,a.length-2);
            if(a.length<=1){
                precision=10000;
            }
            if(a.length==2){
                precision=5000;
            }
            if(a.length==3){
                precision=400;
            }
            if(a.length>=4){
                precision=125;
            }
            //console.log(precision)
        }
        if(precision<5000){
            console.log("precisionが5000以下では精度がかなり悪いです。");
        }
        let R=0;
        let totaloop=0;
        let k=[];
        function sumation(n){
            let res=0;
            if(n==a.length){
                    let product=1;
                    for(let i=0; i<a.length; ++i){
                        product=product*(k[i]**a[i]);
                    }
                    res+=1/product;
                R+=res;
                return;
            }
            if(n==0){
                k[n]=1;
            }else{
                k[n]=k[n-1]+1;
            }
            while(k[n]<=precision){
                if(n>a.length){
                    break;
                }
                sumation(n+1);
                k[n]++;
                totaloop++;
            }
        }
        sumation(0);
        //console.log(totaloop);
        return R;
    },
    /*特殊関数*/
  B(N){
      if(N==0){
        return 1;
      }
      let ans=0;
      for(let k=0; k<N; ++k){
        ans+=this.nCr(N+1,k)*this.B(k);
      }
      return (-1/(N+1))*ans;
  },
    W0(x,n){
        if(!n){
        n=7;
        }
        let o=0;
        for(let i=0; i<=n; ++i){
        for(let j=1; j<=n; ++j){
            o+=(Math.pow((-1),i)*this.nSk1(i+j,i+1)*Math.pow(this.ln(x),-i-j)*Math.pow(this.ln(this.ln(x)),j))/this.fact(j);
        }
        }
        return this.ln(x)-this.ln(this.ln(x))+o;
    },
    dfact(x){
        if(Math.round(x)==x){
            if(x-2*Math.floor(x/2)==0){
                return this.prod(1,x/2,"2*k");
            }else{
                return this.prod(1,(x+1)/2,"2*k-1");
            }
        }else{
            console.error("整数のみしか入力できません！");
        }
    },
    factpow(x,n){
        return this.prod(1,n,k=>x+k-1);
    },
    F(a,b,c,z,n){
        if(!n){
            n=50;
        }
        return this.sum(0,n,k=>this.factpow(a,k)*this.factpow(b,k)*Math.pow(z,k)/(this.factpow(c,k)*this.fact(k)));
    },
    //数学記述言語の操作
    parseTex(string){
        while(string.indexOf(`\left`)!=-1){
            let id=string.indexOf(`\left`);
        if(isFinite(string[id-1])){
            //あきらめ
        }
        }
        return string.replaceAll(`\\cdot`,"*");
    },
    toTex(string){
        let tex=string;
        tex=tex.replaceAll(`m.`,`\\`).replaceAll(`Math.`,`\\`);
        tex=tex.replaceAll("/",`\\frac{${tex[tex.indexOf("/")-1]}}{${tex[tex.indexOf("/")+1]}}`);
        tex=tex.replaceAll(`*`,`\\cdot`).replaceAll(`(`,`\\left(`).replaceAll(`)`,`\\right)`);
        console.log(tex);
        return tex;
    }
}
class complex{
    constructor(real,imag){
        this.real=real;
        this.imag=imag;
    }
    get abs(){
        return Math.hypot(this.real,this.imag);
    }
    get arg(){
        return Math.atan2(this.imag,this.real);
    }
    get angle(){
        return 180*(this.arg/Math.PI+1);
    }
    get conjugation(){
        return new complex(this.real,-this.imag);
    }
}
const maths={
    empty:[],
    inZ(a){
        //整数全体の元であるか
        return parseInt(a)==a;
    },
    inQ(a){
        //有理数全体の元であるか
        //aを分数で表すことができるか<-n倍すると整数になるか
        //0~1までに治す
        var p=(a)%1;
        if(p==0){
            return true;
        }
        //2以上の整数をかけると(ほぼ)整数になるか
        for(let k=2; k<9999; ++k){
            if(Math.abs(1-p*k)%1<0.00000000000001){
                return true;
            }
        }
        return false;
    },
    inN(a){
        //自然数全体の元であるか。
        if(a>0){
            return this.inZ(a);
        }
        return false;
    },
    inR(a){
        //実数全体の元であるか。
        return Number.isFinite(a);
    },
    inC(a){
        //複素数全体の元であるか。
        return complex.prototype.isPrototypeOf(a);
    },
    in(a,u){
        //aはUの元である。
        if(this.inR(a)){
        return u.indexOf(a)!=-1;
        }else{
            return u.findIndex(e=>JSON.stringify(e)==JSON.stringify(a))!=-1;
        }
    },
    notin(a,u){
        return !this.in(a,u);
    },
    build(u,callback){
        //集合Uの元のうちcallbackを満たすもの全体の集合
        const res=[];
        for(let k=0; k<u.length; ++k){
            if(callback(u[k])){
                res.push(u[k]);
            }
        }
        return res;
    },
    //等差数列でビルド
    series(first,length,step){
        if(!step){
            step=1;
        }
        const res=[first];
        for(let k=0; k<length; ++k){
            res.push(res[k]+step);
        }
        return res;
    },
    //等比数列でビルド
    powseries(first,length,step){
        if(!step){
            step=2;
        }
        const res=[first];
        for(let k=0; k<length; ++k){
            res.push(res[k]*step);
        }
        return res;
    },
    sum(u,v){
        return [...u,...v];
    },
    supersum(bottom,top,callback){
        var res=[];
        //総和集合
        for(let k=bottom; k<=top; ++k){
            res=this.sum(res,callback(k));
        }
        return res;
    },
    quot(u,v){
        return maths.build(u,x=>!this.in(x,v));
    },
    sub(u,v){
        if(this.subset(v,u)){
            return maths.build(u,x=>!this.in(x,v));
        }else{
        console.error("VはUの部分集合ではありません");
        }
    },
    prod(u,v){
        //積集合
        return this.build(u,x=>this.in(x,v));
    },
    superprod(bottom,top,callback){
        var res=[];
        //総積集合
        for(let k=bottom; k<=top; ++k){
            res=this.prod(res,callback(k));
        }
        return res;
    },
    power(u){
        //一旦は実数でのみ定義
        //Uの冪集合(冪集合は集合を元に持つ)
        var res=[[]];
        var nres=[];
        for(let a=0; a<u.length; ++a){
            const rl=res.length;
        for(let k=0; k<rl; ++k){
            for(let h=0; h<u.length; ++h){
                if(this.notin(u[h],res[k])){
                nres.push(this.sort([...res[k],u[h]]));
                }
            }
        }
            //何故かエラーを吐く(本当に不明)
            res=[...res,...nres];
        }
        return this.simplifier(res);
    },
    sort(u){
        //ソートができるのは集合が実数の部分集合であるときのみである。
        return this.mySort(u);
    },
    simplifier(u){
        //Uの重複値除外(本来数列に重複はないが)
        const res=[];
        const expr=[];
        for(let k=0; k<u.length; ++k){
            if(this.inR(u[k])){
                if(expr.indexOf(u[k])==-1){
                expr.push(u[k]);
                res.push(u[k]);
                }
            }else{
            const str=JSON.stringify(u[k]);
            if(expr.indexOf(str)==-1){
                expr.push(str);
                res.push(u[k]);
            }
            }
        }
        return res;
    },
    subset(u,v){
        //UがVの部分集合であるか。
        //Uのすべての元がVの元であるか。
        for(let k=0; k<u.length; ++k){
            if(!this.in(u[k],v)){
                return false;
            }
        }
        return true;
    },
    mySort(array){
        const u=array.slice();
        var res=[u[0]];
        for(let k=1; k<u.length; ++k){
            const id=res.findIndex(e=>e>u[k]);//xより大きいeのid
            if(id==-1){
                res.push(u[k]);
            }else{
            res=this.pushAt(res,id-1,u[k]).slice();
            }
        }
        return res;
    },
    pushAt(u,t,v){
        return [...u.slice(0,t+1),v,...u.slice(t+1,u.length)];
    },
    topology(x,o){
        //XがOの位相空間であるか。
        return this.in(x,o) && this.in(this.superprod(0,o.length-1,k=>o[k]),o) && this.in(this.simplifier(maths.supersum(0,o.length-1,k=>o[k])),o);
    },
    isopen(a,x,o){
        //開集合
        return this.subset(a,x) && this.in(a,o);
    },
    isclose(a,x,o){
        //閉集合
        return this.subset(a,x) && this.in(this.sub(x,a),o);
    }
}
const sequence={
    build(input,callback){
        const res=[];
        for(let k=0; k<input.length; ++k){
            res.push(callback(input[k]));
        }
        return res;
    },
    recursion(first,callback,n){
        const a=[first];
        for(let k=0; k<n; ++k){
            a[k+1]=(callback(a,k));
        }
        return a;
    }
}
class complexMath{
    z(real,imag){
        return new complex(real,imag);
    }
    polar(radius,theta){
        return new complex(radius*Math.cos(theta),radius*Math.sin(theta));
    }
    arg(z){
        return z.arg;
    }
    abs(z){
        return z.abs;
    }
    conjugation(z){
        return z.conjugation;
    }
    sum(z,c){
        return this.z(z.real+c.real,z.imag+c.imag);
    }
    dec(z,c){
        return this.z(z.real-c.real,z.imag-c.imag);
    }
    prod(z,c){
        return this.polar(z.abs*c.abs,z.arg+c.arg);
    }
    quot(z,c){
        return this.prod(z,this.pow(c,this.z(-1,0)));
    }
    exp(z){
        return this.polar(Math.exp(z.real),z.imag);
    }
    ln(z){
        return this.z(Math.log(z.abs),z.arg);
    }
    pow(z,c){
        if(z.abs==0){
            return this.z(0,0);
        }
        return this.exp(this.prod(c,this.ln(z)));
    }
    log(z,c){
        return this.quot(this.ln(c),this.ln(z));
    }
    sin(z){
        return this.quot(this.dec(this.exp(this.prod(this.z(0,1),z)),this.exp(this.prod(this.z(0,-1),z))),this.z(0,2));
    }
    sinzmc(z){
        let res=this.z(0,0);
        for(let k=0; k<10; ++k){
            res=this.sum(res,this.prod(this.z(Math.pow(-1,k),0),this.quot(this.pow(z,this.z(2*k+1,0)),this.z(math.fact(2*k+1),0))));
        }
        return res;
    }
    cos(z){
        return this.quot(this.sum(this.exp(this.z(-z.imag,z.real)),this.exp(this.z(z.imag,-z.real))),this.z(2,0));
    }
    tan(z){
        return this.quot(this.sin(z),this.cos(z));
    }
    mandelbrot(z,n){
        let c=this.z(0,0);
        for(let k=0; k<n; ++k){
            c=this.sum(this.pow(c,this.z(2,0)),z);
        }
        return c;
    }
}
class quaternion{
    constructor(real,i,j,k){
        if(!real){
            real=0;
        }
        if(!i){
            i=0;
        }
        if(!j){
            j=0;
        }
        if(!k){
            k=0;
        }
        this.real=real;
        this.i=i;
        this.j=j;
        this.k=k;
    }
    get imag(){
        return new vector(this.i,this.j,this.k);
    }
    get vector(){
        //単位ベクトル
        return new vector(this.i/this.imag.length,this.j/this.imag.length,this.k/this.imag.length);
    }
    get abs(){
        return Math.hypot(this.real,this.imag.length);
    }
    get arg(){
        return Math.atan2(this.imag.length,this.real);
    }
    get arg3(){
        return [Math.atan2(this.i,this.real),Math.atan2(this.j,this.real),Math.atan2(this.k,this.real)];
    }
    get angle(){
        return 180*(this.arg/Math.PI);
    }
    get conjugation(){
        return new quaternion(this.real,-this.i,-this.j,-this.k);
    }
}
var mathtmp=[];
complex.prototype.valueOf = function() {
  mathtmp[mathtmp.length] = this;
  return 3;
};
quaternion.prototype.valueOf = function() {
  mathtmp[mathtmp.length] = this;
  return 3;
};
class quaternionMath{
    real(n){
        return new quaternion(n);
    }
    i(n){
        return new quaternion(0,n);
    }
    j(n){
        return new quaternion(0,0,n);
    }
    k(n){
        return new quaternion(0,0,0,n);
    }
    //演算子
    f(v){
        var res;
    if(v==6){
      res = this.sum(mathtmp[0],mathtmp[1]);
    }
        if(v==0){
      res = this.dec(mathtmp[0],mathtmp[1]);
    }
        if(v==9){
      res = this.prod(mathtmp[0],mathtmp[1]);
    }
        if(v==1){
      res = this.quot(mathtmp[0],mathtmp[1]);
    }
        if(v==27){
      res = this.pow(mathtmp[0],mathtmp[1]);
    }
  mathtmp = [];
  return res;
    }
    //オイラー角->単位四元数
    fromEular(v){
        //xz->xy->yz順
        
    }
    //単位四元数->オイラー角
    toEular(q){
        //XYZ系
        var eular=[];
        eular.push(Math.atan2(2*(q.real*q.i+q.j*q.k),1-2*(Math.pow(q.i,2)+Math.pow(q.j,2))));
        eular.push(Math.asin(2*(q.real*q.j-q.i*q.k)));
        eular.push(Math.atan2(2*(q.real*q.k+q.i*q.j),1-2*(Math.pow(q.j,2)+Math.pow(q.k,2))));
        return eular;
    }
    //4次元
    fromExpandedEular(v){
        //xz->xy->yz->xw->yw->zw順
        
    }
    rotationMatrix3(q){
        const an=this.toEular(q);
        //XYZ系
        const Ryz=mat.rotationMatrix(4,[1,4],an[0]);
        const Rxz=mat.rotationMatrix(4,[2,4],an[1]);
        const Rxy=mat.rotationMatrix(4,[3,4],an[2]);
        return mat.prod(mat.prod(Ryz,Rxz),Rxy);
    }
    LR(Q,qw){
        const a=Q.real;
        const b=Q.i;
        const c=-Q.j;
        const d=Q.k;
        const p=qw.real;
        const q=qw.i;
        const r=-qw.j;
        const s=qw.k;
        const L=[
            [a,-b,-c,-d],
            [b,a,-d,c],
            [c,d,a,-b],
            [d,-c,b,a]
        ];
        const R=[
            [p,-q,-r,-s],
            [q,p,s,-r],
            [r,-s,p,q],
            [s,r,-q,p]
        ];
        return mat.prod(L,R);
    }
    rotationMatrix(Q,qw){
        const w=Q.real;
        const x=Q.i;
        const y=-Q.j;
        const z=Q.k;
        const W=qw.real;
        const X=qw.i;
        const Y=-qw.j;
        const Z=qw.k;
        //エルフリンコフ・ローゼン法
        //左傾斜回転と右傾斜回転に分解する。
        //左手座標系
        const R4=[
            [w*W+x*X+y*Y+z*Z,w*X-x*W-y*Z+z*Y,w*Y-y*W+x*Z-z*X,w*Z-z*W-x*Y+y*X],
            [-w*X+x*W-y*Z+z*Y,w*W+x*X-y*Y-z*Z,-w*Z-z*W+x*Y+y*X,w*Y+y*W+x*Z+z*X],
            [-w*Y+y*W+x*Z-z*X,w*Z+z*W+x*Y+y*X,w*W-x*X+y*Y-z*Z,-w*X-x*W+y*Z+z*Y],
            [-w*Z+z*W-x*Y+y*X,-w*Y-y*W+x*Z+z*X,w*X+x*W+y*Z+z*Y,w*W-x*X-y*Y+z*Z]
        ];
        //return R4;
        const R=[
            [R4[1][1],R4[1][2],R4[1][3],R4[1][0]],
            [R4[2][1],R4[2][2],R4[2][3],R4[2][0]],
            [R4[3][1],R4[3][2],R4[3][3],R4[3][0]],
            [R4[0][1],R4[0][2],R4[0][3],R4[0][0]]
        ];
        return R;
        /*[R[0][0],-R[1][0],R[2][0],R[0][3]],
            [-R[0][1],R[1][1],-R[2][1],R[1][3]],
            [R[0][2],-R[1][2],R[2][2],R[2][3]],
            [R[3][0],R[3][1],R[3][2],R[3][3]]*/
        return [
            [R[0][0],R[0][1],R[0][2],-R[0][3]],
            [R[1][0],R[1][1],R[1][2],R[1][3]],
            [R[2][0],R[2][1],R[2][2],-R[2][3]],
            [-R[3][0],R[3][1],-R[3][2],R[3][3]]
        ];
    }
    //単位四元数の対->6平面オイラー角
    toExpandedEular(Q,q){
        const w=Q.real;
        const x=Q.i;
        const y=Q.j;
        const z=Q.k;
        const W=q.real;
        const X=q.i;
        const Y=q.j;
        const Z=q.k;
        //const m02=w*Y+y*W+x*Z+z*X;
        const m03=-w*X+x*W-y*Z+z*Y;
        const m13=-w*Y+y*W+x*Z-z*X;
        const m23=-w*Z+z*W-x*Y+y*X;
        const m22=w*W-x*X-y*Y+z*Z;
        const m33=w*W+x*X+y*Y+z*Z;
        const m12=-w*X-x*W+y*Z+z*Y;
        const m20=-w*Y-y*W+x*Z+z*X;
        const m21=w*X+x*W+y*Z+z*Y;
        //IOPXYZ系(I->xw O->yw P->zw)
        const P=Math.asin(-m23);
        const sinO=(m13*(Math.tan(P)/m23));
        const O=Math.asin(sinO);
        const cosI=m33/(Math.cos(O)*Math.cos(P));
        const sinI=-m03/(Math.cos(O)*Math.cos(P));
        const I=Math.atan2(sinI,cosI);
        const ax=Math.atan(-(m12*Math.cos(P))/(m22*Math.cos(O))-Math.tan(O)*Math.sin(P));
        const cosY=m22/(Math.cos(P)*Math.cos(ax));
        const sinY=(m12-cosY*(Math.sin(I)*Math.sin(O)*Math.sin(X)-Math.sin(I)*Math.cos(O)*Math.sin(P)*Math.cos(X)))/(Math.cos(I));
        const ay=Math.atan2(sinY,cosY);
        const u=Math.cos(ax)*Math.sin(ay);
        const az=Math.acos((Math.sin(ax)*m21+u*m20)/(Math.cos(P)*(Math.pow(u,2)+Math.pow(Math.sin(ax),2))));
        return [I,O,P,ax,ay,az];
    }
    q(real,i,j,k){
        return new quaternion(real,i,j,k);
    }
    vecq(r,v){
        return new quaternion(r,v.x,v.y,v.z);
    }
    polar(radius,vector,theta){
        const v=vector.length;
        vector.x=vector.x/v;
        vector.y=vector.y/v;
        vector.z=vector.z/v;
        return new quaternion(radius*Math.cos(theta),radius*vector.x*Math.sin(theta),radius*vector.y*Math.sin(theta),radius*vector.z*Math.sin(theta));
    }
    arg(q){
        return q.arg;
    }
    abs(q){
        return q.abs;
    }
    sum(q,p){
        return this.q(q.real+p.real,q.i+p.i,q.j+p.j,q.k+p.k);
    }
    dec(q,p){
        return this.q(q.real-p.real,q.i-p.i,q.j-p.j,q.k-p.k);
    }
    prod(q,p){
        if(Number.isFinite(p)){
            return this.vecq(q.real*p,vec3.prod(q.imag,p));
        }
        return this.vecq(q.real*p.real-vec3.dot(q.imag,p.imag),vec3.sum(vec3.sum(vec3.prod(p.imag,q.real),vec3.prod(q.imag,p.real)),vec3.cross(q.imag,p.imag)));
    }
    exp(q){
        return this.polar(Math.exp(q.real),q.vector,q.imag.length);
    }
    ln(q){
        const l=Math.log(q.abs+0.0000000000001);
        return this.q(l,q.vector.x*q.arg,q.vector.y*q.arg,q.vector.z*q.arg);
    }
    pow(q,p){
    if(q.abs==0){
        return q;
    }else{
        if(Number.isFinite(q) && Number.isFinite(p)){
            return this.q(Math.pow(q,p),0,0,0);
        }
        if(!Number.isFinite(q) && !Number.isFinite(p) && q.imag.length==0 && p.imag.length==0){
            return this.q(Math.pow(q.real,p.real),0,0,0);
        }
        if(!Number.isFinite(q) && q.imag.length==0 && Number.isFinite(p)){
            return this.q(Math.pow(q.real,p),0,0,0);
        }
        if(!Number.isFinite(p) && Number.isFinite(q) && p.imag.length==0){
            return this.q(Math.pow(q,p.real),0,0,0);
        }
        if(Number.isFinite(q)){
            return this.exp(this.prod(p,this.q(Math.log(q),0,0,0)));
        }
        if(Number.isFinite(p)){
            return this.exp(this.prod(this.q(p,0,0,0),this.ln(q)));
        }
        if(q.imag.length==0){
            return this.exp(this.prod(p,this.q(Math.log(q.real),0,0,0)));
        }
        if(p.imag.length==0){
            return this.exp(this.prod(this.q(p.real,0,0,0),this.ln(q)));
        }
        return this.exp(this.prod(p,this.ln(q)));
    }
    }
    quot(q,p){
        if(Number.isFinite(p)){
            return this.prod(q,this.q(1/p,0,0,0));
        }
        if(p.imag.length==0){
            return this.prod(q,this.q(1/p.real,0,0,0));
        }
        return this.prod(q,this.pow(p,-1));
    }
    sin(q){
        let res=this.q(0,0,0,0);
        for(let k=0; k<10; ++k){
            res=this.sum(res,this.prod(this.q(Math.pow(-1,k),0,0,0),this.quot(this.pow(q,2*k+1),this.q(math.fact(2*k+1),0,0,0))));
        }
        return res;
    }
    toText(q){
        let real=q.real;
        let i=q.i+"";
        let j=q.j+"";
        let k=q.k+"";
        if(real==0 && i==0 && j==0 && k==0){
            real=0;
            i="";
            j="";
            k="";
        }else{
            if(parseFloat(i)>0){
                if(real!=0){
                    i="+"+i;
                }
            }
            if(parseFloat(j)>0){
                if(real!=0 || i!=0){
                    j="+"+j;
                }
            }
            if(parseFloat(k)>0){
                if(real!=0 || i!=0 || j!=0){
                    k="+"+k;
                }
            }
            if(real==0){
                real="";
            }
            if(i==0){
                i="";
            }else if(Math.abs(parseFloat(i))!=1){
                i=i+"i";
            }else{
                i=i.replaceAll("1","i");
            }
            if(j==0){
                j="";
            }else if(Math.abs(parseFloat(j))!=1){
                j=j+"j";
            }else{
                j=j.replaceAll("1","j");
            }
            if(k==0){
                k="";
            }else if(Math.abs(parseFloat(k))!=1){
                k=k+"k";
            }else{
                k=k.replaceAll("1","k");
            }
        }
        return `${real}${i}${j}${k}`;
    }
}
class octonion{
    constructor(real,i,j,k,e,f,g,h){
        if(i===undefined){
            i=0;
        }
        if(j===undefined){
            j=0;
        }
        if(k===undefined){
            k=0;
        }
        if(e===undefined){
            e=0;
        }
        if(f===undefined){
            f=0;
        }
        if(g===undefined){
            g=0;
        }
        if(h===undefined){
            h=0;
        }
        this.real=real;
        this.i=i;
        this.j=j;
        this.k=k;
        this.e=e;
        this.f=f;
        this.g=g;
        this.h=h;
    }
    get imag(){
        return [this.i,this.j,this.k,this.e,this.f,this.g,this.h];
    }
    get vector(){
        //単位ベクトル
        let res=[];
        for(let k=0; k<8-1; ++k){
            if(vec.length(this.imag)==0){
                res.push(0);
            }else{
        res.push(this.imag[k]/vec.length(this.imag));
            }
        }
        return res;
    }
    get abs(){
        return Math.sqrt(Math.pow(this.real,2)+Math.pow(this.i,2)+Math.pow(this.j,2)+Math.pow(this.k,2)+Math.pow(this.e,2)+Math.pow(this.f,2)+Math.pow(this.g,2)+Math.pow(this.h,2));
    }
    get arg(){
        return Math.atan2(vec.length(this.imag),this.real);
    }
    get conjugate(){
        return new octonion(this.real,-this.i,-this.j,-this.k,-this.e,-this.f,-this.g,-this.h);
    }
}
class octonionMath{
    o(real,i,j,k,e,f,g,h){
        return new octonion(real,i,j,k,e,f,g,h);
    }
    veco(x,v){
        return new octonion(x,v[0],v[1],v[2],v[3],v[4],v[5],v[6]);
    }
    polar(radius,vector,theta){
        for(var v of vector){
            v=v/vec.length(vector);
        }
        return this.veco(radius*Math.cos(theta),vec.prod(vec.prod(vector,radius),Math.sin(theta)));
    }
    fromQuaternion(q,p){
        return new octonion(q.real,q.i,q.j,q.k,p.real,p.i,p.j,p.k);
    }
    sum(a,b){
        return this.o(a.real+b.real,a.i+b.i,a.j+b.j,a.k+b.k,a.e+b.e,a.f+b.f,a.g+b.g,a.h+b.h);
    }
    dec(a,b){
        return this.o(a.real-b.real,a.i-b.i,a.j-b.j,a.k-b.k,a.e-b.e,a.f-b.f,a.g-b.g,a.h-b.h);
    }
    prod(a,b){
        const q=new quaternionMath();
        let aq=[new quaternion(a.real,a.i,a.j,a.k),new quaternion(a.e,a.f,a.g,a.h)];
        let bq=[new quaternion(b.real,b.i,b.j,b.k),new quaternion(b.e,b.f,b.g,b.h)];
        return this.fromQuaternion(q.dec(q.prod(aq[0],bq[0]),q.prod(bq[1].conjugation,aq[1])),q.sum(q.prod(bq[1],aq[0]),q.prod(aq[1],bq[0].conjugation)));
    }
    exp(o){
        return this.polar(Math.exp(o.real),o.vector,vec.length(o.imag));
    }
    ln(o){
        return this.veco(Math.log(o.abs),vec.prod(o.vector,o.arg));
    }
    pow(a,b){
        return this.exp(this.prod(b,this.ln(a)));
    }
    quot(a,b){
        return this.prod(a,this.pow(b,this.o(-1,0,0,0,0,0,0,0))); 
    }
    log(a,b){
        return this.quot(this.ln(b),this.ln(a));
    }
}
class sedenion{
    constructor(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15){
        if(e1===undefined){
            e1=0;
        }
        if(e2===undefined){
            e2=0;
        }
        if(e3===undefined){
            e3=0;
        }
        if(e4===undefined){
            e4=0;
        }
        if(e5===undefined){
            e5=0;
        }
        if(e6===undefined){
            e6=0;
        }
        if(e7===undefined){
            e7=0;
        }
        if(e8===undefined){
            e8=0;
        }
        if(e9===undefined){
            e9=0;
        }
        if(e10===undefined){
            e10=0;
        }
        if(e11===undefined){
            e11=0;
        }
        if(e12===undefined){
            e12=0;
        }
        if(e13===undefined){
            e13=0;
        }
        if(e14===undefined){
            e14=0;
        }
        if(e15===undefined){
            e15=0;
        }
        this.e0=e0;
        this.e1=e1;
        this.e2=e2;
        this.e3=e3;
        this.e4=e4;
        this.e5=e5;
        this.e6=e6;
        this.e7=e7;
        this.e8=e8;
        this.e9=e9;
        this.e10=e10;
        this.e11=e11;
        this.e12=e12;
        this.e13=e13;
        this.e14=e14;
        this.e15=e15;
    }
    get array(){
        return [this.e0,this.e1,this.e2,this.e3,
            this.e4,this.e5,this.e6,this.e7,
            this.e8,this.e9,this.e10,this.e11,
            this.e12,this.e13,this.e14,this.e15];
    }
    get imag(){
        return this.array.slice(1,16);
    }
    get vector(){
        //単位ベクトル
        let res=[];
        for(let k=0; k<16-1; ++k){
        if(vec.length(this.imag)==0){
            res.push(0);
        }else{
        res.push(this.imag[k]/vec.length(this.imag));
        }
        }
        return res;
    }
    get abs(){
        return vec.length(this.array);
    }
    get arg(){
        return Math.atan2(vec.length(this.imag),this.e0);
    }
    get conjugate(){
        let res=[this.e0];
        let S=vec.prod(this.imag,-1);
        for(const s of S){
            res.push(s);
        }
        return res;
    }
}
class sedenionMath{
    s(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15){
        return new sedenion(e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15);
    }
    vecs(x,v){
        return new sedenion(x,v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],v[11],v[12],v[13]);
    }
    polar(radius,vector,theta){
        for(var v of vector){
            v=v/vec.length(vector);
        }
        return this.vecs(radius*Math.cos(theta),vec.prod(vec.prod(vector,radius),Math.sin(theta)));
    }
    fromOctonion(a,b){
        return new sedenion(a.real,a.i,a.j,a.k,a.e,a.f,a.g,a.h,b.real,b.i,b.j,b.k,b.e,b.f,b.g,b.h);
    }
    sum(a,b){
        let res=vec.sum(a.array,b.array);
        return this.vecs(res[0],res.slice(1,16));
    }
    dec(a,b){
        let res=vec.dec(a.array,b.array);
        return this.vecs(res[0],res.slice(1,16));
    }
    prod(a,b){
        const o=new octonionMath();
        let ao=[new octonion(a.e0,a.e1,a.e2,a.e3,a.e4,a.e5,a.e6,a.e7),new octonion(a.e8,a.e9,a.e10,a.e11,a.e12,a.e13,a.e14,a.e15)];
        let bo=[new octonion(b.e0,b.e1,b.e2,b.e3,b.e4,b.e5,b.e6,b.e7),new octonion(b.e8,b.e9,b.e10,b.e11,b.e12,b.e13,b.e14,b.e15)];
        return this.fromOctonion(o.dec(o.prod(ao[0],bo[0]),o.prod(bo[1].conjugate,ao[1])),o.sum(o.prod(bo[1],ao[0]),o.prod(ao[1],bo[0].conjugate)));
    }
    exp(s){
        return this.polar(Math.exp(s.e0),s.vector,vec.length(s.imag));
    }
    ln(s){
        return this.vecs(Math.log(s.abs),vec.prod(s.vector,s.arg));
    }
    pow(a,b){
        return this.exp(this.prod(b,this.ln(a)));
    }
    quot(a,b){
        return this.prod(a,this.pow(b,this.s(-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0))); 
    }
    log(a,b){
        return this.quot(this.ln(b),this.ln(a));
    }
}
class vector{
    constructor(x,y,z){
        this.R=2;
        this.x=x;
        this.y=y;
        if(z!==undefined){
        this.z=z;
        this.R++;
        }
    }
    get length(){
        if(this.R==2){
            return Math.hypot(this.x,this.y);
        }else{
            return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
        }
    }
}
const vec={
    length(A){
        let res=0;
        for(const a of A){
            res+=Math.pow(a,2);
        }
        return Math.sqrt(res);
    },
    sum(A,B){
        const C=[];
        for(let k=0; k<A.length; ++k){
            C.push(A[k]+B[k]);
        }
        return C;
    },
    dec(A,B){
        const C=[];
        for(let k=0; k<A.length; ++k){
            C.push(A[k]-B[k]);
        }
        return C;
    },
    prod(A,x){
        let res=[];
        for(var a of A){
            res.push(a*x);
        }
        return res;
    },
    matrix(V){
        if(V.length==2){
            return new vector(V[0][0]+V[0][1],V[1][1]+V[1][0]);
        }
        if(V.length==3){
            return new vector(V[0][0]+V[0][1]+V[0][2],V[1][1]+V[1][0]+V[1][2],V[2][2]+V[2][1]+V[2][0]);
        }
        const res=[];
        for(let i=0; i<V.length; ++i){
            var r=0;
            for(let j=0; j<V[i].length; ++j){
                r+=V[i][j];
            }
            res.push(r);
        }
        return res;
    },
    array(v){
        if(v.R==3){
            return [v.x,v.y,v.z];
        }
        if(v.R==2){
            return [v.x,v.y];
        }
        return v;
    },
    extend(vector,value){
        const a=vector.slice();
        a.push(value);
        return a;
    }
}
const vec2={
    sum(a,b){
        return new vector(a.x+b.x,a.y+b.y)
    },
    dot(a,b){
        return a.x*b.x+a.y*b.y;
    },
    prod(a,b){
        return new vector(a.x*b,a.y*b)
    },
    quot(a,b){
        return new vector(a.x/b,a.y/b)
    }
}
const vec3={
    sum(a,b){
        return new vector(a.x+b.x,a.y+b.y,a.z+b.z);
    },
    dec(a,b){
        return new vector(a.x-b.x,a.y-b.y,a.z-b.z);
    },
    prod(a,x){
        return new vector(a.x*x,a.y*x,a.z*x);
    },
    dot(a,b){
        return a.x*b.x+a.y*b.y+a.z*b.z;
    },
    cross(a,b){
        return new vector(a.y*b.z-a.z*b.y,a.z*b.x-b.z*a.x,a.x*b.y-a.y*b.x);
    },
    dist(a,b){
        return this.dec(a,b).length;
    }
}
const mat2={
    rotationMatrix(theta){
        return [[Math.cos(theta),-Math.sin(theta)],[Math.sin(theta),Math.cos(theta)]];
    }
}
const mat3={
    rotationMatrix(theta,axis){
        if(axis=="x"){
            return [
            [1,0,0],
            [0,Math.cos(theta),-Math.sin(theta)],
            [0,Math.sin(theta),Math.cos(theta)]];
        }
        if(axis=="y"){
            return [
            [Math.cos(theta),0,-Math.sin(theta)],
            [0,1,0],
            [Math.sin(theta),0,Math.cos(theta)]]
        }
        if(axis=="z"){
            return [
            [Math.cos(theta),-Math.sin(theta),0],
            [Math.sin(theta),Math.cos(theta),0],
            [0,0,1]];
        }
    }
}
const mat4={
    perspective(v,dist){
        const u=dist/(dist-v.z);
        const M=mat.vector([v.x,v.y,v.z,1]);
        return vec.matrix(mat.prod([
            [u,0,0,0],
            [0,u,0,0],
            [0,0,0,0],
            [0,0,0,1]
        ],M));
    },
    perspective4D(v,dist){
        const u=dist/(dist-v[3]);
        const M=mat.vector(v);
        return vec.matrix(mat.prod([
            [u,0,0,0],
            [0,u,0,0],
            [0,0,u,0]
        ],M).slice(0,3));
    },
    rotationMatrix(theta,axis){
        const s=Math.sin(theta);
        const c=Math.cos(theta);
        if(axis=="xw"){
            return [
            [1,0,0,0],
            [0,Math.cos(theta),-Math.sin(theta),0],
            [0,Math.sin(theta),Math.cos(theta),0],
            [0,0,0,1]];
        }
        if(axis=="yw"){
            return [
            [Math.cos(theta),0,Math.sin(theta),0],
            [0,1,0,0],
            [-Math.sin(theta),0,Math.cos(theta),0],
            [0,0,0,1]];
        }
        if(axis=="zw"){
            return [
            [Math.cos(theta),-Math.sin(theta),0,0],
            [Math.sin(theta),Math.cos(theta),0,0],
            [0,0,1,0],
            [0,0,0,1]];
        }
        //4次元の回転
        if(axis=="xy"){
            return [
                [1,0,0,0],
                [0,1,0,0],
                [0,0,c,-s],
                [0,0,s,c]
            ]
        }
        if(axis=="yz"){
            return [
                [c,0,0,-s],
                [0,1,0,0],
                [0,0,1,0],
                [s,0,0,c]
            ]
        }
        if(axis=="xz"){
            return [
                [1,0,0,0],
                [0,c,0,-s],
                [0,0,1,0],
                [0,s,0,c]
            ]
        }
    },
    //左手座標系
    perspectiveMatrix(theta,aspect,far,near){
        var fn=far-near;
        return [
            [math.cot(theta),0,0,0],
            [0,math.cot(theta)*aspect,0,0],
            [0,0,(far+near)/fn,-1],
            [0,0,2*far*near/fn,0]
        ]
    },
    perspectiveMatrix2(theta,w,h,far,near){
        var fn=far-near;
        return [
            [2*near/w,0,0,0],
            [0,2*near/h,0,0],
            [0,0,-(far+near)/fn,-2*far*near/fn],
            [0,0,-1,0]
        ]
    },
    translate(v){
        return [
            [1,0,0,v.x],
            [0,1,0,v.y],
            [0,0,1,v.z],
            [0,0,0,1]
        ]
    },
    viewport(w,h,far,near,s){
        if(!s){
            s=new vector(0,0);
        }
        return [
            [w/2,0,0,s.x+w/2],
            [0,-h/2,0,s.y+h/2],
            [0,0,(far-near)/2,(far+near)/2],
            [0,0,0,1]
        ]
    }
}
const mat={
    cofactor(matrix, row, col) {
        row-=1;
        col-=1;
  const cofactorMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i !== row) {
      const rowCopy = [];
      for (let j = 0; j < matrix[i].length; j++) {
        if (j !== col) {
          rowCopy.push(matrix[i][j]);
        }
      }
      cofactorMatrix.push(rowCopy);
    }
  }
  return cofactorMatrix;
    },
    det(matrix){
        let size=matrix.length;
        if(size!=matrix[0].length){
            console.error("The determinant must be a square matrix!");
            return;
        }
let A=matrix;
        if(size==2){
            ret,urn (A[0][0]*A[1][1]-A[1][0]*A[0][1]);
        }else if(size==3){
            return (A[0][0]*A[1][1]*A[2][2]-A[0][0]*A[1][2]*A[2][1]+A[0][1]*A[1][2]*A[2][0]-A[0][1]*A[1][0]*A[2][2]+A[0][2]*A[1][0]*A[2][1]-A[0][2]*A[1][1]*A[2][0]);
        }else{
            let res=0;
            for(let i=0; i<matrix.length; i++) {
    res+=Math.pow(-1,i)*matrix[0][i]*this.det(this.cofactor(matrix, 1, i+1));
  }
  return res;
        }
    },
    isScalar(input){
        return Number.isFinite(input);
    },
    sum(A,B){
        const C=[];
        for(let i=0; i<A.length; i++){
            C.push([]);
            for(let j=0; j<A[i].length; j++){
                C[i].push(A[i][j]+B[i][j]);
            }
        }
        return C;
    },
    prod(A,B){
        if(this.isScalar(B)){
            const C=[];
            for(let i=0; i<A.length; i++){
                C.push([]);
                for(let j=0; j<A[i].length; j++){
                    C[i].push(A[i][j]*B);
                }
            }
            return C;
        }else{
            var C=[];
            const m=Math.max(A.length,A[0].length)-1;
            for(let i=0; i<A.length; i++){
                C.push([]);
                for(let j=0; j<B[0].length; j++){
                    C[i].push(math.sum(0,m,k=>A[i][k]*B[k][j]));
                }
            }
            return C;
        }
    },
    pow(A,B){
        //正方行列である必要がある。
        if(this.isScalar(B)){
            let C=this.unit(A.length);
            for(let k=0; k<B; ++k){
                C=this.prod(C,A);
            }
            return C;
        }
    },
    exp(A){
        var C=this.prod(A,0);
        for(let k=0; k<100; k++){
            C=this.sum(C,this.prod(this.pow(A,k),1/math.fact(k)));
        }
        return C;
    },
    square(n){
        const A=[];
        for(let i=0; i<n; ++i){
            A.push([]);
            for(let j=0; j<n; ++j){
                A[i].push(0);
            }
        }
        return A;
    },
    vector(v){
        if(v.x===undefined){
        var A=this.square(v.length);
        for(let k=0; k<v.length; ++k){
            A[k][k]=v[k];
        }
        return A;
    }else{
        if(v.R==3){
            return [[v.x,0,0],[0,v.y,0],[0,0,v.z]];
        }
    }
    },
    //大きさx*yの空の行列を作る。
    plane(x,y){
        var A=[];
        for(let i=0; i<x; ++i){
            A.push([]);
            for(let j=0; j<y; ++j){
                A[i].push(0);
            }
        }
        return A;
    },
    unit(n){
        const a=[];
        for(let k=0; k<n; ++k){
            a.push(1);
        }
        return this.vector(a);
    },
    //回転行列
    rotationMatrix(dimension,axis,theta){
        //軸はインデックス
        var res=this.unit(dimension);
        var b=[];
        //xyzwvなど固有の文字列を数値化
        for(let k=0; k<axis.length; ++k){
            if(axis[k]=="x"){
            axis[k]=1;
                }
            if(axis[k]=="y"){
            axis[k]=2;
                }
            if(axis[k]=="z"){
            axis[k]=3;
                }
            if(axis[k]=="w"){
            axis[k]=4;
                }
            if(axis[k]=="v"){
            axis[k]=5;
                }
            if(axis[k]=="u"){
            axis[k]=6;
                }
        }
        for(let k=1; k<=dimension; ++k){
            if(axis.indexOf(k)==-1){
            b.push(k);
            }
        }
        res[b[0]-1][b[0]-1]=Math.cos(theta);
        res[b[1]-1][b[1]-1]=Math.cos(theta);
        res[b[0]-1][b[1]-1]=Math.sign(b[0]-b[1])*Math.sin(theta);
        res[b[1]-1][b[0]-1]=Math.sign(b[1]-b[0])*Math.sin(theta);
        return res;
    },
    //回転
    rotate(vector,axis,theta){
        var R=this.rotationMatrix(vector.length,axis,theta);
        var V=this.vector(vector);
        return vec.matrix(this.prod(R,V));
    },
    //透視投影
    perspective(vector,dist){
    var R=vector.length;
        if(R==3){
            mat4.perspective(vector,dist);
        }
    //変換行列の生成
    var M=this.plane(R-1,R);
    const f=dist/(dist-vector[R-1]);
    for(let i=0; i<R-1; ++i){
        M[i][i]=f;
    }
    //積
    var v=mat.vector(vector);
    return vec.matrix(mat.prod(M,v));
    },
    multiPerspective(vector,dist){
    while(true){
    if(vector.R==2){
        break;
    }
        vector=vec.array(vector);
    vector=this.perspective(vector,dist);
    }
        return vector;
    }
}
//双曲平面
class hyperbolicContext{
    constructor(context,width,height){
        this.ctx=context;
        this.width=width;
        this.height=height;
        this.iteration=20;
    }
    poincareDisk(){
        var hold=this.ctx.strokeStyle;
        this.ctx.beginPath();
        this.ctx.arc(this.width/2,this.height/2,this.width/2,0,2*Math.PI);
        this.ctx.strokeStyle="#000000";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.strokeStyle=hold;
    }
    point(v){
        v=this.projection(v);
        var hold=this.ctx.fillStyle;
        this.ctx.beginPath();
        this.ctx.arc(v.x,v.y,10,0,2*Math.PI);
        this.ctx.fillStyle="#000000";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillStyle=hold;
    }
    pureProjection(v){
        var p=v;
        const z=Math.sqrt(Math.pow(p.x,2)+Math.pow(p.y,2)+1);
        p=vec2.quot(p,z);
        const d=1+Math.sqrt(1-Math.pow(p.x,2)-Math.pow(p.y,2));
        p=vec2.quot(p,d);
        return p;
    }
    viewport(v){
        return vec2.prod(vec2.sum(v,new vector(1,1)),this.width/2);
    }    
    projection(v){
        return this.viewport(this.pureProjection(v));
    }
    polygonh(points){
        for(let k=0; k<points.length; ++k){
            this.lineh(points[k],points[math.mod(k+1,points.length)]);
        }
    }
    polygon(points){
        for(let k=0; k<points.length; ++k){
            line(points[k],points[math.mod(k+1,points.length)]);
        }
    }
    line(s,e){
    for(let k=0; k<this.iteration; ++k){
        var p=this.projection(vec2.quot(vec2.sum(vec2.prod(s,k),vec2.prod(e,this.iteration-1-k)),this.iteration-1));
        this.ctx.lineTo(p.x,p.y);
    }
    }
    reg(p,theta,R){
        if(!R){
            R=1;
        }
        const c=new complexMath();
        const r=c.polar(1,theta);
        var a=new complex(1,0);
        const points=[];
        while(true){
            points.push(vec2.sum(vec2.prod(new vector(a.real,a.imag),R),p));
            a=c.prod(a,r);
            if(Math.abs(a.arg)<=0.01){
                break;
            }
        }
        this.polygonh(points);
    }
    lineh(a,b){
        const c=new complexMath();
        //二頂点を結ぶ双曲線
    a=this.pureProjection(a);
    b=this.pureProjection(b);
    a=new complex(a.x,a.y);
    b=new complex(b.x,b.y);
    var p=c.quot(c.dec(c.prod(a,new complex(1+b.abs**2,0)),c.prod(b,new complex(1+a.abs**2,0))),c.dec(c.prod(a,b.conjugation),c.prod(a.conjugation,b)));
    const r=c.dec(a,p).abs*canvas.width/2;
    var t1=c.dec(a,p).arg;
    var t2=c.dec(b,p).arg;
    t1+=2*Math.PI*(Math.abs(t1-t2)>Math.PI)*(t2>t1);
    t2+=2*Math.PI*(Math.abs(t1-t2)>Math.PI)*(t2<t1);
    //ビューポート変換
    p=new vector(p.real,p.imag);
    p=this.viewport(p);
    this.ctx.beginPath();
    this.ctx.arc(p.x,p.y,r,Math.min(t1,t2),Math.max(t1,t2));
    this.ctx.stroke();
    this.ctx.closePath();
    }
}
//ベクトル空間
class vectorSpace{
    constructor(dim,basis){
        this.dim=dim;
        this.basis=basis;
        this.vector=[];
    }
    join(v){
        if(v.R==2){
            v=[v.x,v.y];
        }
        if(v.R==3){
            v=[v.x,v.y,v.z];
        }
        this.vector.join(v);
        //ベクトル空間が変化すれば、元も変化する。
    }
}
//基底について定める必要がある。
//基底の構造[[1,0,0],[0,1,0],[0,0,1]]のように定義
const vecs={
    //テンソル積
    prod(V,W){
        var res=new vectorSpace(V.dim*W.dim);
        for(let k=0; k<V.length; ++k){
        }
    },
    tensor(v,w){
        var res=[];
        for(let i=0; i<v.length; ++i){
            for(let j=0; j<v.length; ++j){
                res.push(v[i]*w[j]);
            }
        }
        return res;
    }
}
class splitcomplex{
    constructor(real,perplex){
        this.real=real;
        this.perp=perplex;
    }
    mul(z){
        return new splitcomplex(this.real*z.real+this.perp*z.perp,this.real*z.perp+this.perp*z.real);
    }
    sum(z){
        return new splitcomplex(this.real+z.real,this.perp+z.perp);
    }
    dec(z){
        return new splitcomplex(this.real-z.real,this.perp-z.perp);
    }
}
function splitcomplextosplitbiquaternion(real,i,j,k){
    return new splitbiquaternion(real.real,i.real,j.real,k.real,real.perp,i.perp,j.perp,k.perp);
}
class cliffordMath{
    //[{val:1,basis:[1]},{val:1,basis:[1,2]}]
    scalprod(a,v){
        var res=[];
        for(let k=0; k<v.length; ++k){
            res.push({val:v[k].val*a,basis:v[k].basis});
        }
        return res;
    }
    geoprod(u,v){
        var res=[];
        for(let i=0; i<u.length; ++i){
            for(let j=0; j<v.length; ++j){
                res=this.sum(res,[this.basismul(u[i],v[j])]);
            }
        }
        return res;
    }
    sum(u,v){
        var res=u.slice();
        for(let k=0; k<v.length; ++k){
            let id=res.findIndex(e=>e.basis.join()==v[k].basis.join());
            if(id==-1){
                res.push(v[k]);
            }else{
                res[id].val+=v[k].val;
            }
        }
        return res;
    }
    basismul(u,v){
        var res={val:u.val*v.val,basis:[]};
        if(u.basis.length==1 && v.basis.length==1){
            if(u.basis[0]==v.basis[0]){
                //基底が空のときスカラー
                return res;
            }else{
                res.basis.push(u.basis[0]);
                res.basis.push(v.basis[0]);
            }
        }else{
                var B=[];
                for(let k=0; k<u.basis.length; ++k){
                    B.push(u.basis[k]);
                }
                for(let k=0; k<v.basis.length; ++k){
                    B.push(v.basis[k]);
                }
            var k=0;
            var l=B.length;
                //[1,2],[2,3]->[1,2,2,3]
                while(true){
                    var a=deleteIndex(B,k);
                    var id=a.indexOf(B[k]);
                    if(id!=-1){
                        //if(id>=k){
                            id=id+1;
                        //}
                        B=deleteIndex(B,id);
                        B=deleteIndex(B,k);
                        l-=2;
                        //同類項
                        if(id-k>1 && math.mod(id-k,2)==0){
                            //偶置換の場合係数が反転する。
                            res.val=-res.val;
                        }
                    }else{
                        k++;
                    }
                    if(k>=l){
                        break;
                    }
                }
            res.basis=B.slice();
            }
        //基底のソート
        for(let k=0; k<res.basis.length; ++k){
            let id=arrayMin(res.basis.slice(k))+k;//最小値のインデックス
            while(id>k){
            //目的地(k-インデックス)まで移項
            const hold=res.basis[id-1];
            res.basis[id-1]=res.basis[id];
            res.basis[id]=hold;
                //正負反転
            res.val=-res.val;
                id--;
            }
        }
        return res;
    }
    sortBasis(a){
        var res=this.define(1,a);
        //基底のソート
        for(let k=0; k<res.basis.length; ++k){
            let id=arrayMin(res.basis.slice(k))+k;//最小値のインデックス
            while(id>k){
            //目的地(k-インデックス)まで移項
            const hold=res.basis[id-1];
            res.basis[id-1]=res.basis[id];
            res.basis[id]=hold;
                //正負反転
            res.val=-res.val;
                id--;
            }
        }
        return res.basis;
    }
    scalar(x){
        return [{val:x,basis:[]}];
    }
    vector(A){
        var res=[];
        for(let k=0; k<A.length; ++k){
            res.push({val:A[k],basis:[k+1]});
        }
        return res;
    }
    vector3(A){
        //4次元を想定
        var res=[this.define(A[0],[1,2,3]),this.define(A[1],[2,3,4]),this.define(A[2],[1,3,4]),this.define(A[3],[1,2,4])];
        return res;
    }
    wedge(u,v){
    }
    toVector(cl){
        //1-ベクトルを通常のベクトルへ変換
        var min=0;
        var ind=[];
        var v=[];//1-ベクトル
        for(let k=0; k<cl.length; ++k){
            if(cl[k].basis.length==1){
                ind.push(cl[k].basis[0]);
                v.push(cl[k]);
            }
        }
        var res=[];
        for(let k=0; k<arrayMax(ind); ++k){
            res.push(0);
        }
        for(let k=0; k<v.length; ++k){
            var id=arrayMin(ind,min);
            min=ind[id];
            res[min-1]=v[id].val;
        }
        return res;
    }
    toVector3(cl){
        //4次元のみの想定
        //3-ベクトルを通常のベクトルへ変換
        var res=[0,0,0,0];
        let id=cl.findIndex(e=>e.basis.join()=="1,2,3");
        if(id!=-1){
            res[0]=cl[id].val;
        }
        id=cl.findIndex(e=>e.basis.join()=="2,3,4");
        if(id!=-1){
            res[1]=cl[id].val;
        }
        id=cl.findIndex(e=>e.basis.join()=="1,3,4");
        if(id!=-1){
            res[2]=cl[id].val;
        }
        id=cl.findIndex(e=>e.basis.join()=="1,2,4");
        if(id!=-1){
            res[3]=cl[id].val;
        }
        return res;
    }
    define(val,basis){
        return {val:val,basis:basis};
    }
    exp(i,j,theta){
        return [this.define(Math.cos(theta),[]),this.define(Math.sin(theta),[i,j])];
    }
    rotateInPlane(v,i,j,theta){
        return this.toVector(this.geoprod(this.geoprod(this.exp(i,j,theta/2),this.vector(v)),this.exp(i,j,-theta/2)));
    }
    inverse4D(z){
        //共役
        var q=this.scalprod(-1,z);
        var id=q.findIndex(e=>e.basis.length==0);
        if(id!=-1){
            q[id].val=-q[id].val;
        }
        id=q.findIndex(e=>e.basis.length==4);
        if(id!=-1){
            q[id].val=-q[id].val;
        }
        return q;
    }
    //一般化？
    rotate(v,z){
        return this.toVector(this.geoprod(this.geoprod(this.inverse(z),this.vector(v)),z));
    }
    rotate3D(v,z){
        let iz=[z[0],z[1],z[2],z[3],-z[4],-z[5],-z[6],z[7]];
        let Rv=this.product3D(this.product3D(iz,[0,v.x,v.y,v.z,0,0,0,0]),z);
        return new vector(Rv[1],Rv[2],Rv[3]);
    }
    rotate4D(v,z){
        let iz=[
            z[0],
            z[1],z[2],z[3],z[4],
            -z[5],-z[6],-z[7],-z[8],-z[9],-z[10],
            -z[11],-z[12],-z[13],-z[14],
            z[15]
        ];
        let Rv=this.product4D(this.product4D(iz,[0,v[0],v[1],v[2],v[3],0,0,0,0,0,0,0,0,0,0,0]),z);
        return [Rv[1],Rv[2],Rv[3],Rv[4]];
    }
    rotate4Ds(v,z){
        return this.toVector3(this.geo4d(this.geo4d(this.inverse4D(z),this.vector3(v)),z));
    }
    rotateCl4Ds(v,z){
        return (this.geo4d(this.geo4d(this.inverse4D(z),this.vector(v)),z));
    }
    rotateCl(v,z){
        return this.geoprod(this.geoprod(this.inverse4D(z),this.vector(v)),z);
    }
    size(v){
        var res=0;
        for(let k=0; k<v.length; ++k){
            res+=v[k].val**2;
        }
        return Math.sqrt(res);
    }
    basisprod(a,b){
        return this.basismul(this.define(1,a),this.define(1,b));
    }
    //3次元への固定
    //うまくいった
    generate3D(){
        var u=[["r",[]],["x",[1]],["y",[2]],["z",[3]],["xy",[1,2]],["yz",[2,3]],["xz",[1,3]],["xyz",[1,2,3]]];
        var v=[["R",[]],["X",[1]],["Y",[2]],["Z",[3]],["XY",[1,2]],["YZ",[2,3]],["XZ",[1,3]],["XYZ",[1,2,3]]];
        let res=[this.define("",[]),
            this.define("",[1]),this.define("",[2]),this.define("",[3]),
                this.define("",[1,2]),this.define("",[2,3]),this.define("",[1,3]),
                this.define("",[1,2,3])];
        for(let i=0; i<8; ++i){
            for(let j=0; j<8; ++j){
                var z=this.basisprod(u[i][1],v[j][1]);
                function work(a){
                    if(res[a].val==""){
                    if(z.val==-1){
                    res[a].val+="-";
                    }
                    res[a].val+=`(${u[i][0]}*${v[j][0]})`;
                    }else{
                        var hugo="+";
                        if(z.val==-1){
                            hugo="-";
                        }
                    res[a].val+=`${hugo}(${u[i][0]}*${v[j][0]})`;
                    }
                }
                if(z.basis.length==0){
                    //実数
                    work(0);
                }
                if(z.basis.join()=="1"){
                    work(1);
                }
                if(z.basis.join()=="2"){
                    work(2);
                }
                if(z.basis.join()=="3"){
                    work(3);
                }
                //2-ベクトル
                if(z.basis.join()=="1,2"){
                    work(4);
                }
                if(z.basis.join()=="2,3"){
                    work(5);
                }
                if(z.basis.join()=="1,3"){
                    work(6);
                }
                if(z.basis.join()=="1,2,3"){
                    work(7);
                }
            }
        }
        return res;
    }
    //定義を4次元へ固定する(高速化のため)
    generate4D(){
        var u=[["r",[]],["x",[1]],["y",[2]],["z",[3]],["w",[4]],["xy",[1,2]],["yz",[2,3]],["xz",[1,3]],["xw",[1,4]],["yw",[2,4]],["zw",[3,4]],["xyz",[1,2,3]],["yzw",[2,3,4]],["xzw",[1,3,4]],["xyw",[1,2,4]],["xyzw",[1,2,3,4]]];
        var v=[["R",[]],["X",[1]],["Y",[2]],["Z",[3]],["W",[4]],["XY",[1,2]],["YZ",[2,3]],["XZ",[1,3]],["XW",[1,4]],["YW",[2,4]],["ZW",[3,4]],["XYZ",[1,2,3]],["YZW",[2,3,4]],["XZW",[1,3,4]],["XYW",[1,2,4]],["XYZW",[1,2,3,4]]];
        let res=[this.define("",[]),
            this.define("",[1]),this.define("",[2]),this.define("",[3]),this.define("",[4]),
                this.define("",[1,2]),this.define("",[2,3]),this.define("",[1,3]),this.define("",[1,4]),this.define("",[2,4]),this.define("",[3,4]),
                this.define("",[1,2,3]),this.define("",[2,3,4]),this.define("",[1,3,4]),this.define("",[1,2,4]),
                this.define("",[1,2,3,4])];
        for(let i=0; i<16; ++i){
            for(let j=0; j<16; ++j){
                var z=this.basisprod(u[i][1],v[j][1]);
                function work(a){
                    if(res[a].val==""){
                    if(z.val==-1){
                    res[a].val+="-";
                    }
                    res[a].val+=`(${u[i][0]}*${v[j][0]})`;
                    }else{
                        var hugo="+";
                        if(z.val==-1){
                            hugo="-";
                        }
                    res[a].val+=`${hugo}(${u[i][0]}*${v[j][0]})`;
                    }
                }
                if(z.basis.length==0){
                    //実数
                    work(0);
                }
                if(z.basis.join()=="1"){
                    work(1);
                }
                if(z.basis.join()=="2"){
                    work(2);
                }
                if(z.basis.join()=="3"){
                    work(3);
                }
                if(z.basis.join()=="4"){
                    work(4);
                }
                //2-ベクトル
                if(z.basis.join()=="1,2"){
                    work(5);
                }
                if(z.basis.join()=="2,3"){
                    work(6);
                }
                if(z.basis.join()=="1,3"){
                    work(7);
                }
                if(z.basis.join()=="1,4"){
                    work(8);
                }
                if(z.basis.join()=="2,4"){
                    work(9);
                }
                if(z.basis.join()=="3,4"){
                    work(10);
                }
                if(z.basis.join()=="1,2,3"){
                    work(11);
                }
                if(z.basis.join()=="2,3,4"){
                    work(12);
                }
                if(z.basis.join()=="1,3,4"){
                    work(13);
                }
                if(z.basis.join()=="1,2,4"){
                    work(14);
                }
                if(z.basis.join()=="1,2,3,4"){
                    work(15);
                }
            }
        }
        return res;
    }
    product4D(u,v){
        //配列を与える。
        var r=u[0];
        var x=u[1];
        var y=u[2];
        var z=u[3];
        var w=u[4];
        var xy=u[5];
        var yz=u[6];
        var xz=u[7];
        var xw=u[8];
        var yw=u[9];
        var zw=u[10];
        var xyz=u[11];
        var yzw=u[12];
        var xzw=u[13];
        var xyw=u[14];
        var xyzw=u[15];
        var R=v[0];
        var X=v[1];
        var Y=v[2];
        var Z=v[3];
        var W=v[4];
        var XY=v[5];
        var YZ=v[6];
        var XZ=v[7];
        var XW=v[8];
        var YW=v[9];
        var ZW=v[10];
        var XYZ=v[11];
        var YZW=v[12];
        var XZW=v[13];
        var XYW=v[14];
        var XYZW=v[15];
        return [
            (r*R)+(x*X)+(y*Y)+(z*Z)+(w*W)-(xy*XY)-(yz*YZ)-(xz*XZ)-(xw*XW)-(yw*YW)-(zw*ZW)-(xyz*XYZ)-(yzw*YZW)-(xzw*XZW)-(xyw*XYW)+(xyzw*XYZW),
            (r*X)+(x*R)-(y*XY)-(z*XZ)-(w*XW)+(xy*Y)-(yz*XYZ)+(xz*Z)+(xw*W)-(yw*XYW)-(zw*XZW)-(xyz*YZ)+(yzw*XYZW)-(xzw*ZW)-(xyw*YW)-(xyzw*YZW),
            (r*Y)+(x*XY)+(y*R)-(z*YZ)-(w*YW)-(xy*X)+(yz*Z)+(xz*XYZ)+(xw*XYW)+(yw*W)-(zw*YZW)+(xyz*XZ)-(yzw*ZW)-(xzw*XYZW)+(xyw*XW)+(xyzw*XZW),
            (r*Z)+(x*XZ)+(y*YZ)+(z*R)-(w*ZW)-(xy*XYZ)-(yz*Y)-(xz*X)+(xw*XZW)+(yw*YZW)+(zw*W)-(xyz*XY)+(yzw*YW)+(xzw*XW)+(xyw*XYZW)-(xyzw*XYW),
            (r*W)+(x*XW)+(y*YW)+(z*ZW)+(w*R)-(xy*XYW)-(yz*YZW)-(xz*XZW)-(xw*X)-(yw*Y)-(zw*Z)-(xyz*XYZW)-(yzw*YZ)-(xzw*XZ)-(xyw*XY)+(xyzw*XYZ),
            (r*XY)+(x*Y)-(y*X)+(z*XYZ)+(w*XYW)+(xy*R)+(yz*XZ)-(xz*YZ)-(xw*YW)+(yw*XW)-(zw*XYZW)+(xyz*Z)+(yzw*XZW)-(xzw*YZW)+(xyw*W)-(xyzw*ZW),
            (r*YZ)+(x*XYZ)+(y*Z)-(z*Y)+(w*YZW)-(xy*XZ)+(yz*R)+(xz*XY)-(xw*XYZW)-(yw*ZW)+(zw*YW)+(xyz*X)+(yzw*W)+(xzw*XYW)-(xyw*XZW)-(xyzw*XW),
            (r*XZ)+(x*Z)-(y*XYZ)-(z*X)+(w*XZW)+(xy*YZ)-(yz*XY)+(xz*R)-(xw*ZW)+(yw*XYZW)+(zw*XW)-(xyz*Y)-(yzw*XYW)+(xzw*W)+(xyw*YZW)+(xyzw*YW),
            (r*XW)+(x*W)-(y*XYW)-(z*XZW)-(w*X)+(xy*YW)-(yz*XYZW)+(xz*ZW)+(xw*R)-(yw*XY)-(zw*XZ)-(xyz*YZW)+(yzw*XYZ)-(xzw*Z)-(xyw*Y)-(xyzw*YZ),
            (r*YW)+(x*XYW)+(y*W)-(z*YZW)-(w*Y)-(xy*XW)+(yz*ZW)+(xz*XYZW)+(xw*XY)+(yw*R)-(zw*YZ)+(xyz*XZW)-(yzw*Z)-(xzw*XYZ)+(xyw*X)+(xyzw*XZ),
            (r*ZW)+(x*XZW)+(y*YZW)+(z*W)-(w*Z)-(xy*XYZW)-(yz*YW)-(xz*XW)+(xw*XZ)+(yw*YZ)+(zw*R)-(xyz*XYW)+(yzw*Y)+(xzw*X)+(xyw*XYZ)-(xyzw*XY),
            (r*XYZ)+(x*YZ)-(y*XZ)+(z*XY)-(w*XYZW)+(xy*Z)+(yz*X)-(xz*Y)+(xw*YZW)-(yw*XZW)+(zw*XYW)+(xyz*R)-(yzw*XW)+(xzw*YW)-(xyw*ZW)+(xyzw*W),
            (r*YZW)+(x*XYZW)+(y*ZW)-(z*YW)+(w*YZ)-(xy*XZW)+(yz*W)+(xz*XYW)-(xw*XYZ)-(yw*Z)+(zw*Y)+(xyz*XW)+(yzw*R)+(xzw*XY)-(xyw*XZ)-(xyzw*X),
            (r*XZW)+(x*ZW)-(y*XYZW)-(z*XW)+(w*XZ)+(xy*YZW)-(yz*XYW)+(xz*W)-(xw*Z)+(yw*XYZ)+(zw*X)-(xyz*YW)-(yzw*XY)+(xzw*R)+(xyw*YZ)+(xyzw*Y),
            (r*XYW)+(x*YW)-(y*XW)+(z*XYZW)+(w*XY)+(xy*W)+(yz*XZW)-(xz*YZW)-(xw*Y)+(yw*X)-(zw*XYZ)+(xyz*ZW)+(yzw*XZ)-(xzw*YZ)+(xyw*R)-(xyzw*Z),
            (r*XYZW)+(x*YZW)-(y*XZW)+(z*XYW)-(w*XYZ)+(xy*ZW)+(yz*XW)-(xz*YW)+(xw*YZ)-(yw*XZ)+(zw*XY)+(xyz*W)-(yzw*X)+(xzw*Y)-(xyw*Z)+(xyzw*R)
        ];
    }
    //3d積
    product3D(u,v){
        //決められた配列の形式で与える方法を考えてみよう。
        //r,x,y,z,xy,yz,xz,xyz
        var r=u[0];
        var x=u[1];
        var y=u[2];
        var z=u[3];
        var xy=u[4];
        var yz=u[5];
        var xz=u[6];
        var xyz=u[7];
        var R=v[0];
        var X=v[1];
        var Y=v[2];
        var Z=v[3];
        var XY=v[4];
        var YZ=v[5];
        var XZ=v[6];
        var XYZ=v[7];
        return [
            (r*R)+(x*X)+(y*Y)+(z*Z)-(xy*XY)-(yz*YZ)-(xz*XZ)-(xyz*XYZ),
            (r*X)+(x*R)-(y*XY)-(z*XZ)+(xy*Y)-(yz*XYZ)+(xz*Z)-(xyz*YZ),
            (r*Y)+(x*XY)+(y*R)-(z*YZ)-(xy*X)+(yz*Z)+(xz*XYZ)+(xyz*XZ),
            (r*Z)+(x*XZ)+(y*YZ)+(z*R)-(xy*XYZ)-(yz*Y)-(xz*X)-(xyz*XY),
            (r*XY)+(x*Y)-(y*X)+(z*XYZ)+(xy*R)+(yz*XZ)-(xz*YZ)+(xyz*Z),
            (r*YZ)+(x*XYZ)+(y*Z)-(z*Y)-(xy*XZ)+(yz*R)+(xz*XY)+(xyz*X),
            (r*XZ)+(x*Z)-(y*XYZ)-(z*X)+(xy*YZ)-(yz*XY)+(xz*R)-(xyz*Y),
            (r*XYZ)+(x*YZ)-(y*XZ)+(z*XY)+(xy*Z)+(yz*X)-(xz*Y)+(xyz*R)
        ];
    }
    empty(str,n){
        //クリフォード代数は2^n次元になるはず
        //スカラー、1-ベクトル、2-ベクトル、3-ベクトル、4-ベクトル、...、nベクトル。
        //例えばスカラーは[`${str}[0]`,[]]
        //[][1][2][1,2]
        //部分ごとにわけよう
        var h=1;
        var tr="[0]";
        if(str==""){
            tr="";
        }
        var res=[[[`${str}${tr}`,[]]]];
        for(let k=0; k<n; ++k){
            var a=[];
            for(let i=0; i<res[k].length; ++i){
            for(let j=0; j<n; ++j){
                var B=res[k][i][1].slice();
                var b=this.basisprod(B,[j+1]).basis;
                var bool=false;
                for(let I=0; I<res.length; ++I){
                    bool=res[I].findIndex(e=>e[1].join()==b.join())!=-1;
                    if(bool){
                        break;
                    }
                }
                if(a.findIndex(e=>e[1].join()==b.join())==-1 && !bool){
                    tr="["+h+"]";
                    if(str==""){
                        tr="";
                    }
                a.push([`${str}${tr}`,b]);
                h++;
                }
            }
            }
            res.push(a);
        }
        var R=[];
        for(let i=0; i<res.length; ++i){
            for(let j=0; j<res[i].length; ++j){
                R.push(res[i][j]);
            }
        }
        return R;
    }
    unit(n){
        const res=[1];
        for(let k=0; k<Math.pow(2,n)-1; ++k){
            res.push(0);
        }
        return res;
    }
    rot(n,position,theta){
        //postition擬スカラー部分のインデックス
        var res=this.unit(n);
        res[0]=Math.cos(theta/2);
        res[1+n+position]=Math.sin(theta/2);
        return res;
    }
    inverse(u){
        const n=math.log(2,u.length);
        var l=0;
        let res=[];
        //スカラー、1-ベクトル、4-ベクトル、5ベクトル、8ベクトル、9ベクトル...[4k,4k+1]
        for(let k=0; k<=n; ++k){
            var val=l+math.nCr(n,k);
            res.push(u.slice(l,val));
            if(k%4>=2){
                res[k]=vec.prod(res[k],-1)
            }
            l=val;
        }
        let R=[];
        for(let i=0; i<res.length; ++i){
            for(let j=0; j<res[i].length; ++j){
                R.push(res[i][j])
            }
        }
        return R;
    }
    //n次元幾何積の生成関数
    generate(n){
        //arraytype
        var u=this.empty("u",n);
        var v=this.empty("v",n);
        let res=this.empty("",n);
        for(let i=0; i<Math.pow(2,n); ++i){
            for(let j=0; j<Math.pow(2,n); ++j){
                var z=this.basisprod(u[i][1],v[j][1]);
                function work(a){
                    if(res[a][0]==""){
                    if(z.val==-1){
                    res[a][0]+="-";
                    }
                    res[a][0]+=`(${u[i][0]}*${v[j][0]})`;
                    }else{
                        var hugo="+";
                        if(z.val==-1){
                            hugo="-";
                        }
                    res[a][0]+=`${hugo}(${u[i][0]}*${v[j][0]})`;
                    }
                }
                work(res.findIndex(e=>e[1].join()==z.basis.join()));
            }
        }
        //形を整える
        var R=[];
        for(let k=0; k<res.length; ++k){
            R.push(res[k][0]);
        }
        return `[${R.join()}]`;
    }
    product5D(u,v){
        return [(u[0]*v[0])+(u[1]*v[1])+(u[2]*v[2])+(u[3]*v[3])+(u[4]*v[4])+(u[5]*v[5])-(u[6]*v[6])-(u[7]*v[7])-(u[8]*v[8])-(u[9]*v[9])-(u[10]*v[10])-(u[11]*v[11])-(u[12]*v[12])-(u[13]*v[13])-(u[14]*v[14])-(u[15]*v[15])-(u[16]*v[16])-(u[17]*v[17])-(u[18]*v[18])-(u[19]*v[19])-(u[20]*v[20])-(u[21]*v[21])-(u[22]*v[22])-(u[23]*v[23])-(u[24]*v[24])-(u[25]*v[25])+(u[26]*v[26])+(u[27]*v[27])+(u[28]*v[28])+(u[29]*v[29])+(u[30]*v[30])+(u[31]*v[31]),(u[0]*v[1])+(u[1]*v[0])-(u[2]*v[6])-(u[3]*v[7])-(u[4]*v[8])-(u[5]*v[9])+(u[6]*v[2])+(u[7]*v[3])+(u[8]*v[4])+(u[9]*v[5])-(u[10]*v[16])-(u[11]*v[17])-(u[12]*v[18])-(u[13]*v[19])-(u[14]*v[20])-(u[15]*v[21])-(u[16]*v[10])-(u[17]*v[11])-(u[18]*v[12])-(u[19]*v[13])-(u[20]*v[14])-(u[21]*v[15])+(u[22]*v[26])+(u[23]*v[27])+(u[24]*v[28])+(u[25]*v[29])-(u[26]*v[22])-(u[27]*v[23])-(u[28]*v[24])-(u[29]*v[25])+(u[30]*v[31])+(u[31]*v[30]),(u[0]*v[2])+(u[1]*v[6])+(u[2]*v[0])-(u[3]*v[10])-(u[4]*v[11])-(u[5]*v[12])-(u[6]*v[1])+(u[7]*v[16])+(u[8]*v[17])+(u[9]*v[18])+(u[10]*v[3])+(u[11]*v[4])+(u[12]*v[5])-(u[13]*v[22])-(u[14]*v[23])-(u[15]*v[24])+(u[16]*v[7])+(u[17]*v[8])+(u[18]*v[9])-(u[19]*v[26])-(u[20]*v[27])-(u[21]*v[28])-(u[22]*v[13])-(u[23]*v[14])-(u[24]*v[15])+(u[25]*v[30])+(u[26]*v[19])+(u[27]*v[20])+(u[28]*v[21])-(u[29]*v[31])-(u[30]*v[25])-(u[31]*v[29]),(u[0]*v[3])+(u[1]*v[7])+(u[2]*v[10])+(u[3]*v[0])-(u[4]*v[13])-(u[5]*v[14])-(u[6]*v[16])-(u[7]*v[1])+(u[8]*v[19])+(u[9]*v[20])-(u[10]*v[2])+(u[11]*v[22])+(u[12]*v[23])+(u[13]*v[4])+(u[14]*v[5])-(u[15]*v[25])-(u[16]*v[6])+(u[17]*v[26])+(u[18]*v[27])+(u[19]*v[8])+(u[20]*v[9])-(u[21]*v[29])+(u[22]*v[11])+(u[23]*v[12])-(u[24]*v[30])-(u[25]*v[15])-(u[26]*v[17])-(u[27]*v[18])+(u[28]*v[31])+(u[29]*v[21])+(u[30]*v[24])+(u[31]*v[28]),(u[0]*v[4])+(u[1]*v[8])+(u[2]*v[11])+(u[3]*v[13])+(u[4]*v[0])-(u[5]*v[15])-(u[6]*v[17])-(u[7]*v[19])-(u[8]*v[1])+(u[9]*v[21])-(u[10]*v[22])-(u[11]*v[2])+(u[12]*v[24])-(u[13]*v[3])+(u[14]*v[25])+(u[15]*v[5])-(u[16]*v[26])-(u[17]*v[6])+(u[18]*v[28])-(u[19]*v[7])+(u[20]*v[29])+(u[21]*v[9])-(u[22]*v[10])+(u[23]*v[30])+(u[24]*v[12])+(u[25]*v[14])+(u[26]*v[16])-(u[27]*v[31])-(u[28]*v[18])-(u[29]*v[20])-(u[30]*v[23])-(u[31]*v[27]),(u[0]*v[5])+(u[1]*v[9])+(u[2]*v[12])+(u[3]*v[14])+(u[4]*v[15])+(u[5]*v[0])-(u[6]*v[18])-(u[7]*v[20])-(u[8]*v[21])-(u[9]*v[1])-(u[10]*v[23])-(u[11]*v[24])-(u[12]*v[2])-(u[13]*v[25])-(u[14]*v[3])-(u[15]*v[4])-(u[16]*v[27])-(u[17]*v[28])-(u[18]*v[6])-(u[19]*v[29])-(u[20]*v[7])-(u[21]*v[8])-(u[22]*v[30])-(u[23]*v[10])-(u[24]*v[11])-(u[25]*v[13])+(u[26]*v[31])+(u[27]*v[16])+(u[28]*v[17])+(u[29]*v[19])+(u[30]*v[22])+(u[31]*v[26]),(u[0]*v[6])+(u[1]*v[2])-(u[2]*v[1])+(u[3]*v[16])+(u[4]*v[17])+(u[5]*v[18])+(u[6]*v[0])-(u[7]*v[10])-(u[8]*v[11])-(u[9]*v[12])+(u[10]*v[7])+(u[11]*v[8])+(u[12]*v[9])-(u[13]*v[26])-(u[14]*v[27])-(u[15]*v[28])+(u[16]*v[3])+(u[17]*v[4])+(u[18]*v[5])-(u[19]*v[22])-(u[20]*v[23])-(u[21]*v[24])+(u[22]*v[19])+(u[23]*v[20])+(u[24]*v[21])-(u[25]*v[31])-(u[26]*v[13])-(u[27]*v[14])-(u[28]*v[15])+(u[29]*v[30])-(u[30]*v[29])-(u[31]*v[25]),(u[0]*v[7])+(u[1]*v[3])-(u[2]*v[16])-(u[3]*v[1])+(u[4]*v[19])+(u[5]*v[20])+(u[6]*v[10])+(u[7]*v[0])-(u[8]*v[13])-(u[9]*v[14])-(u[10]*v[6])+(u[11]*v[26])+(u[12]*v[27])+(u[13]*v[8])+(u[14]*v[9])-(u[15]*v[29])-(u[16]*v[2])+(u[17]*v[22])+(u[18]*v[23])+(u[19]*v[4])+(u[20]*v[5])-(u[21]*v[25])-(u[22]*v[17])-(u[23]*v[18])+(u[24]*v[31])+(u[25]*v[21])+(u[26]*v[11])+(u[27]*v[12])-(u[28]*v[30])-(u[29]*v[15])+(u[30]*v[28])+(u[31]*v[24]),(u[0]*v[8])+(u[1]*v[4])-(u[2]*v[17])-(u[3]*v[19])-(u[4]*v[1])+(u[5]*v[21])+(u[6]*v[11])+(u[7]*v[13])+(u[8]*v[0])-(u[9]*v[15])-(u[10]*v[26])-(u[11]*v[6])+(u[12]*v[28])-(u[13]*v[7])+(u[14]*v[29])+(u[15]*v[9])-(u[16]*v[22])-(u[17]*v[2])+(u[18]*v[24])-(u[19]*v[3])+(u[20]*v[25])+(u[21]*v[5])+(u[22]*v[16])-(u[23]*v[31])-(u[24]*v[18])-(u[25]*v[20])-(u[26]*v[10])+(u[27]*v[30])+(u[28]*v[12])+(u[29]*v[14])-(u[30]*v[27])-(u[31]*v[23]),(u[0]*v[9])+(u[1]*v[5])-(u[2]*v[18])-(u[3]*v[20])-(u[4]*v[21])-(u[5]*v[1])+(u[6]*v[12])+(u[7]*v[14])+(u[8]*v[15])+(u[9]*v[0])-(u[10]*v[27])-(u[11]*v[28])-(u[12]*v[6])-(u[13]*v[29])-(u[14]*v[7])-(u[15]*v[8])-(u[16]*v[23])-(u[17]*v[24])-(u[18]*v[2])-(u[19]*v[25])-(u[20]*v[3])-(u[21]*v[4])+(u[22]*v[31])+(u[23]*v[16])+(u[24]*v[17])+(u[25]*v[19])-(u[26]*v[30])-(u[27]*v[10])-(u[28]*v[11])-(u[29]*v[13])+(u[30]*v[26])+(u[31]*v[22]),(u[0]*v[10])+(u[1]*v[16])+(u[2]*v[3])-(u[3]*v[2])+(u[4]*v[22])+(u[5]*v[23])-(u[6]*v[7])+(u[7]*v[6])-(u[8]*v[26])-(u[9]*v[27])+(u[10]*v[0])-(u[11]*v[13])-(u[12]*v[14])+(u[13]*v[11])+(u[14]*v[12])-(u[15]*v[30])+(u[16]*v[1])-(u[17]*v[19])-(u[18]*v[20])+(u[19]*v[17])+(u[20]*v[18])-(u[21]*v[31])+(u[22]*v[4])+(u[23]*v[5])-(u[24]*v[25])+(u[25]*v[24])-(u[26]*v[8])-(u[27]*v[9])+(u[28]*v[29])-(u[29]*v[28])-(u[30]*v[15])-(u[31]*v[21]),(u[0]*v[11])+(u[1]*v[17])+(u[2]*v[4])-(u[3]*v[22])-(u[4]*v[2])+(u[5]*v[24])-(u[6]*v[8])+(u[7]*v[26])+(u[8]*v[6])-(u[9]*v[28])+(u[10]*v[13])+(u[11]*v[0])-(u[12]*v[15])-(u[13]*v[10])+(u[14]*v[30])+(u[15]*v[12])+(u[16]*v[19])+(u[17]*v[1])-(u[18]*v[21])-(u[19]*v[16])+(u[20]*v[31])+(u[21]*v[18])-(u[22]*v[3])+(u[23]*v[25])+(u[24]*v[5])-(u[25]*v[23])+(u[26]*v[7])-(u[27]*v[29])-(u[28]*v[9])+(u[29]*v[27])+(u[30]*v[14])+(u[31]*v[20]),(u[0]*v[12])+(u[1]*v[18])+(u[2]*v[5])-(u[3]*v[23])-(u[4]*v[24])-(u[5]*v[2])-(u[6]*v[9])+(u[7]*v[27])+(u[8]*v[28])+(u[9]*v[6])+(u[10]*v[14])+(u[11]*v[15])+(u[12]*v[0])-(u[13]*v[30])-(u[14]*v[10])-(u[15]*v[11])+(u[16]*v[20])+(u[17]*v[21])+(u[18]*v[1])-(u[19]*v[31])-(u[20]*v[16])-(u[21]*v[17])-(u[22]*v[25])-(u[23]*v[3])-(u[24]*v[4])+(u[25]*v[22])+(u[26]*v[29])+(u[27]*v[7])+(u[28]*v[8])-(u[29]*v[26])-(u[30]*v[13])-(u[31]*v[19]),(u[0]*v[13])+(u[1]*v[19])+(u[2]*v[22])+(u[3]*v[4])-(u[4]*v[3])+(u[5]*v[25])-(u[6]*v[26])-(u[7]*v[8])+(u[8]*v[7])-(u[9]*v[29])-(u[10]*v[11])+(u[11]*v[10])-(u[12]*v[30])+(u[13]*v[0])-(u[14]*v[15])+(u[15]*v[14])-(u[16]*v[17])+(u[17]*v[16])-(u[18]*v[31])+(u[19]*v[1])-(u[20]*v[21])+(u[21]*v[20])+(u[22]*v[2])-(u[23]*v[24])+(u[24]*v[23])+(u[25]*v[5])-(u[26]*v[6])+(u[27]*v[28])-(u[28]*v[27])-(u[29]*v[9])-(u[30]*v[12])-(u[31]*v[18]),(u[0]*v[14])+(u[1]*v[20])+(u[2]*v[23])+(u[3]*v[5])-(u[4]*v[25])-(u[5]*v[3])-(u[6]*v[27])-(u[7]*v[9])+(u[8]*v[29])+(u[9]*v[7])-(u[10]*v[12])+(u[11]*v[30])+(u[12]*v[10])+(u[13]*v[15])+(u[14]*v[0])-(u[15]*v[13])-(u[16]*v[18])+(u[17]*v[31])+(u[18]*v[16])+(u[19]*v[21])+(u[20]*v[1])-(u[21]*v[19])+(u[22]*v[24])+(u[23]*v[2])-(u[24]*v[22])-(u[25]*v[4])-(u[26]*v[28])-(u[27]*v[6])+(u[28]*v[26])+(u[29]*v[8])+(u[30]*v[11])+(u[31]*v[17]),(u[0]*v[15])+(u[1]*v[21])+(u[2]*v[24])+(u[3]*v[25])+(u[4]*v[5])-(u[5]*v[4])-(u[6]*v[28])-(u[7]*v[29])-(u[8]*v[9])+(u[9]*v[8])-(u[10]*v[30])-(u[11]*v[12])+(u[12]*v[11])-(u[13]*v[14])+(u[14]*v[13])+(u[15]*v[0])-(u[16]*v[31])-(u[17]*v[18])+(u[18]*v[17])-(u[19]*v[20])+(u[20]*v[19])+(u[21]*v[1])-(u[22]*v[23])+(u[23]*v[22])+(u[24]*v[2])+(u[25]*v[3])+(u[26]*v[27])-(u[27]*v[26])-(u[28]*v[6])-(u[29]*v[7])-(u[30]*v[10])-(u[31]*v[16]),(u[0]*v[16])+(u[1]*v[10])-(u[2]*v[7])+(u[3]*v[6])-(u[4]*v[26])-(u[5]*v[27])+(u[6]*v[3])-(u[7]*v[2])+(u[8]*v[22])+(u[9]*v[23])+(u[10]*v[1])-(u[11]*v[19])-(u[12]*v[20])+(u[13]*v[17])+(u[14]*v[18])-(u[15]*v[31])+(u[16]*v[0])-(u[17]*v[13])-(u[18]*v[14])+(u[19]*v[11])+(u[20]*v[12])-(u[21]*v[30])-(u[22]*v[8])-(u[23]*v[9])+(u[24]*v[29])-(u[25]*v[28])+(u[26]*v[4])+(u[27]*v[5])-(u[28]*v[25])+(u[29]*v[24])-(u[30]*v[21])-(u[31]*v[15]),(u[0]*v[17])+(u[1]*v[11])-(u[2]*v[8])+(u[3]*v[26])+(u[4]*v[6])-(u[5]*v[28])+(u[6]*v[4])-(u[7]*v[22])-(u[8]*v[2])+(u[9]*v[24])+(u[10]*v[19])+(u[11]*v[1])-(u[12]*v[21])-(u[13]*v[16])+(u[14]*v[31])+(u[15]*v[18])+(u[16]*v[13])+(u[17]*v[0])-(u[18]*v[15])-(u[19]*v[10])+(u[20]*v[30])+(u[21]*v[12])+(u[22]*v[7])-(u[23]*v[29])-(u[24]*v[9])+(u[25]*v[27])-(u[26]*v[3])+(u[27]*v[25])+(u[28]*v[5])-(u[29]*v[23])+(u[30]*v[20])+(u[31]*v[14]),(u[0]*v[18])+(u[1]*v[12])-(u[2]*v[9])+(u[3]*v[27])+(u[4]*v[28])+(u[5]*v[6])+(u[6]*v[5])-(u[7]*v[23])-(u[8]*v[24])-(u[9]*v[2])+(u[10]*v[20])+(u[11]*v[21])+(u[12]*v[1])-(u[13]*v[31])-(u[14]*v[16])-(u[15]*v[17])+(u[16]*v[14])+(u[17]*v[15])+(u[18]*v[0])-(u[19]*v[30])-(u[20]*v[10])-(u[21]*v[11])+(u[22]*v[29])+(u[23]*v[7])+(u[24]*v[8])-(u[25]*v[26])-(u[26]*v[25])-(u[27]*v[3])-(u[28]*v[4])+(u[29]*v[22])-(u[30]*v[19])-(u[31]*v[13]),(u[0]*v[19])+(u[1]*v[13])-(u[2]*v[26])-(u[3]*v[8])+(u[4]*v[7])-(u[5]*v[29])+(u[6]*v[22])+(u[7]*v[4])-(u[8]*v[3])+(u[9]*v[25])-(u[10]*v[17])+(u[11]*v[16])-(u[12]*v[31])+(u[13]*v[1])-(u[14]*v[21])+(u[15]*v[20])-(u[16]*v[11])+(u[17]*v[10])-(u[18]*v[30])+(u[19]*v[0])-(u[20]*v[15])+(u[21]*v[14])-(u[22]*v[6])+(u[23]*v[28])-(u[24]*v[27])-(u[25]*v[9])+(u[26]*v[2])-(u[27]*v[24])+(u[28]*v[23])+(u[29]*v[5])-(u[30]*v[18])-(u[31]*v[12]),(u[0]*v[20])+(u[1]*v[14])-(u[2]*v[27])-(u[3]*v[9])+(u[4]*v[29])+(u[5]*v[7])+(u[6]*v[23])+(u[7]*v[5])-(u[8]*v[25])-(u[9]*v[3])-(u[10]*v[18])+(u[11]*v[31])+(u[12]*v[16])+(u[13]*v[21])+(u[14]*v[1])-(u[15]*v[19])-(u[16]*v[12])+(u[17]*v[30])+(u[18]*v[10])+(u[19]*v[15])+(u[20]*v[0])-(u[21]*v[13])-(u[22]*v[28])-(u[23]*v[6])+(u[24]*v[26])+(u[25]*v[8])+(u[26]*v[24])+(u[27]*v[2])-(u[28]*v[22])-(u[29]*v[4])+(u[30]*v[17])+(u[31]*v[11]),(u[0]*v[21])+(u[1]*v[15])-(u[2]*v[28])-(u[3]*v[29])-(u[4]*v[9])+(u[5]*v[8])+(u[6]*v[24])+(u[7]*v[25])+(u[8]*v[5])-(u[9]*v[4])-(u[10]*v[31])-(u[11]*v[18])+(u[12]*v[17])-(u[13]*v[20])+(u[14]*v[19])+(u[15]*v[1])-(u[16]*v[30])-(u[17]*v[12])+(u[18]*v[11])-(u[19]*v[14])+(u[20]*v[13])+(u[21]*v[0])+(u[22]*v[27])-(u[23]*v[26])-(u[24]*v[6])-(u[25]*v[7])-(u[26]*v[23])+(u[27]*v[22])+(u[28]*v[2])+(u[29]*v[3])-(u[30]*v[16])-(u[31]*v[10]),(u[0]*v[22])+(u[1]*v[26])+(u[2]*v[13])-(u[3]*v[11])+(u[4]*v[10])-(u[5]*v[30])-(u[6]*v[19])+(u[7]*v[17])-(u[8]*v[16])+(u[9]*v[31])+(u[10]*v[4])-(u[11]*v[3])+(u[12]*v[25])+(u[13]*v[2])-(u[14]*v[24])+(u[15]*v[23])+(u[16]*v[8])-(u[17]*v[7])+(u[18]*v[29])+(u[19]*v[6])-(u[20]*v[28])+(u[21]*v[27])+(u[22]*v[0])-(u[23]*v[15])+(u[24]*v[14])-(u[25]*v[12])-(u[26]*v[1])+(u[27]*v[21])-(u[28]*v[20])+(u[29]*v[18])+(u[30]*v[5])+(u[31]*v[9]),(u[0]*v[23])+(u[1]*v[27])+(u[2]*v[14])-(u[3]*v[12])+(u[4]*v[30])+(u[5]*v[10])-(u[6]*v[20])+(u[7]*v[18])-(u[8]*v[31])-(u[9]*v[16])+(u[10]*v[5])-(u[11]*v[25])-(u[12]*v[3])+(u[13]*v[24])+(u[14]*v[2])-(u[15]*v[22])+(u[16]*v[9])-(u[17]*v[29])-(u[18]*v[7])+(u[19]*v[28])+(u[20]*v[6])-(u[21]*v[26])+(u[22]*v[15])+(u[23]*v[0])-(u[24]*v[13])+(u[25]*v[11])-(u[26]*v[21])-(u[27]*v[1])+(u[28]*v[19])-(u[29]*v[17])-(u[30]*v[4])-(u[31]*v[8]),(u[0]*v[24])+(u[1]*v[28])+(u[2]*v[15])-(u[3]*v[30])-(u[4]*v[12])+(u[5]*v[11])-(u[6]*v[21])+(u[7]*v[31])+(u[8]*v[18])-(u[9]*v[17])+(u[10]*v[25])+(u[11]*v[5])-(u[12]*v[4])-(u[13]*v[23])+(u[14]*v[22])+(u[15]*v[2])+(u[16]*v[29])+(u[17]*v[9])-(u[18]*v[8])-(u[19]*v[27])+(u[20]*v[26])+(u[21]*v[6])-(u[22]*v[14])+(u[23]*v[13])+(u[24]*v[0])-(u[25]*v[10])+(u[26]*v[20])-(u[27]*v[19])-(u[28]*v[1])+(u[29]*v[16])+(u[30]*v[3])+(u[31]*v[7]),(u[0]*v[25])+(u[1]*v[29])+(u[2]*v[30])+(u[3]*v[15])-(u[4]*v[14])+(u[5]*v[13])-(u[6]*v[31])-(u[7]*v[21])+(u[8]*v[20])-(u[9]*v[19])-(u[10]*v[24])+(u[11]*v[23])-(u[12]*v[22])+(u[13]*v[5])-(u[14]*v[4])+(u[15]*v[3])-(u[16]*v[28])+(u[17]*v[27])-(u[18]*v[26])+(u[19]*v[9])-(u[20]*v[8])+(u[21]*v[7])+(u[22]*v[12])-(u[23]*v[11])+(u[24]*v[10])+(u[25]*v[0])-(u[26]*v[18])+(u[27]*v[17])-(u[28]*v[16])-(u[29]*v[1])-(u[30]*v[2])-(u[31]*v[6]),(u[0]*v[26])+(u[1]*v[22])-(u[2]*v[19])+(u[3]*v[17])-(u[4]*v[16])+(u[5]*v[31])+(u[6]*v[13])-(u[7]*v[11])+(u[8]*v[10])-(u[9]*v[30])+(u[10]*v[8])-(u[11]*v[7])+(u[12]*v[29])+(u[13]*v[6])-(u[14]*v[28])+(u[15]*v[27])+(u[16]*v[4])-(u[17]*v[3])+(u[18]*v[25])+(u[19]*v[2])-(u[20]*v[24])+(u[21]*v[23])-(u[22]*v[1])+(u[23]*v[21])-(u[24]*v[20])+(u[25]*v[18])+(u[26]*v[0])-(u[27]*v[15])+(u[28]*v[14])-(u[29]*v[12])+(u[30]*v[9])+(u[31]*v[5]),(u[0]*v[27])+(u[1]*v[23])-(u[2]*v[20])+(u[3]*v[18])-(u[4]*v[31])-(u[5]*v[16])+(u[6]*v[14])-(u[7]*v[12])+(u[8]*v[30])+(u[9]*v[10])+(u[10]*v[9])-(u[11]*v[29])-(u[12]*v[7])+(u[13]*v[28])+(u[14]*v[6])-(u[15]*v[26])+(u[16]*v[5])-(u[17]*v[25])-(u[18]*v[3])+(u[19]*v[24])+(u[20]*v[2])-(u[21]*v[22])-(u[22]*v[21])-(u[23]*v[1])+(u[24]*v[19])-(u[25]*v[17])+(u[26]*v[15])+(u[27]*v[0])-(u[28]*v[13])+(u[29]*v[11])-(u[30]*v[8])-(u[31]*v[4]),(u[0]*v[28])+(u[1]*v[24])-(u[2]*v[21])+(u[3]*v[31])+(u[4]*v[18])-(u[5]*v[17])+(u[6]*v[15])-(u[7]*v[30])-(u[8]*v[12])+(u[9]*v[11])+(u[10]*v[29])+(u[11]*v[9])-(u[12]*v[8])-(u[13]*v[27])+(u[14]*v[26])+(u[15]*v[6])+(u[16]*v[25])+(u[17]*v[5])-(u[18]*v[4])-(u[19]*v[23])+(u[20]*v[22])+(u[21]*v[2])+(u[22]*v[20])-(u[23]*v[19])-(u[24]*v[1])+(u[25]*v[16])-(u[26]*v[14])+(u[27]*v[13])+(u[28]*v[0])-(u[29]*v[10])+(u[30]*v[7])+(u[31]*v[3]),(u[0]*v[29])+(u[1]*v[25])-(u[2]*v[31])-(u[3]*v[21])+(u[4]*v[20])-(u[5]*v[19])+(u[6]*v[30])+(u[7]*v[15])-(u[8]*v[14])+(u[9]*v[13])-(u[10]*v[28])+(u[11]*v[27])-(u[12]*v[26])+(u[13]*v[9])-(u[14]*v[8])+(u[15]*v[7])-(u[16]*v[24])+(u[17]*v[23])-(u[18]*v[22])+(u[19]*v[5])-(u[20]*v[4])+(u[21]*v[3])-(u[22]*v[18])+(u[23]*v[17])-(u[24]*v[16])-(u[25]*v[1])+(u[26]*v[12])-(u[27]*v[11])+(u[28]*v[10])+(u[29]*v[0])-(u[30]*v[6])-(u[31]*v[2]),(u[0]*v[30])+(u[1]*v[31])+(u[2]*v[25])-(u[3]*v[24])+(u[4]*v[23])-(u[5]*v[22])-(u[6]*v[29])+(u[7]*v[28])-(u[8]*v[27])+(u[9]*v[26])+(u[10]*v[15])-(u[11]*v[14])+(u[12]*v[13])+(u[13]*v[12])-(u[14]*v[11])+(u[15]*v[10])+(u[16]*v[21])-(u[17]*v[20])+(u[18]*v[19])+(u[19]*v[18])-(u[20]*v[17])+(u[21]*v[16])+(u[22]*v[5])-(u[23]*v[4])+(u[24]*v[3])-(u[25]*v[2])-(u[26]*v[9])+(u[27]*v[8])-(u[28]*v[7])+(u[29]*v[6])+(u[30]*v[0])+(u[31]*v[1]),(u[0]*v[31])+(u[1]*v[30])-(u[2]*v[29])+(u[3]*v[28])-(u[4]*v[27])+(u[5]*v[26])+(u[6]*v[25])-(u[7]*v[24])+(u[8]*v[23])-(u[9]*v[22])+(u[10]*v[21])-(u[11]*v[20])+(u[12]*v[19])+(u[13]*v[18])-(u[14]*v[17])+(u[15]*v[16])+(u[16]*v[15])-(u[17]*v[14])+(u[18]*v[13])+(u[19]*v[12])-(u[20]*v[11])+(u[21]*v[10])-(u[22]*v[9])+(u[23]*v[8])-(u[24]*v[7])+(u[25]*v[6])+(u[26]*v[5])-(u[27]*v[4])+(u[28]*v[3])-(u[29]*v[2])+(u[30]*v[1])+(u[31]*v[0])];
    }
    cliff2vec(n,u){
        var v=[];
        for(let k=1; k<=n; ++k){
            v.push(u[k]);
        }
        return v;
    }
    vec2cliff(n,v){
        var u=this.unit(n);
        u[0]=0;
        for(let k=1; k<=n; ++k){
            u[k]=v[k-1];
        }
        return u;
    }
}
function deleteIndex(A,a){
    var al=A.slice(0,a);
    var ar=A.slice(a+1,A.length);
    for(let k=0; k<ar.length; ++k){
        al.push(ar[k]);
    }
    return al;
}
function arrayMin(A,Min){
    if(!Min){
        Min="none";
    }
    //インデックスを返す
    let id=-1;
    var min="none";
    for(let k=0; k<A.length; ++k){
        if((A[k]<min || min=="none") && (Min<A[k] || Min=="none")){
            min=A[k];
            id=k;
        }
    }
    return id;
}
function arrayMax(A){
    //数値を返す
    var max="none";
    for(let k=0; k<A.length; ++k){
        if(A[k]>max || max=="none"){
            max=A[k];
        }
    }
    return max;
}
const clifford=new cliffordMath();
const cmath=new complexMath();
const qmath=new quaternionMath();