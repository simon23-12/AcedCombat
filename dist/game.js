var $f=Object.defineProperty;var Zl=(s,e)=>()=>(s&&(e=s(s=0)),e);var Jf=(s,e)=>{for(var t in e)$f(s,t,{get:e[t],enumerable:!0})};function jf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Qf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Vs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zd(){let s=Vs("canvas");return s.style.display="block",s}function Nr(...s){let e="THREE."+s.shift();Gs?Gs("log",e,...s):console.log(e,...s)}function Hd(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Pe(...s){s=Hd(s);let e="THREE."+s.shift();if(Gs)Gs("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function ke(...s){s=Hd(s);let e="THREE."+s.shift();if(Gs)Gs("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function is(...s){let e=s.join(" ");e in wu||(wu[e]=!0,Pe(...s))}function Vd(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Hn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[s&255]+nn[s>>8&255]+nn[s>>16&255]+nn[s>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function Je(s,e,t){return Math.max(e,Math.min(t,s))}function jc(s,e){return(s%e+e)%e}function ep(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function tp(s,e,t){return s!==e?(t-s)/(e-s):0}function Lr(s,e,t){return(1-t)*s+t*e}function np(s,e,t,n){return Lr(s,e,1-Math.exp(-t*n))}function ip(s,e=1){return e-Math.abs(jc(s,e*2)-e)}function sp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function rp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function ap(s,e){return s+Math.floor(Math.random()*(e-s+1))}function op(s,e){return s+Math.random()*(e-s)}function lp(s){return s*(.5-Math.random())}function cp(s){s!==void 0&&(Eu=s);let e=Eu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hp(s){return s*Ir}function up(s){return s*as}function dp(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function fp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function pp(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function mp(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),f=r((e-n)/2),u=a((e-n)/2),d=r((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":s.set(o*h,c*f,c*u,o*l);break;case"YZY":s.set(c*u,o*h,c*f,o*l);break;case"ZXZ":s.set(c*f,c*u,o*h,o*l);break;case"XZX":s.set(o*h,c*m,c*d,o*l);break;case"YXY":s.set(c*d,o*h,c*m,o*l);break;case"ZYZ":s.set(c*m,c*d,o*h,o*l);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function kn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ft(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gp(){let s={enabled:!0,workingColorSpace:At,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ut&&(i.r=_i(i.r),i.g=_i(i.g),i.b=_i(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(i.r=ks(i.r),i.g=ks(i.g),i.b=ks(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===en?Dr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return is("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return is("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[At]:{primaries:e,whitePoint:n,transfer:Dr,toXYZ:Ru,fromXYZ:Cu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:Ru,fromXYZ:Cu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),s}function _i(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ks(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}function Jl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ro.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}function ec(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function lc(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){es.fromArray(s,r);let o=i.x*Math.abs(es.x)+i.y*Math.abs(es.y)+i.z*Math.abs(es.z),c=e.dot(es),l=t.dot(es),h=n.dot(es);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}function Lp(s,e,t,n,i,r,a,o){let c;if(e.side===jt?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===ii,o),c===null)return null;Ba.copy(o),Ba.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Ba);return l<t.near||l>t.far?null:{distance:l,point:Ba.clone(),object:s}}function ka(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Na),s.getVertexPosition(c,Ua),s.getVertexPosition(l,Fa);let h=Lp(s,e,t,n,Na,Ua,Fa,zu);if(h){let f=new E;ki.getBarycoord(zu,Na,Ua,Fa,f),i&&(h.uv=ki.getInterpolatedAttribute(i,o,c,l,f,new ze)),r&&(h.uv1=ki.getInterpolatedAttribute(r,o,c,l,f,new ze)),a&&(h.normal=ki.getInterpolatedAttribute(a,o,c,l,f,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new E,materialIndex:0};ki.getNormal(Na,Ua,Fa,u.normal),h.face=u,h.barycoord=f}return h}function Wa(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(oo.fromBufferAttribute(o,i),lo.fromBufferAttribute(o,r),t.distanceSqToSegment(oo,lo,gc,Ku)>n)return;gc.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(gc);if(!(l<e.near||l>e.far))return{distance:l,point:Ku.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}function Qu(s,e,t,n,i,r,a){let o=Tc.distanceSqToPoint(s);if(o<t){let c=new E;Tc.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}function ps(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(ed(i))i.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(ed(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function an(s){let e={};for(let t=0;t<s.length;t++){let n=ps(s[t]);for(let i in n)e[i]=n[i]}return e}function ed(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Op(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Qc(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}function Bi(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Ja(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function zp(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function td(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Hp(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}function qd(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function Vp(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Gp(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){let o=qd(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;let c=Vp(r,e,t,n,i);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}function nd(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}function Wp(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return Vi;case"color":return $r;case"quaternion":return Mi;case"bool":case"boolean":return vi;case"string":return bi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Xp(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Wp(s.type);if(s.times===void 0){let n=[],i=[];Hp(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Ja(s.settings)&&(t.settings={inTangents:Bi(s.settings.inTangents,Float32Array),outTangents:Bi(s.settings.outTangents,Float32Array)}),t}function id(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}function nh(s,e,t,n){let i=em(n);switch(t){case Yc:return s*e;case Co:return s*e/i.components*i.byteLength;case Po:return s*e/i.components*i.byteLength;case ai:return s*e*2/i.components*i.byteLength;case Io:return s*e*2/i.components*i.byteLength;case Zc:return s*e*3/i.components*i.byteLength;case kt:return s*e*4/i.components*i.byteLength;case Lo:return s*e*4/i.components*i.byteLength;case aa:case oa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case la:case ca:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case No:case Fo:return Math.max(s,16)*Math.max(e,8)/4;case Do:case Uo:return Math.max(s,8)*Math.max(e,8)/2;case Oo:case Bo:case zo:case Ho:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ko:case ha:case Vo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Go:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Wo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Xo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case qo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Zo:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ko:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case $o:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Jo:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case jo:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case el:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case tl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case nl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case il:case sl:case rl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case al:case ol:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ua:case ll:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function em(s){switch(s){case rn:case Gc:return{byteLength:1,components:1};case lr:case Wc:case qt:return{byteLength:2,components:1};case Ao:case Ro:return{byteLength:2,components:4};case Rn:case Eo:case Cn:return{byteLength:4,components:1};case Xc:case qc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var ld,Ic,cd,ia,hd,ir,ii,jt,Qt,si,sr,Vn,Lc,Dc,Gi,Ti,ud,dd,fd,pd,md,ri,gd,xd,sa,rr,_d,vd,yd,Md,bd,Sd,Td,wd,Ed,ja,Qa,eo,zi,to,no,io,so,Nc,Ad,Rd,An,Uc,Fc,Oc,Bc,kc,zc,Hc,vc,Cd,Vc,Wi,ds,ar,To,ra,$t,fn,zs,Lt,wo,fs,st,or,Bt,rn,Gc,Wc,lr,Eo,Rn,Cn,qt,Ao,Ro,cr,Xc,qc,Yc,Zc,kt,Kn,Xi,Co,Po,ai,Io,Lo,aa,oa,la,ca,Do,No,Uo,Fo,Oo,Bo,ko,zo,Ho,ha,Vo,Go,Wo,Xo,qo,Yo,Zo,Ko,$o,Jo,jo,Qo,el,tl,nl,il,sl,rl,al,ol,ua,ll,ss,rs,Ka,yc,Mc,bc,Sc,Pd,Kc,da,hr,Id,cl,Ld,en,Et,At,Dr,ut,$a,Dd,Nd,Ud,Fd,hl,Od,Bd,ul,kd,$c,vn,Jc,zn,Hs,wu,Gs,Gd,$n,nn,Eu,Ir,as,Yt,ih,ze,Mt,sh,E,Kl,Au,rh,He,$l,Ru,Cu,Ye,ws,ro,xp,Ws,_p,jl,Dt,ah,Ze,ao,Pt,Ur,Xs,So,Be,Es,Un,vp,yp,Di,Ta,Mn,Pu,Iu,Sn,Fr,Mp,Lu,As,di,wa,Sr,bp,Sp,Du,Nu,Uu,Fu,Tp,Rs,Ql,Rt,hn,wp,qs,Wd,Ni,Ea,ae,sn,Or,os,Fn,fi,tc,pi,Cs,Ps,Ou,nc,ic,sc,rc,ac,oc,ki,Tn,mi,On,Aa,Is,Ls,Ds,Ui,Fi,Qi,Tr,Ra,Ca,es,Ft,Pa,Ep,gt,Br,kr,ot,Ap,wr,cc,pn,Rp,In,hc,Ns,bn,Er,Xt,dt,Ys,cn,Zs,uc,Cp,Pp,Bn,Ip,mn,gi,dc,Ia,La,ls,Jt,Bu,ts,Da,ku,Na,Ua,Fa,fc,Oa,zu,Ba,at,Ar,Hu,Vu,Dp,Gu,za,pc,Wu,mc,zr,Ks,Hi,Xu,Np,Hr,wn,Us,qu,Ha,Yu,Up,Rr,Cr,En,ns,Fp,Va,$s,Js,oo,lo,Zu,Pr,Ga,gc,Ku,cs,$u,Ju,Vr,Gr,js,ju,Tc,Xa,qa,Wr,Xr,qr,Jn,co,Yr,jn,Qn,Zr,Kr,hs,Qs,Xd,Bp,kp,xt,ho,gn,xn,uo,fo,ei,po,mo,go,xo,_n,vi,$r,yi,_o,Mi,bi,Vi,Jr,Zn,vo,Yd,ti,xi,wc,er,Fs,yo,un,tr,xc,sd,rd,nr,Ya,Za,Yn,jr,Oi,ad,od,Ot,Ec,Qr,Ac,ea,ni,Rc,us,Si,ta,_c,na,Os,Bs,Mo,bo,eh,qp,th,Yp,Zp,Kp,$p,Jp,jp,Qp,Cc,yt,Vv,oh,Pc,lh=Zl(()=>{ld=0,Ic=1,cd=2,ia=1,hd=2,ir=3,ii=0,jt=1,Qt=2,si=0,sr=1,Vn=2,Lc=3,Dc=4,Gi=5,Ti=100,ud=101,dd=102,fd=103,pd=104,md=200,ri=201,gd=202,xd=203,sa=204,rr=205,_d=206,vd=207,yd=208,Md=209,bd=210,Sd=211,Td=212,wd=213,Ed=214,ja=0,Qa=1,eo=2,zi=3,to=4,no=5,io=6,so=7,Nc=0,Ad=1,Rd=2,An=0,Uc=1,Fc=2,Oc=3,Bc=4,kc=5,zc=6,Hc=7,vc="attached",Cd="detached",Vc=300,Wi=301,ds=302,ar=303,To=304,ra=306,$t=1e3,fn=1001,zs=1002,Lt=1003,wo=1004,fs=1005,st=1006,or=1007,Bt=1008,rn=1009,Gc=1010,Wc=1011,lr=1012,Eo=1013,Rn=1014,Cn=1015,qt=1016,Ao=1017,Ro=1018,cr=1020,Xc=35902,qc=35899,Yc=1021,Zc=1022,kt=1023,Kn=1026,Xi=1027,Co=1028,Po=1029,ai=1030,Io=1031,Lo=1033,aa=33776,oa=33777,la=33778,ca=33779,Do=35840,No=35841,Uo=35842,Fo=35843,Oo=36196,Bo=37492,ko=37496,zo=37488,Ho=37489,ha=37490,Vo=37491,Go=37808,Wo=37809,Xo=37810,qo=37811,Yo=37812,Zo=37813,Ko=37814,$o=37815,Jo=37816,jo=37817,Qo=37818,el=37819,tl=37820,nl=37821,il=36492,sl=36494,rl=36495,al=36283,ol=36284,ua=36285,ll=36286,ss=2300,rs=2301,Ka=2302,yc=2303,Mc=2400,bc=2401,Sc=2402,Pd=2500,Kc=0,da=1,hr=2,Id=3200,cl=0,Ld=1,en="",Et="srgb",At="srgb-linear",Dr="linear",ut="srgb",$a=7680,Dd=519,Nd=512,Ud=513,Fd=514,hl=515,Od=516,Bd=517,ul=518,kd=519,$c=35044,vn=35048,Jc="300 es",zn=2e3,Hs=2001;wu={},Gs=null;Gd={[ja]:Qa,[eo]:io,[to]:so,[zi]:no,[Qa]:ja,[io]:eo,[so]:to,[no]:zi},$n=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Eu=1234567,Ir=Math.PI/180,as=180/Math.PI;Yt={DEG2RAD:Ir,RAD2DEG:as,generateUUID:Hn,clamp:Je,euclideanModulo:jc,mapLinear:ep,inverseLerp:tp,lerp:Lr,damp:np,pingpong:ip,smoothstep:sp,smootherstep:rp,randInt:ap,randFloat:op,randFloatSpread:lp,seededRandom:cp,degToRad:hp,radToDeg:up,isPowerOfTwo:dp,ceilPowerOfTwo:fp,floorPowerOfTwo:pp,setQuaternionFromProperEuler:mp,normalize:ft,denormalize:kn},ih=class ih{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ih.prototype.isVector2=!0;ze=ih,Mt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],d=r[a+1],m=r[a+2],x=r[a+3];if(f!==x||c!==u||l!==d||h!==m){let g=c*u+l*d+h*m+f*x;g<0&&(u=-u,d=-d,m=-m,x=-x,g=-g);let p=1-o;if(g<.9995){let T=Math.acos(g),C=Math.sin(T);p=Math.sin(p*T)/C,o=Math.sin(o*T)/C,c=c*p+u*o,l=l*p+d*o,h=h*p+m*o,f=f*p+x*o}else{c=c*p+u*o,l=l*p+d*o,h=h*p+m*o,f=f*p+x*o;let T=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=T,l*=T,h*=T,f*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],f=r[a],u=r[a+1],d=r[a+2],m=r[a+3];return e[t]=o*m+h*f+c*d-l*u,e[t+1]=c*m+h*u+l*f-o*d,e[t+2]=l*m+h*d+o*u-c*f,e[t+3]=h*m-o*f-c*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),f=o(r/2),u=c(n/2),d=c(i/2),m=c(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*m,this._y=l*d*f-u*h*m,this._z=l*h*m+u*d*f,this._w=l*h*f-u*d*m;break;case"YXZ":this._x=u*h*f+l*d*m,this._y=l*d*f-u*h*m,this._z=l*h*m-u*d*f,this._w=l*h*f+u*d*m;break;case"ZXY":this._x=u*h*f-l*d*m,this._y=l*d*f+u*h*m,this._z=l*h*m+u*d*f,this._w=l*h*f-u*d*m;break;case"ZYX":this._x=u*h*f-l*d*m,this._y=l*d*f+u*h*m,this._z=l*h*m-u*d*f,this._w=l*h*f+u*d*m;break;case"YZX":this._x=u*h*f+l*d*m,this._y=l*d*f+u*h*m,this._z=l*h*m-u*d*f,this._w=l*h*f-u*d*m;break;case"XZY":this._x=u*h*f-l*d*m,this._y=l*d*f-u*h*m,this._z=l*h*m+u*d*f,this._w=l*h*f+u*d*m;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-i)*d}else if(n>o&&n>f){let d=2*Math.sqrt(1+n-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+l)/d}else if(o>f){let d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+f-n-o);this._w=(a-i)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},sh=class sh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Au.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Au.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-r*i),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*h,this.y=n+c*h+o*l-r*f,this.z=i+c*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kl.copy(this).projectOnVector(e),this.sub(Kl)}reflect(e){return this.sub(Kl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};sh.prototype.isVector3=!0;E=sh,Kl=new E,Au=new Mt,rh=class rh{constructor(e,t,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l)}set(e,t,n,i,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],m=n[8],x=i[0],g=i[3],p=i[6],T=i[1],C=i[4],y=i[7],b=i[2],S=i[5],R=i[8];return r[0]=a*x+o*T+c*b,r[3]=a*g+o*C+c*S,r[6]=a*p+o*y+c*R,r[1]=l*x+h*T+f*b,r[4]=l*g+h*C+f*S,r[7]=l*p+h*y+f*R,r[2]=u*x+d*T+m*b,r[5]=u*g+d*C+m*S,r[8]=u*p+d*y+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*r,d=l*r-a*c,m=t*f+n*u+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=f*x,e[1]=(i*l-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=u*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-o*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return is("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($l.makeScale(e,t)),this}rotate(e){return is("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($l.makeRotation(-e)),this}translate(e,t){return is("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};rh.prototype.isMatrix3=!0;He=rh,$l=new He,Ru=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cu=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ye=gp();ro=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ws===void 0&&(ws=Vs("canvas")),ws.width=e.width,ws.height=e.height;let i=ws.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Vs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=_i(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_i(t[n]/255)*255):t[n]=_i(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},xp=0,Ws=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Hn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Jl(i[a].image)):r.push(Jl(i[a]))}else r=Jl(i);n.url=r}return t||(e.images[this.uuid]=n),n}};_p=0,jl=new E,Dt=class s extends $n{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=fn,i=fn,r=st,a=Bt,o=kt,c=rn,l=s.DEFAULT_ANISOTROPY,h=en){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=Hn(),this.name="",this.source=new Ws(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jl).x}get height(){return this.source.getSize(jl).y}get depth(){return this.source.getSize(jl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Vc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $t:e.x=e.x-Math.floor(e.x);break;case fn:e.x=e.x<0?0:1;break;case zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $t:e.y=e.y-Math.floor(e.y);break;case fn:e.y=e.y<0?0:1;break;case zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Vc;Dt.DEFAULT_ANISOTROPY=1;ah=class ah{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],m=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(l+1)/2,y=(d+1)/2,b=(p+1)/2,S=(h+u)/4,R=(f+x)/4,v=(m+g)/4;return C>y&&C>b?C<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(C),i=S/n,r=R/n):y>b?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=S/i,r=v/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=R/r,i=v/r),this.set(n,i,r,t),this}let T=Math.sqrt((g-m)*(g-m)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(T)<.001&&(T=1),this.x=(g-m)/T,this.y=(f-x)/T,this.z=(u-h)/T,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ah.prototype.isVector4=!0;Ze=ah,ao=class extends $n{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:st,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new Dt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:st,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ws(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pt=class extends ao{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ur=class extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Xs=class extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},So=class So{constructor(e,t,n,i,r,a,o,c,l,h,f,u,d,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,c,l,h,f,u,d,m,x,g)}set(e,t,n,i,r,a,o,c,l,h,f,u,d,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new So().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Es.setFromMatrixColumn(e,0).length(),r=1/Es.setFromMatrixColumn(e,1).length(),a=1/Es.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let u=a*h,d=a*f,m=o*h,x=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=d+m*l,t[5]=u-x*l,t[9]=-o*c,t[2]=x-u*l,t[6]=m+d*l,t[10]=a*c}else if(e.order==="YXZ"){let u=c*h,d=c*f,m=l*h,x=l*f;t[0]=u+x*o,t[4]=m*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-m,t[6]=x+u*o,t[10]=a*c}else if(e.order==="ZXY"){let u=c*h,d=c*f,m=l*h,x=l*f;t[0]=u-x*o,t[4]=-a*f,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let u=a*h,d=a*f,m=o*h,x=o*f;t[0]=c*h,t[4]=m*l-d,t[8]=u*l+x,t[1]=c*f,t[5]=x*l+u,t[9]=d*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let u=a*c,d=a*l,m=o*c,x=o*l;t[0]=c*h,t[4]=x-u*f,t[8]=m*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*f+m,t[10]=u-x*f}else if(e.order==="XZY"){let u=a*c,d=a*l,m=o*c,x=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+x,t[5]=a*h,t[9]=d*f-m,t[2]=m*f-d,t[6]=o*h,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vp,e,yp)}lookAt(e,t,n){let i=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Di.crossVectors(n,Mn),Di.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Di.crossVectors(n,Mn)),Di.normalize(),Ta.crossVectors(Mn,Di),i[0]=Di.x,i[4]=Ta.x,i[8]=Mn.x,i[1]=Di.y,i[5]=Ta.y,i[9]=Mn.y,i[2]=Di.z,i[6]=Ta.z,i[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],T=n[3],C=n[7],y=n[11],b=n[15],S=i[0],R=i[4],v=i[8],w=i[12],P=i[1],F=i[5],U=i[9],H=i[13],I=i[2],B=i[6],X=i[10],K=i[14],ie=i[3],q=i[7],j=i[11],te=i[15];return r[0]=a*S+o*P+c*I+l*ie,r[4]=a*R+o*F+c*B+l*q,r[8]=a*v+o*U+c*X+l*j,r[12]=a*w+o*H+c*K+l*te,r[1]=h*S+f*P+u*I+d*ie,r[5]=h*R+f*F+u*B+d*q,r[9]=h*v+f*U+u*X+d*j,r[13]=h*w+f*H+u*K+d*te,r[2]=m*S+x*P+g*I+p*ie,r[6]=m*R+x*F+g*B+p*q,r[10]=m*v+x*U+g*X+p*j,r[14]=m*w+x*H+g*K+p*te,r[3]=T*S+C*P+y*I+b*ie,r[7]=T*R+C*F+y*B+b*q,r[11]=T*v+C*U+y*X+b*j,r[15]=T*w+C*H+y*K+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],m=e[3],x=e[7],g=e[11],p=e[15],T=c*d-l*u,C=o*d-l*f,y=o*u-c*f,b=a*d-l*h,S=a*u-c*h,R=a*f-o*h;return t*(x*T-g*C+p*y)-n*(m*T-g*b+p*S)+i*(m*C-x*b+p*R)-r*(m*y-x*S+g*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+i*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],m=e[12],x=e[13],g=e[14],p=e[15],T=t*o-n*a,C=t*c-i*a,y=t*l-r*a,b=n*c-i*o,S=n*l-r*o,R=i*l-r*c,v=h*x-f*m,w=h*g-u*m,P=h*p-d*m,F=f*g-u*x,U=f*p-d*x,H=u*p-d*g,I=T*H-C*U+y*F+b*P-S*w+R*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/I;return e[0]=(o*H-c*U+l*F)*B,e[1]=(i*U-n*H-r*F)*B,e[2]=(x*R-g*S+p*b)*B,e[3]=(u*S-f*R-d*b)*B,e[4]=(c*P-a*H-l*w)*B,e[5]=(t*H-i*P+r*w)*B,e[6]=(g*y-m*R-p*C)*B,e[7]=(h*R-u*y+d*C)*B,e[8]=(a*U-o*P+l*v)*B,e[9]=(n*P-t*U-r*v)*B,e[10]=(m*S-x*y+p*T)*B,e[11]=(f*y-h*S-d*T)*B,e[12]=(o*w-a*F-c*v)*B,e[13]=(t*F-n*w+i*v)*B,e[14]=(x*C-m*b-g*T)*B,e[15]=(h*b-f*C+u*T)*B,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,f=o+o,u=r*l,d=r*h,m=r*f,x=a*h,g=a*f,p=o*f,T=c*l,C=c*h,y=c*f,b=n.x,S=n.y,R=n.z;return i[0]=(1-(x+p))*b,i[1]=(d+y)*b,i[2]=(m-C)*b,i[3]=0,i[4]=(d-y)*S,i[5]=(1-(u+p))*S,i[6]=(g+T)*S,i[7]=0,i[8]=(m+C)*R,i[9]=(g-T)*R,i[10]=(1-(u+x))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Es.set(i[0],i[1],i[2]).length(),o=Es.set(i[4],i[5],i[6]).length(),c=Es.set(i[8],i[9],i[10]).length();r<0&&(a=-a),Un.copy(this);let l=1/a,h=1/o,f=1/c;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=h,Un.elements[5]*=h,Un.elements[6]*=h,Un.elements[8]*=f,Un.elements[9]*=f,Un.elements[10]*=f,t.setFromRotationMatrix(Un),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,r,a,o=zn,c=!1){let l=this.elements,h=2*r/(t-e),f=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),m,x;if(c)m=r/(a-r),x=a*r/(a-r);else if(o===zn)m=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Hs)m=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=zn,c=!1){let l=this.elements,h=2/(t-e),f=2/(n-i),u=-(t+e)/(t-e),d=-(n+i)/(n-i),m,x;if(c)m=1/(a-r),x=a/(a-r);else if(o===zn)m=-2/(a-r),x=-(a+r)/(a-r);else if(o===Hs)m=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};So.prototype.isMatrix4=!0;Be=So,Es=new E,Un=new Be,vp=new E(0,0,0),yp=new E(1,1,1),Di=new E,Ta=new E,Mn=new E,Pu=new Be,Iu=new Mt,Sn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],f=i[2],u=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Iu.setFromEuler(this),this.setFromQuaternion(Iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Sn.DEFAULT_ORDER="XYZ";Fr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Mp=0,Lu=new E,As=new Mt,di=new Be,wa=new E,Sr=new E,bp=new E,Sp=new Mt,Du=new E(1,0,0),Nu=new E(0,1,0),Uu=new E(0,0,1),Fu={type:"added"},Tp={type:"removed"},Rs={type:"childadded",child:null},Ql={type:"childremoved",child:null},Rt=class s extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new E,t=new Sn,n=new Mt,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Be},normalMatrix:{value:new He}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(Du,e)}rotateY(e){return this.rotateOnAxis(Nu,e)}rotateZ(e){return this.rotateOnAxis(Uu,e)}translateOnAxis(e,t){return Lu.copy(e).applyQuaternion(this.quaternion),this.position.add(Lu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Du,e)}translateY(e){return this.translateOnAxis(Nu,e)}translateZ(e){return this.translateOnAxis(Uu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?wa.copy(e):wa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(Sr,wa,this.up):di.lookAt(wa,Sr,this.up),this.quaternion.setFromRotationMatrix(di),i&&(di.extractRotation(i.matrixWorld),As.setFromRotationMatrix(di),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fu),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tp),Ql.child=e,this.dispatchEvent(Ql),Ql.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fu),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,e,bp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,Sp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Rt.DEFAULT_UP=new E(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;hn=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},wp={type:"move"},qs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),p=this._getHandJoint(l,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,m=.005;l.inputState.pinching&&u>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wp)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new hn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Ea={h:0,s:0,l:0};ae=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ye.workingColorSpace){if(e=jc(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ec(a,r,e+1/3),this.g=ec(a,r,e),this.b=ec(a,r,e-1/3)}return Ye.colorSpaceToWorking(this,i),this}setStyle(e,t=Et){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){let n=Wd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_i(e.r),this.g=_i(e.g),this.b=_i(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return Ye.workingToColorSpace(sn.copy(this),e),Math.round(Je(sn.r*255,0,255))*65536+Math.round(Je(sn.g*255,0,255))*256+Math.round(Je(sn.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(sn.copy(this),t);let n=sn.r,i=sn.g,r=sn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(i-r)/f+(i<r?6:0);break;case i:c=(r-n)/f+2;break;case r:c=(n-i)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(sn.copy(this),t),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=Et){Ye.workingToColorSpace(sn.copy(this),e);let t=sn.r,n=sn.g,i=sn.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(Ea);let n=Lr(Ni.h,Ea.h,t),i=Lr(Ni.s,Ea.s,t),r=Lr(Ni.l,Ea.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},sn=new ae;ae.NAMES=Wd;Or=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ae(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},os=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Fn=new E,fi=new E,tc=new E,pi=new E,Cs=new E,Ps=new E,Ou=new E,nc=new E,ic=new E,sc=new E,rc=new Ze,ac=new Ze,oc=new Ze,ki=class s{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Fn.subVectors(e,t),i.cross(Fn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Fn.subVectors(i,t),fi.subVectors(n,t),tc.subVectors(e,t);let a=Fn.dot(Fn),o=Fn.dot(fi),c=Fn.dot(tc),l=fi.dot(fi),h=fi.dot(tc),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(l*c-o*h)*u,m=(a*h-o*c)*u;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static getInterpolatedAttribute(e,t,n,i,r,a){return rc.setScalar(0),ac.setScalar(0),oc.setScalar(0),rc.fromBufferAttribute(e,t),ac.fromBufferAttribute(e,n),oc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(rc,r.x),a.addScaledVector(ac,r.y),a.addScaledVector(oc,r.z),a}static isFrontFacing(e,t,n,i){return Fn.subVectors(n,t),fi.subVectors(e,t),Fn.cross(fi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Fn.cross(fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Cs.subVectors(i,n),Ps.subVectors(r,n),nc.subVectors(e,n);let c=Cs.dot(nc),l=Ps.dot(nc);if(c<=0&&l<=0)return t.copy(n);ic.subVectors(e,i);let h=Cs.dot(ic),f=Ps.dot(ic);if(h>=0&&f<=h)return t.copy(i);let u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Cs,a);sc.subVectors(e,r);let d=Cs.dot(sc),m=Ps.dot(sc);if(m>=0&&d<=m)return t.copy(r);let x=d*l-c*m;if(x<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Ps,o);let g=h*m-d*f;if(g<=0&&f-h>=0&&d-m>=0)return Ou.subVectors(r,i),o=(f-h)/(f-h+(d-m)),t.copy(i).addScaledVector(Ou,o);let p=1/(g+x+u);return a=x*p,o=u*p,t.copy(n).addScaledVector(Cs,a).addScaledVector(Ps,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Tn=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(On.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(On.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=On.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,On):On.fromBufferAttribute(r,a),On.applyMatrix4(e.matrixWorld),this.expandByPoint(On);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Aa.copy(n.boundingBox)),Aa.applyMatrix4(e.matrixWorld),this.union(Aa)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,On),On.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),Ra.subVectors(this.max,Tr),Is.subVectors(e.a,Tr),Ls.subVectors(e.b,Tr),Ds.subVectors(e.c,Tr),Ui.subVectors(Ls,Is),Fi.subVectors(Ds,Ls),Qi.subVectors(Is,Ds);let t=[0,-Ui.z,Ui.y,0,-Fi.z,Fi.y,0,-Qi.z,Qi.y,Ui.z,0,-Ui.x,Fi.z,0,-Fi.x,Qi.z,0,-Qi.x,-Ui.y,Ui.x,0,-Fi.y,Fi.x,0,-Qi.y,Qi.x,0];return!lc(t,Is,Ls,Ds,Ra)||(t=[1,0,0,0,1,0,0,0,1],!lc(t,Is,Ls,Ds,Ra))?!1:(Ca.crossVectors(Ui,Fi),t=[Ca.x,Ca.y,Ca.z],lc(t,Is,Ls,Ds,Ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,On).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(On).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},mi=[new E,new E,new E,new E,new E,new E,new E,new E],On=new E,Aa=new Tn,Is=new E,Ls=new E,Ds=new E,Ui=new E,Fi=new E,Qi=new E,Tr=new E,Ra=new E,Ca=new E,es=new E;Ft=new E,Pa=new ze,Ep=0,gt=class extends $n{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ep++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$c,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Pa.fromBufferAttribute(this,t),Pa.applyMatrix3(e),this.setXY(t,Pa.x,Pa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},Br=class extends gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},kr=class extends gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},ot=class extends gt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ap=new Tn,wr=new E,cc=new E,pn=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ap.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wr.subVectors(e,this.center);let t=wr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(wr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wr.copy(e.center).add(cc)),this.expandByPoint(wr.copy(e.center).sub(cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Rp=0,In=new Be,hc=new Rt,Ns=new E,bn=new Tn,Er=new Tn,Xt=new E,dt=class s extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jf(e)?kr:Br)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return hc.lookAt(e),hc.updateMatrix(),this.applyMatrix4(hc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ot(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Er.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(bn.min,Er.min),bn.expandByPoint(Xt),Xt.addVectors(bn.max,Er.max),bn.expandByPoint(Xt)):(bn.expandByPoint(Er.min),bn.expandByPoint(Er.max))}bn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Xt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Xt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Xt.fromBufferAttribute(o,l),c&&(Ns.fromBufferAttribute(e,l),Xt.add(Ns)),i=Math.max(i,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new gt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let v=0;v<n.count;v++)o[v]=new E,c[v]=new E;let l=new E,h=new E,f=new E,u=new ze,d=new ze,m=new ze,x=new E,g=new E;function p(v,w,P){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,w),f.fromBufferAttribute(n,P),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,w),m.fromBufferAttribute(r,P),h.sub(l),f.sub(l),d.sub(u),m.sub(u);let F=1/(d.x*m.y-m.x*d.y);isFinite(F)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(f,-d.y).multiplyScalar(F),g.copy(f).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(F),o[v].add(x),o[w].add(x),o[P].add(x),c[v].add(g),c[w].add(g),c[P].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let v=0,w=T.length;v<w;++v){let P=T[v],F=P.start,U=P.count;for(let H=F,I=F+U;H<I;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let C=new E,y=new E,b=new E,S=new E;function R(v){b.fromBufferAttribute(i,v),S.copy(b);let w=o[v];C.copy(w),C.sub(b.multiplyScalar(b.dot(w))).normalize(),y.crossVectors(S,w);let F=y.dot(c[v])<0?-1:1;a.setXYZW(v,C.x,C.y,C.z,F)}for(let v=0,w=T.length;v<w;++v){let P=T[v],F=P.start,U=P.count;for(let H=F,I=F+U;H<I;H+=3)R(e.getX(H+0)),R(e.getX(H+1)),R(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new E,r=new E,a=new E,o=new E,c=new E,l=new E,h=new E,f=new E;if(e)for(let u=0,d=e.count;u<d;u+=3){let m=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h),d=0,m=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?d=c[x]*o.data.stride+o.offset:d=c[x]*h;for(let p=0;p<h;p++)u[m++]=l[d++]}return new gt(u,h,f)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let c=i[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,f=l.length;h<f;h++){let u=l[h],d=e(u,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){let d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ys=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$c,this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},cn=new E,Zs=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Nr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Nr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},uc=new E,Cp=new E,Pp=new He,Bn=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=uc.subVectors(n,t).cross(Cp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(uc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Pp.getNormalMatrix(e),i=this.coplanarPoint(uc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ip=0,mn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=Hn(),this.name="",this.type="Material",this.blending=sr,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sa,this.blendDst=rr,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$a,this.stencilZFail=$a,this.stencilZPass=$a,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ae().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Bn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ze().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},gi=new E,dc=new E,Ia=new E,La=new E,ls=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.origin).addScaledVector(this.direction,t),gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){dc.copy(e).add(t).multiplyScalar(.5),Ia.copy(t).sub(e).normalize(),La.copy(this.origin).sub(dc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ia),o=La.dot(this.direction),c=-La.dot(Ia),l=La.lengthSq(),h=Math.abs(1-a*a),f,u,d,m;if(h>0)if(f=a*c-o,u=a*o-c,m=r*h,f>=0)if(u>=-m)if(u<=m){let x=1/h;f*=x,u*=x,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-m?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=m?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(dc).addScaledVector(Ia,u),d}intersectSphere(e,t){if(e.radius<0)return null;gi.subVectors(e.center,this.origin);let n=gi.dot(this.direction),i=gi.dot(gi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,n,i,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,d=e.z-a.z,m=t.x-a.x,x=t.y-a.y,g=t.z-a.z,p=n.x-a.x,T=n.y-a.y,C=n.z-a.z,y=Math.abs(c),b=Math.abs(l),S=Math.abs(h),R,v,w,P,F,U,H,I,B,X,K,ie;if(y>=b&&y>=S?(w=c,U=f,B=m,ie=p,c>=0?(R=l,v=h,P=u,F=d,H=x,I=g,X=T,K=C):(R=h,v=l,P=d,F=u,H=g,I=x,X=C,K=T)):b>=S?(w=l,U=u,B=x,ie=T,l>=0?(R=h,v=c,P=d,F=f,H=g,I=m,X=C,K=p):(R=c,v=h,P=f,F=d,H=m,I=g,X=p,K=C)):(w=h,U=d,B=g,ie=C,h>=0?(R=c,v=l,P=f,F=u,H=m,I=x,X=p,K=T):(R=l,v=c,P=u,F=f,H=x,I=m,X=T,K=p)),w===0)return null;let q=R/w,j=v/w,te=1/w,Re=P-q*U,Se=F-j*U,lt=H-q*B,je=I-j*B,tt=X-q*ie,Y=K-j*ie,ee=tt*je-Y*lt,ye=Re*Y-Se*tt,Fe=lt*Se-je*Re;if(i){if(ee<0||ye<0||Fe<0)return null}else if((ee<0||ye<0||Fe<0)&&(ee>0||ye>0||Fe>0))return null;let xe=ee+ye+Fe;if(xe===0)return null;let Ve=te*(ee*U+ye*B+Fe*ie);return(xe>0?Ve<0:Ve>0)?null:this.at(Ve/xe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Jt=class extends mn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=Nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Bu=new Be,ts=new ls,Da=new pn,ku=new E,Na=new E,Ua=new E,Fa=new E,fc=new E,Oa=new E,zu=new E,Ba=new E,at=class extends Rt{constructor(e=new dt,t=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Oa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],f=r[c];h!==0&&(fc.fromBufferAttribute(f,e),a?Oa.addScaledVector(fc,h):Oa.addScaledVector(fc.sub(t),h))}t.add(Oa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(r),ts.copy(e.ray).recast(e.near),!(Da.containsPoint(ts.origin)===!1&&(ts.intersectSphere(Da,ku)===null||ts.origin.distanceToSquared(ku)>(e.far-e.near)**2))&&(Bu.copy(r).invert(),ts.copy(e.ray).applyMatrix4(Bu),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=u.length;m<x;m++){let g=u[m],p=a[g.materialIndex],T=Math.max(g.start,d.start),C=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let y=T,b=C;y<b;y+=3){let S=o.getX(y),R=o.getX(y+1),v=o.getX(y+2);i=ka(this,p,e,n,l,h,f,S,R,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let T=o.getX(g),C=o.getX(g+1),y=o.getX(g+2);i=ka(this,a,e,n,l,h,f,T,C,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,x=u.length;m<x;m++){let g=u[m],p=a[g.materialIndex],T=Math.max(g.start,d.start),C=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let y=T,b=C;y<b;y+=3){let S=y,R=y+1,v=y+2;i=ka(this,p,e,n,l,h,f,S,R,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let T=g,C=g+1,y=g+2;i=ka(this,a,e,n,l,h,f,T,C,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};Ar=new Ze,Hu=new Ze,Vu=new Ze,Dp=new Ze,Gu=new Be,za=new E,pc=new pn,Wu=new Be,mc=new ls,zr=class extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vc,this.bindMatrix=new Be,this.bindMatrixInverse=new Be,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Tn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,za),this.boundingBox.expandByPoint(za)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new pn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,za),this.boundingSphere.expandByPoint(za)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pc.copy(this.boundingSphere),pc.applyMatrix4(i),e.ray.intersectsSphere(pc)!==!1&&(Wu.copy(i).invert(),mc.copy(e.ray).applyMatrix4(Wu),!(this.boundingBox!==null&&mc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,mc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ze,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Cd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Hu.fromBufferAttribute(i.attributes.skinIndex,e),Vu.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ar.copy(t),t.set(0,0,0,0)):(Ar.set(...t,1),t.set(0,0,0)),Ar.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Vu.getComponent(r);if(a!==0){let o=Hu.getComponent(r);Gu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Dp.copy(Ar).applyMatrix4(Gu),a)}}return t.isVector4&&(t.w=Ar.w),t.applyMatrix4(this.bindMatrixInverse)}},Ks=class extends Rt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Hi=class extends Dt{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Lt,h=Lt,f,u){super(null,a,o,c,l,h,i,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xu=new Be,Np=new Be,Hr=class s{constructor(e=[],t=[]){this.uuid=Hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Be;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Np;Xu.multiplyMatrices(o,t[r]),Xu.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Hi(t,e,e,kt,Cn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Pe("Skeleton: No bone found with UUID:",r),a=new Ks),this.bones.push(a),this.boneInverses.push(new Be().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},wn=class extends gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Us=new Be,qu=new Be,Ha=[],Yu=new Tn,Up=new Be,Rr=new at,Cr=new pn,En=class extends at{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new wn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Up)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),Yu.copy(e.boundingBox).applyMatrix4(Us),this.boundingBox.union(Yu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new pn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),Cr.copy(e.boundingSphere).applyMatrix4(Us),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(n),e.ray.intersectsSphere(Cr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Us),qu.multiplyMatrices(n,Us),Rr.matrixWorld=qu,Rr.raycast(e,Ha);for(let a=0,o=Ha.length;a<o;a++){let c=Ha[a];c.instanceId=r,c.object=this,t.push(c)}Ha.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new wn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hi(new Float32Array(i*this.count),i,this.count,Co,Cn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ns=new pn,Fp=new ze(.5,.5),Va=new E,$s=class{constructor(e=new Bn,t=new Bn,n=new Bn,i=new Bn,r=new Bn,a=new Bn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],m=r[8],x=r[9],g=r[10],p=r[11],T=r[12],C=r[13],y=r[14],b=r[15];if(i[0].setComponents(l-a,d-h,p-m,b-T).normalize(),i[1].setComponents(l+a,d+h,p+m,b+T).normalize(),i[2].setComponents(l+o,d+f,p+x,b+C).normalize(),i[3].setComponents(l-o,d-f,p-x,b-C).normalize(),n)i[4].setComponents(c,u,g,y).normalize(),i[5].setComponents(l-c,d-u,p-g,b-y).normalize();else if(i[4].setComponents(l-c,d-u,p-g,b-y).normalize(),t===zn)i[5].setComponents(l+c,d+u,p+g,b+y).normalize();else if(t===Hs)i[5].setComponents(c,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){ns.center.set(0,0,0);let t=Fp.distanceTo(e.center);return ns.radius=.7071067811865476+t,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Va.x=i.normal.x>0?e.max.x:e.min.x,Va.y=i.normal.y>0?e.max.y:e.min.y,Va.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Va)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Js=class extends mn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},oo=new E,lo=new E,Zu=new Be,Pr=new ls,Ga=new pn,gc=new E,Ku=new E,cs=class extends Rt{constructor(e=new dt,t=new Js){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)oo.fromBufferAttribute(t,i-1),lo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=oo.distanceTo(lo);e.setAttribute("lineDistance",new ot(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ga.copy(n.boundingSphere),Ga.applyMatrix4(i),Ga.radius+=r,e.ray.intersectsSphere(Ga)===!1)return;Zu.copy(i).invert(),Pr.copy(e.ray).applyMatrix4(Zu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=d,g=m-1;x<g;x+=l){let p=h.getX(x),T=h.getX(x+1),C=Wa(this,e,Pr,c,p,T,x);C&&t.push(C)}if(this.isLineLoop){let x=h.getX(m-1),g=h.getX(d),p=Wa(this,e,Pr,c,x,g,m-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let x=d,g=m-1;x<g;x+=l){let p=Wa(this,e,Pr,c,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=Wa(this,e,Pr,c,m-1,d,m-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};$u=new E,Ju=new E,Vr=class extends cs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)$u.fromBufferAttribute(t,i),Ju.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+$u.distanceTo(Ju);e.setAttribute("lineDistance",new ot(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Gr=class extends cs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},js=class extends mn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ju=new Be,Tc=new ls,Xa=new pn,qa=new E,Wr=class extends Rt{constructor(e=new dt,t=new js){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(i),Xa.radius+=r,e.ray.intersectsSphere(Xa)===!1)return;ju.copy(i).invert(),Tc.copy(e.ray).applyMatrix4(ju);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){let u=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let m=u,x=d;m<x;m++){let g=l.getX(m);qa.fromBufferAttribute(f,g),Qu(qa,g,c,i,e,t,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let m=u,x=d;m<x;m++)qa.fromBufferAttribute(f,m),Qu(qa,m,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};Xr=class extends Dt{constructor(e=[],t=Wi,n,i,r,a,o,c,l,h){super(e,t,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},qr=class extends Dt{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Jn=class extends Dt{constructor(e,t,n=Rn,i,r,a,o=Lt,c=Lt,l,h=Kn,f=1){if(h!==Kn&&h!==Xi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:f};super(u,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ws(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},co=class extends Jn{constructor(e,t=Rn,n=Wi,i,r,a=Lt,o=Lt,c,l=Kn){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Yr=class extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},jn=class s extends dt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],f=[],u=0,d=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new ot(l,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(f,2));function m(x,g,p,T,C,y,b,S,R,v,w){let P=y/R,F=b/v,U=y/2,H=b/2,I=S/2,B=R+1,X=v+1,K=0,ie=0,q=new E;for(let j=0;j<X;j++){let te=j*F-H;for(let Re=0;Re<B;Re++){let Se=Re*P-U;q[x]=Se*T,q[g]=te*C,q[p]=I,l.push(q.x,q.y,q.z),q[x]=0,q[g]=0,q[p]=S>0?1:-1,h.push(q.x,q.y,q.z),f.push(Re/R),f.push(1-j/v),K+=1}}for(let j=0;j<v;j++)for(let te=0;te<R;te++){let Re=u+te+B*j,Se=u+te+B*(j+1),lt=u+(te+1)+B*(j+1),je=u+(te+1)+B*j;c.push(Re,Se,je),c.push(Se,lt,je),ie+=6}o.addGroup(d,ie,w),d+=ie,u+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Qn=class s extends dt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],f=[],u=[],d=[],m=0,x=[],g=n/2,p=0;T(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(h),this.setAttribute("position",new ot(f,3)),this.setAttribute("normal",new ot(u,3)),this.setAttribute("uv",new ot(d,2));function T(){let y=new E,b=new E,S=0,R=(t-e)/n;for(let v=0;v<=r;v++){let w=[],P=v/r,F=P*(t-e)+e;for(let U=0;U<=i;U++){let H=U/i,I=H*c+o,B=Math.sin(I),X=Math.cos(I);b.x=F*B,b.y=-P*n+g,b.z=F*X,f.push(b.x,b.y,b.z),y.set(B,R,X).normalize(),u.push(y.x,y.y,y.z),d.push(H,1-P),w.push(m++)}x.push(w)}for(let v=0;v<i;v++)for(let w=0;w<r;w++){let P=x[w][v],F=x[w+1][v],U=x[w+1][v+1],H=x[w][v+1];(e>0||w!==0)&&(h.push(P,F,H),S+=3),(t>0||w!==r-1)&&(h.push(F,U,H),S+=3)}l.addGroup(p,S,0),p+=S}function C(y){let b=m,S=new ze,R=new E,v=0,w=y===!0?e:t,P=y===!0?1:-1;for(let U=1;U<=i;U++)f.push(0,g*P,0),u.push(0,P,0),d.push(.5,.5),m++;let F=m;for(let U=0;U<=i;U++){let I=U/i*c+o,B=Math.cos(I),X=Math.sin(I);R.x=w*X,R.y=g*P,R.z=w*B,f.push(R.x,R.y,R.z),u.push(0,P,0),S.x=B*.5+.5,S.y=X*.5*P+.5,d.push(S.x,S.y),m++}for(let U=0;U<i;U++){let H=b+U,I=F+U;y===!0?h.push(I,I+1,H):h.push(I+1,I,H),v+=3}l.addGroup(p,v,y===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Zr=class s extends Qn{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Kr=class s extends dt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,f=e/o,u=t/c,d=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let T=p*u-a;for(let C=0;C<l;C++){let y=C*f-r;m.push(y,-T,0),x.push(0,0,1),g.push(C/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<o;T++){let C=T+l*p,y=T+l*(p+1),b=T+1+l*(p+1),S=T+1+l*p;d.push(C,y,S),d.push(y,b,S)}this.setIndex(d),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},hs=class s extends dt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],f=new E,u=new E,d=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let T=[],C=p/n,y=a+C*o,b=e*Math.cos(y),S=Math.sqrt(e*e-b*b),R=0;p===0&&a===0?R=.5/t:p===n&&c===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){let w=v/t,P=i+w*r;f.x=-S*Math.cos(P),f.y=b,f.z=S*Math.sin(P),m.push(f.x,f.y,f.z),u.copy(f).normalize(),x.push(u.x,u.y,u.z),g.push(w+R,1-C),T.push(l++)}h.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){let C=h[p][T+1],y=h[p][T],b=h[p+1][T],S=h[p+1][T+1];(p!==0||a>0)&&d.push(C,y,S),(p!==n-1||c<Math.PI)&&d.push(y,b,S)}this.setIndex(d),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(x,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Qs=class s extends dt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let c=[],l=[],h=[],f=[],u=new E,d=new E,m=new E;for(let x=0;x<=n;x++){let g=a+x/n*o;for(let p=0;p<=i;p++){let T=p/i*r;d.x=(e+t*Math.cos(g))*Math.cos(T),d.y=(e+t*Math.cos(g))*Math.sin(T),d.z=t*Math.sin(g),l.push(d.x,d.y,d.z),u.x=e*Math.cos(T),u.y=e*Math.sin(T),m.subVectors(d,u).normalize(),h.push(m.x,m.y,m.z),f.push(p/i),f.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=i;g++){let p=(i+1)*x+g-1,T=(i+1)*(x-1)+g-1,C=(i+1)*(x-1)+g,y=(i+1)*x+g;c.push(p,T,y),c.push(T,C,y)}this.setIndex(c),this.setAttribute("position",new ot(l,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};Xd={clone:ps,merge:an},Bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xt=class extends mn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bp,this.fragmentShader=kp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ps(e.uniforms),this.uniformsGroups=Op(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new ae().setHex(i.value);break;case"v2":this.uniforms[n].value=new ze().fromArray(i.value);break;case"v3":this.uniforms[n].value=new E().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ze().fromArray(i.value);break;case"m3":this.uniforms[n].value=new He().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Be().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ho=class extends xt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},gn=class extends mn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cl,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xn=class extends gn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ze(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},uo=class extends mn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},fo=class extends mn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};ei=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},po=class extends ei{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mc,endingEnd:Mc}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case bc:r=e,o=2*t-n;break;case Sc:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case bc:a=e,c=2*n-t;break;case Sc:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-u*g+2*u*x-u*m,T=(1+u)*g+(-1.5-2*u)*x+(-.5+u)*m+1,C=(-1-d)*g+(1.5+d)*x+.5*m,y=d*g-d*x;for(let b=0;b!==o;++b)r[b]=p*a[h+b]+T*a[l+b]+C*a[c+b]+y*a[f+b];return r}},mo=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),f=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*f+a[c+u]*h;return r}},go=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},xo=class extends ei{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let m=(n-t)/(i-t),x=1-m;for(let g=0;g!==o;++g)r[g]=a[l+g]*x+a[c+g]*m;return r}let u=o*2,d=e-1;for(let m=0;m!==o;++m){let x=a[l+m],g=a[c+m],p=d*u+m*2,T=f[p],C=f[p+1],y=e*u+m*2,b=h[y],S=h[y+1],R=Gp(n,t,T,b,i);r[m]=qd(R,x,C,S,g)}return r}};_n=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Bi(t,this.TimeBufferType),this.values=Bi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Bi(e.times,Array),values:Bi(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Ja(e.settings)&&(n.settings={inTangents:Bi(e.settings.inTangents,Array),outTangents:Bi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new xo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ss:t=this.InterpolantFactoryMethodDiscrete;break;case rs:t=this.InterpolantFactoryMethodLinear;break;case Ka:t=this.InterpolantFactoryMethodSmooth;break;case yc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Pe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ss;case this.InterpolantFactoryMethodLinear:return rs;case this.InterpolantFactoryMethodSmooth:return Ka;case this.InterpolantFactoryMethodBezier:return yc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Ja(this.settings)&&(nd(this.settings.inTangents,e),nd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){ke("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){ke("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Qf(i))for(let o=0,c=i.length;o!==c;++o){let l=i[o];if(isNaN(l)){ke("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ka,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{let f=o*n,u=f-n,d=f+n;for(let m=0;m!==n;++m){let x=t[f+m];if(x!==t[u+m]||x!==t[d+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[f+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Ja(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};_n.prototype.ValueTypeName="";_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=rs;vi=class extends _n{constructor(e,t,n){super(e,t,n)}};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=ss;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;$r=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};$r.prototype.ValueTypeName="color";yi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};yi.prototype.ValueTypeName="number";_o=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t),l=e*o;for(let h=l+o;l!==h;l+=4)Mt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Mi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new _o(this.times,this.values,this.getValueSize(),e)}};Mi.prototype.ValueTypeName="quaternion";Mi.prototype.InterpolantFactoryMethodSmooth=void 0;bi=class extends _n{constructor(e,t,n){super(e,t,n)}};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=ss;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;Vi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};Vi.prototype.ValueTypeName="vector";Jr=class{constructor(e="",t=-1,n=[],i=Pd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Hn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Xp(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(_n.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=zp(c);c=td(c,1,h),l=td(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new yi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let f=h[1],u=i[f];u||(i[f]=u=[]),u.push(l)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};Zn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(id(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!id(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};vo=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,f){return l.push(h,f),this},this.removeHandler=function(h){let f=l.indexOf(h);return f!==-1&&l.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=l.length;f<u;f+=2){let d=l[f],m=l[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Yd=new vo,ti=class{constructor(e){this.manager=e!==void 0?e:Yd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ti.DEFAULT_MATERIAL_NAME="__DEFAULT";xi={},wc=class extends Error{constructor(e,t){super(e),this.response=t}},er=class extends ti{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Zn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(xi[e]!==void 0){xi[e].push({onLoad:t,onProgress:n,onError:i});return}xi[e]=[],xi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=xi[e],f=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=u?parseInt(u):0,m=d!==0,x=0,g=new ReadableStream({start(p){T();function T(){f.read().then(({done:C,value:y})=>{if(C)p.close();else{x+=y.byteLength;let b=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:d});for(let S=0,R=h.length;S<R;S++){let v=h[S];v.onProgress&&v.onProgress(b)}p.enqueue(y),T()}},C=>{p.error(C)})}}});return new Response(g)}else throw new wc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),u=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then(m=>d.decode(m))}}}).then(l=>{Zn.add(`file:${e}`,l);let h=xi[e];delete xi[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=xi[e];if(h===void 0)throw this.manager.itemError(e),l;delete xi[e];for(let f=0,u=h.length;f<u;f++){let d=h[f];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Fs=new WeakMap,yo=class extends ti{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Zn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let f=Fs.get(a);f===void 0&&(f=[],Fs.set(a,f)),f.push({onLoad:t,onError:i})}return a}let o=Vs("img");function c(){h(),t&&t(this);let f=Fs.get(this)||[];for(let u=0;u<f.length;u++){let d=f[u];d.onLoad&&d.onLoad(this)}Fs.delete(this),r.manager.itemEnd(e)}function l(f){h(),i&&i(f),Zn.remove(`image:${e}`);let u=Fs.get(this)||[];for(let d=0;d<u.length;d++){let m=u[d];m.onError&&m.onError(f)}Fs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Zn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}},un=class extends ti{constructor(e){super(e)}load(e,t,n,i){let r=new Dt,a=new yo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},tr=class extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},xc=new Be,sd=new E,rd=new E,nr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $s,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(sd),rd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){xc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(xc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,c=i?i.x/r.x:0,l=i?i.y/r.y:0;e.coordinateSystem===Hs||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(xc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ya=new E,Za=new Mt,Yn=new E,jr=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ya,Za,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,Za,Yn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ya,Za,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,Za,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Oi=new E,ad=new ze,od=new ze,Ot=class extends jr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=as*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ir*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return as*2*Math.atan(Math.tan(Ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,ad,od),t.subVectors(od,ad)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ir*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ec=class extends nr{constructor(){super(new Ot(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=as*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Qr=class extends tr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ec}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Ac=class extends nr{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0}},ea=class extends tr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Ac}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ni=class extends jr{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Rc=class extends nr{constructor(){super(new ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},us=class extends tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Rc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Si=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},ta=class extends dt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},_c=new WeakMap,na=class extends ti{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Zn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{_c.has(a)===!0?(i&&i(_c.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Zn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),_c.set(c,l),Zn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Zn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Os=-90,Bs=1,Mo=class extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ot(Os,Bs,e,t);i.layers=this.layers,this.add(i);let r=new Ot(Os,Bs,e,t);r.layers=this.layers,this.add(r);let a=new Ot(Os,Bs,e,t);a.layers=this.layers,this.add(a);let o=new Ot(Os,Bs,e,t);o.layers=this.layers,this.add(o);let c=new Ot(Os,Bs,e,t);c.layers=this.layers,this.add(c);let l=new Ot(Os,Bs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},bo=class extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},eh="\\[\\]\\.:\\/",qp=new RegExp("["+eh+"]","g"),th="[^"+eh+"]",Yp="[^"+eh.replace("\\.","")+"]",Zp=/((?:WC+[\/:])*)/.source.replace("WC",th),Kp=/(WCOD+)?/.source.replace("WCOD",Yp),$p=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",th),Jp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",th),jp=new RegExp("^"+Zp+Kp+$p+Jp+"$"),Qp=["material","materials","bones","map"],Cc=class{constructor(e,t,n){let i=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qp,"")}static parseTrackName(e){let t=jp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Qp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[i];if(a===void 0){let l=t.nodeName;ke("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=Cc;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];Vv=new Float32Array(1),oh=class oh{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};oh.prototype.isMatrix2=!0;Pc=oh;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186")});function gf(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function nm(s){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,f=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let h=c.array,f=c.updateRanges;if(s.bindBuffer(l,o),f.length===0)s.bufferSubData(l,0,h);else{f.sort((d,m)=>d.start-m.start);let u=0;for(let d=1;d<f.length;d++){let m=f[u],x=f[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,f[u]=x)}f.length=u+1;for(let d=0,m=f.length;d<m;d++){let x=f[d];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(s.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}function Bg(s,e,t,n,i,r){let a=new ae(0),o=i===!0?0:1,c,l,h=null,f=0,u=null;function d(T){let C=T.isScene===!0?T.background:null;if(C&&C.isTexture){let y=T.backgroundBlurriness>0;C=e.get(C,y)}return C}function m(T){let C=!1,y=d(T);y===null?g(a,o):y&&y.isColor&&(g(y,1),C=!0);let b=s.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(T,C){let y=d(C);y&&(y.isCubeTexture||y.mapping===ra)?(l===void 0&&(l=new at(new jn(1,1,1),new xt({name:"BackgroundCubeMaterial",uniforms:ps(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Og.makeRotationFromEuler(C.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xf),l.material.toneMapped=Ye.getTransfer(y.colorSpace)!==ut,(h!==y||f!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new at(new Kr(2,2),new xt({name:"BackgroundMaterial",uniforms:ps(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(y.colorSpace)!==ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=s.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function g(T,C){T.getRGB(dl,Qc(s)),t.buffers.color.setClear(dl.r,dl.g,dl.b,C,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,C=1){a.set(T),o=C,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,g(a,o)},render:m,addToRenderList:x,dispose:p}}function kg(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(F,U,H,I,B){let X=!1,K=f(F,I,H,U);r!==K&&(r=K,l(r.object)),X=d(F,I,H,B),X&&m(F,I,H,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,y(F,U,H,I),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return s.createVertexArray()}function l(F){return s.bindVertexArray(F)}function h(F){return s.deleteVertexArray(F)}function f(F,U,H,I){let B=I.wireframe===!0,X=n[U.id];X===void 0&&(X={},n[U.id]=X);let K=F.isInstancedMesh===!0?F.id:0,ie=X[K];ie===void 0&&(ie={},X[K]=ie);let q=ie[H.id];q===void 0&&(q={},ie[H.id]=q);let j=q[B];return j===void 0&&(j=u(c()),q[B]=j),j}function u(F){let U=[],H=[],I=[];for(let B=0;B<t;B++)U[B]=0,H[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:H,attributeDivisors:I,object:F,attributes:{},index:null}}function d(F,U,H,I){let B=r.attributes,X=U.attributes,K=0,ie=H.getAttributes();for(let q in ie)if(ie[q].location>=0){let te=B[q],Re=X[q];if(Re===void 0&&(q==="instanceMatrix"&&F.instanceMatrix&&(Re=F.instanceMatrix),q==="instanceColor"&&F.instanceColor&&(Re=F.instanceColor)),te===void 0||te.attribute!==Re||Re&&te.data!==Re.data)return!0;K++}return r.attributesNum!==K||r.index!==I}function m(F,U,H,I){let B={},X=U.attributes,K=0,ie=H.getAttributes();for(let q in ie)if(ie[q].location>=0){let te=X[q];te===void 0&&(q==="instanceMatrix"&&F.instanceMatrix&&(te=F.instanceMatrix),q==="instanceColor"&&F.instanceColor&&(te=F.instanceColor));let Re={};Re.attribute=te,te&&te.data&&(Re.data=te.data),B[q]=Re,K++}r.attributes=B,r.attributesNum=K,r.index=I}function x(){let F=r.newAttributes;for(let U=0,H=F.length;U<H;U++)F[U]=0}function g(F){p(F,0)}function p(F,U){let H=r.newAttributes,I=r.enabledAttributes,B=r.attributeDivisors;H[F]=1,I[F]===0&&(s.enableVertexAttribArray(F),I[F]=1),B[F]!==U&&(s.vertexAttribDivisor(F,U),B[F]=U)}function T(){let F=r.newAttributes,U=r.enabledAttributes;for(let H=0,I=U.length;H<I;H++)U[H]!==F[H]&&(s.disableVertexAttribArray(H),U[H]=0)}function C(F,U,H,I,B,X,K){K===!0?s.vertexAttribIPointer(F,U,H,B,X):s.vertexAttribPointer(F,U,H,I,B,X)}function y(F,U,H,I){x();let B=I.attributes,X=H.getAttributes(),K=U.defaultAttributeValues;for(let ie in X){let q=X[ie];if(q.location>=0){let j=B[ie];if(j===void 0&&(ie==="instanceMatrix"&&F.instanceMatrix&&(j=F.instanceMatrix),ie==="instanceColor"&&F.instanceColor&&(j=F.instanceColor)),j!==void 0){let te=j.normalized,Re=j.itemSize,Se=e.get(j);if(Se===void 0)continue;let lt=Se.buffer,je=Se.type,tt=Se.bytesPerElement,Y=je===s.INT||je===s.UNSIGNED_INT||j.gpuType===Eo;if(j.isInterleavedBufferAttribute){let ee=j.data,ye=ee.stride,Fe=j.offset;if(ee.isInstancedInterleavedBuffer){for(let xe=0;xe<q.locationSize;xe++)p(q.location+xe,ee.meshPerAttribute);F.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let xe=0;xe<q.locationSize;xe++)g(q.location+xe);s.bindBuffer(s.ARRAY_BUFFER,lt);for(let xe=0;xe<q.locationSize;xe++)C(q.location+xe,Re/q.locationSize,je,te,ye*tt,(Fe+Re/q.locationSize*xe)*tt,Y)}else{if(j.isInstancedBufferAttribute){for(let ee=0;ee<q.locationSize;ee++)p(q.location+ee,j.meshPerAttribute);F.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ee=0;ee<q.locationSize;ee++)g(q.location+ee);s.bindBuffer(s.ARRAY_BUFFER,lt);for(let ee=0;ee<q.locationSize;ee++)C(q.location+ee,Re/q.locationSize,je,te,Re*tt,Re/q.locationSize*ee*tt,Y)}}else if(K!==void 0){let te=K[ie];if(te!==void 0)switch(te.length){case 2:s.vertexAttrib2fv(q.location,te);break;case 3:s.vertexAttrib3fv(q.location,te);break;case 4:s.vertexAttrib4fv(q.location,te);break;default:s.vertexAttrib1fv(q.location,te)}}}}T()}function b(){w();for(let F in n){let U=n[F];for(let H in U){let I=U[H];for(let B in I){let X=I[B];for(let K in X)h(X[K].object),delete X[K];delete I[B]}}delete n[F]}}function S(F){if(n[F.id]===void 0)return;let U=n[F.id];for(let H in U){let I=U[H];for(let B in I){let X=I[B];for(let K in X)h(X[K].object),delete X[K];delete I[B]}}delete n[F.id]}function R(F){for(let U in n){let H=n[U];for(let I in H){let B=H[I];if(B[F.id]===void 0)continue;let X=B[F.id];for(let K in X)h(X[K].object),delete X[K];delete B[F.id]}}}function v(F){for(let U in n){let H=n[U],I=F.isInstancedMesh===!0?F.id:0,B=H[I];if(B!==void 0){for(let X in B){let K=B[X];for(let ie in K)h(K[ie].object),delete K[ie];delete B[X]}delete H[I],Object.keys(H).length===0&&delete n[U]}}}function w(){P(),a=!0,r!==i&&(r=i,l(r.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:w,resetDefaultState:P,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:T}}function zg(s,e,t){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Hg(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==kt&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let v=R===qt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==rn&&R!==Cn&&!v&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Pe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),T=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),C=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:T,maxVaryings:C,maxFragmentUniforms:y,maxSamples:b,samples:S}}function Vg(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Bn,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||n!==0||i;return i=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){let m=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,p=s.get(f);if(!i||m===null||m.length===0||r&&!g)r?h(null):l();else{let T=r?0:n,C=T*4,y=p.clippingState||null;c.value=y,y=h(m,u,C,d);for(let b=0;b!==C;++b)y[b]=t[b];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,m){let x=f!==null?f.length:0,g=null;if(x!==0){if(g=c.value,m!==!0||g===null){let p=d+x*4,T=u.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<p)&&(g=new Float32Array(p));for(let C=0,y=d;C!==x;++C,y+=4)a.copy(f[C]).applyMatrix4(T,o),a.normal.toArray(g,y),g[y+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function Yg(s){let e=[],t=[],n=s,i=s-dr+1+Gg;for(let r=0;r<i;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,u=6,d=3,m=new Float32Array(d*u*f),x=new Float32Array(d*u*f);for(let p=0;p<f;p++){let T=p%3*2/3-1,C=p>2?0:-1,y=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];m.set(y,d*u*p);for(let b=0;b<u;b++){let S=h[b*2]*2-1,R=h[b*2+1]*2-1;p===0?ms.set(1,R,S):p===1?ms.set(-S,1,-R):p===2?ms.set(-S,R,1):p===3?ms.set(-1,R,-S):p===4?ms.set(-S,-1,R):ms.set(S,R,-1),ms.toArray(x,(p*u+b)*d)}}let g=new dt;g.setAttribute("position",new gt(m,d)),g.setAttribute("outputDirection",new gt(x,d)),t.push(new at(g,null)),n>dr&&n--}return{lodMeshes:t,sizeLods:e}}function Kd(s,e,t){let n=new Pt(s,e,t);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Zg(s,e,t){return new xt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Xg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Kg(s,e,t){return new xt({name:"SphericalGaussianBlur",defines:{SAMPLES:Wg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:gl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function $d(){return new xt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Jd(){return new xt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function gl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function $g(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===ar||d===To)if(e.has(u)){let m=e.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let x=new pl(m.height);return x.fromEquirectangularTexture(s,u),e.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let d=u.mapping,m=d===ar||d===To,x=d===Wi||d===ds;if(m||x){let g=t.get(u),p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new pr(s)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let T=u.image;return m&&T&&T.height>0||x&&T&&c(T)?(n===null&&(n=new pr(s)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,d){return d===ar?u.mapping=Wi:d===To&&(u.mapping=ds),u}function c(u){let d=0,m=6;for(let x=0;x<m;x++)u[x]!==void 0&&d++;return d===m}function l(u){let d=u.target;d.removeEventListener("dispose",l);let m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function Jg(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&is("WebGLRenderer: "+n+" extension not supported."),i}}}function jg(s,e,t,n){let i={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete i[u.id];let d=r.get(u);d&&(e.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function c(f){let u=f.attributes;for(let d in u)e.update(u[d],s.ARRAY_BUFFER)}function l(f){let u=[],d=f.index,m=f.attributes.position,x=0;if(m===void 0)return;if(d!==null){let T=d.array;x=d.version;for(let C=0,y=T.length;C<y;C+=3){let b=T[C+0],S=T[C+1],R=T[C+2];u.push(b,S,S,R,R,b)}}else{let T=m.array;x=m.version;for(let C=0,y=T.length/3-1;C<y;C+=3){let b=C+0,S=C+1,R=C+2;u.push(b,S,S,R,R,b)}}let g=new(m.count>=65535?kr:Br)(u,1);g.version=x;let p=r.get(f);p&&e.remove(p),r.set(f,g)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function Qg(s,e,t){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,u){s.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,d){d!==0&&(s.drawElementsInstanced(n,u,r,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let x=0;for(let g=0;g<d;g++)x+=u[g];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function ex(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:ke("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function tx(s,e,t){let n=new WeakMap,i=new Ze;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==f){let w=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],C=0;d===!0&&(C=1),m===!0&&(C=2),x===!0&&(C=3);let y=o.attributes.position.count*C,b=1;y>e.maxTextureSize&&(b=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let S=new Float32Array(y*b*4*f),R=new Ur(S,y,b,f);R.type=Cn,R.needsUpdate=!0;let v=C*4;for(let P=0;P<f;P++){let F=g[P],U=p[P],H=T[P],I=y*b*4*P;for(let B=0;B<F.count;B++){let X=B*v;d===!0&&(i.fromBufferAttribute(F,B),S[I+X+0]=i.x,S[I+X+1]=i.y,S[I+X+2]=i.z,S[I+X+3]=0),m===!0&&(i.fromBufferAttribute(U,B),S[I+X+4]=i.x,S[I+X+5]=i.y,S[I+X+6]=i.z,S[I+X+7]=0),x===!0&&(i.fromBufferAttribute(H,B),S[I+X+8]=i.x,S[I+X+9]=i.y,S[I+X+10]=i.z,S[I+X+11]=H.itemSize===4?i.w:1)}}u={count:f,texture:R,size:new ze(y,b)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];let m=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(s,"morphTargetBaseInfluence",m),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function nx(s,e,t,n,i){let r=new WeakMap;function a(l){let h=i.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}function sx(s,e,t,n,i,r){let a=new Pt(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new dt;l.setAttribute("position",new ot([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ot([0,2,0,0,2,0],2));let h=new ho({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new at(l,h),u=new ni(-1,1,1,-1,0,1),d=null,m=null,x=!1,g,p=null,T=[],C=!1;this.setSize=function(y,b){a.setSize(y,b),o!==null&&o.setSize(y,b),c!==null&&c.setSize(y,b);for(let S=0;S<T.length;S++){let R=T[S];R.setSize&&R.setSize(y,b)}},this.setEffects=function(y){T=y,C=T.length>0&&T[0].isRenderPass===!0;let b=a.width,S=a.height;T.length>0&&o===null&&(o=new Pt(b,S,{type:qt,depthBuffer:!1,stencilBuffer:!1}),c=new Pt(b,S,{type:qt,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<T.length;R++){let v=T[R];v.setSize&&v.setSize(b,S)}},this.begin=function(y,b){if(x||y.toneMapping===An&&T.length===0)return!1;if(p=b,b!==null){let S=b.width,R=b.height;(a.width!==S||a.height!==R)&&this.setSize(S,R)}return C===!1&&y.setRenderTarget(a),g=y.toneMapping,y.toneMapping=An,!0},this.hasRenderPass=function(){return C},this.end=function(y,b){y.toneMapping=g,x=!0;let S=a,R=o;for(let v=0;v<T.length;v++){let w=T[v];w.enabled!==!1&&(w.render(y,R,S,b),w.needsSwap!==!1&&(S=R,R=R===o?c:o))}if(d!==y.outputColorSpace||m!==y.toneMapping){d=y.outputColorSpace,m=y.toneMapping,h.defines={},Ye.getTransfer(d)===ut&&(h.defines.SRGB_TRANSFER="");let v=ix[m];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(p),y.render(f,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}function mr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=jd[i];if(r===void 0&&(r=new Float32Array(i),jd[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Ht(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Vt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function xl(s,e){let t=Qd[e];t===void 0&&(t=new Int32Array(e),Qd[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function rx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function ax(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2fv(this.addr,e),Vt(t,e)}}function ox(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;s.uniform3fv(this.addr,e),Vt(t,e)}}function lx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4fv(this.addr,e),Vt(t,e)}}function cx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;nf.set(n),s.uniformMatrix2fv(this.addr,!1,nf),Vt(t,n)}}function hx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;tf.set(n),s.uniformMatrix3fv(this.addr,!1,tf),Vt(t,n)}}function ux(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;ef.set(n),s.uniformMatrix4fv(this.addr,!1,ef),Vt(t,n)}}function dx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function fx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2iv(this.addr,e),Vt(t,e)}}function px(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;s.uniform3iv(this.addr,e),Vt(t,e)}}function mx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4iv(this.addr,e),Vt(t,e)}}function gx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function xx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;s.uniform2uiv(this.addr,e),Vt(t,e)}}function _x(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;s.uniform3uiv(this.addr,e),Vt(t,e)}}function vx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;s.uniform4uiv(this.addr,e),Vt(t,e)}}function yx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(mh.compareFunction=t.isReversedDepthBuffer()?ul:hl,r=mh):r=_f,t.setTexture2D(e||r,i)}function Mx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||yf,i)}function bx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Mf,i)}function Sx(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||vf,i)}function Tx(s){switch(s){case 5126:return rx;case 35664:return ax;case 35665:return ox;case 35666:return lx;case 35674:return cx;case 35675:return hx;case 35676:return ux;case 5124:case 35670:return dx;case 35667:case 35671:return fx;case 35668:case 35672:return px;case 35669:case 35673:return mx;case 5125:return gx;case 36294:return xx;case 36295:return _x;case 36296:return vx;case 35678:case 36198:case 36298:case 36306:case 35682:return yx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return bx;case 36289:case 36303:case 36311:case 36292:return Sx}}function wx(s,e){s.uniform1fv(this.addr,e)}function Ex(s,e){let t=mr(e,this.size,2);s.uniform2fv(this.addr,t)}function Ax(s,e){let t=mr(e,this.size,3);s.uniform3fv(this.addr,t)}function Rx(s,e){let t=mr(e,this.size,4);s.uniform4fv(this.addr,t)}function Cx(s,e){let t=mr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Px(s,e){let t=mr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Ix(s,e){let t=mr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Lx(s,e){s.uniform1iv(this.addr,e)}function Dx(s,e){s.uniform2iv(this.addr,e)}function Nx(s,e){s.uniform3iv(this.addr,e)}function Ux(s,e){s.uniform4iv(this.addr,e)}function Fx(s,e){s.uniform1uiv(this.addr,e)}function Ox(s,e){s.uniform2uiv(this.addr,e)}function Bx(s,e){s.uniform3uiv(this.addr,e)}function kx(s,e){s.uniform4uiv(this.addr,e)}function zx(s,e,t){let n=this.cache,i=e.length,r=xl(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=mh:a=_f;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function Hx(s,e,t){let n=this.cache,i=e.length,r=xl(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||yf,r[a])}function Vx(s,e,t){let n=this.cache,i=e.length,r=xl(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Mf,r[a])}function Gx(s,e,t){let n=this.cache,i=e.length,r=xl(t,i);Ht(n,r)||(s.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||vf,r[a])}function Wx(s){switch(s){case 5126:return wx;case 35664:return Ex;case 35665:return Ax;case 35666:return Rx;case 35674:return Cx;case 35675:return Px;case 35676:return Ix;case 5124:case 35670:return Lx;case 35667:case 35671:return Dx;case 35668:case 35672:return Nx;case 35669:case 35673:return Ux;case 5125:return Fx;case 36294:return Ox;case 36295:return Bx;case 36296:return kx;case 35678:case 36198:case 36298:case 36306:case 35682:return zx;case 35679:case 36299:case 36307:return Hx;case 35680:case 36300:case 36308:case 36293:return Vx;case 36289:case 36303:case 36311:case 36292:return Gx}}function sf(s,e){s.seq.push(e),s.map[e.id]=e}function Xx(s,e,t){let n=s.name,i=n.length;for(fh.lastIndex=0;;){let r=fh.exec(n),a=fh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){sf(t,l===void 0?new gh(o,s,e):new xh(o,s,e));break}else{let f=t.map[o];f===void 0&&(f=new _h(o),sf(t,f)),t=f}}}function rf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}function Zx(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Kx(s){Ye._getMatrix(af,Ye.workingColorSpace,s);let e=`mat3( ${af.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(s)){case Dr:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function of(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Zx(s.getShaderSource(e),o)}else return r}function $x(s,e){let t=Kx(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function jx(s,e){let t=Jx[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Qx(){Ye.getLuminanceCoefficients(fl);let s=fl.x.toFixed(4),e=fl.y.toFixed(4),t=fl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function e_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function t_(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function n_(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function ma(s){return s!==""}function lf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function vh(s){return s.replace(i_,r_)}function r_(s,e){let t=We[e];if(t===void 0){let n=s_.get(e);if(n!==void 0)t=We[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return vh(t)}function hf(s){return s.replace(a_,o_)}function o_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function uf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function c_(s){return l_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function u_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":h_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}function f_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":d_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}function m_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":p_[s.combine]||"ENVMAP_BLENDING_NONE"}function g_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function x_(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=c_(t),l=u_(t),h=f_(t),f=m_(t),u=g_(t),d=e_(t),m=t_(r),x=i.createProgram(),g,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ma).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ma).join(`
`),p.length>0&&(p+=`
`)):(g=[uf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),p=[uf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?We.tonemapping_pars_fragment:"",t.toneMapping!==An?jx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,$x("linearToOutputTexel",t.outputColorSpace),Qx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ma).join(`
`)),a=vh(a),a=lf(a,t),a=cf(a,t),o=vh(o),o=lf(o,t),o=cf(o,t),a=hf(a),o=hf(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let C=T+g+a,y=T+p+o,b=rf(i,i.VERTEX_SHADER,C),S=rf(i,i.FRAGMENT_SHADER,y);i.attachShader(x,b),i.attachShader(x,S),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function R(F){if(s.debug.checkShaderErrors){let U=i.getProgramInfoLog(x)||"",H=i.getShaderInfoLog(b)||"",I=i.getShaderInfoLog(S)||"",B=U.trim(),X=H.trim(),K=I.trim(),ie=!0,q=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(ie=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,b,S);else{let j=of(i,b,"vertex"),te=of(i,S,"fragment");ke("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+B+`
`+j+`
`+te)}else B!==""?Pe("WebGLProgram: Program Info Log:",B):(X===""||K==="")&&(q=!1);q&&(F.diagnostics={runnable:ie,programLog:B,vertexShader:{log:X,prefix:g},fragmentShader:{log:K,prefix:p}})}i.deleteShader(b),i.deleteShader(S),v=new fr(i,x),w=n_(i,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(x,qx)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=S,this}function v_(s){return s===ai||s===ha||s===ua}function y_(s,e,t,n,i,r){let a=new Fr,o=new yh,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer,u=n.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,w,P,F,U,H){let I=F.fog,B=U.geometry,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?F.environment:null,K=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||X,K),q=ie&&ie.mapping===ra?ie.image.height:null,j=d[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Pe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let te=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Re=te!==void 0?te.length:0,Se=0;B.morphAttributes.position!==void 0&&(Se=1),B.morphAttributes.normal!==void 0&&(Se=2),B.morphAttributes.color!==void 0&&(Se=3);let lt,je,tt,Y;if(j){let St=li[j];lt=St.vertexShader,je=St.fragmentShader}else{lt=v.vertexShader,je=v.fragmentShader;let St=o.getVertexShaderStage(v),ct=o.getFragmentShaderStage(v);o.update(v,St,ct),tt=St.id,Y=ct.id}let ee=s.getRenderTarget(),ye=s.state.buffers.depth.getReversed(),Fe=U.isInstancedMesh===!0,xe=U.isBatchedMesh===!0,Ve=!!v.map,Ct=!!v.matcap,Xe=!!ie,nt=!!v.aoMap,G=!!v.lightMap,se=!!v.bumpMap&&v.wireframe===!1,ve=!!v.normalMap,Ne=!!v.displacementMap,Qe=!!v.emissiveMap,Oe=!!v.metalnessMap,_t=!!v.roughnessMap,D=v.anisotropy>0,bt=v.clearcoat>0,it=v.dispersion>0,A=v.retroreflectivity>0,_=v.iridescence>0,O=v.sheen>0,V=v.transmission>0,Z=D&&!!v.anisotropyMap,re=bt&&!!v.clearcoatMap,oe=bt&&!!v.clearcoatNormalMap,$=bt&&!!v.clearcoatRoughnessMap,Q=_&&!!v.iridescenceMap,le=_&&!!v.iridescenceThicknessMap,Ie=O&&!!v.sheenColorMap,de=O&&!!v.sheenRoughnessMap,ce=!!v.specularMap,Le=!!v.specularColorMap,Ue=!!v.specularIntensityMap,Ge=V&&!!v.transmissionMap,N=V&&!!v.thicknessMap,he=!!v.gradientMap,J=!!v.alphaMap,ue=v.alphaTest>0,_e=!!v.alphaHash,ne=!!v.extensions,De=An;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(De=s.toneMapping);let Ae={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:lt,fragmentShader:je,defines:v.defines,customVertexShaderID:tt,customFragmentShaderID:Y,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:xe,batchingColor:xe&&U._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&U.instanceColor!==null,instancingMorph:Fe&&U.morphTexture!==null,outputColorSpace:ee===null?s.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ve,matcap:Ct,envMap:Xe,envMapMode:Xe&&ie.mapping,envMapCubeUVHeight:q,aoMap:nt,lightMap:G,bumpMap:se,normalMap:ve,displacementMap:Ne,emissiveMap:Qe,normalMapObjectSpace:ve&&v.normalMapType===Ld,normalMapTangentSpace:ve&&v.normalMapType===cl,packedNormalMap:ve&&v.normalMapType===cl&&v_(v.normalMap.format),metalnessMap:Oe,roughnessMap:_t,anisotropy:D,anisotropyMap:Z,clearcoat:bt,clearcoatMap:re,clearcoatNormalMap:oe,clearcoatRoughnessMap:$,dispersion:it,retroreflection:A,iridescence:_,iridescenceMap:Q,iridescenceThicknessMap:le,sheen:O,sheenColorMap:Ie,sheenRoughnessMap:de,specularMap:ce,specularColorMap:Le,specularIntensityMap:Ue,transmission:V,transmissionMap:Ge,thicknessMap:N,gradientMap:he,opaque:v.transparent===!1&&v.blending===sr&&v.alphaToCoverage===!1,alphaMap:J,alphaTest:ue,alphaHash:_e,combine:v.combine,mapUv:Ve&&m(v.map.channel),aoMapUv:nt&&m(v.aoMap.channel),lightMapUv:G&&m(v.lightMap.channel),bumpMapUv:se&&m(v.bumpMap.channel),normalMapUv:ve&&m(v.normalMap.channel),displacementMapUv:Ne&&m(v.displacementMap.channel),emissiveMapUv:Qe&&m(v.emissiveMap.channel),metalnessMapUv:Oe&&m(v.metalnessMap.channel),roughnessMapUv:_t&&m(v.roughnessMap.channel),anisotropyMapUv:Z&&m(v.anisotropyMap.channel),clearcoatMapUv:re&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:le&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:de&&m(v.sheenRoughnessMap.channel),specularMapUv:ce&&m(v.specularMap.channel),specularColorMapUv:Le&&m(v.specularColorMap.channel),specularIntensityMapUv:Ue&&m(v.specularIntensityMap.channel),transmissionMapUv:Ge&&m(v.transmissionMap.channel),thicknessMapUv:N&&m(v.thicknessMap.channel),alphaMapUv:J&&m(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ve||D),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(Ve||J),fog:!!I,useFog:v.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&ve===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ye,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:Se,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:De,decodeVideoTexture:Ve&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===ut,decodeVideoTextureEmissive:Qe&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===ut,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Qt,flipSided:v.side===jt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ne&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&v.extensions.multiDraw===!0||xe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function g(v){let w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(let P in v.defines)w.push(P),w.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(p(w,v),T(w,v),w.push(s.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function p(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numSunLights),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numSunLightShadows),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function T(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function C(v){let w=d[v.type],P;if(w){let F=li[w];P=Xd.clone(F.uniforms)}else P=v.uniforms;return P}function y(v,w){let P=h.get(w);return P!==void 0?++P.usedTimes:(P=new x_(s,w,v,i),l.push(P),h.set(w,P)),P}function b(v){if(--v.usedTimes===0){let w=l.indexOf(v);l[w]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function S(v){o.remove(v)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:C,acquireProgram:y,releaseProgram:b,releaseShaderCache:S,programs:l,dispose:R}}function M_(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function b_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function df(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ff(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,m,x,g,p){let T=s[e];return T===void 0?(T={id:u.id,object:u,geometry:d,material:m,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:p},s[e]=T):(T.id=u.id,T.object=u,T.geometry=d,T.material=m,T.materialVariant=a(u),T.groupOrder=x,T.renderOrder=u.renderOrder,T.z=g,T.group=p),e++,T}function c(u,d,m,x,g,p,T){T.reversedDepth===!0&&(g=-g);let C=o(u,d,m,x,g,p);m.transmission>0?n.push(C):m.transparent===!0?i.push(C):t.push(C)}function l(u,d,m,x,g,p){let T=o(u,d,m,x,g,p);m.transmission>0?n.unshift(T):m.transparent===!0?i.unshift(T):t.unshift(T)}function h(u,d){t.length>1&&t.sort(u||b_),n.length>1&&n.sort(d||df),i.length>1&&i.sort(d||df)}function f(){for(let u=e,d=s.length;u<d;u++){let m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:f,sort:h}}function S_(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new ff,s.set(n,[a])):i>=r.length?(a=new ff,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function T_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new E,color:new ae};break;case"SpotLight":t={position:new E,direction:new E,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":t={color:new ae,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function w_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}function A_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function R_(s){let e=new T_,t=w_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new E);let i=new E,r=new Be,a=new Be;function o(l){let h=0,f=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,T=0,C=0,y=0,b=0,S=0,R=0,v=0,w=0,P=0;l.sort(A_);for(let U=0,H=l.length;U<H;U++){let I=l[U],B=I.color,X=I.intensity,K=I.distance,ie=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ai?ie=I.shadow.map.texture:ie=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=B.r*X,f+=B.g*X,u+=B.b*X;else if(I.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(I.sh.coefficients[q],X);P++}else if(I.isSunLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,te=t.get(I);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[m]=te,n.sunShadowMap[m]=ie;let Re=j.getViewportCount();for(let Se=0;Se<Re;Se++)n.sunShadowMatrix[x+Se]=j.getMatrix(Se),n.sunShadowCascade[x+Se]=j._cascadeData[Se];x+=Re,m++}n.sun[d]=q,d++}else if(I.isDirectionalLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,te=t.get(I);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,n.directionalShadow[g]=te,n.directionalShadowMap[g]=ie,n.directionalShadowMatrix[g]=I.shadow.matrix,b++}n.directional[g]=q,g++}else if(I.isSpotLight){let q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(B).multiplyScalar(X),q.distance=K,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,n.spot[T]=q;let j=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,j.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[T]=j.matrix,I.castShadow){let te=t.get(I);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,n.spotShadow[T]=te,n.spotShadowMap[T]=ie,R++}T++}else if(I.isRectAreaLight){let q=e.get(I);q.color.copy(B).multiplyScalar(X),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),n.rectArea[C]=q,C++}else if(I.isPointLight){let q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){let j=I.shadow,te=t.get(I);te.shadowIntensity=j.intensity,te.shadowBias=j.bias,te.shadowNormalBias=j.normalBias,te.shadowRadius=j.radius,te.shadowMapSize=j.mapSize,te.shadowCameraNear=j.camera.near,te.shadowCameraFar=j.camera.far,n.pointShadow[p]=te,n.pointShadowMap[p]=ie,n.pointShadowMatrix[p]=I.shadow.matrix,S++}n.point[p]=q,p++}else if(I.isHemisphereLight){let q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(X),q.groundColor.copy(I.groundColor).multiplyScalar(X),n.hemi[y]=q,y++}}C>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;let F=n.hash;(F.sunLength!==d||F.directionalLength!==g||F.pointLength!==p||F.spotLength!==T||F.rectAreaLength!==C||F.hemiLength!==y||F.numSunShadows!==m||F.numDirectionalShadows!==b||F.numPointShadows!==S||F.numSpotShadows!==R||F.numSpotMaps!==v||F.numLightProbes!==P)&&(n.sun.length=d,n.directional.length=g,n.spot.length=T,n.rectArea.length=C,n.point.length=p,n.hemi.length=y,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+v-w,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,F.sunLength=d,F.directionalLength=g,F.pointLength=p,F.spotLength=T,F.rectAreaLength=C,F.hemiLength=y,F.numSunShadows=m,F.numDirectionalShadows=b,F.numPointShadows=S,F.numSpotShadows=R,F.numSpotMaps=v,F.numLightProbes=P,n.version=E_++)}function c(l,h){let f=0,u=0,d=0,m=0,x=0,g=0,p=h.matrixWorldInverse;for(let T=0,C=l.length;T<C;T++){let y=l[T];if(y.isSunLight){let b=n.sun[f];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),f++}else if(y.isDirectionalLight){let b=n.directional[u];b.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(p),u++}else if(y.isSpotLight){let b=n.spot[m];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(p),m++}else if(y.isRectAreaLight){let b=n.rectArea[x];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let b=n.point[d];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),d++}else if(y.isHemisphereLight){let b=n.hemi[g];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),g++}}}return{setup:o,setupView:c,state:n}}function pf(s){let e=new R_(s),t=[],n=[],i=[];function r(u){f.camera=u,t.length=0,n.length=0,i.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){i.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}let f={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function C_(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new pf(s),e.set(i,[o])):r>=a.length?(o=new pf(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function N_(s,e,t){let n=new $s,i=new ze,r=new ze,a=new Ze,o=new uo,c=new fo,l={},h=t.maxTextureSize,f={[ii]:jt,[jt]:ii,[Qt]:Qt},u=new xt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:P_,fragmentShader:I_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let m=new dt;m.setAttribute("position",new gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new at(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ia;let p=this.type;this.render=function(S,R,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===hd&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ia);let w=s.getRenderTarget(),P=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),U=s.state;U.setBlending(si),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let H=p!==this.type;H&&R.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(B=>B.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,B=S.length;I<B;I++){let X=S[I],K=X.shadow;if(K===void 0){Pe("WebGLShadowMap:",X,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;i.copy(K.mapSize);let ie=K.getFrameExtents();i.multiply(ie),r.copy(K.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ie.x),i.x=r.x*ie.x,K.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ie.y),i.y=r.y*ie.y,K.mapSize.y=r.y));let q=s.state.buffers.depth.getReversed();if(K.camera._reversedDepth=q,K.map===null||H===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===ir){if(X.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Pt(i.x,i.y,{format:ai,type:qt,minFilter:st,magFilter:st,generateMipmaps:!1}),K.map.texture.name=X.name+".shadowMap",K.map.depthTexture=new Jn(i.x,i.y,Cn),K.map.depthTexture.name=X.name+".shadowMapDepth",K.map.depthTexture.format=Kn,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Lt,K.map.depthTexture.magFilter=Lt}else X.isPointLight?(K.map=new pl(i.x),K.map.depthTexture=new co(i.x,Rn)):(K.map=new Pt(i.x,i.y),K.map.depthTexture=new Jn(i.x,i.y,Rn)),K.map.depthTexture.name=X.name+".shadowMap",K.map.depthTexture.format=Kn,this.type===ia?(K.map.depthTexture.compareFunction=q?ul:hl,K.map.depthTexture.minFilter=st,K.map.depthTexture.magFilter=st):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Lt,K.map.depthTexture.magFilter=Lt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==i.x||K.map.height!==i.y)&&K.map.setSize(i.x,i.y);let j=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();X.isPointLight!==!0&&K.updateMatrices(X,v);for(let te=0;te<j;te++){let Re=K.getCamera(te);if(X.isPointLight){let Se=K.camera,lt=K.matrix,je=X.distance||Se.far;je!==Se.far&&(Se.far=je,Se.updateProjectionMatrix()),pa.setFromMatrixPosition(X.matrixWorld),Se.position.copy(pa),ph.copy(Se.position),ph.add(L_[te]),Se.up.copy(D_[te]),Se.lookAt(ph),Se.updateMatrixWorld(),lt.makeTranslation(-pa.x,-pa.y,-pa.z),mf.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),K._frustum.setFromProjectionMatrix(mf,Se.coordinateSystem,Se.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)s.setRenderTarget(K.map,te),s.clear();else{te===0&&(s.setRenderTarget(K.map),s.clear());let Se=K.getViewport(te);a.set(r.x*Se.x,r.y*Se.y,r.x*Se.z,r.y*Se.w),U.viewport(a)}n=K.getFrustum(te),y(R,v,Re,X,this.type)}K.isPointLightShadow!==!0&&this.type===ir&&T(K,v),K.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(w,P,F)};function T(S,R){let v=e.update(x);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new Pt(i.x,i.y,{format:ai,type:qt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(R,null,v,u,x,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(R,null,v,d,x,null)}function C(S,R,v,w){let P=null,F=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(F!==void 0)P=F;else if(P=v.isPointLight===!0?c:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let U=P.uuid,H=R.uuid,I=l[U];I===void 0&&(I={},l[U]=I);let B=I[H];B===void 0&&(B=P.clone(),I[H]=B,R.addEventListener("dispose",b)),P=B}if(P.visible=R.visible,P.wireframe=R.wireframe,w===ir?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:f[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let U=s.properties.get(P);U.light=v}return P}function y(S,R,v,w,P){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===ir)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);let H=e.update(S),I=S.material;if(Array.isArray(I)){let B=H.groups;for(let X=0,K=B.length;X<K;X++){let ie=B[X],q=I[ie.materialIndex];if(q&&q.visible){let j=C(S,q,w,P);S.onBeforeShadow(s,S,R,v,H,j,ie),s.renderBufferDirect(v,null,H,j,S,ie),S.onAfterShadow(s,S,R,v,H,j,ie)}}}else if(I.visible){let B=C(S,I,w,P);S.onBeforeShadow(s,S,R,v,H,B,null),s.renderBufferDirect(v,null,H,B,S,null),S.onAfterShadow(s,S,R,v,H,B,null)}}let U=S.children;for(let H=0,I=U.length;H<I;H++)y(U[H],R,v,w,P)}function b(S){S.target.removeEventListener("dispose",b);for(let v in l){let w=l[v],P=S.target.uuid;P in w&&(w[P].dispose(),delete w[P])}}}function U_(s,e){function t(){let N=!1,he=new Ze,J=null,ue=new Ze(0,0,0,0);return{setMask:function(_e){J!==_e&&!N&&(s.colorMask(_e,_e,_e,_e),J=_e)},setLocked:function(_e){N=_e},setClear:function(_e,ne,De,Ae,St){St===!0&&(_e*=Ae,ne*=Ae,De*=Ae),he.set(_e,ne,De,Ae),ue.equals(he)===!1&&(s.clearColor(_e,ne,De,Ae),ue.copy(he))},reset:function(){N=!1,J=null,ue.set(-1,0,0,0)}}}function n(){let N=!1,he=!1,J=null,ue=null,_e=null;return{setReversed:function(ne){if(he!==ne){let De=e.get("EXT_clip_control");ne?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),he=ne;let Ae=_e;_e=null,this.setClear(Ae)}},getReversed:function(){return he},setTest:function(ne){ne?ee(s.DEPTH_TEST):ye(s.DEPTH_TEST)},setMask:function(ne){J!==ne&&!N&&(s.depthMask(ne),J=ne)},setFunc:function(ne){if(he&&(ne=Gd[ne]),ue!==ne){switch(ne){case ja:s.depthFunc(s.NEVER);break;case Qa:s.depthFunc(s.ALWAYS);break;case eo:s.depthFunc(s.LESS);break;case zi:s.depthFunc(s.LEQUAL);break;case to:s.depthFunc(s.EQUAL);break;case no:s.depthFunc(s.GEQUAL);break;case io:s.depthFunc(s.GREATER);break;case so:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ue=ne}},setLocked:function(ne){N=ne},setClear:function(ne){_e!==ne&&(_e=ne,he&&(ne=1-ne),s.clearDepth(ne))},reset:function(){N=!1,J=null,ue=null,_e=null,he=!1}}}function i(){let N=!1,he=null,J=null,ue=null,_e=null,ne=null,De=null,Ae=null,St=null;return{setTest:function(ct){N||(ct?ee(s.STENCIL_TEST):ye(s.STENCIL_TEST))},setMask:function(ct){he!==ct&&!N&&(s.stencilMask(ct),he=ct)},setFunc:function(ct,Nn,Xn){(J!==ct||ue!==Nn||_e!==Xn)&&(s.stencilFunc(ct,Nn,Xn),J=ct,ue=Nn,_e=Xn)},setOp:function(ct,Nn,Xn){(ne!==ct||De!==Nn||Ae!==Xn)&&(s.stencilOp(ct,Nn,Xn),ne=ct,De=Nn,Ae=Xn)},setLocked:function(ct){N=ct},setClear:function(ct){St!==ct&&(s.clearStencil(ct),St=ct)},reset:function(){N=!1,he=null,J=null,ue=null,_e=null,ne=null,De=null,Ae=null,St=null}}}let r=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap,h={},f={},u={},d=new WeakMap,m=[],x=null,g=!1,p=null,T=null,C=null,y=null,b=null,S=null,R=null,v=new ae(0,0,0),w=0,P=!1,F=null,U=null,H=null,I=null,B=null,X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,ie=0,q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),K=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),K=ie>=2);let j=null,te={},Re=s.getParameter(s.SCISSOR_BOX),Se=s.getParameter(s.VIEWPORT),lt=new Ze().fromArray(Re),je=new Ze().fromArray(Se);function tt(N,he,J,ue){let _e=new Uint8Array(4),ne=s.createTexture();s.bindTexture(N,ne),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let De=0;De<J;De++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(he,0,s.RGBA,1,1,ue,0,s.RGBA,s.UNSIGNED_BYTE,_e):s.texImage2D(he+De,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,_e);return ne}let Y={};Y[s.TEXTURE_2D]=tt(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(s.DEPTH_TEST),a.setFunc(zi),se(!1),ve(Ic),ee(s.CULL_FACE),nt(si);function ee(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function ye(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function Fe(N,he){return u[N]!==he?(s.bindFramebuffer(N,he),u[N]=he,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=he),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=he),!0):!1}function xe(N,he){let J=m,ue=!1;if(N){J=d.get(he),J===void 0&&(J=[],d.set(he,J));let _e=N.textures;if(J.length!==_e.length||J[0]!==s.COLOR_ATTACHMENT0){for(let ne=0,De=_e.length;ne<De;ne++)J[ne]=s.COLOR_ATTACHMENT0+ne;J.length=_e.length,ue=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,ue=!0);ue&&s.drawBuffers(J)}function Ve(N){return x!==N?(s.useProgram(N),x=N,!0):!1}let Ct={[Ti]:s.FUNC_ADD,[ud]:s.FUNC_SUBTRACT,[dd]:s.FUNC_REVERSE_SUBTRACT};Ct[fd]=s.MIN,Ct[pd]=s.MAX;let Xe={[md]:s.ZERO,[ri]:s.ONE,[gd]:s.SRC_COLOR,[sa]:s.SRC_ALPHA,[bd]:s.SRC_ALPHA_SATURATE,[yd]:s.DST_COLOR,[_d]:s.DST_ALPHA,[xd]:s.ONE_MINUS_SRC_COLOR,[rr]:s.ONE_MINUS_SRC_ALPHA,[Md]:s.ONE_MINUS_DST_COLOR,[vd]:s.ONE_MINUS_DST_ALPHA,[Sd]:s.CONSTANT_COLOR,[Td]:s.ONE_MINUS_CONSTANT_COLOR,[wd]:s.CONSTANT_ALPHA,[Ed]:s.ONE_MINUS_CONSTANT_ALPHA};function nt(N,he,J,ue,_e,ne,De,Ae,St,ct){if(N===si){g===!0&&(ye(s.BLEND),g=!1);return}if(g===!1&&(ee(s.BLEND),g=!0),N!==Gi){if(N!==p||ct!==P){if((T!==Ti||b!==Ti)&&(s.blendEquation(s.FUNC_ADD),T=Ti,b=Ti),ct)switch(N){case sr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Vn:s.blendFunc(s.ONE,s.ONE);break;case Lc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:ke("WebGLState: Invalid blending: ",N);break}else switch(N){case sr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Vn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Lc:ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dc:ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ke("WebGLState: Invalid blending: ",N);break}C=null,y=null,S=null,R=null,v.set(0,0,0),w=0,p=N,P=ct}return}_e=_e||he,ne=ne||J,De=De||ue,(he!==T||_e!==b)&&(s.blendEquationSeparate(Ct[he],Ct[_e]),T=he,b=_e),(J!==C||ue!==y||ne!==S||De!==R)&&(s.blendFuncSeparate(Xe[J],Xe[ue],Xe[ne],Xe[De]),C=J,y=ue,S=ne,R=De),(Ae.equals(v)===!1||St!==w)&&(s.blendColor(Ae.r,Ae.g,Ae.b,St),v.copy(Ae),w=St),p=N,P=!1}function G(N,he){N.side===Qt?ye(s.CULL_FACE):ee(s.CULL_FACE);let J=N.side===jt;he&&(J=!J),se(J),N.blending===sr&&N.transparent===!1?nt(si):nt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let ue=N.stencilWrite;o.setTest(ue),ue&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Qe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ee(s.SAMPLE_ALPHA_TO_COVERAGE):ye(s.SAMPLE_ALPHA_TO_COVERAGE)}function se(N){F!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),F=N)}function ve(N){N!==ld?(ee(s.CULL_FACE),N!==U&&(N===Ic?s.cullFace(s.BACK):N===cd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ye(s.CULL_FACE),U=N}function Ne(N){N!==H&&(K&&s.lineWidth(N),H=N)}function Qe(N,he,J){N?(ee(s.POLYGON_OFFSET_FILL),(I!==he||B!==J)&&(I=he,B=J,a.getReversed()&&(he=-he),s.polygonOffset(he,J))):ye(s.POLYGON_OFFSET_FILL)}function Oe(N){N?ee(s.SCISSOR_TEST):ye(s.SCISSOR_TEST)}function _t(N){N===void 0&&(N=s.TEXTURE0+X-1),j!==N&&(s.activeTexture(N),j=N)}function D(N,he,J){J===void 0&&(j===null?J=s.TEXTURE0+X-1:J=j);let ue=te[J];ue===void 0&&(ue={type:void 0,texture:void 0},te[J]=ue),(ue.type!==N||ue.texture!==he)&&(j!==J&&(s.activeTexture(J),j=J),s.bindTexture(N,he||Y[N]),ue.type=N,ue.texture=he)}function bt(){let N=te[j];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function it(){try{s.compressedTexImage2D(...arguments)}catch(N){ke("WebGLState:",N)}}function A(){try{s.compressedTexImage3D(...arguments)}catch(N){ke("WebGLState:",N)}}function _(){try{s.texSubImage2D(...arguments)}catch(N){ke("WebGLState:",N)}}function O(){try{s.texSubImage3D(...arguments)}catch(N){ke("WebGLState:",N)}}function V(){try{s.compressedTexSubImage2D(...arguments)}catch(N){ke("WebGLState:",N)}}function Z(){try{s.compressedTexSubImage3D(...arguments)}catch(N){ke("WebGLState:",N)}}function re(){try{s.texStorage2D(...arguments)}catch(N){ke("WebGLState:",N)}}function oe(){try{s.texStorage3D(...arguments)}catch(N){ke("WebGLState:",N)}}function $(){try{s.texImage2D(...arguments)}catch(N){ke("WebGLState:",N)}}function Q(){try{s.texImage3D(...arguments)}catch(N){ke("WebGLState:",N)}}function le(N){return f[N]!==void 0?f[N]:s.getParameter(N)}function Ie(N,he){f[N]!==he&&(s.pixelStorei(N,he),f[N]=he)}function de(N){lt.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),lt.copy(N))}function ce(N){je.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),je.copy(N))}function Le(N,he){let J=l.get(he);J===void 0&&(J=new WeakMap,l.set(he,J));let ue=J.get(N);ue===void 0&&(ue=s.getUniformBlockIndex(he,N.name),J.set(N,ue))}function Ue(N,he){let ue=l.get(he).get(N);c.get(he)!==ue&&(s.uniformBlockBinding(he,ue,N.__bindingPointIndex),c.set(he,ue))}function Ge(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},j=null,te={},u={},d=new WeakMap,m=[],x=null,g=!1,p=null,T=null,C=null,y=null,b=null,S=null,R=null,v=new ae(0,0,0),w=0,P=!1,F=null,U=null,H=null,I=null,B=null,lt.set(0,0,s.canvas.width,s.canvas.height),je.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:ye,bindFramebuffer:Fe,drawBuffers:xe,useProgram:Ve,setBlending:nt,setMaterial:G,setFlipSided:se,setCullFace:ve,setLineWidth:Ne,setPolygonOffset:Qe,setScissorTest:Oe,activeTexture:_t,bindTexture:D,unbindTexture:bt,compressedTexImage2D:it,compressedTexImage3D:A,texImage2D:$,texImage3D:Q,pixelStorei:Ie,getParameter:le,updateUBOMapping:Le,uniformBlockBinding:Ue,texStorage2D:re,texStorage3D:oe,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:de,viewport:ce,reset:Ge}}function F_(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap,f=new Set,u,d=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,_){return m?new OffscreenCanvas(A,_):Vs("canvas")}function g(A,_,O){let V=1,Z=it(A);if((Z.width>O||Z.height>O)&&(V=O/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let re=Math.floor(V*Z.width),oe=Math.floor(V*Z.height);u===void 0&&(u=x(re,oe));let $=_?x(re,oe):u;return $.width=re,$.height=oe,$.getContext("2d").drawImage(A,0,0,re,oe),Pe("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+re+"x"+oe+")."),$}else return"data"in A&&Pe("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function p(A){return A.generateMipmaps}function T(A){s.generateMipmap(A)}function C(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(A,_,O,V,Z,re=!1){if(A!==null){if(s[A]!==void 0)return s[A];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let oe;V&&(oe=e.get("EXT_texture_norm16"),oe||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===s.RED&&(O===s.FLOAT&&($=s.R32F),O===s.HALF_FLOAT&&($=s.R16F),O===s.UNSIGNED_BYTE&&($=s.R8),O===s.UNSIGNED_SHORT&&oe&&($=oe.R16_EXT),O===s.SHORT&&oe&&($=oe.R16_SNORM_EXT)),_===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.R8UI),O===s.UNSIGNED_SHORT&&($=s.R16UI),O===s.UNSIGNED_INT&&($=s.R32UI),O===s.BYTE&&($=s.R8I),O===s.SHORT&&($=s.R16I),O===s.INT&&($=s.R32I)),_===s.RG&&(O===s.FLOAT&&($=s.RG32F),O===s.HALF_FLOAT&&($=s.RG16F),O===s.UNSIGNED_BYTE&&($=s.RG8),O===s.UNSIGNED_SHORT&&oe&&($=oe.RG16_EXT),O===s.SHORT&&oe&&($=oe.RG16_SNORM_EXT)),_===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RG8UI),O===s.UNSIGNED_SHORT&&($=s.RG16UI),O===s.UNSIGNED_INT&&($=s.RG32UI),O===s.BYTE&&($=s.RG8I),O===s.SHORT&&($=s.RG16I),O===s.INT&&($=s.RG32I)),_===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RGB8UI),O===s.UNSIGNED_SHORT&&($=s.RGB16UI),O===s.UNSIGNED_INT&&($=s.RGB32UI),O===s.BYTE&&($=s.RGB8I),O===s.SHORT&&($=s.RGB16I),O===s.INT&&($=s.RGB32I)),_===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&($=s.RGBA8UI),O===s.UNSIGNED_SHORT&&($=s.RGBA16UI),O===s.UNSIGNED_INT&&($=s.RGBA32UI),O===s.BYTE&&($=s.RGBA8I),O===s.SHORT&&($=s.RGBA16I),O===s.INT&&($=s.RGBA32I)),_===s.RGB&&(O===s.UNSIGNED_SHORT&&oe&&($=oe.RGB16_EXT),O===s.SHORT&&oe&&($=oe.RGB16_SNORM_EXT),O===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&($=s.R11F_G11F_B10F)),_===s.RGBA){let Q=re?Dr:Ye.getTransfer(Z);O===s.FLOAT&&($=s.RGBA32F),O===s.HALF_FLOAT&&($=s.RGBA16F),O===s.UNSIGNED_BYTE&&($=Q===ut?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT&&oe&&($=oe.RGBA16_EXT),O===s.SHORT&&oe&&($=oe.RGBA16_SNORM_EXT),O===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function b(A,_){let O;return A?_===null||_===Rn||_===cr?O=s.DEPTH24_STENCIL8:_===Cn?O=s.DEPTH32F_STENCIL8:_===lr&&(O=s.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Rn||_===cr?O=s.DEPTH_COMPONENT24:_===Cn?O=s.DEPTH_COMPONENT32F:_===lr&&(O=s.DEPTH_COMPONENT16),O}function S(A,_){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Lt&&A.minFilter!==st?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function R(A){let _=A.target;_.removeEventListener("dispose",R),w(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&f.delete(_)}function v(A){let _=A.target;_.removeEventListener("dispose",v),F(_)}function w(A){let _=n.get(A);if(_.__webglInit===void 0)return;let O=A.source,V=d.get(O);if(V){let Z=V[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&P(A),Object.keys(V).length===0&&d.delete(O)}n.remove(A)}function P(A){let _=n.get(A);s.deleteTexture(_.__webglTexture);let O=A.source,V=d.get(O);delete V[_.__cacheKey],a.memory.textures--}function F(A){let _=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let Z=0;Z<_.__webglFramebuffer[V].length;Z++)s.deleteFramebuffer(_.__webglFramebuffer[V][Z]);else s.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)s.deleteFramebuffer(_.__webglFramebuffer[V]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let O=A.textures;for(let V=0,Z=O.length;V<Z;V++){let re=n.get(O[V]);re.__webglTexture&&(s.deleteTexture(re.__webglTexture),a.memory.textures--),n.remove(O[V])}n.remove(A)}let U=0;function H(){U=0}function I(){return U}function B(A){U=A}function X(){let A=U;return A>=i.maxTextures&&Pe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+i.maxTextures),U+=1,A}function K(A){let _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function ie(A,_){let O=n.get(A);if(A.isVideoTexture&&D(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){let V=A.image;if(V===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(O,A,_);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+_)}function q(A,_){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ye(O,A,_);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+_)}function j(A,_){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ye(O,A,_);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+_)}function te(A,_){let O=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Fe(O,A,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+_)}let Re={[$t]:s.REPEAT,[fn]:s.CLAMP_TO_EDGE,[zs]:s.MIRRORED_REPEAT},Se={[Lt]:s.NEAREST,[wo]:s.NEAREST_MIPMAP_NEAREST,[fs]:s.NEAREST_MIPMAP_LINEAR,[st]:s.LINEAR,[or]:s.LINEAR_MIPMAP_NEAREST,[Bt]:s.LINEAR_MIPMAP_LINEAR},lt={[Nd]:s.NEVER,[kd]:s.ALWAYS,[Ud]:s.LESS,[hl]:s.LEQUAL,[Fd]:s.EQUAL,[ul]:s.GEQUAL,[Od]:s.GREATER,[Bd]:s.NOTEQUAL};function je(A,_){if(_.type===Cn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===st||_.magFilter===or||_.magFilter===fs||_.magFilter===Bt||_.minFilter===st||_.minFilter===or||_.minFilter===fs||_.minFilter===Bt)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,Re[_.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,Re[_.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,Re[_.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,Se[_.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,Se[_.minFilter]),_.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,lt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Lt||_.minFilter!==fs&&_.minFilter!==Bt||_.type===Cn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function tt(A,_){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",R));let V=_.source,Z=d.get(V);Z===void 0&&(Z={},d.set(V,Z));let re=K(_);if(re!==A.__cacheKey){Z[re]===void 0&&(Z[re]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Z[re].usedTimes++;let oe=Z[A.__cacheKey];oe!==void 0&&(Z[A.__cacheKey].usedTimes--,oe.usedTimes===0&&P(_)),A.__cacheKey=re,A.__webglTexture=Z[re].texture}return O}function Y(A,_,O){return Math.floor(Math.floor(A/O)/_)}function ee(A,_,O,V){let re=A.updateRanges;if(re.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,O,V,_.data);else{re.sort((Ie,de)=>Ie.start-de.start);let oe=0;for(let Ie=1;Ie<re.length;Ie++){let de=re[oe],ce=re[Ie],Le=de.start+de.count,Ue=Y(ce.start,_.width,4),Ge=Y(de.start,_.width,4);ce.start<=Le+1&&Ue===Ge&&Y(ce.start+ce.count-1,_.width,4)===Ue?de.count=Math.max(de.count,ce.start+ce.count-de.start):(++oe,re[oe]=ce)}re.length=oe+1;let $=t.getParameter(s.UNPACK_ROW_LENGTH),Q=t.getParameter(s.UNPACK_SKIP_PIXELS),le=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Ie=0,de=re.length;Ie<de;Ie++){let ce=re[Ie],Le=Math.floor(ce.start/4),Ue=Math.ceil(ce.count/4),Ge=Le%_.width,N=Math.floor(Le/_.width),he=Ue,J=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(s.UNPACK_SKIP_ROWS,N),t.texSubImage2D(s.TEXTURE_2D,0,Ge,N,he,J,O,V,_.data)}A.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,$),t.pixelStorei(s.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(s.UNPACK_SKIP_ROWS,le)}}function ye(A,_,O){let V=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=s.TEXTURE_3D);let Z=tt(A,_),re=_.source;t.bindTexture(V,A.__webglTexture,s.TEXTURE0+O);let oe=n.get(re);if(re.version!==oe.__version||Z===!0){if(t.activeTexture(s.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let J=Ye.getPrimaries(Ye.workingColorSpace),ue=_.colorSpace===en?null:Ye.getPrimaries(_.colorSpace),_e=_.colorSpace===en||J===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=g(_.image,!1,i.maxTextureSize);Q=bt(_,Q);let le=r.convert(_.format,_.colorSpace),Ie=r.convert(_.type),de=y(_.internalFormat,le,Ie,_.normalized,_.colorSpace,_.isVideoTexture);je(V,_);let ce,Le=_.mipmaps,Ue=_.isVideoTexture!==!0,Ge=oe.__version===void 0||Z===!0,N=re.dataReady,he=S(_,Q);if(_.isDepthTexture)de=b(_.format===Xi,_.type),Ge&&(Ue?t.texStorage2D(s.TEXTURE_2D,1,de,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,de,Q.width,Q.height,0,le,Ie,null));else if(_.isDataTexture)if(Le.length>0){Ue&&Ge&&t.texStorage2D(s.TEXTURE_2D,he,de,Le[0].width,Le[0].height);for(let J=0,ue=Le.length;J<ue;J++)ce=Le[J],Ue?N&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,ce.width,ce.height,le,Ie,ce.data):t.texImage2D(s.TEXTURE_2D,J,de,ce.width,ce.height,0,le,Ie,ce.data);_.generateMipmaps=!1}else Ue?(Ge&&t.texStorage2D(s.TEXTURE_2D,he,de,Q.width,Q.height),N&&ee(_,Q,le,Ie)):t.texImage2D(s.TEXTURE_2D,0,de,Q.width,Q.height,0,le,Ie,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ue&&Ge&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,de,Le[0].width,Le[0].height,Q.depth);for(let J=0,ue=Le.length;J<ue;J++)if(ce=Le[J],_.format!==kt)if(le!==null)if(Ue){if(N)if(_.layerUpdates.size>0){let _e=nh(ce.width,ce.height,_.format,_.type);for(let ne of _.layerUpdates){let De=ce.data.subarray(ne*_e/ce.data.BYTES_PER_ELEMENT,(ne+1)*_e/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,ne,ce.width,ce.height,1,le,De)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ce.width,ce.height,Q.depth,le,ce.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,de,ce.width,ce.height,Q.depth,0,ce.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?N&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,ce.width,ce.height,Q.depth,le,Ie,ce.data):t.texImage3D(s.TEXTURE_2D_ARRAY,J,de,ce.width,ce.height,Q.depth,0,le,Ie,ce.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ue&&Ge&&t.texStorage2D(s.TEXTURE_2D,he,de,Le[0].width,Le[0].height);for(let J=0,ue=Le.length;J<ue;J++)ce=Le[J],_.format!==kt?le!==null?Ue?N&&t.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(s.TEXTURE_2D,J,de,ce.width,ce.height,0,ce.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?N&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,ce.width,ce.height,le,Ie,ce.data):t.texImage2D(s.TEXTURE_2D,J,de,ce.width,ce.height,0,le,Ie,ce.data)}else if(_.isDataArrayTexture)if(Ue){if(Ge&&t.texStorage3D(s.TEXTURE_2D_ARRAY,he,de,Q.width,Q.height,Q.depth),N)if(_.layerUpdates.size>0){let J=nh(Q.width,Q.height,_.format,_.type);for(let ue of _.layerUpdates){let _e=Q.data.subarray(ue*J/Q.data.BYTES_PER_ELEMENT,(ue+1)*J/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ue,Q.width,Q.height,1,le,Ie,_e)}_.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,Ie,Q.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,de,Q.width,Q.height,Q.depth,0,le,Ie,Q.data);else if(_.isData3DTexture)Ue?(Ge&&t.texStorage3D(s.TEXTURE_3D,he,de,Q.width,Q.height,Q.depth),N&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,Ie,Q.data)):t.texImage3D(s.TEXTURE_3D,0,de,Q.width,Q.height,Q.depth,0,le,Ie,Q.data);else if(_.isFramebufferTexture){if(Ge)if(Ue)t.texStorage2D(s.TEXTURE_2D,he,de,Q.width,Q.height);else{let J=Q.width,ue=Q.height;for(let _e=0;_e<he;_e++)t.texImage2D(s.TEXTURE_2D,_e,de,J,ue,0,le,Ie,null),J>>=1,ue>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in s){let J=s.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),f.add(_),J.onpaint=ue=>{let _e=ue.changedElements;for(let ne of f)_e.includes(ne.image)&&(ne.needsUpdate=!0)},J.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Q);else{let _e=s.RGBA,ne=s.RGBA,De=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,_e,ne,De,Q)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ue&&Ge){let J=it(Le[0]);t.texStorage2D(s.TEXTURE_2D,he,de,J.width,J.height)}for(let J=0,ue=Le.length;J<ue;J++)ce=Le[J],Ue?N&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,le,Ie,ce):t.texImage2D(s.TEXTURE_2D,J,de,le,Ie,ce);_.generateMipmaps=!1}else if(Ue){if(Ge){let J=it(Q);t.texStorage2D(s.TEXTURE_2D,he,de,J.width,J.height)}N&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,le,Ie,Q)}else t.texImage2D(s.TEXTURE_2D,0,de,le,Ie,Q);p(_)&&T(V),oe.__version=re.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Fe(A,_,O){if(_.image.length!==6)return;let V=tt(A,_),Z=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+O);let re=n.get(Z);if(Z.version!==re.__version||V===!0){t.activeTexture(s.TEXTURE0+O);let oe=Ye.getPrimaries(Ye.workingColorSpace),$=_.colorSpace===en?null:Ye.getPrimaries(_.colorSpace),Q=_.colorSpace===en||oe===$?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let le=_.isCompressedTexture||_.image[0].isCompressedTexture,Ie=_.image[0]&&_.image[0].isDataTexture,de=[];for(let ne=0;ne<6;ne++)!le&&!Ie?de[ne]=g(_.image[ne],!0,i.maxCubemapSize):de[ne]=Ie?_.image[ne].image:_.image[ne],de[ne]=bt(_,de[ne]);let ce=de[0],Le=r.convert(_.format,_.colorSpace),Ue=r.convert(_.type),Ge=y(_.internalFormat,Le,Ue,_.normalized,_.colorSpace),N=_.isVideoTexture!==!0,he=re.__version===void 0||V===!0,J=Z.dataReady,ue=S(_,ce);je(s.TEXTURE_CUBE_MAP,_);let _e;if(le){N&&he&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,Ge,ce.width,ce.height);for(let ne=0;ne<6;ne++){_e=de[ne].mipmaps;for(let De=0;De<_e.length;De++){let Ae=_e[De];_.format!==kt?Le!==null?N?J&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,0,0,Ae.width,Ae.height,Le,Ae.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,Ge,Ae.width,Ae.height,0,Ae.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?J&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,0,0,Ae.width,Ae.height,Le,Ue,Ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,Ge,Ae.width,Ae.height,0,Le,Ue,Ae.data)}}}else{if(_e=_.mipmaps,N&&he){_e.length>0&&ue++;let ne=it(de[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,Ge,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Ie){N?J&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,de[ne].width,de[ne].height,Le,Ue,de[ne].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ge,de[ne].width,de[ne].height,0,Le,Ue,de[ne].data);for(let De=0;De<_e.length;De++){let St=_e[De].image[ne].image;N?J&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,0,0,St.width,St.height,Le,Ue,St.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,Ge,St.width,St.height,0,Le,Ue,St.data)}}else{N?J&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Le,Ue,de[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ge,Le,Ue,de[ne]);for(let De=0;De<_e.length;De++){let Ae=_e[De];N?J&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,0,0,Le,Ue,Ae.image[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,Ge,Le,Ue,Ae.image[ne])}}}p(_)&&T(s.TEXTURE_CUBE_MAP),re.__version=Z.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function xe(A,_,O,V,Z,re){let oe=r.convert(O.format,O.colorSpace),$=r.convert(O.type),Q=y(O.internalFormat,oe,$,O.normalized,O.colorSpace),le=n.get(_),Ie=n.get(O);if(Ie.__renderTarget=_,!le.__hasExternalTextures){let de=Math.max(1,_.width>>re),ce=Math.max(1,_.height>>re);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?t.texImage3D(Z,re,Q,de,ce,_.depth,0,oe,$,null):t.texImage2D(Z,re,Q,de,ce,0,oe,$,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),_t(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,Z,Ie.__webglTexture,0,Oe(_)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,Z,Ie.__webglTexture,re),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ve(A,_,O){if(s.bindRenderbuffer(s.RENDERBUFFER,A),_.depthBuffer){let V=_.depthTexture,Z=V&&V.isDepthTexture?V.type:null,re=b(_.stencilBuffer,Z),oe=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;_t(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Oe(_),re,_.width,_.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,Oe(_),re,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,re,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,oe,s.RENDERBUFFER,A)}else{let V=_.textures;for(let Z=0;Z<V.length;Z++){let re=V[Z],oe=r.convert(re.format,re.colorSpace),$=r.convert(re.type),Q=y(re.internalFormat,oe,$,re.normalized,re.colorSpace);_t(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Oe(_),Q,_.width,_.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,Oe(_),Q,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,Q,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ct(A,_,O){let V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=n.get(_.depthTexture);if(Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),Z.__webglTexture===void 0){Z.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),je(s.TEXTURE_CUBE_MAP,_.depthTexture);let le=r.convert(_.depthTexture.format),Ie=r.convert(_.depthTexture.type),de;_.depthTexture.format===Kn?de=s.DEPTH_COMPONENT24:_.depthTexture.format===Xi&&(de=s.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,de,_.width,_.height,0,le,Ie,null)}}else ie(_.depthTexture,0);let re=Z.__webglTexture,oe=Oe(_),$=V?s.TEXTURE_CUBE_MAP_POSITIVE_X+O:s.TEXTURE_2D,Q=_.depthTexture.format===Xi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===Kn)_t(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,$,re,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,Q,$,re,0);else if(_.depthTexture.format===Xi)_t(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,$,re,0,oe):s.framebufferTexture2D(s.FRAMEBUFFER,Q,$,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Xe(A){let _=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){let V=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){let Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=V}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)Ct(_.__webglFramebuffer[V],A,V);else{let V=A.texture.mipmaps;V&&V.length>0?Ct(_.__webglFramebuffer[0],A,0):Ct(_.__webglFramebuffer,A,0)}else if(O){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=s.createRenderbuffer(),Ve(_.__webglDepthbuffer[V],A,!1);else{let Z=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=_.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,re)}}else{let V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Ve(_.__webglDepthbuffer,A,!1);else{let Z=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,re)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function nt(A,_,O){let V=n.get(A);_!==void 0&&xe(V.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Xe(A)}function G(A){let _=A.texture,O=n.get(A),V=n.get(_);A.addEventListener("dispose",v);let Z=A.textures,re=A.isWebGLCubeRenderTarget===!0,oe=Z.length>1;if(oe||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=_.version,a.memory.textures++),re){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let Q=0;Q<_.mipmaps.length;Q++)O.__webglFramebuffer[$][Q]=s.createFramebuffer()}else O.__webglFramebuffer[$]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)O.__webglFramebuffer[$]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(oe)for(let $=0,Q=Z.length;$<Q;$++){let le=n.get(Z[$]);le.__webglTexture===void 0&&(le.__webglTexture=s.createTexture(),a.memory.textures++)}if(A.samples>0&&_t(A)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<Z.length;$++){let Q=Z[$];O.__webglColorRenderbuffer[$]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[$]);let le=r.convert(Q.format,Q.colorSpace),Ie=r.convert(Q.type),de=y(Q.internalFormat,le,Ie,Q.normalized,Q.colorSpace,A.isXRRenderTarget===!0),ce=Oe(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,de,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+$,s.RENDERBUFFER,O.__webglColorRenderbuffer[$])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),Ve(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(re){t.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),je(s.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)xe(O.__webglFramebuffer[$][Q],A,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Q);else xe(O.__webglFramebuffer[$],A,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);p(_)&&T(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let $=0,Q=Z.length;$<Q;$++){let le=Z[$],Ie=n.get(le),de=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(de,Ie.__webglTexture),je(de,le),xe(O.__webglFramebuffer,A,le,s.COLOR_ATTACHMENT0+$,de,0),p(le)&&T(de)}t.unbindTexture()}else{let $=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture($,V.__webglTexture),je($,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)xe(O.__webglFramebuffer[Q],A,_,s.COLOR_ATTACHMENT0,$,Q);else xe(O.__webglFramebuffer,A,_,s.COLOR_ATTACHMENT0,$,0);p(_)&&T($),t.unbindTexture()}A.depthBuffer&&Xe(A)}function se(A){let _=A.textures;for(let O=0,V=_.length;O<V;O++){let Z=_[O];if(p(Z)){let re=C(A),oe=n.get(Z).__webglTexture;t.bindTexture(re,oe),T(re),t.unbindTexture()}}}let ve=[],Ne=[];function Qe(A){if(A.samples>0){if(_t(A)===!1){let _=A.textures,O=A.width,V=A.height,Z=s.COLOR_BUFFER_BIT,re=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=n.get(A),$=_.length>1;if($)for(let le=0;le<_.length;le++)t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);let Q=A.texture.mipmaps;Q&&Q.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let le=0;le<_.length;le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),$){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);let Ie=n.get(_[le]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ie,0)}s.blitFramebuffer(0,0,O,V,0,0,O,V,Z,s.NEAREST),c===!0&&(ve.length=0,Ne.length=0,ve.push(s.COLOR_ATTACHMENT0+le),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(ve.push(re),Ne.push(re),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ne)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ve))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),$)for(let le=0;le<_.length;le++){t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);let Ie=n.get(_[le]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.TEXTURE_2D,Ie,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let _=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function Oe(A){return Math.min(i.maxSamples,A.samples)}function _t(A){let _=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(A){let _=a.render.frame;h.get(A)!==_&&(h.set(A,_),A.update())}function bt(A,_){let O=A.colorSpace,V=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==At&&O!==en&&(Ye.getTransfer(O)===ut?(V!==kt||Z!==rn)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ke("WebGLTextures: Unsupported texture color space:",O)),_}function it(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=H,this.getTextureUnits=I,this.setTextureUnits=B,this.setTexture2D=ie,this.setTexture2DArray=q,this.setTexture3D=j,this.setTextureCube=te,this.rebindTextures=nt,this.setupRenderTarget=G,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function O_(s,e){function t(n,i=en){let r,a=Ye.getTransfer(i);if(n===rn)return s.UNSIGNED_BYTE;if(n===Ao)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ro)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Xc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===qc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gc)return s.BYTE;if(n===Wc)return s.SHORT;if(n===lr)return s.UNSIGNED_SHORT;if(n===Eo)return s.INT;if(n===Rn)return s.UNSIGNED_INT;if(n===Cn)return s.FLOAT;if(n===qt)return s.HALF_FLOAT;if(n===Yc)return s.ALPHA;if(n===Zc)return s.RGB;if(n===kt)return s.RGBA;if(n===Kn)return s.DEPTH_COMPONENT;if(n===Xi)return s.DEPTH_STENCIL;if(n===Co)return s.RED;if(n===Po)return s.RED_INTEGER;if(n===ai)return s.RG;if(n===Io)return s.RG_INTEGER;if(n===Lo)return s.RGBA_INTEGER;if(n===aa||n===oa||n===la||n===ca)if(a===ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===aa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===aa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Do||n===No||n===Uo||n===Fo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Do)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===No)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===ha||n===Vo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oo||n===Bo)return a===ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ko)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===zo)return r.COMPRESSED_R11_EAC;if(n===Ho)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ha)return r.COMPRESSED_RG11_EAC;if(n===Vo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Go||n===Wo||n===Xo||n===qo||n===Yo||n===Zo||n===Ko||n===$o||n===Jo||n===jo||n===Qo||n===el||n===tl||n===nl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Go)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Zo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ko)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$o)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Jo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===jo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qo)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===el)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===tl)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===nl)return a===ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===il||n===sl||n===rl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===il)return a===ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===al||n===ol||n===ua||n===ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===al)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}function H_(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Qc(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,T,C,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),f(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&d(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,T,C):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===jt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===jt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let T=e.get(p),C=T.envMap,y=T.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(z_.makeRotationFromEuler(y)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(bf),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,T,C){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*T,g.scale.value=C*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,T){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let T=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function V_(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,b){let S=b.program;n.uniformBlockBinding(y,S)}function l(y,b){let S=i[y.id];S===void 0&&(g(y),S=h(y),i[y.id]=S,y.addEventListener("dispose",T));let R=b.program;n.updateUBOMapping(y,R);let v=e.render.frame;r[y.id]!==v&&(u(y),r[y.id]=v)}function h(y){let b=f();y.__bindingPointIndex=b;let S=s.createBuffer(),R=y.__size,v=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,R,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,S),S}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let b=i[y.id],S=y.uniforms,R=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let v=0,w=S.length;v<w;v++){let P=S[v];if(Array.isArray(P))for(let F=0,U=P.length;F<U;F++)d(P[F],v,F,R);else d(P,v,0,R)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(y,b,S,R){if(x(y,b,S,R)===!0){let v=y.__offset,w=y.value;if(Array.isArray(w)){let P=0;for(let F=0;F<w.length;F++){let U=w[F],H=p(U);m(U,y.__data,P),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(P+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,y.__data)}}function m(y,b,S){typeof y=="number"||typeof y=="boolean"?b[0]=y:y.isMatrix3?(b[0]=y.elements[0],b[1]=y.elements[1],b[2]=y.elements[2],b[3]=0,b[4]=y.elements[3],b[5]=y.elements[4],b[6]=y.elements[5],b[7]=0,b[8]=y.elements[6],b[9]=y.elements[7],b[10]=y.elements[8],b[11]=0):ArrayBuffer.isView(y)?b.set(new y.constructor(y.buffer,y.byteOffset,b.length)):y.toArray(b,S)}function x(y,b,S,R){let v=y.value,w=b+"_"+S;if(R[w]===void 0)return typeof v=="number"||typeof v=="boolean"?R[w]=v:ArrayBuffer.isView(v)?R[w]=v.slice():R[w]=v.clone(),!0;{let P=R[w];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function g(y){let b=y.uniforms,S=0,R=16;for(let w=0,P=b.length;w<P;w++){let F=Array.isArray(b[w])?b[w]:[b[w]];for(let U=0,H=F.length;U<H;U++){let I=F[U],B=Array.isArray(I.value)?I.value:[I.value];for(let X=0,K=B.length;X<K;X++){let ie=B[X],q=p(ie),j=S%R,te=j%q.boundary,Re=j+te;S+=te,Re!==0&&R-Re<q.storage&&(S+=R-Re),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=q.storage}}}let v=S%R;return v>0&&(S+=R-v),y.__size=S,y.__cache={},this}function p(y){let b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(b.boundary=16,b.storage=y.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",y),b}function T(y){let b=y.target;b.removeEventListener("dispose",T);let S=a.indexOf(b.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function C(){for(let y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:c,update:l,dispose:C}}function W_(){return oi===null&&(oi=new Hi(G_,16,16,ai,qt),oi.name="DFG_LUT",oi.minFilter=st,oi.magFilter=st,oi.wrapS=fn,oi.wrapT=fn,oi.generateMipmaps=!1,oi.needsUpdate=!0),oi}var im,sm,rm,am,om,lm,cm,hm,um,dm,fm,pm,mm,gm,xm,_m,vm,ym,Mm,bm,Sm,Tm,wm,Em,Am,Rm,Cm,Pm,Im,Lm,Dm,Nm,Um,Fm,Om,Bm,km,zm,Hm,Vm,Gm,Wm,Xm,qm,Ym,Zm,Km,$m,Jm,jm,Qm,e0,t0,n0,i0,s0,r0,a0,o0,l0,c0,h0,u0,d0,f0,p0,m0,g0,x0,_0,v0,y0,M0,b0,S0,T0,w0,E0,A0,R0,C0,P0,I0,L0,D0,N0,U0,F0,O0,B0,k0,z0,H0,V0,G0,W0,X0,q0,Y0,Z0,K0,$0,J0,j0,Q0,eg,tg,ng,ig,sg,rg,ag,og,lg,cg,hg,ug,dg,fg,pg,mg,gg,xg,_g,vg,yg,Mg,bg,Sg,Tg,wg,Eg,Ag,Rg,Cg,Pg,Ig,Lg,Dg,Ng,Ug,Fg,We,fe,li,dl,Og,xf,dr,Gg,Wg,Xg,fa,Zd,ch,hh,uh,dh,qg,ms,pr,pl,ix,_f,mh,vf,yf,Mf,jd,Qd,ef,tf,nf,gh,xh,_h,fh,fr,qx,Yx,af,Jx,fl,i_,s_,a_,l_,h_,d_,p_,__,yh,Mh,E_,P_,I_,L_,D_,mf,pa,ph,B_,k_,bh,Sh,z_,bf,G_,oi,ml,Zt=Zl(()=>{lh();lh();im=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,am=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,om=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,um=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,dm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Em=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Am=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Cm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Im=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Um=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Fm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Om=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Bm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,km=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ym=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Km=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,$m=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,t0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,n0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,i0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,r0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,a0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,h0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,u0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,d0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,f0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,x0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,y0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,b0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,S0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,E0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,A0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,R0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,C0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,I0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,L0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,D0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,N0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,U0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,B0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,z0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,H0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,V0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,G0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,X0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,K0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,J0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,j0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ig=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ag=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ug=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Tg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ig=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ug=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:im,alphahash_pars_fragment:sm,alphamap_fragment:rm,alphamap_pars_fragment:am,alphatest_fragment:om,alphatest_pars_fragment:lm,aomap_fragment:cm,aomap_pars_fragment:hm,batching_pars_vertex:um,batching_vertex:dm,begin_vertex:fm,beginnormal_vertex:pm,bsdfs:mm,iridescence_fragment:gm,bumpmap_pars_fragment:xm,clipping_planes_fragment:_m,clipping_planes_pars_fragment:vm,clipping_planes_pars_vertex:ym,clipping_planes_vertex:Mm,color_fragment:bm,color_pars_fragment:Sm,color_pars_vertex:Tm,color_vertex:wm,common:Em,cube_uv_reflection_fragment:Am,defaultnormal_vertex:Rm,displacementmap_pars_vertex:Cm,displacementmap_vertex:Pm,emissivemap_fragment:Im,emissivemap_pars_fragment:Lm,colorspace_fragment:Dm,colorspace_pars_fragment:Nm,envmap_fragment:Um,envmap_common_pars_fragment:Fm,envmap_pars_fragment:Om,envmap_pars_vertex:Bm,envmap_physical_pars_fragment:Km,envmap_vertex:km,fog_vertex:zm,fog_pars_vertex:Hm,fog_fragment:Vm,fog_pars_fragment:Gm,gradientmap_pars_fragment:Wm,lightmap_pars_fragment:Xm,lights_lambert_fragment:qm,lights_lambert_pars_fragment:Ym,lights_pars_begin:Zm,lights_toon_fragment:$m,lights_toon_pars_fragment:Jm,lights_phong_fragment:jm,lights_phong_pars_fragment:Qm,lights_physical_fragment:e0,lights_physical_pars_fragment:t0,lights_fragment_begin:n0,lights_fragment_maps:i0,lights_fragment_end:s0,lightprobes_pars_fragment:r0,logdepthbuf_fragment:a0,logdepthbuf_pars_fragment:o0,logdepthbuf_pars_vertex:l0,logdepthbuf_vertex:c0,map_fragment:h0,map_pars_fragment:u0,map_particle_fragment:d0,map_particle_pars_fragment:f0,metalnessmap_fragment:p0,metalnessmap_pars_fragment:m0,morphinstance_vertex:g0,morphcolor_vertex:x0,morphnormal_vertex:_0,morphtarget_pars_vertex:v0,morphtarget_vertex:y0,normal_fragment_begin:M0,normal_fragment_maps:b0,normal_pars_fragment:S0,normal_pars_vertex:T0,normal_vertex:w0,normalmap_pars_fragment:E0,clearcoat_normal_fragment_begin:A0,clearcoat_normal_fragment_maps:R0,clearcoat_pars_fragment:C0,iridescence_pars_fragment:P0,opaque_fragment:I0,packing:L0,premultiplied_alpha_fragment:D0,project_vertex:N0,dithering_fragment:U0,dithering_pars_fragment:F0,roughnessmap_fragment:O0,roughnessmap_pars_fragment:B0,shadowmap_pars_fragment:k0,shadowmap_pars_vertex:z0,shadowmap_vertex:H0,shadowmask_pars_fragment:V0,skinbase_vertex:G0,skinning_pars_vertex:W0,skinning_vertex:X0,skinnormal_vertex:q0,specularmap_fragment:Y0,specularmap_pars_fragment:Z0,tonemapping_fragment:K0,tonemapping_pars_fragment:$0,transmission_fragment:J0,transmission_pars_fragment:j0,uv_pars_fragment:Q0,uv_pars_vertex:eg,uv_vertex:tg,worldpos_vertex:ng,background_vert:ig,background_frag:sg,backgroundCube_vert:rg,backgroundCube_frag:ag,cube_vert:og,cube_frag:lg,depth_vert:cg,depth_frag:hg,distance_vert:ug,distance_frag:dg,equirect_vert:fg,equirect_frag:pg,linedashed_vert:mg,linedashed_frag:gg,meshbasic_vert:xg,meshbasic_frag:_g,meshlambert_vert:vg,meshlambert_frag:yg,meshmatcap_vert:Mg,meshmatcap_frag:bg,meshnormal_vert:Sg,meshnormal_frag:Tg,meshphong_vert:wg,meshphong_frag:Eg,meshphysical_vert:Ag,meshphysical_frag:Rg,meshtoon_vert:Cg,meshtoon_frag:Pg,points_vert:Ig,points_frag:Lg,shadow_vert:Dg,shadow_frag:Ng,sprite_vert:Ug,sprite_frag:Fg},fe={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new E},probesMax:{value:new E},probesResolution:{value:new E}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},li={basic:{uniforms:an([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:an([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ae(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:an([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:an([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:an([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new ae(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:an([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:an([fe.points,fe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:an([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:an([fe.common,fe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:an([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:an([fe.sprite,fe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:an([fe.common,fe.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:an([fe.lights,fe.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};li.physical={uniforms:an([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};dl={r:0,b:0,g:0},Og=new Be,xf=new He;xf.set(-1,0,0,0,1,0,0,0,1);dr=4,Gg=6,Wg=20,Xg=256,fa=new ni,Zd=new ae,ch=null,hh=0,uh=0,dh=!1,qg=new E,ms=new E,pr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=qg}=r;ch=this._renderer.getRenderTarget(),hh=this._renderer.getActiveCubeFace(),uh=this._renderer.getActiveMipmapLevel(),dh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ch,hh,uh),this._renderer.xr.enabled=dh,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wi||e.mapping===ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ch=this._renderer.getRenderTarget(),hh=this._renderer.getActiveCubeFace(),uh=this._renderer.getActiveMipmapLevel(),dh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:st,minFilter:st,generateMipmaps:!1,type:qt,format:kt,colorSpace:At,depthBuffer:!1},i=Kd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Yg(r)),this._blurMaterial=Kg(r,e,t),this._ggxMaterial=Zg(r,e,t)}return i}_compileMaterial(e){let t=new at(new dt,e);this._renderer.compile(t,fa)}_sceneToCubeUV(e,t,n,i,r){let c=new Ot(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Zd),f.toneMapping=An,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(i),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new at(new jn,new Jt({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,g=x.material,p=!1,T=e.background;T?T.isColor&&(g.color.copy(T),e.background=null,p=!0):(g.color.copy(Zd),p=!0);for(let C=0;C<6;C++){let y=C%3;y===0?(c.up.set(0,l[C],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[C],r.y,r.z)):y===1?(c.up.set(0,0,l[C]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[C],r.z)):(c.up.set(0,l[C],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[C]));let b=this._cubeSize;ur(i,y*b,C>2?b:0,b,b),f.setRenderTarget(i),p&&f.render(x,c),f.render(e,c)}f.toneMapping=d,f.autoClear=u,e.background=T}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Wi||e.mapping===ds;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$d());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;ur(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,fa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=l*1.25,d=f*u,{_lodMax:m}=this,x=this._sizeLods[n],g=3*x*(n>m-dr?n-m+dr:0),p=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=m-t,ur(r,g,p,3*x,2*x),i.setRenderTarget(r),i.render(o,fa),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,ur(e,g,p,3*x,2*x),i.setRenderTarget(e),i.render(o,fa)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,i,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[i];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],f=3*h*(i>this._lodMax-dr?i-this._lodMax+dr:0),u=4*(this._cubeSize-h);ur(t,f,u,3*h,2*h),a.setRenderTarget(t),a.render(c,fa)}};pl=class extends Pt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Xr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new jn(5,5,5),r=new xt({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:si});r.uniforms.tEquirect.value=t;let a=new at(i,r),o=t.minFilter;return t.minFilter===Bt&&(t.minFilter=st),new Mo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};ix={[Uc]:"LINEAR_TONE_MAPPING",[Fc]:"REINHARD_TONE_MAPPING",[Oc]:"CINEON_TONE_MAPPING",[Bc]:"ACES_FILMIC_TONE_MAPPING",[zc]:"AGX_TONE_MAPPING",[Hc]:"NEUTRAL_TONE_MAPPING",[kc]:"CUSTOM_TONE_MAPPING"};_f=new Dt,mh=new Jn(1,1),vf=new Ur,yf=new Xs,Mf=new Xr,jd=[],Qd=[],ef=new Float32Array(16),tf=new Float32Array(9),nf=new Float32Array(4);gh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Tx(t.type)}},xh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wx(t.type)}},_h=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},fh=/(\w+)(\])?(\[|\.)?/g;fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Xx(o,c,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};qx=37297,Yx=0;af=new He;Jx={[Uc]:"Linear",[Fc]:"Reinhard",[Oc]:"Cineon",[Bc]:"ACESFilmic",[zc]:"AgX",[Hc]:"Neutral",[kc]:"Custom"};fl=new E;i_=/^[ \t]*#include +<([\w\d./]+)>/gm;s_=new Map;a_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;l_={[ia]:"SHADOWMAP_TYPE_PCF",[ir]:"SHADOWMAP_TYPE_VSM"};h_={[Wi]:"ENVMAP_TYPE_CUBE",[ds]:"ENVMAP_TYPE_CUBE",[ra]:"ENVMAP_TYPE_CUBE_UV"};d_={[ds]:"ENVMAP_MODE_REFRACTION"};p_={[Nc]:"ENVMAP_BLENDING_MULTIPLY",[Ad]:"ENVMAP_BLENDING_MIX",[Rd]:"ENVMAP_BLENDING_ADD"};__=0,yh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Mh(e),t.set(e,n)),n}},Mh=class{constructor(e){this.id=__++,this.code=e,this.usedTimes=0}};E_=0;P_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,I_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,L_=[new E(1,0,0),new E(-1,0,0),new E(0,1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1)],D_=[new E(0,-1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1),new E(0,-1,0),new E(0,-1,0)],mf=new Be,pa=new E,ph=new E;B_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,bh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Yr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new xt({vertexShader:B_,fragmentShader:k_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new Kr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Sh=class extends $n{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,m=null,x=typeof XRWebGLBinding<"u",g=new bh,p={},T=t.getContextAttributes(),C=null,y=null,b=[],S=[],R=new ze,v=null,w=null,P=new Ot;P.viewport=new Ze;let F=new Ot;F.viewport=new Ze;let U=[P,F],H=new bo,I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ee=b[Y];return ee===void 0&&(ee=new qs,b[Y]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(Y){let ee=b[Y];return ee===void 0&&(ee=new qs,b[Y]=ee),ee.getGripSpace()},this.getHand=function(Y){let ee=b[Y];return ee===void 0&&(ee=new qs,b[Y]=ee),ee.getHandSpace()};function X(Y){let ee=S.indexOf(Y.inputSource);if(ee===-1)return;let ye=b[ee];ye!==void 0&&(ye.update(Y.inputSource,Y.frame,l||a),ye.dispatchEvent({type:Y.type,data:Y.inputSource}))}function K(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",ie);for(let Y=0;Y<b.length;Y++){let ee=S[Y];ee!==null&&(S[Y]=null,b[Y].disconnect(ee))}I=null,B=null,g.reset();for(let Y in p)delete p[Y];if(e.setRenderTarget(C),d=null,u=null,f=null,i=null,y=null,tt.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),w!==null){let Y=w.camera;Y.fov=w.fov,Y.zoom=w.zoom,Y.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(i,t)),f},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(C=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",K),i.addEventListener("inputsourceschange",ie),T.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Fe=null,xe=null;T.depth&&(xe=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=T.stencil?Xi:Kn,Fe=T.stencil?cr:Rn);let Ve={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Ve),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Pt(u.textureWidth,u.textureHeight,{format:kt,type:rn,depthTexture:new Jn(u.textureWidth,u.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ye={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,ye),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Pt(d.framebufferWidth,d.framebufferHeight,{format:kt,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),tt.setContext(i),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ie(Y){for(let ee=0;ee<Y.removed.length;ee++){let ye=Y.removed[ee],Fe=S.indexOf(ye);Fe>=0&&(S[Fe]=null,b[Fe].disconnect(ye))}for(let ee=0;ee<Y.added.length;ee++){let ye=Y.added[ee],Fe=S.indexOf(ye);if(Fe===-1){for(let Ve=0;Ve<b.length;Ve++)if(Ve>=S.length){S.push(ye),Fe=Ve;break}else if(S[Ve]===null){S[Ve]=ye,Fe=Ve;break}if(Fe===-1)break}let xe=b[Fe];xe&&xe.connect(ye)}}let q=new E,j=new E;function te(Y,ee,ye){q.setFromMatrixPosition(ee.matrixWorld),j.setFromMatrixPosition(ye.matrixWorld);let Fe=q.distanceTo(j),xe=ee.projectionMatrix.elements,Ve=ye.projectionMatrix.elements,Ct=xe[14]/(xe[10]-1),Xe=xe[14]/(xe[10]+1),nt=(xe[9]+1)/xe[5],G=(xe[9]-1)/xe[5],se=(xe[8]-1)/xe[0],ve=(Ve[8]+1)/Ve[0],Ne=Ct*se,Qe=Ct*ve,Oe=Fe/(-se+ve),_t=Oe*-se;if(ee.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(_t),Y.translateZ(Oe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),xe[10]===-1)Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{let D=Ct+Oe,bt=Xe+Oe,it=Ne-_t,A=Qe+(Fe-_t),_=nt*Xe/bt*D,O=G*Xe/bt*D;Y.projectionMatrix.makePerspective(it,A,_,O,D,bt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Re(Y,ee){ee===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ee.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let ee=Y.near,ye=Y.far;g.texture!==null&&(g.depthNear>0&&(ee=g.depthNear),g.depthFar>0&&(ye=g.depthFar)),H.near=F.near=P.near=ee,H.far=F.far=P.far=ye,(I!==H.near||B!==H.far)&&(i.updateRenderState({depthNear:H.near,depthFar:H.far}),I=H.near,B=H.far),H.layers.mask=Y.layers.mask|6,P.layers.mask=H.layers.mask&-5,F.layers.mask=H.layers.mask&-3;let Fe=Y.parent,xe=H.cameras;Re(H,Fe);for(let Ve=0;Ve<xe.length;Ve++)Re(xe[Ve],Fe);xe.length===2?te(H,P,F):H.projectionMatrix.copy(P.projectionMatrix),w===null&&Y.isPerspectiveCamera&&(w={camera:Y,fov:Y.fov,zoom:Y.zoom}),Se(Y,H,Fe)};function Se(Y,ee,ye){ye===null?Y.matrix.copy(ee.matrixWorld):(Y.matrix.copy(ye.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ee.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=as*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(Y){c=Y,u!==null&&(u.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(Y){return p[Y]};let lt=null;function je(Y,ee){if(h=ee.getViewerPose(l||a),m=ee,h!==null){let ye=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Fe=!1;ye.length!==H.cameras.length&&(H.cameras.length=0,Fe=!0);for(let Xe=0;Xe<ye.length;Xe++){let nt=ye[Xe],G=null;if(d!==null)G=d.getViewport(nt);else{let ve=f.getViewSubImage(u,nt);G=ve.viewport,Xe===0&&(e.setRenderTargetTextures(y,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(y))}let se=U[Xe];se===void 0&&(se=new Ot,se.layers.enable(Xe),se.viewport=new Ze,U[Xe]=se),se.matrix.fromArray(nt.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(nt.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(G.x,G.y,G.width,G.height),Xe===0&&(H.matrix.copy(se.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Fe===!0&&H.cameras.push(se)}let xe=i.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){f=n.getBinding();let Xe=f.getDepthInformation(ye[0]);Xe&&Xe.isValid&&Xe.texture&&g.init(Xe,i.renderState)}if(xe&&xe.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let Xe=0;Xe<ye.length;Xe++){let nt=ye[Xe].camera;if(nt){let G=p[nt];G||(G=new Yr,p[nt]=G);let se=f.getCameraImage(nt);G.sourceTexture=se}}}}for(let ye=0;ye<b.length;ye++){let Fe=S[ye],xe=b[ye];Fe!==null&&xe!==void 0&&xe.update(Fe,ee,l||a)}lt&&lt(Y,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),m=null}let tt=new gf;tt.setAnimationLoop(je),this.setAnimationLoop=function(Y){lt=Y},this.dispose=function(){}}},z_=new Be,bf=new He;bf.set(-1,0,0,0,1,0,0,0,1);G_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),oi=null;ml=class{constructor(e={}){let{canvas:t=zd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=rn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let x=d,g=new Set([Lo,Io,Po]),p=new Set([rn,Rn,lr,cr,Ao,Ro]),T=new Uint32Array(4),C=new Int32Array(4),y=new E,b=null,S=null,R=[],v=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,F=!1,U=null,H=null,I=null,B=null;this._outputColorSpace=Et;let X=0,K=0,ie=null,q=-1,j=null,te=new Ze,Re=new Ze,Se=null,lt=new ae(0),je=0,tt=t.width,Y=t.height,ee=1,ye=null,Fe=null,xe=new Ze(0,0,tt,Y),Ve=new Ze(0,0,tt,Y),Ct=!1,Xe=new $s,nt=!1,G=!1,se=new Be,ve=new E,Ne=new Ze,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Oe=!1;function _t(){return ie===null?ee:1}let D=n;function bt(M,L){return t.getContext(M,L)}let it,A,_,O,V,Z,re,oe,$,Q,le,Ie,de,ce,Le,Ue,Ge,N,he,J,ue,_e,ne;try{let M={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",Nn,!1),D===null){let L="webgl2";if(D=bt(L,M),D===null)throw bt(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(M){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",Nn,!1),ke("WebGLRenderer: "+M.message),M}function De(){it=new Jg(D),it.init(),ue=new O_(D,it),A=new Hg(D,it,e,ue),_=new U_(D,it),A.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),H=D.createFramebuffer(),I=D.createFramebuffer(),B=D.createFramebuffer(),O=new ex(D),V=new M_,Z=new F_(D,it,_,V,A,ue,O),re=new $g(P),oe=new nm(D),_e=new kg(D,oe),$=new jg(D,oe,O,_e),Q=new nx(D,$,oe,_e,O),N=new tx(D,A,Z),Le=new Vg(V),le=new y_(P,re,it,A,_e,Le),Ie=new H_(P,V),de=new S_,ce=new C_(it),Ge=new Bg(P,re,_,Q,m,c),Ue=new N_(P,Q,A),ne=new V_(D,O,A,_),he=new zg(D,it,O),J=new Qg(D,it,O),O.programs=le.programs,P.capabilities=A,P.extensions=it,P.properties=V,P.renderLists=de,P.shadowMap=Ue,P.state=_,P.info=O}x!==rn&&(w=new sx(x,t.width,t.height,o,i,r));let Ae=new Sh(P,D);this.xr=Ae,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let M=it.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=it.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(M){M!==void 0&&(ee=M,this.setSize(tt,Y,!1))},this.getSize=function(M){return M.set(tt,Y)},this.setSize=function(M,L,W=!0){if(Ae.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=M,Y=L,t.width=Math.floor(M*ee),t.height=Math.floor(L*ee),W===!0&&(t.style.width=M+"px",t.style.height=L+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(tt*ee,Y*ee).floor()},this.setDrawingBufferSize=function(M,L,W){tt=M,Y=L,ee=W,t.width=Math.floor(M*W),t.height=Math.floor(L*W),this.setViewport(0,0,M,L)},this.setEffects=function(M){if(x===rn){ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let L=0;L<M.length;L++)if(M[L].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(te)},this.getViewport=function(M){return M.copy(xe)},this.setViewport=function(M,L,W,k){M.isVector4?xe.set(M.x,M.y,M.z,M.w):xe.set(M,L,W,k),_.viewport(te.copy(xe).multiplyScalar(ee).round())},this.getScissor=function(M){return M.copy(Ve)},this.setScissor=function(M,L,W,k){M.isVector4?Ve.set(M.x,M.y,M.z,M.w):Ve.set(M,L,W,k),_.scissor(Re.copy(Ve).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(M){_.setScissorTest(Ct=M)},this.setOpaqueSort=function(M){ye=M},this.setTransparentSort=function(M){Fe=M},this.getClearColor=function(M){return M.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,W=!0){let k=0;if(M){let z=!1;if(ie!==null){let ge=ie.texture.format;z=g.has(ge)}if(z){let ge=ie.texture.type,be=p.has(ge),pe=Ge.getClearColor(),we=Ge.getClearAlpha(),Ce=pe.r,qe=pe.g,$e=pe.b;be?(T[0]=Ce,T[1]=qe,T[2]=$e,T[3]=we,D.clearBufferuiv(D.COLOR,0,T)):(C[0]=Ce,C[1]=qe,C[2]=$e,C[3]=we,D.clearBufferiv(D.COLOR,0,C))}else k|=D.COLOR_BUFFER_BIT}L&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),U=M},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",Nn,!1),Ge.dispose(),de.dispose(),ce.dispose(),V.dispose(),re.dispose(),Q.dispose(),_e.dispose(),ne.dispose(),le.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",gu),Ae.removeEventListener("sessionend",xu),ji.stop()};function St(M){M.preventDefault(),Nr("WebGLRenderer: Context Lost."),F=!0}function ct(){Nr("WebGLRenderer: Context Restored."),F=!1;let M=O.autoReset,L=Ue.enabled,W=Ue.autoUpdate,k=Ue.needsUpdate,z=Ue.type;De(),O.autoReset=M,Ue.enabled=L,Ue.autoUpdate=W,Ue.needsUpdate=k,Ue.type=z}function Nn(M){ke("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Xn(M){let L=M.target;L.removeEventListener("dispose",Xn),Gf(L)}function Gf(M){Wf(M),V.remove(M)}function Wf(M){let L=V.get(M).programs;L!==void 0&&(L.forEach(function(W){le.releaseProgram(W)}),M.isShaderMaterial&&le.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,W,k,z,ge){L===null&&(L=Qe);let be=z.isMesh&&z.matrixWorld.determinantAffine()<0,pe=Yf(M,L,W,k,z);_.setMaterial(k,be);let we=W.index,Ce=1;if(k.wireframe===!0){if(we=$.getWireframeAttribute(W),we===void 0)return;Ce=2}let qe=W.drawRange,$e=W.attributes.position,Ee=qe.start*Ce,ht=(qe.start+qe.count)*Ce;ge!==null&&(Ee=Math.max(Ee,ge.start*Ce),ht=Math.min(ht,(ge.start+ge.count)*Ce)),we!==null?(Ee=Math.max(Ee,0),ht=Math.min(ht,we.count)):$e!=null&&(Ee=Math.max(Ee,0),ht=Math.min(ht,$e.count));let Ut=ht-Ee;if(Ut<0||Ut===1/0)return;_e.setup(z,k,pe,W,we);let wt,vt=he;if(we!==null&&(wt=oe.get(we),vt=J,vt.setIndex(wt)),z.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*_t()),vt.setMode(D.LINES)):vt.setMode(D.TRIANGLES);else if(z.isLine){let tn=k.linewidth;tn===void 0&&(tn=1),_.setLineWidth(tn*_t()),z.isLineSegments?vt.setMode(D.LINES):z.isLineLoop?vt.setMode(D.LINE_LOOP):vt.setMode(D.LINE_STRIP)}else z.isPoints?vt.setMode(D.POINTS):z.isSprite&&vt.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(it.get("WEBGL_multi_draw"))vt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let tn=z._multiDrawStarts,Me=z._multiDrawCounts,ln=z._multiDrawCount,rt=we?oe.get(we).bytesPerElement:1,Pn=V.get(k).currentProgram.getUniforms();for(let qn=0;qn<ln;qn++)Pn.setValue(D,"_gl_DrawID",qn),vt.render(tn[qn]/rt,Me[qn])}else if(z.isInstancedMesh)vt.renderInstances(Ee,Ut,z.count);else if(W.isInstancedBufferGeometry){let tn=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Me=Math.min(W.instanceCount,tn);vt.renderInstances(Ee,Ut,Me)}else vt.render(Ee,Ut)};function mu(M,L,W,k){U!==null&&M.isNodeMaterial&&U.setObject(k,M),nt===!0&&Le.setState(M,W,!1),M.transparent===!0&&M.side===Qt&&M.forceSinglePass===!1?(M.side=jt,M.needsUpdate=!0,Sa(M,L,k),M.side=ii,M.needsUpdate=!0,Sa(M,L,k),M.side=Qt):Sa(M,L,k)}this.compile=function(M,L,W=null){W===null&&(W=M),U!==null&&U.renderStart(M,L,W),S=ce.get(W),S.init(L),v.push(S),W.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),M!==W&&M.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),S.setupLights(),U!==null&&U.updateLights(S.state.lightsArray),G=this.localClippingEnabled,nt=Le.init(this.clippingPlanes,G),nt===!0&&Le.setGlobalState(this.clippingPlanes,L),U!==null&&Ue.render(S.state.shadowsArray,W,L);let k=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let ge=z.material;if(ge)if(Array.isArray(ge))for(let be=0;be<ge.length;be++){let pe=ge[be];mu(pe,W,L,z),k.add(pe)}else mu(ge,W,L,z),k.add(ge)}),S=v.pop(),U!==null&&U.renderEnd(),k},this.compileAsync=function(M,L,W=null){let k=this.compile(M,L,W);return new Promise(z=>{function ge(){if(k.forEach(function(be){let we=V.get(be).currentProgram;(we===void 0||we.isReady())&&k.delete(be)}),k.size===0){z(M);return}setTimeout(ge,10)}it.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let ql=null;function Xf(M){ql&&ql(M)}function gu(){ji.stop()}function xu(){ji.start()}let ji=new gf;ji.setAnimationLoop(Xf),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(M){ql=M,Ae.setAnimationLoop(M),M===null?ji.stop():ji.start()},Ae.addEventListener("sessionstart",gu),Ae.addEventListener("sessionend",xu),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;U!==null&&U.renderStart(M,L);let W=Ae.enabled===!0&&Ae.isPresenting===!0,k=w!==null&&(ie===null||W)&&w.begin(P,ie);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(L),L=Ae.getCamera()),M.isScene===!0&&M.onBeforeRender(P,M,L,ie),S=ce.get(M,v.length),S.init(L),S.state.textureUnits=Z.getTextureUnits(),v.push(S),se.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Xe.setFromProjectionMatrix(se,zn,L.reversedDepth),G=this.localClippingEnabled,nt=Le.init(this.clippingPlanes,G),b=de.get(M,R.length),b.init(),R.push(b),Ae.enabled===!0&&Ae.isPresenting===!0){let be=P.xr.getDepthSensingMesh();be!==null&&Yl(be,L,-1/0,P.sortObjects)}Yl(M,L,0,P.sortObjects),b.finish(),U!==null&&U.updateLights(S.state.lightsArray),P.sortObjects===!0&&b.sort(ye,Fe),Oe=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,Oe&&Ge.addToRenderList(b,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),nt===!0&&Le.beginShadows();let z=S.state.shadowsArray;if(Ue.render(z,M,L),nt===!0&&Le.endShadows(),(k&&w.hasRenderPass())===!1){let be=b.opaque,pe=b.transmissive;if(S.setupLights(),L.isArrayCamera){let we=L.cameras;if(pe.length>0)for(let Ce=0,qe=we.length;Ce<qe;Ce++){let $e=we[Ce];vu(be,pe,M,$e)}Oe&&Ge.render(M);for(let Ce=0,qe=we.length;Ce<qe;Ce++){let $e=we[Ce];_u(b,M,$e,$e.viewport)}}else pe.length>0&&vu(be,pe,M,L),Oe&&Ge.render(M),_u(b,M,L)}ie!==null&&K===0&&(Z.updateMultisampleRenderTarget(ie),Z.updateRenderTargetMipmap(ie)),k&&w.end(P),M.isScene===!0&&M.onAfterRender(P,M,L),_e.resetDefaultState(),q=-1,j=null,v.pop(),v.length>0?(S=v[v.length-1],Z.setTextureUnits(S.state.textureUnits),nt===!0&&Le.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?b=R[R.length-1]:b=null,U!==null&&U.renderEnd()};function Yl(M,L,W,k){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLightProbeGrid)S.pushLightProbeGrid(M);else if(M.isLight)S.pushLight(M),M.castShadow&&S.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Xe)){k&&Ne.setFromMatrixPosition(M.matrixWorld).applyMatrix4(se);let be=Q.update(M),pe=M.material;pe.visible&&b.push(M,be,pe,W,Ne.z,null,L)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Xe))){let be=Q.update(M),pe=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ne.copy(M.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ne.copy(be.boundingSphere.center)),Ne.applyMatrix4(M.matrixWorld).applyMatrix4(se)),Array.isArray(pe)){let we=be.groups;for(let Ce=0,qe=we.length;Ce<qe;Ce++){let $e=we[Ce],Ee=pe[$e.materialIndex];Ee&&Ee.visible&&b.push(M,be,Ee,W,Ne.z,$e,L)}}else pe.visible&&b.push(M,be,pe,W,Ne.z,null,L)}}let ge=M.children;for(let be=0,pe=ge.length;be<pe;be++)Yl(ge[be],L,W,k)}function _u(M,L,W,k){let{opaque:z,transmissive:ge,transparent:be}=M;S.setupLightsView(W),nt===!0&&Le.setGlobalState(P.clippingPlanes,W),k&&_.viewport(te.copy(k)),z.length>0&&ba(z,L,W),ge.length>0&&ba(ge,L,W),be.length>0&&ba(be,L,W),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function vu(M,L,W,k){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[k.id]===void 0){let Ee=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[k.id]=new Pt(1,1,{generateMipmaps:!0,type:Ee?qt:rn,minFilter:Bt,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}let ge=S.state.transmissionRenderTarget[k.id],be=k.viewport||te;ge.setSize(be.z*P.transmissionResolutionScale,be.w*P.transmissionResolutionScale);let pe=P.getRenderTarget(),we=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(ge),P.getClearColor(lt),je=P.getClearAlpha(),je<1&&P.setClearColor(16777215,.5),P.clear(),Oe&&Ge.render(W);let qe=P.toneMapping;P.toneMapping=An;let $e=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),S.setupLightsView(k),nt===!0&&Le.setGlobalState(P.clippingPlanes,k),ba(M,W,k),Z.updateMultisampleRenderTarget(ge),Z.updateRenderTargetMipmap(ge),it.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let ht=0,Ut=L.length;ht<Ut;ht++){let wt=L[ht],{object:vt,geometry:tn,material:Me,group:ln}=wt;if(Me.side===Qt&&vt.layers.test(k.layers)){let rt=Me.side;Me.side=jt,Me.needsUpdate=!0,yu(vt,W,k,tn,Me,ln),Me.side=rt,Me.needsUpdate=!0,Ee=!0}}Ee===!0&&(Z.updateMultisampleRenderTarget(ge),Z.updateRenderTargetMipmap(ge))}P.setRenderTarget(pe,we,Ce),P.setClearColor(lt,je),$e!==void 0&&(k.viewport=$e),P.toneMapping=qe}function ba(M,L,W){let k=L.isScene===!0?L.overrideMaterial:null;for(let z=0,ge=M.length;z<ge;z++){let be=M[z],{object:pe,geometry:we,group:Ce}=be,qe=be.material;qe.allowOverride===!0&&k!==null&&(qe=k),pe.layers.test(W.layers)&&yu(pe,L,W,we,qe,Ce)}}function yu(M,L,W,k,z,ge){U!==null&&z.isNodeMaterial&&U.setObject(M,z),M.onBeforeRender(P,L,W,k,z,ge),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(P,L,W,k,M,ge),z.transparent===!0&&z.side===Qt&&z.forceSinglePass===!1?(z.side=jt,z.needsUpdate=!0,P.renderBufferDirect(W,L,k,z,M,ge),z.side=ii,z.needsUpdate=!0,P.renderBufferDirect(W,L,k,z,M,ge),z.side=Qt):P.renderBufferDirect(W,L,k,z,M,ge),M.onAfterRender(P,L,W,k,z,ge)}function Sa(M,L,W){L.isScene!==!0&&(L=Qe);let k=V.get(M),z=S.state.lights,ge=S.state.shadowsArray,be=z.state.version,pe=le.getParameters(M,z.state,ge,L,W,S.state.lightProbeGridArray),we=le.getProgramCacheKey(pe),Ce=k.programs;k.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?L.environment:null,k.fog=L.fog;let qe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;k.envMap=re.get(M.envMap||k.environment,qe),k.envMapRotation=k.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,Ce===void 0&&(M.addEventListener("dispose",Xn),Ce=new Map,k.programs=Ce);let $e=Ce.get(we);if($e!==void 0){if(k.currentProgram===$e&&k.lightsStateVersion===be)return bu(M,pe),$e}else pe.uniforms=le.getUniforms(M),U!==null&&M.isNodeMaterial&&U.build(M,W,pe),M.onBeforeCompile(pe,P),$e=le.acquireProgram(pe,we),Ce.set(we,$e),k.uniforms=pe.uniforms;let Ee=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ee.clippingPlanes=Le.uniform),bu(M,pe),k.needsLights=Kf(M),k.lightsStateVersion=be,k.needsLights&&(Ee.ambientLightColor.value=z.state.ambient,Ee.lightProbe.value=z.state.probe,Ee.sunLights.value=z.state.sun,Ee.sunLightShadows.value=z.state.sunShadow,Ee.directionalLights.value=z.state.directional,Ee.directionalLightShadows.value=z.state.directionalShadow,Ee.spotLights.value=z.state.spot,Ee.spotLightShadows.value=z.state.spotShadow,Ee.rectAreaLights.value=z.state.rectArea,Ee.ltc_1.value=z.state.rectAreaLTC1,Ee.ltc_2.value=z.state.rectAreaLTC2,Ee.pointLights.value=z.state.point,Ee.pointLightShadows.value=z.state.pointShadow,Ee.hemisphereLights.value=z.state.hemi,Ee.sunShadowMatrix.value=z.state.sunShadowMatrix,Ee.sunShadowCascade.value=z.state.sunShadowCascade,Ee.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ee.spotLightMatrix.value=z.state.spotLightMatrix,Ee.spotLightMap.value=z.state.spotLightMap,Ee.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=S.state.lightProbeGridArray.length>0,k.currentProgram=$e,k.uniformsList=null,$e}function Mu(M){if(M.uniformsList===null){let L=M.currentProgram.getUniforms();M.uniformsList=fr.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function bu(M,L){let W=V.get(M);W.outputColorSpace=L.outputColorSpace,W.batching=L.batching,W.batchingColor=L.batchingColor,W.instancing=L.instancing,W.instancingColor=L.instancingColor,W.instancingMorph=L.instancingMorph,W.skinning=L.skinning,W.morphTargets=L.morphTargets,W.morphNormals=L.morphNormals,W.morphColors=L.morphColors,W.morphTargetsCount=L.morphTargetsCount,W.numClippingPlanes=L.numClippingPlanes,W.numIntersection=L.numClipIntersection,W.vertexAlphas=L.vertexAlphas,W.vertexTangents=L.vertexTangents,W.toneMapping=L.toneMapping}function qf(M,L){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(L.matrixWorld);for(let W=0,k=M.length;W<k;W++){let z=M[W];if(z.texture!==null&&z.boundingBox.containsPoint(y))return z}return null}function Yf(M,L,W,k,z){L.isScene!==!0&&(L=Qe),Z.resetTextureUnits();let ge=L.fog,be=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?L.environment:null,pe=ie===null?P.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ye.workingColorSpace,we=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ce=re.get(k.envMap||be,we),qe=k.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,$e=!!W.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ee=!!W.morphAttributes.position,ht=!!W.morphAttributes.normal,Ut=!!W.morphAttributes.color,wt=An;k.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(wt=P.toneMapping);let vt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,tn=vt!==void 0?vt.length:0,Me=V.get(k),ln=S.state.lights;if(nt===!0&&(G===!0||M!==j)){let Tt=M===j&&k.id===q;Le.setState(k,M,Tt)}let rt=!1;k.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==ln.state.version||Me.outputColorSpace!==pe||z.isBatchedMesh&&Me.batching===!1||!z.isBatchedMesh&&Me.batching===!0||z.isBatchedMesh&&Me.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&Me.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&Me.instancing===!1||!z.isInstancedMesh&&Me.instancing===!0||z.isSkinnedMesh&&Me.skinning===!1||!z.isSkinnedMesh&&Me.skinning===!0||z.isInstancedMesh&&Me.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Me.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Me.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Me.instancingMorph===!1&&z.morphTexture!==null||Me.envMap!==Ce||k.fog===!0&&Me.fog!==ge||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Le.numPlanes||Me.numIntersection!==Le.numIntersection)||Me.vertexAlphas!==qe||Me.vertexTangents!==$e||Me.morphTargets!==Ee||Me.morphNormals!==ht||Me.morphColors!==Ut||Me.toneMapping!==wt||Me.morphTargetsCount!==tn||!!Me.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(rt=!0):(rt=!0,Me.__version=k.version);let Pn=Me.currentProgram;rt===!0&&(Pn=Sa(k,L,z),U&&k.isNodeMaterial&&U.onUpdateProgram(k,Pn,Me));let qn=!1,Pi=!1,Ss=!1,mt=Pn.getUniforms(),It=Me.uniforms;if(_.useProgram(Pn.program)&&(qn=!0,Pi=!0,Ss=!0),k.id!==q&&(q=k.id,Pi=!0),Me.needsLights){let Tt=qf(S.state.lightProbeGridArray,z);Me.lightProbeGrid!==Tt&&(Me.lightProbeGrid=Tt,Pi=!0)}if(qn||j!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),mt.setValue(D,"projectionMatrix",M.projectionMatrix),mt.setValue(D,"viewMatrix",M.matrixWorldInverse);let Li=mt.map.cameraPosition;Li!==void 0&&Li.setValue(D,ve.setFromMatrixPosition(M.matrixWorld)),A.logarithmicDepthBuffer&&mt.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&mt.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),j!==M&&(j=M,Pi=!0,Ss=!0)}if(Me.needsLights&&(ln.state.sunShadowMap.length>0&&mt.setValue(D,"sunShadowMap",ln.state.sunShadowMap,Z),ln.state.directionalShadowMap.length>0&&mt.setValue(D,"directionalShadowMap",ln.state.directionalShadowMap,Z),ln.state.spotShadowMap.length>0&&mt.setValue(D,"spotShadowMap",ln.state.spotShadowMap,Z),ln.state.pointShadowMap.length>0&&mt.setValue(D,"pointShadowMap",ln.state.pointShadowMap,Z)),z.isSkinnedMesh){mt.setOptional(D,z,"bindMatrix"),mt.setOptional(D,z,"bindMatrixInverse");let Tt=z.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),mt.setValue(D,"boneTexture",Tt.boneTexture,Z))}z.isBatchedMesh&&(mt.setOptional(D,z,"batchingTexture"),mt.setValue(D,"batchingTexture",z._matricesTexture,Z),mt.setOptional(D,z,"batchingIdTexture"),mt.setValue(D,"batchingIdTexture",z._indirectTexture,Z),mt.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&mt.setValue(D,"batchingColorTexture",z._colorsTexture,Z));let Ii=W.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&N.update(z,W,Pn),(Pi||Me.receiveShadow!==z.receiveShadow)&&(Me.receiveShadow=z.receiveShadow,mt.setValue(D,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&L.environment!==null&&(It.envMapIntensity.value=L.environmentIntensity),It.dfgLUT!==void 0&&(It.dfgLUT.value=W_()),Pi){if(mt.setValue(D,"toneMappingExposure",P.toneMappingExposure),Me.needsLights&&Zf(It,Ss),ge&&k.fog===!0&&Ie.refreshFogUniforms(It,ge),Ie.refreshMaterialUniforms(It,k,ee,Y,S.state.transmissionRenderTarget[M.id]),Me.needsLights&&Me.lightProbeGrid){let Tt=Me.lightProbeGrid;It.probesSH.value=Tt.texture,It.probesMin.value.copy(Tt.boundingBox.min),It.probesMax.value.copy(Tt.boundingBox.max),It.probesResolution.value.copy(Tt.resolution)}fr.upload(D,Mu(Me),It,Z)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(fr.upload(D,Mu(Me),It,Z),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&mt.setValue(D,"center",z.center),mt.setValue(D,"modelViewMatrix",z.modelViewMatrix),mt.setValue(D,"normalMatrix",z.normalMatrix),mt.setValue(D,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){let Tt=k.uniformsGroups;for(let Li=0,Ts=Tt.length;Li<Ts;Li++){let Tu=Tt[Li];ne.update(Tu,Pn),ne.bind(Tu,Pn)}}return Pn}function Zf(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.sunLights.needsUpdate=L,M.sunLightShadows.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function Kf(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(M,L,W){let k=V.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),V.get(M.texture).__webglTexture=L,V.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:W,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){let W=V.get(M);W.__webglFramebuffer=L,W.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(M,L=0,W=0){ie=M,X=L,K=W;let k=null,z=!1,ge=!1;if(M){let pe=V.get(M);if(pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,pe.__webglFramebuffer),te.copy(M.viewport),Re.copy(M.scissor),Se=M.scissorTest,_.viewport(te),_.scissor(Re),_.setScissorTest(Se),q=-1;return}else if(pe.__webglFramebuffer===void 0)Z.setupRenderTarget(M);else if(pe.__hasExternalTextures)Z.rebindTextures(M,V.get(M.texture).__webglTexture,V.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let qe=M.depthTexture;if(pe.__boundDepthTexture!==qe){if(qe!==null&&V.has(qe)&&(M.width!==qe.image.width||M.height!==qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(M)}}let we=M.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ge=!0);let Ce=V.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ce[L])?k=Ce[L][W]:k=Ce[L],z=!0):M.samples>0&&Z.useMultisampledRTT(M)===!1?k=V.get(M).__webglMultisampledFramebuffer:Array.isArray(Ce)?k=Ce[W]:k=Ce,te.copy(M.viewport),Re.copy(M.scissor),Se=M.scissorTest}else te.copy(xe).multiplyScalar(ee).floor(),Re.copy(Ve).multiplyScalar(ee).floor(),Se=Ct;if(W!==0&&(k=H),_.bindFramebuffer(D.FRAMEBUFFER,k)&&_.drawBuffers(M,k),_.viewport(te),_.scissor(Re),_.setScissorTest(Se),z){let pe=V.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,pe.__webglTexture,W)}else if(ge){let pe=L;for(let we=0;we<M.textures.length;we++){let Ce=V.get(M.textures[we]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+we,Ce.__webglTexture,W,pe)}}else if(M!==null&&W!==0){let pe=V.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pe.__webglTexture,W)}q=-1};function Su(M){let L=V.get(M);return(L.__readFormat!==M.format||L.__readType!==M.type)&&(L.__readFormat=M.format,L.__readType=M.type,L.__formatReadable=A.textureFormatReadable(M.format),L.__typeReadable=A.textureTypeReadable(M.type)),L}this.readRenderTargetPixels=function(M,L,W,k,z,ge,be,pe=0){if(!(M&&M.isWebGLRenderTarget)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we){_.bindFramebuffer(D.FRAMEBUFFER,we);try{let Ce=M.textures[pe],qe=Ce.format,$e=Ce.type;M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pe);let Ee=Su(Ce);if(Ee.__formatReadable===!1){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-k&&W>=0&&W<=M.height-z&&D.readPixels(L,W,k,z,ue.convert(qe),ue.convert($e),ge)}finally{let Ce=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(M,L,W,k,z,ge,be,pe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=V.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we)if(L>=0&&L<=M.width-k&&W>=0&&W<=M.height-z){_.bindFramebuffer(D.FRAMEBUFFER,we);let Ce=M.textures[pe],qe=Ce.format,$e=Ce.type;M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+pe);let Ee=Su(Ce);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ht=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ht),D.bufferData(D.PIXEL_PACK_BUFFER,ge.byteLength,D.STREAM_READ),D.readPixels(L,W,k,z,ue.convert(qe),ue.convert($e),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Ut=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Ut);let wt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Vd(D,wt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ht),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ge),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(ht),D.deleteSync(wt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,W=0){let k=Math.pow(2,-W),z=Math.floor(M.image.width*k),ge=Math.floor(M.image.height*k),be=L!==null?L.x:0,pe=L!==null?L.y:0;Z.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,be,pe,z,ge),_.unbindTexture()},this.copyTextureToTexture=function(M,L,W=null,k=null,z=0,ge=0){let be,pe,we,Ce,qe,$e,Ee,ht,Ut,wt=M.isCompressedTexture?M.mipmaps[ge]:M.image;if(W!==null)be=W.max.x-W.min.x,pe=W.max.y-W.min.y,we=W.isBox3?W.max.z-W.min.z:1,Ce=W.min.x,qe=W.min.y,$e=W.isBox3?W.min.z:0;else{let It=Math.pow(2,-z);be=Math.floor(wt.width*It),pe=Math.floor(wt.height*It),M.isDataArrayTexture?we=wt.depth:M.isData3DTexture?we=Math.floor(wt.depth*It):we=1,Ce=0,qe=0,$e=0}k!==null?(Ee=k.x,ht=k.y,Ut=k.z):(Ee=0,ht=0,Ut=0);let vt=ue.convert(L.format),tn=ue.convert(L.type),Me;L.isData3DTexture?(Z.setTexture3D(L,0),Me=D.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Z.setTexture2DArray(L,0),Me=D.TEXTURE_2D_ARRAY):(Z.setTexture2D(L,0),Me=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);let ln=_.getParameter(D.UNPACK_ROW_LENGTH),rt=_.getParameter(D.UNPACK_IMAGE_HEIGHT),Pn=_.getParameter(D.UNPACK_SKIP_PIXELS),qn=_.getParameter(D.UNPACK_SKIP_ROWS),Pi=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,wt.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,wt.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Ce),_.pixelStorei(D.UNPACK_SKIP_ROWS,qe),_.pixelStorei(D.UNPACK_SKIP_IMAGES,$e);let Ss=M.isDataArrayTexture||M.isData3DTexture,mt=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){let It=V.get(M),Ii=V.get(L),Tt=V.get(It.__renderTarget),Li=V.get(Ii.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,Tt.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,Li.__webglFramebuffer);for(let Ts=0;Ts<we;Ts++)Ss&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(M).__webglTexture,z,$e+Ts),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(L).__webglTexture,ge,Ut+Ts)),D.blitFramebuffer(Ce,qe,be,pe,Ee,ht,be,pe,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||V.has(M)){let It=V.get(M),Ii=V.get(L);_.bindFramebuffer(D.READ_FRAMEBUFFER,I),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,B);for(let Tt=0;Tt<we;Tt++)Ss?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,It.__webglTexture,z,$e+Tt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,It.__webglTexture,z),mt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ii.__webglTexture,ge,Ut+Tt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ii.__webglTexture,ge),z!==0?D.blitFramebuffer(Ce,qe,be,pe,Ee,ht,be,pe,D.COLOR_BUFFER_BIT,D.NEAREST):mt?D.copyTexSubImage3D(Me,ge,Ee,ht,Ut+Tt,Ce,qe,be,pe):D.copyTexSubImage2D(Me,ge,Ee,ht,Ce,qe,be,pe);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else mt?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(Me,ge,Ee,ht,Ut,be,pe,we,vt,tn,wt.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(Me,ge,Ee,ht,Ut,be,pe,we,vt,wt.data):D.texSubImage3D(Me,ge,Ee,ht,Ut,be,pe,we,vt,tn,wt):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ge,Ee,ht,be,pe,vt,tn,wt.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ge,Ee,ht,wt.width,wt.height,vt,wt.data):D.texSubImage2D(D.TEXTURE_2D,ge,Ee,ht,be,pe,vt,tn,wt);_.pixelStorei(D.UNPACK_ROW_LENGTH,ln),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,rt),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Pn),_.pixelStorei(D.UNPACK_SKIP_ROWS,qn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Pi),ge===0&&L.generateMipmaps&&D.generateMipmap(Me),_.unbindTexture()},this.initRenderTarget=function(M){V.get(M).__webglFramebuffer===void 0&&Z.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Z.setTextureCube(M,0):M.isData3DTexture?Z.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Z.setTexture2DArray(M,0):Z.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){X=0,K=0,ie=null,_.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}});var Sf={};Jf(Sf,{FOG_GLSL:()=>wi,enableSkyFog:()=>gr,fogU:()=>Kt,fogUniforms:()=>qi,installFogChunks:()=>Th,makeSceneFog:()=>wh});function Th(){let s=We;s.fog_pars_vertex=`
#ifdef USE_FOG
  varying vec3 vFogRay;
#endif`,s.fog_vertex=`
#ifdef USE_FOG
  vFogRay = (vec4(mvPosition.xyz, 0.0) * viewMatrix).xyz;
#endif`,s.fog_pars_fragment=`
#ifdef USE_FOG
  varying vec3 vFogRay;
  ${wi}
#endif`,s.fog_fragment=`
#ifdef USE_FOG
  {
    float fdist = length(vFogRay);
    vec3 fdir = vFogRay / max(fdist, 1e-3);
    float ff = 1.0 - exp(-acFogOD(cameraPosition.y, fdir, fdist));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, acFogSky(fdir), ff);
  }
#endif`}function wh(){return new Or(0,1,2)}function gr(s){let e=s.onBeforeCompile;return s.onBeforeCompile=(t,n)=>{e?.(t,n),t.uniforms.tFogSky=Kt.tFogSky,t.uniforms.fogP=Kt.fogP,t.uniforms.fogSun=Kt.fogSun,t.uniforms.fogSunCol=Kt.fogSunCol},s.fog=!0,s}var Kt,wi,qi,ci=Zl(()=>{Zt();Kt={tFogSky:{value:null},fogP:{value:new Ze(1/26e3,1/2600,1/16e4,1)},fogSun:{value:new E(0,1,0)},fogSunCol:{value:new ae(1,.9,.7)}},wi=`
  uniform sampler2D tFogSky;
  uniform vec4 fogP;
  uniform vec3 fogSun;
  uniform vec3 fogSunCol;
  vec3 acFogSky(vec3 d) {
    vec2 uv = vec2(atan(d.x, -d.z) * 0.15915494 + 0.5, asin(clamp(d.y, -1.0, 1.0)) * 0.31830989 + 0.5);
    vec3 c = texture2D(tFogSky, uv).rgb * fogP.w;
    float s = max(dot(d, fogSun), 0.0);
    return c + fogSunCol * (pow(s, 10.0) * 0.55 + pow(s, 80.0) * 0.8);
  }
  // optical depth from the camera (height camY) along unit dir d over distance dist
  float acFogOD(float camY, vec3 d, float dist) {
    float b = fogP.y;
    float a = clamp(b * d.y * dist, -30.0, 30.0);
    float t = abs(a) < 1e-4 ? 1.0 : (1.0 - exp(-a)) / a;
    return fogP.x * exp(-b * max(camY, -50.0)) * dist * t + fogP.z * dist;
  }
`;qi=()=>({tFogSky:Kt.tFogSky,fogP:Kt.fogP,fogSun:Kt.fogSun,fogSunCol:Kt.fogSunCol})});Zt();ci();Zt();var X_=`
varying vec2 vUv;
void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`;function q_(){let s=new dt;return s.setAttribute("position",new gt(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),s}var Gn=class s{constructor(e){this.material=e,this.mesh=new at(s.geo||(s.geo=q_()),e),this.mesh.frustumCulled=!1,this.scene=new os,this.scene.add(this.mesh),this.cam=new ni(-1,1,1,-1,0,1)}render(e,t){e.setRenderTarget(t),e.render(this.scene,this.cam)}},Eh=(s,e,t={})=>new xt({vertexShader:X_,fragmentShader:s,uniforms:e,depthTest:!1,depthWrite:!1,toneMapped:!1,...t}),Y_=`
precision highp float;
uniform sampler2D tSrc; uniform vec2 texel; uniform float karis; uniform float thresh;
varying vec2 vUv;
vec3 tap(vec2 o){ return texture2D(tSrc, vUv + o * texel).rgb; }
float luma(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
vec3 kar(vec3 c){ return c / (1.0 + luma(c)); }
void main(){
  vec3 a = tap(vec2(-2.,2.)), b = tap(vec2(0.,2.)), c = tap(vec2(2.,2.));
  vec3 d = tap(vec2(-2.,0.)), e = tap(vec2(0.,0.)), f = tap(vec2(2.,0.));
  vec3 g = tap(vec2(-2.,-2.)), h = tap(vec2(0.,-2.)), i = tap(vec2(2.,-2.));
  vec3 j = tap(vec2(-1.,1.)), k = tap(vec2(1.,1.)), l = tap(vec2(-1.,-1.)), m = tap(vec2(1.,-1.));
  vec3 col;
  if (karis > 0.5) {
    vec3 g0 = (kar(a)+kar(b)+kar(d)+kar(e)) * 0.25;
    vec3 g1 = (kar(b)+kar(c)+kar(e)+kar(f)) * 0.25;
    vec3 g2 = (kar(d)+kar(e)+kar(g)+kar(h)) * 0.25;
    vec3 g3 = (kar(e)+kar(f)+kar(h)+kar(i)) * 0.25;
    vec3 g4 = (kar(j)+kar(k)+kar(l)+kar(m)) * 0.25;
    col = g0*0.125 + g1*0.125 + g2*0.125 + g3*0.125 + g4*0.5;
    float lm = luma(col);
    col *= smoothstep(thresh * 0.4, thresh, lm / max(1.0 - lm, 0.05));
    col = col / max(1.0 - luma(col), 0.05);
  } else {
    col = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  }
  gl_FragColor = vec4(min(col, vec3(4000.0)), 1.0);
}`,Z_=`
precision highp float;
uniform sampler2D tSrc; uniform vec2 texel; uniform float radius;
varying vec2 vUv;
void main(){
  vec2 t = texel * radius;
  vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
  c += texture2D(tSrc, vUv + vec2(-t.x, 0.)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2( t.x, 0.)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2(0., -t.y)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2(0.,  t.y)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2(-t.x, -t.y)).rgb;
  c += texture2D(tSrc, vUv + vec2( t.x, -t.y)).rgb;
  c += texture2D(tSrc, vUv + vec2(-t.x,  t.y)).rgb;
  c += texture2D(tSrc, vUv + vec2( t.x,  t.y)).rgb;
  gl_FragColor = vec4(c / 16.0, 1.0);
}`,K_=`
precision highp float;
uniform sampler2D tScene; uniform sampler2D tBloom; uniform sampler2D tDepth; uniform sampler2D tCloud;
uniform float bloomGain; uniform float exposure; uniform float time;
uniform float ca; uniform float vig; uniform float grain; uniform float speed; uniform float flash; uniform float dmg;
uniform vec2 res; uniform float aspect;
uniform vec3 sunUV;          // xy = screen uv of the sun, z = 1 if in front of the camera
uniform vec3 sunCol; uniform float flare;
uniform vec3 lift; uniform vec3 gain; uniform float sat; uniform float white;
uniform float inCloud; uniform float fade;
varying vec2 vUv;

vec3 aces(vec3 x){
  const mat3 inM = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
  const mat3 outM = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
  vec3 v = inM * x;
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return clamp(outM * (a / b), 0.0, 1.0);
}
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

// sun visibility: sample depth (far plane = sky) and cloud transmittance around the sun position
float sunVis() {
  if (sunUV.z < 0.5) return 0.0;
  float v = 0.0;
  for (int i = 0; i < 5; i++) {
    vec2 o = vec2(float(i - 2) * 0.006, float((i * 3) % 5 - 2) * 0.006 * aspect);
    vec2 uv = sunUV.xy + o;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) continue;
    float d = texture2D(tDepth, uv).r;
    float T = texture2D(tCloud, uv).a;
    v += (d > 0.99999 ? 1.0 : 0.0) * T;
  }
  return v / 5.0;
}

vec3 lensFlare(vec2 uv, float vis) {
  vec2 c = vec2(0.5);
  vec2 s = sunUV.xy;
  vec2 dv = c - s;
  vec3 col = vec3(0.0);
  vec2 asp = vec2(1.0, 1.0 / aspect);
  // ghosts along the sun -> centre axis
  for (int i = 0; i < 6; i++) {
    float k = float(i);
    float t = 0.35 + k * 0.32 - (k > 2.5 ? 0.25 : 0.0);
    vec2 gp = s + dv * t * 2.0;
    float r = 0.012 + mod(k * 0.037, 0.07);
    float d = length((uv - gp) / asp);
    float ring = smoothstep(r, r * 0.85, d) * (0.35 + 0.65 * smoothstep(r * 0.4, r, d));
    vec3 tint = vec3(0.6 + 0.4 * sin(k * 1.7), 0.6 + 0.4 * sin(k * 1.7 + 2.1), 0.6 + 0.4 * sin(k * 1.7 + 4.2));
    col += tint * ring * 0.06;
  }
  // halo ring around the centre
  float dh = length((uv - (s + dv * 2.0 * 0.85)) / asp);
  col += vec3(0.4, 0.6, 1.0) * smoothstep(0.03, 0.0, abs(dh - 0.22)) * 0.035;
  // anamorphic streak + starburst at the sun
  vec2 ds = (uv - s) / asp;
  float streak = exp(-abs(ds.y) * 260.0) * exp(-abs(ds.x) * 3.0);
  float ang = atan(ds.y, ds.x);
  float star = pow(abs(cos(ang * 4.0 + 0.3)), 30.0) * exp(-length(ds) * 9.0);
  col += sunCol * (streak * 0.18 + star * 0.35);
  return col * vis * flare;
}

void main(){
  vec2 uv = vUv;
  vec2 d = uv - 0.5;
  float r2 = dot(d, d);
  vec2 dir = d * (0.010 * speed);
  float caAmt = ca * (0.6 + r2 * 3.0) + speed * 0.0012 + dmg * 0.004;
  vec3 acc = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    float k = float(i) / 2.0;
    vec2 o = -dir * k;
    acc.r += texture2D(tScene, uv + o + d * caAmt).r;
    acc.g += texture2D(tScene, uv + o).g;
    acc.b += texture2D(tScene, uv + o - d * caAmt).b;
  }
  vec3 col = acc / 3.0;
  col += texture2D(tBloom, uv).rgb * bloomGain;
  float vis = sunVis();
  col += lensFlare(uv, vis);
  col *= exposure;
  col += flash * vec3(1.0, 0.85, 0.7);
  // grade
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l), col, sat);
  col = col * gain + lift * (1.0 - smoothstep(0.0, 0.4, l));
  col = aces(col * white);
  col = pow(col, vec3(1.0 / 2.2));
  // damage: red edge pulse + desaturate
  float edge = smoothstep(0.08, 0.5, r2 * 2.2);
  col = mix(col, vec3(dot(col, vec3(0.33))), dmg * 0.35);
  col += vec3(0.55, 0.0, 0.0) * edge * dmg * (0.6 + 0.4 * sin(time * 9.0));
  // in-cloud veil + vignette
  col = mix(col, vec3(0.85, 0.88, 0.92), inCloud * 0.08 * edge);
  col *= 1.0 - vig * smoothstep(0.2, 0.9, r2 * 2.0);
  float g = hash(uv * res + fract(time * 7.0)) - 0.5;
  col += g * (grain + 1.0 / 255.0);
  col *= fade;
  gl_FragColor = vec4(col, 1.0);
}`,$_=`
precision highp float;
uniform sampler2D tCloud; uniform vec2 texel; varying vec2 vUv;
void main(){
  // 4 bilinear taps = soft 4x4 tent: hides the low-res raymarch dither
  vec2 o = texel * 1.0;
  vec4 c = texture2D(tCloud, vUv + vec2(-o.x, -o.y)) + texture2D(tCloud, vUv + vec2(o.x, -o.y))
         + texture2D(tCloud, vUv + vec2(-o.x, o.y)) + texture2D(tCloud, vUv + vec2(o.x, o.y));
  gl_FragColor = c * 0.25;
}`,_l=class{constructor(e,t){this.renderer=e,this.opts=t,this.w=4,this.h=4,this.levels=[],this.u={bloomGain:{value:.32},exposure:{value:1},time:{value:0},ca:{value:.0018},vig:{value:.45},grain:{value:.018},speed:{value:0},flash:{value:0},dmg:{value:0},res:{value:new ze(1,1)},aspect:{value:1},sunUV:{value:new E(0,0,0)},sunCol:{value:new ae(1,.9,.7)},flare:{value:1},lift:{value:new E(0,.004,.012)},gain:{value:new E(1,1,1)},sat:{value:1.08},white:{value:1},inCloud:{value:0},fade:{value:1},tDepth:{value:null},tCloud:{value:null}},this.down=new Gn(Eh(Y_,{tSrc:{value:null},texel:{value:new ze},karis:{value:0},thresh:{value:2.6}})),this.up=new Gn(Eh(Z_,{tSrc:{value:null},texel:{value:new ze},radius:{value:1}},{blending:Vn,transparent:!0})),this.comp=new Gn(Eh(K_,{tScene:{value:null},tBloom:{value:null},...this.u}));let n="uniform float zNdc; varying vec2 vUv; void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, zNdc, 1.0); }";this.cloudComp=new Gn(new xt({vertexShader:n,fragmentShader:$_,uniforms:{tCloud:{value:null},zNdc:{value:.99},texel:{value:new ze}},depthTest:!0,depthWrite:!1,depthFunc:zi,toneMapped:!1,transparent:!0,blending:Gi,blendEquation:Ti,blendSrc:ri,blendDst:sa})),this.hdr=null,this.whiteTex=new Hi(new Uint8Array([255,255,255,255]),1,1),this.whiteTex.needsUpdate=!0}rtOpts(e={}){return{type:qt,format:kt,minFilter:st,magFilter:st,depthBuffer:!1,generateMipmaps:!1,colorSpace:At,...e}}resize(e,t){this.w=e,this.h=t,this.u.res.value.set(e,t),this.u.aspect.value=e/t,this.hdr?.dispose();let n=new Jn(e,t);n.type=Rn,this.hdr=new Pt(e,t,this.rtOpts({depthBuffer:!0,samples:this.opts.msaa,depthTexture:n})),this.levels.forEach(a=>a.dispose()),this.levels=[];let i=Math.max(2,e>>1),r=Math.max(2,t>>1);for(let a=0;a<this.opts.bloomLevels;a++)this.levels.push(new Pt(i,r,this.rtOpts())),i=Math.max(2,i>>1),r=Math.max(2,r>>1)}render(e,t,n){let i=this.renderer;i.setRenderTarget(this.hdr),i.autoClear=!0,t.layers.set(0),i.render(e,t);let r={calls:i.info.render.calls,triangles:i.info.render.triangles},a=this.whiteTex;if(n&&n.enabled){n.render(i,t,this.hdr.depthTexture),a=n.rt.texture,this.cloudComp.material.uniforms.tCloud.value=a;let d=this.cloudComp.material.uniforms;d.texel.value.set(1/n.rt.width,1/n.rt.height);let m=t.near,x=t.far,g=350;d.zNdc.value=(x+m)/(x-m)-2*x*m/((x-m)*g),i.autoClear=!1,this.cloudComp.render(i,this.hdr)}i.setRenderTarget(this.hdr),i.autoClear=!1,t.layers.set(1),i.render(e,t),t.layers.set(0),i.autoClear=!0,this.sceneInfo={calls:i.info.render.calls,triangles:i.info.render.triangles,opaque:r};let o=this.down.material.uniforms,c=this.up.material.uniforms,l=this.hdr.texture,h=this.w,f=this.h;for(let d=0;d<this.levels.length;d++)o.tSrc.value=l,o.texel.value.set(1/h,1/f),o.karis.value=d===0?1:0,this.down.render(i,this.levels[d]),l=this.levels[d].texture,h=this.levels[d].width,f=this.levels[d].height;i.autoClear=!1;for(let d=this.levels.length-1;d>0;d--)c.tSrc.value=this.levels[d].texture,c.texel.value.set(1/this.levels[d].width,1/this.levels[d].height),this.up.render(i,this.levels[d-1]);i.autoClear=!0;let u=this.comp.material.uniforms;u.tScene.value=this.hdr.texture,u.tBloom.value=this.levels[0].texture,u.tDepth.value=this.hdr.depthTexture,u.tCloud.value=a,this.comp.render(i,null)}};Zt();ci();var J_=.02,j_=64,Tf="varying vec2 vUv; void main(){ vUv = position.xy*0.5+0.5; gl_Position = vec4(position.xy,0.,1.); }",Q_=`
precision highp float;
uniform sampler2D tSrc; varying vec2 vUv;
const float A = ${J_.toFixed(5)}; const float M = ${j_.toFixed(3)};
void main(){
  vec3 y = texture2D(tSrc, vUv).rgb;
  gl_FragColor = vec4(A * (exp(y * log(1.0 + M / A)) - 1.0), 1.0);
}`,ev=`
precision highp float;
uniform sampler2D tSrc; uniform float lod; varying vec2 vUv;
void main(){ gl_FragColor = vec4(textureLod(tSrc, vUv, lod).rgb, 1.0); }`,tv=`
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}`,nv=`
precision highp float;
uniform sampler2D tSky; uniform float gain; uniform vec3 sunDir; uniform vec3 sunCol; uniform float sunSize;
varying vec3 vDir;
void main(){
  vec3 d = normalize(vDir);
  float u1 = atan(d.x, -d.z) * 0.15915494 + 0.5;
  float u2 = fract(u1 + 0.5) - 0.5;
  float v = asin(clamp(d.y, -1.0, 1.0)) * 0.31830989 + 0.5;
  float du = min(fwidth(u1), fwidth(u2));
  vec3 c = textureGrad(tSky, vec2(u1, v), vec2(du, dFdx(v)), vec2(du, dFdy(v))).rgb * gain;
  float s = dot(d, sunDir);
  float disc = smoothstep(cos(sunSize), cos(sunSize * 0.8), s);
  float horizon = smoothstep(-0.01, 0.02, d.y);
  c += sunCol * (disc * 60.0 + pow(max(s, 0.0), 900.0) * 6.0) * horizon;
  gl_FragColor = vec4(c, 1.0);
}`,vl=class{constructor(e,t){this.renderer=e,this.scene=t,this.rt=null,this.sunDir=new E(0,1,0),this.sunCol=new ae(1,1,1)}async load(e,t){let n=await new Promise((m,x)=>new un().load(e.url,m,void 0,x));n.colorSpace=en,n.generateMipmaps=!1,n.minFilter=n.magFilter=st,n.wrapS=$t;let i=this.renderer,r=Math.min(n.image.width,t.skyW),a=r/2;this.dispose(),this.rt=new Pt(r,a,{type:qt,format:kt,colorSpace:At,minFilter:Bt,magFilter:st,generateMipmaps:!0,depthBuffer:!1,wrapS:$t});let o=new Gn(new xt({vertexShader:Tf,fragmentShader:Q_,uniforms:{tSrc:{value:n}},depthTest:!1,depthWrite:!1}));o.render(i,this.rt),n.dispose(),o.material.dispose(),this.fogRT=new Pt(256,128,{type:qt,format:kt,colorSpace:At,minFilter:st,magFilter:st,generateMipmaps:!1,depthBuffer:!1,wrapS:$t});let c=new Gn(new xt({vertexShader:Tf,fragmentShader:ev,uniforms:{tSrc:{value:this.rt.texture},lod:{value:Math.log2(r/256)+.7}},depthTest:!1,depthWrite:!1}));c.render(i,this.fogRT),c.material.dispose(),Kt.tFogSky.value=this.fogRT.texture,Kt.fogP.value.w=e.fogGain??1;let l=Yt.degToRad(e.sunEl),h=Yt.degToRad(e.sunAz);this.sunDir.set(Math.cos(l)*Math.sin(h),Math.sin(l),-Math.cos(l)*Math.cos(h)).normalize(),this.sunCol.setRGB(...e.sunCol),Kt.fogSun.value.copy(this.sunDir),Kt.fogSunCol.value.copy(this.sunCol).multiplyScalar(e.hazeSun??.35);let f=new hs(1,48,32),u=new xt({vertexShader:tv,fragmentShader:nv,side:jt,depthWrite:!1,depthTest:!1,uniforms:{tSky:{value:this.rt.texture},gain:{value:e.gain??1},sunDir:{value:this.sunDir},sunCol:{value:this.sunCol},sunSize:{value:Yt.degToRad(e.sunSize??.55)}},toneMapped:!1});this.dome=new at(f,u),this.dome.frustumCulled=!1,this.dome.renderOrder=-1e3,this.scene.add(this.dome);let d=new pr(i);return this.rt.texture.mapping=ar,this.env=d.fromEquirectangular(this.rt.texture),d.dispose(),this.scene.environment=this.env.texture,this.scene.environmentIntensity=e.envGain??1,this}dispose(){this.dome&&(this.scene.remove(this.dome),this.dome.geometry.dispose(),this.dome.material.dispose(),this.dome=null),this.rt?.dispose(),this.fogRT?.dispose(),this.env?.dispose(),this.rt=null}update(e){this.dome&&(this.dome.position.copy(e.position),this.dome.scale.setScalar(e.far*.9))}};Zt();ci();var Te=(s,e,t)=>Math.min(t,Math.max(e,s)),Wn=(s,e,t)=>s+(e-s)*t;function Ah(s){return new Promise((e,t)=>{let n=new Image;n.decoding="async",n.onload=()=>e(n),n.onerror=()=>t(new Error("image failed: "+s)),n.src=s})}var iv=`
varying vec2 vUv;
void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`,sv=`
precision highp float;
precision highp sampler3D;
uniform sampler2D tDepth; uniform sampler2D tWeather; uniform sampler3D tNoise;
uniform mat4 invProj; uniform mat4 camWorld; uniform vec3 camPos;
uniform vec4 layer;     // base, top, tile size, coverage
uniform vec4 shp;       // channel mix (0 = sea, 1 = scattered), density, noise scale, erosion
uniform vec3 wind;      // xz offset (m), time
uniform vec3 sunDir; uniform vec3 sunCol; uniform vec3 ambTop; uniform vec3 ambBot;
uniform float maxDist; uniform float steps; uniform float ext; uniform float pixAng;
float gLodW = 0.0, gLodN = 0.0;
varying vec2 vUv;
${wi}

float colHeight(vec2 xz) {
  vec3 w = textureLod(tWeather, (xz + wind.xy) / layer.z, gLodW).rgb;
  float c = mix(w.r, w.g, shp.x);
  float cov = layer.w * (0.8 + 0.4 * w.b);
  float h = clamp((c - (1.0 - cov)) / max(cov, 0.05), 0.0, 1.0);
  // towers where the large-scale field is high, low flat sheets elsewhere
  // dome-shaped columns (sqrt turns the cone of a distance field into a rounded top)
  return smoothstep(0.02, 0.6, h) * (0.35 + 0.8 * w.b * w.b);
}

float shape(vec3 p) {
  float h = (p.y - layer.x) / (layer.y - layer.x);
  if (h < 0.0 || h > 1.0) return 0.0;
  float ch = colHeight(p.xz);
  return smoothstep(0.0, 0.1, h) * smoothstep(0.0, 0.2, ch - h);
}

float density(vec3 p, float detail, float far) {
  float h = (p.y - layer.x) / (layer.y - layer.x);
  if (h < 0.0 || h > 1.0) return 0.0;
  vec3 q = (p + vec3(wind.x * 0.6, wind.z * 3.0, wind.y * 0.6)) / shp.z;
  vec2 nn = textureLod(tNoise, q * 0.37, gLodN + 0.5).rg;
  // domain-warp the column field so the cloud sides billow instead of forming vertical curtains
  vec2 warp = (nn - 0.5) * shp.z * 0.55 * (1.0 - far);
  float ch = colHeight(p.xz + warp);
  float s = smoothstep(0.0, 0.1, h) * smoothstep(0.0, 0.2, ch - h);
  if (s <= 0.002) return 0.0;
  float n = mix(textureLod(tNoise, q, gLodN).r, 0.62, far);
  float d = s - (1.0 - n) * shp.w * (1.0 - 0.5 * s);
  if (detail > 0.5 && d > 0.0 && d < 0.35) d -= (1.0 - textureLod(tNoise, q * 4.3, gLodN + 2.1).g) * 0.12;
  return max(d, 0.0) * shp.y;
}

float hg(float mu, float g) { float g2 = g * g; return (1.0 - g2) / pow(1.0 + g2 - 2.0 * g * mu, 1.5); }
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }

void main() {
  // farthest depth of the 2x2 full-res footprint: silhouettes of near objects are handled by the composite
  vec2 hp = vec2(dFdx(vUv.x), dFdy(vUv.y)) * 0.3;
  float dz = max(max(texture2D(tDepth, vUv + vec2(-hp.x, -hp.y)).r, texture2D(tDepth, vUv + vec2(hp.x, -hp.y)).r),
                 max(texture2D(tDepth, vUv + vec2(-hp.x, hp.y)).r, texture2D(tDepth, vUv + vec2(hp.x, hp.y)).r));
  vec4 vp = invProj * vec4(vUv * 2.0 - 1.0, dz * 2.0 - 1.0, 1.0);
  vp /= vp.w;
  float sceneDist = dz >= 0.99999 ? 1e9 : length(vp.xyz);
  vec3 dir = normalize((camWorld * vec4(vp.xyz, 0.0)).xyz);
  float dy = abs(dir.y) < 1e-5 ? 1e-5 : dir.y;
  float tb = (layer.x - camPos.y) / dy, tt = (layer.y - camPos.y) / dy;
  float t0 = max(min(tb, tt), 0.0), t1 = max(tb, tt);
  if (camPos.y > layer.x && camPos.y < layer.y) t0 = 0.0;
  t1 = min(t1, min(sceneDist, maxDist));
  if (t1 <= t0) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }

  float mu = dot(dir, sunDir);
  float phase = mix(1.0, hg(mu, 0.62) * 0.9 + hg(mu, -0.2) * 0.1, 0.4);
  float span = t1 - t0;
  float coarse = max(span / steps, 45.0);
  float dt = coarse;
  float t = t0 + dt * ign(gl_FragCoord.xy);
  float T = 1.0;
  vec3 L = vec3(0.0);
  vec3 fogC = acFogSky(dir);
  bool fine = false;
  float empty = 0.0;
  for (int i = 0; i < 110; i++) {
    if (float(i) >= steps * 2.2 || t > t1 || T < 0.02) break;
    vec3 p = camPos + dir * t;
    float fp = t * pixAng * 2.0;
    gLodW = log2(max(fp / (layer.z / 512.0), 1.0));
    gLodN = log2(max(fp / (shp.z / 64.0), 1.0));
    if (!fine) {
      if (shape(p) > 0.0) { fine = true; t = max(t0, t - dt); dt = clamp(t * 0.004, 8.0, 90.0); empty = 0.0; continue; }
      t += dt; dt = max(coarse, t * 0.02);
      continue;
    }
    float far = smoothstep(7000.0, 18000.0, t);
    float den = density(p, t < 5000.0 ? 1.0 : 0.0, far);
    if (den > 0.0) {
      empty = 0.0;
      float dl1 = density(p + sunDir * 60.0, 0.0, far);
      float dl2 = density(p + sunDir * 220.0, 0.0, far);
      float od = (dl1 * 60.0 + dl2 * 160.0) * ext;
      float beer = max(exp(-od), exp(-od * 0.25) * 0.45);
      float h = clamp((p.y - layer.x) / (layer.y - layer.x), 0.0, 1.0);
      vec3 amb = mix(ambBot, ambTop, smoothstep(0.0, 0.8, h));
      float powder = 1.0 - exp(-den * ext * 140.0);
      vec3 S = sunCol * beer * phase * mix(0.5, 1.0, powder) + amb * (0.6 + 0.4 * powder);
      float a = 1.0 - exp(-den * ext * dt);
      float ff = 1.0 - exp(-acFogOD(camPos.y, dir, t));
      S = mix(S, fogC, ff);
      L += T * S * a;
      T *= 1.0 - a;
    } else {
      empty += 1.0;
      if (empty > 6.0 && shape(p) <= 0.0) { fine = false; dt = max(coarse, t * 0.02); }
    }
    t += dt;
    if (fine) dt = clamp(t * 0.004, 8.0, 90.0) * (den > 0.0 ? 1.0 : 1.5);
  }
  gl_FragColor = vec4(L, T);
}`,wf={none:null,sea:{mix:0,base:1500,top:2800,tile:26e3,cov:.5,density:1,noise:760,erosion:.72},scattered:{mix:1,base:1400,top:2300,tile:42e3,cov:.7,density:1,noise:700,erosion:.62},broken:{mix:0,base:1700,top:3e3,tile:24e3,cov:.36,density:1,noise:760,erosion:.7}},yl=class{constructor(e){this.tier=e,this.enabled=!1,this.scale=e.cloudScale,this.u={tDepth:{value:null},tWeather:{value:null},tNoise:{value:null},invProj:{value:new Be},camWorld:{value:new Be},camPos:{value:new E},layer:{value:new Ze(1500,2700,26e3,.6)},shp:{value:new Ze(0,1,1e3,.6)},wind:{value:new E},sunDir:{value:new E(0,1,0)},sunCol:{value:new ae(3,3,3)},ambTop:{value:new ae(.6,.7,.9)},ambBot:{value:new ae(.3,.32,.36)},maxDist:{value:42e3},pixAng:{value:.0015},steps:{value:e.cloudSteps},ext:{value:.03},...qi()},this.pass=new Gn(new xt({vertexShader:iv,fragmentShader:sv,uniforms:this.u,depthTest:!1,depthWrite:!1})),this.rt=new Pt(4,4,{type:qt,format:kt,minFilter:st,magFilter:st,depthBuffer:!1,generateMipmaps:!1,colorSpace:At}),this.preset=null,this.windV=new ze(6,2)}async load(){let[e,t]=await Promise.all([Ah("assets/tex/weather.png"),Ah("assets/tex/noise3d.png")]),n=new Dt(e);n.wrapS=n.wrapT=$t,n.minFilter=Bt,n.magFilter=st,n.colorSpace=en,n.needsUpdate=!0,this.u.tWeather.value=n;let i=document.createElement("canvas");i.width=e.width,i.height=e.height;let r=i.getContext("2d",{willReadFrequently:!0});r.drawImage(e,0,0),this.wdata=r.getImageData(0,0,i.width,i.height).data,this.wsize=i.width;let a=document.createElement("canvas");a.width=t.width,a.height=t.height;let o=a.getContext("2d",{willReadFrequently:!0});o.drawImage(t,0,0);let c=o.getImageData(0,0,512,512).data,l=64,h=new Uint8Array(l*l*l*2);for(let u=0;u<l;u++){let d=u%8*64,m=Math.floor(u/8)*64;for(let x=0;x<l;x++)for(let g=0;g<l;g++){let p=((m+x)*512+d+g)*4,T=((u*l+x)*l+g)*2;h[T]=c[p],h[T+1]=c[p+1]}}let f=new Xs(h,l,l,l);f.format=ai,f.type=rn,f.wrapS=f.wrapT=f.wrapR=$t,f.minFilter=Bt,f.magFilter=st,f.generateMipmaps=!0,f.unpackAlignment=1,f.needsUpdate=!0,this.u.tNoise.value=f}setPreset(e,t){this.preset=e,this.enabled=!!e&&this.tier.clouds,e&&(this.u.layer.value.set(e.base,e.top,e.tile,e.cov),this.u.maxDist.value=e.maxDist||7e4,this.u.shp.value.set(e.mix,e.density,e.noise,e.erosion),this.u.sunDir.value.copy(t.sunDir),this.u.sunCol.value.copy(t.cloudSun),this.u.ambTop.value.copy(t.ambTop),this.u.ambBot.value.copy(t.ambBot))}resize(e,t){this.rt.setSize(Math.max(8,Math.round(e/this.scale)),Math.max(8,Math.round(t/this.scale)))}update(e){let t=this.u.wind.value;t.x+=this.windV.x*e,t.y+=this.windV.y*e,t.z+=e}render(e,t,n){let i=this.u;i.tDepth.value=n,i.invProj.value.copy(t.projectionMatrixInverse),i.camWorld.value.copy(t.matrixWorld),i.camPos.value.setFromMatrixPosition(t.matrixWorld),i.pixAng.value=Yt.degToRad(t.fov)/this.rt.height,this.pass.render(e,this.rt)}densityAt(e){let t=this.preset;if(!t||!this.wdata)return 0;let n=(e.y-t.base)/(t.top-t.base);if(n<0||n>1)return 0;let i=this.wsize,r=this.u.wind.value,a=(e.x+r.x)/t.tile%1,o=(e.z+r.y)/t.tile%1;a<0&&(a+=1),o<0&&(o+=1);let c=Math.floor(a*i)%i,h=((i-1-Math.floor(o*i)%i)*i+c)*4,f=this.wdata,u=(t.mix?f[h+1]:f[h])/255,d=f[h+2]/255,m=t.cov*(.8+.4*d),x=Te((u-(1-m))/Math.max(m,.05),0,1);x=(x<.02?0:x>.6?1:((x-.02)/.58)**2*(3-2*(x-.02)/.58))*(.35+.8*d*d);let g=(p,T,C)=>{let y=Te((C-p)/(T-p),0,1);return y*y*(3-2*y)};return g(0,.1,n)*g(0,.2,x-n)*(1-t.erosion*.45)}};Zt();ci();var rv=`
varying vec3 vWorld;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,av=`
precision highp float;
uniform sampler2D tNormal; uniform sampler2D tSky; uniform float skyLod;
uniform sampler2D tWeather; uniform vec4 cLayer; uniform vec4 cShp; uniform vec3 cWind; uniform float cOn;
uniform vec3 sunDir; uniform vec3 sunCol; uniform float time;
uniform vec3 deepCol; uniform vec3 scatCol;
uniform vec4 ships[6];      // x, z, heading, half length (0 = unused)
varying vec3 vWorld;
${wi}

vec3 skyAt(vec3 d, float lod) {
  vec2 uv = vec2(atan(d.x, -d.z) * 0.15915494 + 0.5, asin(clamp(d.y, -1.0, 1.0)) * 0.31830989 + 0.5);
  return textureLod(tSky, uv, lod).rgb;
}
float cloudShadow(vec3 p) {
  if (cOn < 0.5 || sunDir.y < 0.02) return 1.0;
  float mid = mix(cLayer.x, cLayer.y, 0.3);
  vec3 q = p + sunDir * (mid - p.y) / sunDir.y;
  vec3 w = texture2D(tWeather, (q.xz + cWind.xy) / cLayer.z).rgb;
  float c = mix(w.r, w.g, cShp.x);
  float cov = cLayer.w * (0.8 + 0.4 * w.b);
  float ch = clamp((c - (1.0 - cov)) / max(cov, 0.05), 0.0, 1.0);
  ch = smoothstep(0.02, 0.6, ch) * (0.35 + 0.8 * w.b * w.b);
  return 1.0 - 0.7 * smoothstep(0.05, 0.3, ch);
}

void main(){
  vec3 V = cameraPosition - vWorld;
  float dist = length(V);
  V /= dist;
  vec2 p = vWorld.xz;
  float fade = 1.0 / (1.0 + dist / 2500.0);
  vec4 n1 = texture2D(tNormal, p / 230.0 + time * vec2(0.011, 0.004));
  vec4 n2 = texture2D(tNormal, p / 61.0 + time * vec2(-0.017, 0.021));
  vec4 n3 = texture2D(tNormal, p / 1300.0 + time * vec2(0.002, -0.0015));
  vec2 nxz = (n1.rg * 2.0 - 1.0) * 1.0 + (n2.rg * 2.0 - 1.0) * 0.7 * fade + (n3.rg * 2.0 - 1.0) * 0.9;
  vec3 N = normalize(vec3(nxz.x, 1.6 + dist / 4000.0, nxz.y));
  float crest = clamp(n1.b * 0.7 + n2.b * 0.5 * fade, 0.0, 1.0);

  float NdV = max(dot(N, V), 0.0);
  float F = 0.02 + 0.98 * pow(1.0 - NdV, 5.0);
  vec3 R = reflect(-V, N);
  R.y = abs(R.y);
  float lod = clamp(1.5 + log2(1.0 + dist / 800.0), 0.0, skyLod);
  vec3 refl = skyAt(R, lod);
  float sh = cloudShadow(vWorld);
  float sunUp = clamp(sunDir.y * 3.0, 0.0, 1.0);
  vec3 skyAmb = skyAt(vec3(0.0, 1.0, 0.0), skyLod);
  vec3 body = deepCol * (skyAmb * 0.55 + sunCol * sunUp * 0.12 * sh);
  float sss = pow(max(dot(-V, sunDir) * 0.5 + 0.5, 0.0), 3.0) * crest;
  body += scatCol * sunCol * sss * 0.25 * sh;
  vec3 col = mix(body, refl, F);
  // sun glitter
  vec3 H = normalize(V + sunDir);
  float nh = max(dot(N, H), 0.0);
  col += sunCol * (pow(nh, 900.0) * 30.0 + pow(nh, 120.0) * 0.8) * sh * smoothstep(-0.02, 0.05, sunDir.y);
  // ship wakes
  float foam = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 s = ships[i];
    if (s.w <= 0.0) continue;
    vec2 d = p - s.xy;
    vec2 fw = vec2(sin(s.z), cos(s.z));
    float along = dot(d, fw);
    float lat = dot(d, vec2(fw.y, -fw.x));
    float behind = -along - s.w * 0.85;
    if (behind > -s.w * 0.4 && behind < 2200.0) {
      float wid = 9.0 + s.w * 0.08 + behind * 0.06;
      float core = smoothstep(wid, wid * 0.35, abs(lat)) * exp(-max(behind, 0.0) / 900.0);
      float kelvin = smoothstep(4.0, 0.0, abs(abs(lat) - (s.w * 0.15 + max(behind, 0.0) * 0.36))) * exp(-max(behind, 0.0) / 500.0);
      foam = max(foam, core * (0.55 + 0.45 * n2.b) + kelvin * 0.5 * n1.b);
    }
    // bow wave
    float bow = along - s.w * 0.8;
    if (bow > -s.w * 0.6 && bow < 30.0) foam = max(foam, smoothstep(s.w * 0.17, s.w * 0.11, abs(lat)) * smoothstep(-s.w * 0.6, 0.0, bow) * 0.5 * n2.b * 2.0);
  }
  col = mix(col, (skyAmb * 0.85 + sunCol * sunUp * 0.35 * sh), clamp(foam, 0.0, 1.0) * 0.85);

  float ff = 1.0 - exp(-acFogOD(cameraPosition.y, -V, dist));
  col = mix(col, acFogSky(-V), ff);
  gl_FragColor = vec4(col, 1.0);
}`;function ov(s=90,e=96,t=6,n=9e4){let i=[0,0,0],r=Math.pow(n/t,1/(s-1));for(let c=0;c<s;c++){let l=t*Math.pow(r,c);for(let h=0;h<e;h++){let f=h/e*Math.PI*2;i.push(Math.cos(f)*l,0,Math.sin(f)*l)}}let a=[];for(let c=0;c<e;c++)a.push(0,1+(c+1)%e,1+c);for(let c=0;c<s-1;c++)for(let l=0;l<e;l++){let h=1+c*e+l,f=1+c*e+(l+1)%e,u=h+e,d=f+e;a.push(h,f,u,f,d,u)}let o=new dt;return o.setAttribute("position",new ot(i,3)),o.setIndex(a),o}var Ml=class{constructor(e){this.u={tNormal:{value:null},tSky:{value:null},skyLod:{value:8},tWeather:{value:null},cLayer:{value:new Ze},cShp:{value:new Ze},cWind:{value:new E},cOn:{value:0},sunDir:{value:new E(0,1,0)},sunCol:{value:new ae(1,1,1)},time:{value:0},deepCol:{value:new ae(.012,.045,.07)},scatCol:{value:new ae(.05,.35,.32)},ships:{value:Array.from({length:6},()=>new Ze(0,0,0,0))},...qi()},this.mesh=new at(ov(),new xt({vertexShader:rv,fragmentShader:av,uniforms:this.u,side:Qt})),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10,e.add(this.mesh)}async load(){let e=await new un().loadAsync("assets/tex/ocean_n.png");e.wrapS=e.wrapT=$t,e.colorSpace=en,e.minFilter=Bt,e.anisotropy=4,this.u.tNormal.value=e}setEnv(e,t){this.u.tSky.value=e.rt.texture,this.u.skyLod.value=Math.log2(e.rt.width)-2,this.u.sunDir.value.copy(e.sunDir),this.u.sunCol.value.copy(e.sunCol);let n=t.u;this.u.tWeather.value=n.tWeather.value,this.u.cLayer.value=n.layer.value,this.u.cShp.value=n.shp.value,this.u.cWind.value=n.wind.value,this.u.cOn.value=t.preset?1:0}update(e,t){this.u.time.value+=e,this.mesh.position.set(t.position.x,0,t.position.z)}};Zt();ci();var Ch=1,lv=`
attribute vec3 iPos; attribute vec4 iCol; attribute vec3 iSRF;   // size, rotation, frame
varying vec2 vUv; varying vec4 vCol; varying float vFrame; varying vec3 vFogRay; varying vec2 vCorner;
uniform float stretch;
void main(){
  vec4 mv = modelViewMatrix * vec4(iPos, 1.0);
  float c = cos(iSRF.y), s = sin(iSRF.y);
  vec2 q = position.xy;
  vCorner = q;
  vec2 r = vec2(q.x * c - q.y * s, q.x * s + q.y * c) * iSRF.x;
  mv.xy += r;
  vUv = q + 0.5;
  vCol = iCol; vFrame = iSRF.z;
  vFogRay = (vec4(mv.xyz, 0.0) * viewMatrix).xyz;
  gl_Position = projectionMatrix * mv;
}`,cv=`
precision highp float;
uniform sampler2D tMap; uniform float grid; uniform float kind; uniform vec3 light; uniform vec3 sunCol;
varying vec2 vUv; varying vec4 vCol; varying float vFrame; varying vec3 vFogRay; varying vec2 vCorner;
${wi}
void main(){
  vec4 c;
  if (kind < 0.5) {                     // smoke atlas (2x2 variants)
    float f = floor(vFrame + 0.5);
    vec2 cell = vec2(mod(f, grid), grid - 1.0 - floor(f / grid));
    vec4 t = texture2D(tMap, (vUv + cell) / grid);
    c = vec4(t.rgb * vCol.rgb * light, t.a * vCol.a);
  } else if (kind < 1.5) {              // explosion flipbook
    float f = floor(vFrame);
    vec2 cell = vec2(mod(f, grid), grid - 1.0 - floor(f / grid));
    vec4 t = texture2D(tMap, (vUv + cell) / grid);
    float fire = smoothstep(0.02, 0.22, t.r - t.b) * clamp(1.0 - vFrame / 16.0, 0.0, 1.0);
    vec3 rgb = t.rgb * light * 0.9 + t.rgb * fire * 14.0 * vCol.rgb;
    c = vec4(rgb, t.a * vCol.a);
  } else {                              // procedural glow (additive)
    float r2 = dot(vCorner, vCorner) * 4.0;
    float g = exp(-r2 * 4.5) + exp(-r2 * 30.0) * 2.0;
    c = vec4(vCol.rgb * g * vCol.a, 0.0);
  }
  float fd = length(vFogRay);
  float ff = 1.0 - exp(-acFogOD(cameraPosition.y, vFogRay / max(fd, 1e-3), fd));
  if (kind < 1.5) c.rgb = mix(c.rgb, acFogSky(vFogRay / max(fd, 1e-3)), ff);
  else c.rgb *= 1.0 - ff;
  if (kind < 1.5) { gl_FragColor = vec4(c.rgb * c.a, c.a); }    // premultiplied
  else gl_FragColor = vec4(c.rgb, 0.0);
}`,ga=class{constructor(e,t,n,i,r,a){this.max=t,this.kind=n,this.n=0,this.p=[];let o=new ta;o.setAttribute("position",new ot([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),o.setIndex([0,1,2,0,2,3]),this.aPos=new wn(new Float32Array(t*3),3).setUsage(vn),this.aCol=new wn(new Float32Array(t*4),4).setUsage(vn),this.aSRF=new wn(new Float32Array(t*3),3).setUsage(vn),o.setAttribute("iPos",this.aPos),o.setAttribute("iCol",this.aCol),o.setAttribute("iSRF",this.aSRF),o.instanceCount=0,this.u={tMap:{value:i},grid:{value:r},kind:{value:n},light:{value:new ae(1,1,1)},sunCol:{value:new ae(1,1,1)},stretch:{value:0},...qi()};let c=new xt({vertexShader:lv,fragmentShader:cv,uniforms:this.u,transparent:!0,depthWrite:!1,blending:Gi,blendSrc:ri,blendDst:a==="add"?ri:rr});this.mesh=new at(o,c),this.mesh.frustumCulled=!1,this.mesh.layers.set(Ch),this.mesh.renderOrder=n===2?20:10,e.add(this.mesh),this.geo=o}spawn(e){this.p.length>=this.max&&this.p.shift();let t={x:e.pos.x,y:e.pos.y,z:e.pos.z,vx:e.vel?.x||0,vy:e.vel?.y||0,vz:e.vel?.z||0,life:0,max:e.life||2,s0:e.size||5,s1:e.size1??(e.size||5)*2,rot:e.rot??Math.random()*6.28,vr:e.vr??(Math.random()-.5)*.6,r:e.color?.[0]??1,g:e.color?.[1]??1,b:e.color?.[2]??1,a:e.alpha??1,frame:e.frame??Math.floor(Math.random()*4),drag:e.drag??.6,rise:e.rise??0,fadeIn:e.fadeIn??.08,frames:e.frames||0};return this.p.push(t),t}update(e){let t=this.p,n=0;for(let c=0;c<t.length;c++){let l=t[c];if(l.life+=e,l.life>=l.max)continue;let h=Math.exp(-l.drag*e);l.vx*=h,l.vy=l.vy*h+l.rise*e,l.vz*=h,l.x+=l.vx*e,l.y+=l.vy*e,l.z+=l.vz*e,l.rot+=l.vr*e,t[n++]=l}t.length=n;let i=Math.min(n,this.max),r=this.aPos.array,a=this.aCol.array,o=this.aSRF.array;for(let c=0;c<i;c++){let l=t[c],h=l.life/l.max;r[c*3]=l.x,r[c*3+1]=l.y,r[c*3+2]=l.z;let f=Math.min(1,l.life/l.fadeIn),u=l.a*f*(this.kind===1?1-hv(.75,1,h):(1-h)*(1-h*.3));a[c*4]=l.r,a[c*4+1]=l.g,a[c*4+2]=l.b,a[c*4+3]=u,o[c*3]=l.s0+(l.s1-l.s0)*(1-(1-h)*(1-h)),o[c*3+1]=l.rot,o[c*3+2]=this.kind===1?Math.min(l.frames-1,h*l.frames):l.frame}this.geo.instanceCount=i,this.aPos.needsUpdate=this.aCol.needsUpdate=this.aSRF.needsUpdate=!0}},hv=(s,e,t)=>{let n=Te((t-s)/(e-s),0,1);return n*n*(3-2*n)},uv=`
attribute vec3 side; attribute vec2 wa;   // side = offset direction (world), wa = (width, alpha)
varying float vA; varying vec3 vFogRay; varying float vS;
uniform float tw;
void main(){
  vec3 p = position + side * wa.x;
  vA = wa.y;
  vS = sign(dot(side, side) > 0.0 ? 1.0 : 0.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vFogRay = (vec4(mv.xyz, 0.0) * viewMatrix).xyz;
  gl_Position = projectionMatrix * mv;
}`,dv=`
precision highp float;
uniform vec3 tint; uniform vec3 light;
varying float vA; varying vec3 vFogRay;
${wi}
void main(){
  float fd = length(vFogRay);
  vec3 d = vFogRay / max(fd, 1e-3);
  float ff = 1.0 - exp(-acFogOD(cameraPosition.y, d, fd));
  vec3 c = mix(tint * light, acFogSky(d), ff);
  float a = vA * (1.0 - ff * 0.7);
  gl_FragColor = vec4(c * a, a);
}`,Rh=class{constructor(e,t=6e3){this.max=t,this.trails=new Set;let n=new dt;this.pos=new Float32Array(t*2*3),this.side=new Float32Array(t*2*3),this.wa=new Float32Array(t*2*2),n.setAttribute("position",new gt(this.pos,3).setUsage(vn)),n.setAttribute("side",new gt(this.side,3).setUsage(vn)),n.setAttribute("wa",new gt(this.wa,2).setUsage(vn)),this.idx=new Uint32Array(t*6),n.setIndex(new gt(this.idx,1).setUsage(vn)),this.u={tint:{value:new ae(1,1,1)},light:{value:new ae(1,1,1)},...qi()};let i=new xt({vertexShader:uv,fragmentShader:dv,uniforms:this.u,transparent:!0,depthWrite:!1,side:Qt,blending:Gi,blendSrc:ri,blendDst:rr});this.mesh=new at(n,i),this.mesh.frustumCulled=!1,this.mesh.layers.set(Ch),this.mesh.renderOrder=5,e.add(this.mesh),this.geo=n}create(e={}){let t={pts:[],width:e.width??1,life:e.life??2,alpha:e.alpha??.5,grow:e.grow??0,minDist:e.minDist??6,dead:!1,emit:!0};return this.trails.add(t),t}push(e,t,n=1){if(!e.emit)return;let i=e.pts,r=i[i.length-1];if(r&&r.p.distanceToSquared(t)<e.minDist*e.minDist){i.length>1&&(r.p.copy(t),r.s=n);return}i.push({p:t.clone(),age:0,s:n}),i.length>160&&i.shift()}update(e,t){let n=0,i=0,r=this.pos,a=this.side,o=this.wa,c=this.idx,l=new E,h=new E,f=new E;for(let d of this.trails){let m=d.pts;for(let g of m)g.age+=e;for(;m.length&&m[0].age>d.life;)m.shift();if(d.dead&&m.length<2){this.trails.delete(d);continue}if(m.length<2)continue;if(n+m.length*2>this.max*2)break;let x=n;for(let g=0;g<m.length;g++){let p=m[g],T=m[Math.max(0,g-1)].p,C=m[Math.min(m.length-1,g+1)].p;l.subVectors(C,T).normalize(),h.subVectors(t,p.p).normalize(),f.crossVectors(l,h).normalize();let y=p.age/d.life,b=(d.width+d.grow*p.age)*.5,S=d.alpha*p.s*(1-y)*(1-y)*Math.min(1,g/2)*(g===m.length-1?.6:1);for(let R=-1;R<=1;R+=2)r[n*3]=p.p.x,r[n*3+1]=p.p.y,r[n*3+2]=p.p.z,a[n*3]=f.x*R,a[n*3+1]=f.y*R,a[n*3+2]=f.z*R,o[n*2]=b,o[n*2+1]=S,n++}for(let g=0;g<m.length-1;g++){let p=x+g*2;c[i++]=p,c[i++]=p+1,c[i++]=p+2,c[i++]=p+1,c[i++]=p+3,c[i++]=p+2}}let u=this.geo;u.setDrawRange(0,i),u.attributes.position.needsUpdate=u.attributes.side.needsUpdate=u.attributes.wa.needsUpdate=!0,u.index.needsUpdate=!0}},fv=`
varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`,pv=`
precision highp float;
uniform float power; uniform float time; uniform vec3 hot; uniform vec3 cool;
varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){
  float x = vUv.y;                          // 0 at nozzle, 1 at the tip
  float rim = pow(abs(dot(vN, vV)), 1.5);
  float diamonds = 0.65 + 0.35 * sin(x * 38.0 - time * 70.0);
  float flick = 0.85 + 0.15 * sin(time * 91.0 + x * 13.0);
  float core = (1.0 - x) * (1.0 - x);
  vec3 c = mix(cool, hot, core) * (core * 1.6 + 0.25) * diamonds * flick * rim;
  float a = power * (1.0 - smoothstep(0.55, 1.0, x));
  gl_FragColor = vec4(c * a, 0.0);
}`;function Sl(s,e){let t=new Qn(s*.25,s*.95,e,16,1,!0);t.translate(0,-e/2,0),t.rotateX(-Math.PI/2);let n=t.attributes.uv,i=t.attributes.position;for(let o=0;o<n.count;o++)n.setY(o,Te(-i.getZ(o)/e,0,1));let r=new xt({vertexShader:fv,fragmentShader:pv,transparent:!0,depthWrite:!1,side:Qt,blending:Gi,blendSrc:ri,blendDst:ri,uniforms:{power:{value:0},time:{value:0},hot:{value:new ae(3.2,2.6,2.4)},cool:{value:new ae(1.6,.55,.9)}}}),a=new at(t,r);return a.layers.set(Ch),a.frustumCulled=!1,a.renderOrder=30,a}var bl=class{constructor(e,t){this.scene=e,this.tier=t,this.time=0}async load(){let e=new un,[t,n]=await Promise.all([e.loadAsync("assets/fx/smoke.webp"),e.loadAsync("assets/fx/explosion.webp")]);for(let r of[t,n])r.colorSpace=Et,r.premultiplyAlpha=!1;let i=this.tier.particles;this.smoke=new ga(this.scene,i,0,t,2,"alpha"),this.explo=new ga(this.scene,Math.round(i/6),1,n,6,"alpha"),this.glow=new ga(this.scene,Math.round(i/2),2,null,1,"add"),this.trails=new Rh(this.scene,this.tier.trailPts)}setLight(e){let t=new ae(...e.ambTop).multiplyScalar(.55).add(new ae(...e.cloudSun).multiplyScalar(.28));this.smoke.u.light.value.copy(t),this.explo.u.light.value.copy(t).multiplyScalar(.9),this.trails.u.light.value.copy(t).multiplyScalar(1.1)}puff(e,t={}){return this.smoke.spawn({pos:e,...t})}flash(e,t,n,i=.15,r){return this.glow.spawn({pos:e,vel:r,size:t,size1:t*1.3,color:n,life:i,alpha:1,fadeIn:.001,drag:0})}explosion(e,t=1,n){let i=n?n.clone().multiplyScalar(.25):new E;for(let r=0;r<3;r++){let a=new E(Math.random()-.5,Math.random()-.5,Math.random()-.5).multiplyScalar(14*t);this.explo.spawn({pos:e.clone().add(a),vel:i,size:22*t,size1:46*t,life:2.6+Math.random()*.8,frames:36,rise:4,drag:.8,color:[1,1,1],alpha:1,fadeIn:.02})}this.flash(e,90*t,[8,5,2.4],.35);for(let r=0;r<10*t;r++){let a=new E(Math.random()-.5,Math.random()-.2,Math.random()-.5).normalize().multiplyScalar(60+Math.random()*120);this.glow.spawn({pos:e.clone(),vel:a.add(i),size:3,size1:1,color:[6,3,1.2],life:.6+Math.random()*.6,drag:1.5,fadeIn:.001})}for(let r=0;r<5;r++)this.smoke.spawn({pos:e.clone().add(new E((Math.random()-.5)*30,(Math.random()-.5)*20,(Math.random()-.5)*30)),vel:i,size:30*t,size1:70*t,life:6+Math.random()*3,color:[.45,.42,.4],alpha:.7,rise:2,drag:.4})}splash(e,t=1){for(let n=0;n<8;n++)this.smoke.spawn({pos:e.clone().add(new E((Math.random()-.5)*10*t,0,(Math.random()-.5)*10*t)),vel:new E((Math.random()-.5)*10,25+Math.random()*35*t,(Math.random()-.5)*10),size:10*t,size1:34*t,life:2.5,color:[1.1,1.15,1.2],alpha:.85,rise:-16,drag:.5})}update(e,t){this.time+=e,this.smoke.update(e),this.explo.update(e),this.glow.update(e),this.trails.update(e,t.position)}};var xr=Math.PI/180,Tl=class{constructor(){this.steer=0,this.pitch=0,this.sens=1,this.invert=!1,this.hasMotion=!1,this._raw={steer:0,elev:0,ok:!1},this._neutral={steer:0,elev:35*xr},this._needCal=!0,this._calBuf=[],this.keys=new Set,this.hold={gun:0,boost:0,brake:0,msl:0},this.events=new Set,this.enabled=!0,this._bound=!1}bindButtons(){if(this._bound)return;this._bound=!0;let e=(t,n,i)=>{let r=document.getElementById(t);if(!r)return;let a=c=>{c.preventDefault(),n&&(this.hold[n]=1),i&&this.events.add(i),r.classList.add("down");try{r.setPointerCapture(c.pointerId)}catch{}navigator.vibrate?.(6)},o=c=>{c.preventDefault(),n&&(this.hold[n]=0),r.classList.remove("down")};r.addEventListener("pointerdown",a),r.addEventListener("pointerup",o),r.addEventListener("pointercancel",o),r.addEventListener("lostpointercapture",o),r.addEventListener("contextmenu",c=>c.preventDefault())};e("b-gun","gun"),e("b-msl","msl","msl"),e("b-sp",null,"sp"),e("b-tgt",null,"tgt"),e("b-boost","boost"),e("b-brake","brake"),e("b-flare",null,"flare"),window.addEventListener("keydown",t=>{if(this.keys.has(t.code))return;this.keys.add(t.code);let n={KeyF:"msl",Enter:"msl",KeyQ:"sp",KeyE:"tgt",KeyR:"flare",Escape:"pause",KeyP:"pause"};n[t.code]&&this.events.add(n[t.code]),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.code)&&t.preventDefault()}),window.addEventListener("keyup",t=>this.keys.delete(t.code)),window.addEventListener("blur",()=>{this.keys.clear();for(let t in this.hold)this.hold[t]=0})}consume(e){return this.events.has(e)?(this.events.delete(e),!0):!1}clearEvents(){this.events.clear()}async requestMotion(){let e=!0;try{let t=[];typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"&&t.push(DeviceOrientationEvent.requestPermission()),t.length&&(e=(await Promise.all(t)).every(n=>n==="granted"))}catch{e=!1}return this.motionGranted=e,e&&!this._orientBound&&(this._orientBound=!0,window.addEventListener("deviceorientation",t=>this._onOrient(t),!0)),e}_onOrient(e){if(e.beta==null||e.gamma==null)return;let t=e.beta*xr,n=e.gamma*xr,i=-Math.sin(n)*Math.cos(t),r=Math.sin(t),a=Math.cos(n)*Math.cos(t),o=this._raw;o.steer=Math.atan2(-i,Math.max(r,.05)),o.elev=Math.asin(Te(a,-1,1)),o.ok=!0,this.hasMotion=!0}calibrate(){this._needCal=!0,this._calBuf=[]}update(e){let t=0,n=0,i=this.keys;if(this._raw.ok){let c=this._raw;if(this._needCal&&(this._calBuf.push([c.steer,c.elev]),this._calBuf.length>=8)){let d=0,m=0;for(let[x,g]of this._calBuf)d+=x,m+=g;this._neutral.steer=d/this._calBuf.length,this._neutral.elev=m/this._calBuf.length,this._needCal=!1}let l=c.steer-this._neutral.steer,h=c.elev-this._neutral.elev,f=2*xr,u=(d,m)=>{let x=Math.max(0,Math.abs(d)-f)/m;return Math.sign(d)*Math.min(1,Math.pow(x,1.2))};t=u(l,28*xr/this.sens),n=u(h,24*xr/this.sens)*(this.invert?1:-1)}let r=(i.has("ArrowRight")||i.has("KeyD")?1:0)-(i.has("ArrowLeft")||i.has("KeyA")?1:0),a=(i.has("ArrowUp")||i.has("KeyW")?1:0)-(i.has("ArrowDown")||i.has("KeyS")?1:0);r&&(t=r),a&&(n=a),this.enabled||(t=0,n=0);let o=1-Math.exp(-e*12);this.steer+=(t-this.steer)*o,this.pitch+=(n-this.pitch)*o,this.gunV=(this.hold.gun||i.has("Space"))&&this.enabled?1:0,this.boostV=(this.hold.boost||i.has("ShiftLeft")||i.has("ShiftRight"))&&this.enabled?1:0,this.brakeV=(this.hold.brake||i.has("ControlLeft")||i.has("KeyB"))&&this.enabled?1:0}};Zt();var hi="#8cff9a",Ph="rgba(140,255,154,0.55)",yn="#ff4a3d",gs="#ffd34a",xa="#6fd0ff",Ef="#f2f6f8",Yi=new E,Ih=new E,_r=s=>document.getElementById(s),wl=class{constructor(){this.cv=_r("hudcv"),this.cx=this.cv.getContext("2d"),this.msgEl=_r("hud-msg"),this.subEl=_r("subs"),this.objEl=_r("obj"),this.timerEl=_r("timer"),this.scoreEl=_r("score"),this.w=1,this.h=1,this.dpr=1,this.msgT=0,this.blink=0,this.resize(),window.addEventListener("resize",()=>this.resize()),this.visible=!1}resize(){this.dpr=Math.min(window.devicePixelRatio||1,2),this.w=window.innerWidth,this.h=window.innerHeight,this.cv.width=Math.round(this.w*this.dpr),this.cv.height=Math.round(this.h*this.dpr)}show(e){this.visible=e,document.body.classList.toggle("flying",e),e||this.cx.clearRect(0,0,this.cv.width,this.cv.height)}message(e,t="",n=1.6){let i=this.msgEl;i.textContent=e,i.className="show "+t,this.msgT=n}objective(e){this.objEl.innerHTML=e||"",this.objEl.classList.toggle("hidden",!e)}subtitle(e,t,n){if(!t){this.subEl.classList.add("hidden");return}this.subEl.classList.remove("hidden"),this.subEl.innerHTML=`<b style="color:${n||xa}">${e}</b><span>${t}</span>`}proj(e,t){Yi.copy(e).project(t);let n=Yi.z>1;return{x:(Yi.x*.5+.5)*this.w,y:(-Yi.y*.5+.5)*this.h,behind:n,on:!n&&Math.abs(Yi.x)<1&&Math.abs(Yi.y)<1}}update(e,t){if(this.msgT>0&&(this.msgT-=e,this.msgT<=0&&(this.msgEl.className="")),!this.visible)return;this.blink+=e;let n=this.cx,i=this.w,r=this.h;n.setTransform(this.dpr,0,0,this.dpr,0,0),n.clearRect(0,0,i,r),n.lineWidth=1.4,n.font='600 11px "Chakra Petch", ui-monospace, monospace',n.textBaseline="middle",n.shadowColor="rgba(0,0,0,0.65)",n.shadowBlur=3;let a=t.camera,o=t.player,c=o.hp/o.maxHp<.35&&Math.sin(this.blink*8)>0?yn:hi;n.strokeStyle=c,n.fillStyle=c;let l=i/2,h=r*.44,f=this.proj(Ih.copy(o.pos).addScaledVector(o.vel,3),a);f.behind||this.fpm(n,f.x,f.y),this.ladder(n,t,l,h);let u=Math.round(o.speed*3.6);this.tape(n,i*.11,h,u,50,"SPEED",!0),this.tape(n,i*.89,h,Math.round(o.pos.y),100,"ALT",!1),n.textAlign="center",n.font='600 10px "Chakra Petch", monospace';let d=(Yt.radToDeg(o.heading())%360+360)%360;this.heading(n,i/2,r*.19,d),n.textAlign="left",n.fillText(`G ${o.g.toFixed(1)}`,i*.06,h+92),n.fillText(o.burner>.6?"BOOST":o.throttle<.2?"BRAKE":"THR",i*.06,h+106),o.stall>.1&&Math.sin(this.blink*10)>0&&(n.fillStyle=yn,n.textAlign="center",n.font='700 15px "Chakra Petch", monospace',n.fillText("STALL",i/2,h+70),n.fillStyle=c),t.pullUp&&Math.sin(this.blink*10)>0&&(n.fillStyle=yn,n.textAlign="center",n.font='700 15px "Chakra Petch", monospace',n.fillText("PULL UP",i/2,h+52),n.fillStyle=c),o.hover>.5&&(n.fillStyle=xa,n.textAlign="center",n.font='700 13px "Chakra Petch", monospace',n.fillText(`HOVER  VS ${o.vs>=0?"+":""}${o.vs.toFixed(1)}`,i/2,h+88),n.fillStyle=c),this.targets(n,t,a),t.gunPipper&&this.pipper(n,t.gunPipper,a),this.readouts(n,t);let m=Math.min(50,i*.12);this.radar(n,t,i-m-14,t.safeTop+92+m,m),t.incoming.length&&this.warning(n,t,a),t.approach&&this.approachGuide(n,t.approach,l,h),t.outOfArea&&Math.sin(this.blink*6)>-.2&&(n.fillStyle=yn,n.textAlign="center",n.font='700 14px "Chakra Petch", monospace',n.fillText("RETURN TO THE OPERATIONAL AREA",i/2,r*.27),n.fillText(Math.ceil(t.outOfArea).toString(),i/2,r*.27+18))}fpm(e,t,n){e.beginPath(),e.arc(t,n,6,0,Math.PI*2),e.moveTo(t-16,n),e.lineTo(t-6,n),e.moveTo(t+6,n),e.lineTo(t+16,n),e.moveTo(t,n-6),e.lineTo(t,n-12),e.stroke()}ladder(e,t,n,i){let r=t.player,a=t.camera,{pitch:o,bank:c}=r.attitude(),l=Yi.set(0,1,0).applyQuaternion(a.quaternion),h=Ih.set(1,0,0).applyQuaternion(a.quaternion),f=Math.atan2(-h.y,l.y),u=this.h/(2*Math.tan(Yt.degToRad(a.fov/2))),d=Math.asin(Te(new E(0,0,-1).applyQuaternion(a.quaternion).y,-1,1));e.save(),e.translate(n,i),e.rotate(f),e.beginPath(),e.rect(-this.w*.3,-this.h*.22,this.w*.6,this.h*.44),e.clip(),e.textAlign="left",e.font='600 9px "Chakra Petch", monospace';for(let x=-90;x<=90;x+=10){let g=-(Yt.degToRad(x)-d)*u*.98;if(Math.abs(g)>this.h*.24)continue;let p=x===0?this.w*.16:this.w*.08,T=x===0?30:26;e.beginPath(),x<0?e.setLineDash([5,4]):e.setLineDash([]),e.moveTo(-T-p,g),e.lineTo(-T,g),e.moveTo(T,g),e.lineTo(T+p,g),x!==0&&(e.moveTo(-T-p,g),e.lineTo(-T-p,g+(x>0?6:-6)),e.moveTo(T+p,g),e.lineTo(T+p,g+(x>0?6:-6))),e.stroke(),x!==0&&e.fillText(Math.abs(x).toString(),T+p+4,g)}e.setLineDash([]),e.restore();let m=this.proj(Yi.copy(r.pos).addScaledVector(r.forward(Ih),800),a);m.behind||(e.beginPath(),e.moveTo(m.x-9,m.y),e.lineTo(m.x-3,m.y+5),e.lineTo(m.x,m.y),e.lineTo(m.x+3,m.y+5),e.lineTo(m.x+9,m.y),e.stroke())}tape(e,t,n,i,r,a,o){let l=150/(r*6);e.save(),e.beginPath(),e.rect(t-34,n-150/2,68,150),e.clip(),e.textAlign=o?"right":"left",e.font='600 9px "Chakra Petch", monospace';let h=Math.floor(i/r)*r;for(let u=-4;u<=4;u++){let d=h+u*r;if(d<0)continue;let m=n-(d-i)*l;e.beginPath();let x=d%(r*2)===0;o?(e.moveTo(t+14,m),e.lineTo(t+14-(x?10:6),m)):(e.moveTo(t-14,m),e.lineTo(t-14+(x?10:6),m)),e.stroke(),x&&e.fillText(d.toString(),o?t+1:t-1,m)}e.restore(),e.font='700 14px "Chakra Petch", monospace',e.textAlign="center";let f=o?t-8:t+8;e.strokeRect(f-30,n-11,60,22),e.fillText(i.toString(),f,n+1),e.font='600 9px "Chakra Petch", monospace',e.fillText(a,f,n-150/2-10)}heading(e,t,n,i){let a=this.w*.5/60;e.save(),e.beginPath(),e.rect(t-this.w*.25,n-14,this.w*.5,30),e.clip();for(let o=Math.floor((i-60/2)/5)*5;o<=i+60/2;o+=5){let c=t+(o-i)*a,l=(o%360+360)%360;e.beginPath(),e.moveTo(c,n+6),e.lineTo(c,n+(l%10===0?-1:2)),e.stroke(),l%30===0&&e.fillText(l===0?"N":l===90?"E":l===180?"S":l===270?"W":(l/10).toString(),c,n-7)}e.restore(),e.beginPath(),e.moveTo(t,n+9),e.lineTo(t-4,n+15),e.lineTo(t+4,n+15),e.closePath(),e.fill()}targets(e,t,n){let i=t.player;e.font='600 9px "Chakra Petch", monospace';for(let r of t.contacts){let a=r.ent,o=this.proj(a.pos,n),c=a.pos.distanceTo(i.pos),l=a===t.target,h=t.locks.includes(a),f=a.team!==i.team,u=f?a.mission?gs:yn:xa;if(o.on){let d=Te(1400/Math.max(c,1),7,22)*(a.def?.ship?1.6:1);if(e.strokeStyle=u,e.fillStyle=u,e.lineWidth=l?2:1.3,f){let m=d*.45;e.beginPath(),e.moveTo(o.x-d,o.y-d+m),e.lineTo(o.x-d,o.y-d),e.lineTo(o.x-d+m,o.y-d),e.moveTo(o.x+d-m,o.y-d),e.lineTo(o.x+d,o.y-d),e.lineTo(o.x+d,o.y-d+m),e.moveTo(o.x+d,o.y+d-m),e.lineTo(o.x+d,o.y+d),e.lineTo(o.x+d-m,o.y+d),e.moveTo(o.x-d+m,o.y+d),e.lineTo(o.x-d,o.y+d),e.lineTo(o.x-d,o.y+d-m),e.stroke()}else e.beginPath(),e.moveTo(o.x,o.y-d),e.lineTo(o.x+d,o.y),e.lineTo(o.x,o.y+d),e.lineTo(o.x-d,o.y),e.closePath(),e.stroke();if((l||c<4e3)&&(e.textAlign="left",e.fillText(`${Math.round(c)}`,o.x+d+4,o.y-5),a.label&&e.fillText(a.label,o.x+d+4,o.y+6)),a.mission&&f&&(e.textAlign="center",e.fillText("TGT",o.x,o.y-d-7)),l){let m=t.lockProgress,x=h?d+4:d+4+(1-m)*26;e.strokeStyle=h?yn:mv(m),e.lineWidth=2,e.beginPath(),e.moveTo(o.x,o.y-x),e.lineTo(o.x+x,o.y),e.lineTo(o.x,o.y+x),e.lineTo(o.x-x,o.y),e.closePath(),e.stroke(),h&&Math.sin(this.blink*14)>-.3&&(e.fillStyle=yn,e.textAlign="center",e.font='700 10px "Chakra Petch", monospace',e.fillText("LOCK",o.x,o.y+x+10),e.font='600 9px "Chakra Petch", monospace')}else h&&(e.strokeStyle=yn,e.lineWidth=2,e.beginPath(),e.arc(o.x,o.y,d+6,0,Math.PI*2),e.stroke());if(a.maxHp&&(l||a.def?.ace||a.def?.ship)&&a.hp<a.maxHp){let m=d*2;e.fillStyle="rgba(0,0,0,0.4)",e.fillRect(o.x-d,o.y+d+3,m,3),e.fillStyle=u,e.fillRect(o.x-d,o.y+d+3,m*Te(a.hp/a.maxHp,0,1),3)}}else if(l){let d=o.x-this.w/2,m=o.y-this.h*.44;o.behind&&(d=-d,m=-m);let x=Math.atan2(m,d),g=Math.min(this.w,this.h)*.3,p=this.w/2+Math.cos(x)*g,T=this.h*.44+Math.sin(x)*g;e.save(),e.translate(p,T),e.rotate(x),e.fillStyle=u,e.beginPath(),e.moveTo(14,0),e.lineTo(-6,-9),e.lineTo(-2,0),e.lineTo(-6,9),e.closePath(),e.fill(),e.restore(),e.fillStyle=u,e.textAlign="center",e.fillText(`${Math.round(c)}`,p,T+16)}}e.lineWidth=1.4,e.strokeStyle=hi,e.fillStyle=hi}pipper(e,t,n){let i=this.proj(t,n);i.on&&(e.strokeStyle=hi,e.beginPath(),e.arc(i.x,i.y,13,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(i.x,i.y,1.6,0,Math.PI*2),e.fill())}readouts(e,t){let n=this.w,i=t.safeTop+54;e.textAlign="left",e.font='700 12px "Chakra Petch", monospace';let r=t.player,a=[];r.def.gun&&a.push(["GUN","\u221E",t.weapon==="gun"]),t.primary&&a.push([t.primary.name,t.ammo.primary,t.weapon==="primary"]),t.special&&a.push([t.special.name,t.ammo.sp,t.weapon==="sp"]),r.def.flares&&a.push(["FLR",t.ammo.flares,!1]),a.forEach(([c,l,h],f)=>{let u=i+f*17;e.fillStyle=h?gs:Ph,e.fillText((h?"\u25B6 ":"  ")+c.padEnd(5," ")+" "+l,12,u)}),e.textAlign="right";let o=Math.round((1-r.hp/r.maxHp)*100);e.fillStyle=o>65?yn:o>30?gs:hi,e.fillText(`DMG ${o}%`,n-12,i),e.fillStyle=hi,t.reload&&(e.font='600 9px "Chakra Petch", monospace',t.reload.forEach((c,l)=>{e.fillStyle=c>=1?hi:Ph,e.fillRect(n-12-28+l*16,i+10,12*c,3)}))}radar(e,t,n,i,r){let a=t.player,o=a.heading(),c=t.radarRange||9e3;e.save(),e.globalAlpha=.9,e.fillStyle="rgba(6,24,18,0.45)",e.beginPath(),e.arc(n,i,r,0,Math.PI*2),e.fill(),e.strokeStyle=Ph,e.lineWidth=1,e.beginPath(),e.arc(n,i,r,0,Math.PI*2),e.stroke(),e.beginPath(),e.arc(n,i,r*.5,0,Math.PI*2),e.stroke(),e.beginPath(),e.moveTo(n,i-r),e.lineTo(n,i+r),e.moveTo(n-r,i),e.lineTo(n+r,i),e.globalAlpha=.35,e.stroke(),e.globalAlpha=.9;let l=Math.cos(o),h=Math.sin(o),f=(u,d,m,x="dot")=>{let g=u.x-a.pos.x,p=u.z-a.pos.z,T=g*h+p*l,y=-(g*l-p*h)/c*r,b=-T/c*r,S=Math.hypot(y,b);S>r-3&&(y*=(r-3)/S,b*=(r-3)/S),e.fillStyle=d,x==="tri"?(e.beginPath(),e.moveTo(n+y,i+b-m),e.lineTo(n+y+m,i+b+m),e.lineTo(n+y-m,i+b+m),e.closePath(),e.fill()):x==="sq"?e.fillRect(n+y-m,i+b-m,m*2,m*2):(e.beginPath(),e.arc(n+y,i+b,m,0,Math.PI*2),e.fill())};for(let u of t.contacts){let d=u.ent,m=d.team!==a.team;f(d.pos,m?d.mission?gs:yn:xa,d.def?.ship?3.2:2.4,d.def?.ship?"sq":m?"tri":"dot")}for(let u of t.incoming)f(u.pos,Math.sin(this.blink*20)>0?yn:Ef,1.6);t.carrier&&f(t.carrier.pos,xa,4,"sq"),t.waypoint&&f(t.waypoint,Ef,3),e.fillStyle=hi,e.beginPath(),e.moveTo(n,i-5),e.lineTo(n+4,i+4),e.lineTo(n-4,i+4),e.closePath(),e.fill(),e.restore()}warning(e,t,n){let i=this.w,r=this.h,o=Math.min(...t.incoming.map(h=>h.pos.distanceTo(t.player.pos)))<1200;Math.sin(this.blink*(o?22:12))>-.2&&(e.fillStyle=yn,e.textAlign="center",e.font='700 16px "Chakra Petch", monospace',e.fillText("WARNING",i/2,r*.245),e.font='700 12px "Chakra Petch", monospace',e.fillText("MISSILE ALERT",i/2,r*.245+17));let c=t.player;e.strokeStyle=yn,e.lineWidth=3;let l=c.heading();for(let h of t.incoming){let f=h.pos.x-c.pos.x,u=h.pos.z-c.pos.z,d=Math.atan2(-(f*Math.cos(l)-u*Math.sin(l)),f*Math.sin(l)+u*Math.cos(l)),m=Math.min(i,r)*.36;e.beginPath(),e.arc(i/2,r*.44,m,-Math.PI/2+d-.15,-Math.PI/2+d+.15),e.stroke()}e.lineWidth=1.4}approachGuide(e,t,n,i){let r=this.w;e.strokeStyle=gs,e.fillStyle=gs;let a=Te(-t.lat/40,-1,1)*70,o=Te(t.vert/30,-1,1)*70;e.globalAlpha=.9,e.beginPath(),e.moveTo(n+a,i-70),e.lineTo(n+a,i+70),e.stroke(),e.beginPath(),e.moveTo(n-70,i+o),e.lineTo(n+70,i+o),e.stroke(),e.strokeRect(n-70,i-70,140,140),e.globalAlpha=1,e.textAlign="center",e.font='700 11px "Chakra Petch", monospace',e.fillText(`CVN-77  ${(t.along/1e3).toFixed(1)} km`,n,i-84);let c=[];t.vert>12?c.push("HIGH"):t.vert<-10&&c.push("LOW"),t.lat>10?c.push("LEFT \u25C0"):t.lat<-10&&c.push("\u25B6 RIGHT"),t.fast&&c.push("TOO FAST"),t.gear||c.push("GEAR UP"),e.fillText(c.join("  ")||"ON GLIDE PATH",n,i+86);let l=r-26,h=i;e.fillStyle="#4cff6a",e.fillRect(l-18,h-1.5,10,3),e.fillRect(l+8,h-1.5,10,3);let f=h+Te(-t.vert/6,-5,5)*9;e.fillStyle=t.vert<-14?yn:"#ffb02e",e.beginPath(),e.arc(l,f,5,0,Math.PI*2),e.fill(),e.strokeStyle=hi,e.fillStyle=hi}};function mv(s){return s>.66?"#ffa23a":gs}var Lh={menu:"assets/audio/music_menu.mp3",battle:"assets/audio/music_battle.mp3",ace:"assets/audio/music_ace.mp3",calm:"assets/audio/music_calm.mp3",win:"assets/audio/sting_win.mp3",lose:"assets/audio/sting_lose.mp3"},gv=["gun","msl","boom1","boom2","splash","cat","trap","flare","hit"],El=class{constructor(){this.ctx=null,this.vol={music:.7,sfx:.85,voice:1},this.buf={},this.tracks={},this.cur=null,this.ready=!1}async start(){if(this.ctx){try{await this.ctx.resume()}catch{}return}try{navigator.audioSession&&(navigator.audioSession.type="playback")}catch{}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=this.ctx=new e({latencyHint:"interactive"});try{await t.resume()}catch{}let n=t.createBuffer(1,1,22050),i=t.createBufferSource();i.buffer=n,i.connect(t.destination),i.start(0);let r=t.createDynamicsCompressor();r.threshold.value=-12,r.ratio.value=3.5,r.attack.value=.005,r.release.value=.25,r.connect(t.destination),this.master=t.createGain(),this.master.connect(r),this.musicBus=t.createGain(),this.musicBus.gain.value=this.vol.music,this.musicBus.connect(this.master),this.duck=t.createGain(),this.duck.connect(this.musicBus),this.sfx=t.createGain(),this.sfx.gain.value=this.vol.sfx,this.sfx.connect(this.master),this.voice=t.createGain(),this.voice.gain.value=this.vol.voice,this.voice.connect(this.master);let a=t.createBuffer(1,t.sampleRate*2,t.sampleRate),o=a.getChannelData(0);for(let c=0;c<o.length;c++)o[c]=Math.random()*2-1;this.noise=a,this._engine(),this.ready=!0,gv.forEach(c=>this.load(c)),location.search.includes("nopause")||document.addEventListener("visibilitychange",()=>{document.hidden?t.suspend():t.resume()})}async load(e){if(this.buf[e])return this.buf[e];try{let t=await(await fetch(`assets/audio/${e}.${e==="gun"?"wav":"mp3"}`)).arrayBuffer();this.buf[e]=await new Promise((n,i)=>this.ctx.decodeAudioData(t,n,i))}catch(t){console.warn("sfx",e,t)}return this.buf[e]}setVol(e,t){if(this.vol[e]=t,!this.ctx)return;(e==="music"?this.musicBus:e==="sfx"?this.sfx:this.voice).gain.setTargetAtTime(t,this.ctx.currentTime,.1)}unlockMusic(){for(let e of Object.keys(Lh)){if(this.tracks[e])continue;let t=new Audio(Lh[e]);t.crossOrigin="anonymous",t.preload="auto",t.setAttribute("playsinline",""),t.muted=!0;let n=t.play();n&&n.then(()=>{this.cur!==e&&(t.pause(),t.currentTime=0),t.muted=!1}).catch(()=>{t.muted=!1}),this.tracks[e]={name:e,el:t,g:null}}}music(e,{loop:t=!0,fade:n=1.5}={}){if(!this.ctx||this.cur===e)return;let i=this.ctx.currentTime;if(this.cur&&this.tracks[this.cur]){let a=this.tracks[this.cur];a.g&&(a.g.gain.cancelScheduledValues(i),a.g.gain.setValueAtTime(a.g.gain.value,i),a.g.gain.linearRampToValueAtTime(0,i+n)),setTimeout(()=>{this.cur!==a.name&&a.el.pause()},n*1e3+100)}if(this.cur=e,!e)return;let r=this.tracks[e];if(!r){let a=new Audio(Lh[e]);a.crossOrigin="anonymous",a.preload="auto",a.loop=t,a.setAttribute("playsinline",""),r=this.tracks[e]={name:e,el:a,g:null}}if(!r.g){let a=this.ctx.createMediaElementSource(r.el),o=this.ctx.createGain();o.gain.value=0,a.connect(o),o.connect(this.duck),r.g=o}r.el.muted=!1,r.el.loop=t;try{r.el.currentTime=0}catch{}r.el.play().catch(()=>{}),r.g.gain.cancelScheduledValues(i),r.g.gain.setValueAtTime(0,i),r.g.gain.linearRampToValueAtTime(1,i+n*.6)}play(e,{gain:t=1,rate:n=1,pan:i=0,detune:r=0}={}){if(!this.ready||!this.buf[e])return null;let a=this.ctx,o=a.createBufferSource();o.buffer=this.buf[e],o.playbackRate.value=n,o.detune.value=r;let c=a.createGain();c.gain.value=t;let l=c;if(i&&a.createStereoPanner){let h=a.createStereoPanner();h.pan.value=i,c.connect(h),l=h}return o.connect(c),l.connect(this.sfx),o.start(),{s:o,g:c}}explosion(e=1,t=0){let n=Te(1-t/9e3,.05,1);this.play(Math.random()<.5?"boom1":"boom2",{gain:(.5+.5*Math.min(1,e))*n,rate:.85+Math.random()*.2-(e>1.4?.2:0)})}missileLaunch(e=1){this.play("msl",{gain:.8*e,rate:.95+Math.random()*.1})}flare(){this.play("flare",{gain:.7})}hit(){this.play("hit",{gain:.8,rate:.9+Math.random()*.2})}gun(e){if(!(!this.ready||!this.buf.gun)){if(e&&!this.gunSrc){let t=this.ctx,n=t.createBufferSource();n.buffer=this.buf.gun,n.loop=!0;let i=t.createGain();i.gain.value=.75,n.connect(i),i.connect(this.sfx),n.start(),this.gunSrc={s:n,g:i}}else if(!e&&this.gunSrc){let{s:t,g:n}=this.gunSrc,i=this.ctx.currentTime;n.gain.setTargetAtTime(0,i,.03),t.stop(i+.2),this.gunSrc=null}}}_engine(){let e=this.ctx,t=this.engGain=e.createGain();t.gain.value=0,t.connect(this.sfx),this.roar=e.createBufferSource(),this.roar.buffer=this.noise,this.roar.loop=!0,this.roarLP=e.createBiquadFilter(),this.roarLP.type="lowpass",this.roarLP.frequency.value=600,this.roarLP.Q.value=.7,this.roarG=e.createGain(),this.roarG.gain.value=.6,this.roar.connect(this.roarLP),this.roarLP.connect(this.roarG),this.roarG.connect(t),this.rum=e.createOscillator(),this.rum.type="sawtooth",this.rum.frequency.value=42,this.rumLP=e.createBiquadFilter(),this.rumLP.type="lowpass",this.rumLP.frequency.value=160;let n=e.createGain();n.gain.value=.22,this.rum.connect(this.rumLP),this.rumLP.connect(n),n.connect(t),this.whine=e.createOscillator(),this.whine.type="triangle",this.whine.frequency.value=1800,this.whineG=e.createGain(),this.whineG.gain.value=0,this.whine.connect(this.whineG),this.whineG.connect(t),this.ab=e.createBufferSource(),this.ab.buffer=this.noise,this.ab.loop=!0,this.ab.playbackRate.value=.5,this.abBP=e.createBiquadFilter(),this.abBP.type="bandpass",this.abBP.frequency.value=180,this.abBP.Q.value=.8,this.abG=e.createGain(),this.abG.gain.value=0,this.ab.connect(this.abBP),this.abBP.connect(this.abG),this.abG.connect(t),this.wind=e.createBufferSource(),this.wind.buffer=this.noise,this.wind.loop=!0,this.windBP=e.createBiquadFilter(),this.windBP.type="bandpass",this.windBP.frequency.value=900,this.windBP.Q.value=.5,this.windG=e.createGain(),this.windG.gain.value=0,this.wind.connect(this.windBP),this.windBP.connect(this.windG),this.windG.connect(this.sfx),[this.roar,this.rum,this.whine,this.ab,this.wind].forEach(r=>r.start()),this.tone=e.createOscillator(),this.tone.type="square",this.tone.frequency.value=1e3,this.toneLP=e.createBiquadFilter(),this.toneLP.type="lowpass",this.toneLP.frequency.value=2400,this.toneG=e.createGain(),this.toneG.gain.value=0,this.tone.connect(this.toneLP),this.toneLP.connect(this.toneG),this.toneG.connect(this.sfx),this.tone.start(),this.alert=e.createOscillator(),this.alert.type="sawtooth",this.alert.frequency.value=900,this.alertG=e.createGain(),this.alertG.gain.value=0;let i=e.createBiquadFilter();i.type="lowpass",i.frequency.value=2e3,this.alert.connect(i),i.connect(this.alertG),this.alertG.connect(this.sfx),this.alert.start(),this._tt=0}update(e,t){if(!this.ready)return;let n=this.ctx,i=n.currentTime,r=t.on?1:0,a=Te(t.speed01,0,1.3);this.engGain.gain.setTargetAtTime(r*(.55+.25*t.boost),i,.15),this.roarLP.frequency.setTargetAtTime(380+a*900+t.boost*1400,i,.1),this.roarG.gain.setTargetAtTime(.35+t.boost*.35,i,.1),this.rum.frequency.setTargetAtTime(36+a*22+t.boost*10,i,.1),this.whine.frequency.setTargetAtTime(1500+a*900+t.boost*500,i,.2),this.whineG.gain.setTargetAtTime(r*(.012+a*.012),i,.2),this.abG.gain.setTargetAtTime(r*t.boost*.9,i,.08),this.windBP.frequency.setTargetAtTime(500+a*1600,i,.1),this.windG.gain.setTargetAtTime(r*(Math.pow(a,1.6)*.18+Te((t.g-3)/6,0,1)*.25),i,.15),this._tt+=e;let o=0,c=1e3;t.lock===1?(o=this._tt*6%1<.45?.05:0,c=980):t.lock===2&&(o=.055,c=1560),this.tone.frequency.setTargetAtTime(c,i,.005),this.toneG.gain.setTargetAtTime(o*r,i,.006);let l=0;if(t.alert){let h=t.alert===2?9:4.5;l=this._tt*h%1<.5?.07:0,this.alert.frequency.setTargetAtTime(this._tt*h%2<1?880:660,i,.004)}this.alertG.gain.setTargetAtTime(l*r,i,.005)}silence(){if(!this.ready)return;let e=this.ctx.currentTime;this.engGain.gain.setTargetAtTime(0,e,.2),this.windG.gain.setTargetAtTime(0,e,.2),this.toneG.gain.setTargetAtTime(0,e,.01),this.alertG.gain.setTargetAtTime(0,e,.01),this.gun(!1)}_blip(e,t=.06,n=.06,i="square"){if(!this.ready)return;let r=this.ctx,a=r.currentTime,o=r.createOscillator();o.type=i,o.frequency.value=e;let c=r.createGain();c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(n,a+.008),c.gain.exponentialRampToValueAtTime(1e-4,a+t),o.connect(c),c.connect(this.sfx),o.start(a),o.stop(a+t+.02)}click(){this._blip(1400,.05,.05)}select(){this._blip(880,.07,.06),setTimeout(()=>this._blip(1320,.09,.05),60)}back(){this._blip(660,.07,.05)}async voiceLine(e){if(!this.ready)return 0;let t=await this.loadVoice(e);if(!t)return 0;let n=this.ctx,i=n.currentTime,r=n.createBufferSource();return r.buffer=t,r.connect(this.voice),r.start(i+.02),this.duck.gain.cancelScheduledValues(i),this.duck.gain.setTargetAtTime(.45,i,.08),this.duck.gain.setTargetAtTime(1,i+t.duration,.4),t.duration}async loadVoice(e){if(this.vcache=this.vcache||new Map,this.vcache.has(e))return this.vcache.get(e);let t=fetch(e).then(n=>n.arrayBuffer()).then(n=>new Promise((i,r)=>this.ctx.decodeAudioData(n,i,r))).catch(()=>null);return this.vcache.set(e,t),t}},Al=class{constructor(e,t){this.audio=e,this.hud=t,this.q=[],this.busy=!1,this.t=0,this.lines={}}async loadManifest(){try{this.lines=await(await fetch("assets/audio/voice/lines.json")).json()}catch{this.lines={}}}prefetch(e){if(this.audio.ready)for(let t of e)this.lines[t]&&this.audio.loadVoice(this.lines[t].file)}say(e,t=!1){let n=this.lines[e];if(!n){console.warn("missing line",e);return}t?this.q.unshift(n):this.q.push(n),this.q.length>4&&this.q.splice(1,this.q.length-4)}clear(){this.q=[],this.busy=!1,this.t=0,this.hud.subtitle(null)}update(e){if(this.busy){this.t-=e,this.t<=0&&(this.busy=!1,this.hud.subtitle(null));return}let t=this.q.shift();t&&(this.busy=!0,this.t=t.dur||2.5,this.hud.subtitle(t.speaker,t.text,t.color),this.audio.voiceLine(t.file).then(n=>{n&&(this.t=n+.35)}))}};Zt();Zt();Zt();Zt();function Dh(s,e){if(e===Kc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===hr||e===da){let t=s.getIndex();if(t===null){let r=[],a=s.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===hr)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function Af(s){let e=new Map,t=new Map,n=s.clone();return Rf(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Rf(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Rf(s.children[n],e.children[n],t)}var Rl=class extends ti{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new zh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new $h(t)}),this.register(function(t){return new Jh(t)}),this.register(function(t){return new jh(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Wh(t)}),this.register(function(t){return new Xh(t)}),this.register(function(t){return new qh(t)}),this.register(function(t){return new kh(t)}),this.register(function(t){return new Yh(t)}),this.register(function(t){return new Vh(t)}),this.register(function(t){return new Kh(t)}),this.register(function(t){return new Zh(t)}),this.register(function(t){return new Oh(t)}),this.register(function(t){return new Cl(t,Ke.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Cl(t,Ke.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Qh(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Si.extractUrlBase(e);a=Si.resolveURL(l,this.path)}else a=Si.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new er(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Df){try{a[Ke.KHR_BINARY_GLTF]=new eu(e)}catch(f){i&&i(f);return}r=JSON.parse(a[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ou(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let f=this.pluginCallbacks[h](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,a[f.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let f=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(f){case Ke.KHR_MATERIALS_UNLIT:a[f]=new Bh;break;case Ke.KHR_DRACO_MESH_COMPRESSION:a[f]=new tu(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:a[f]=new nu;break;case Ke.KHR_MESH_QUANTIZATION:a[f]=new iu;break;default:u.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function xv(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Nt(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Oh=class{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new ae(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],At);let f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new us(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ea(h),l.distance=f;break;case"spot":l=new Qr(h),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ui(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Bh=class{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Jt}extendParams(e,t,n){let i=[];e.color=new ae(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],At),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Et))}return Promise.all(i)}},kh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},zh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ze(r,r)}return Promise.all(i)}},Hh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Vh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},Gh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new ae(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],At)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Et)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Wh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Xh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new ae().setRGB(r[0],r[1],r[2],At),Promise.all(i)}},qh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Yh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new ae().setRGB(r[0],r[1],r[2],At),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Et)),Promise.all(i)}},Zh=class{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Kh=class{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?xn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},$h=class{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Jh=class{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},jh=class{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Cl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,f=i.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,f,u,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){let d=new ArrayBuffer(h*f);return a.decodeGltfBuffer(new Uint8Array(d),h,f,u,i.mode,i.filter),d})})}else return null}},Qh=class{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==Ln.TRIANGLES&&l.mode!==Ln.TRIANGLE_STRIP&&l.mode!==Ln.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),f=h.isGroup?h.children:[h],u=l[0].count,d=[];for(let m of f){let x=new Be,g=new E,p=new Mt,T=new E(1,1,1),C=new En(m.geometry,m.material,u);for(let b=0;b<u;b++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,b),c.SCALE&&T.fromBufferAttribute(c.SCALE,b),C.setMatrixAt(b,x.compose(g,p,T));let y=null;for(let b in c)if(b==="_COLOR_0"){let S=c[b];C.instanceColor=new wn(S.array,S.itemSize,S.normalized)}else if(b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"){if(y===null){let R=C.geometry;y=new dt,y.name=R.name;for(let v in R.attributes)y.setAttribute(v,R.attributes[v]);for(let v in R.morphAttributes)y.morphAttributes[v]=R.morphAttributes[v];R.index!==null&&y.setIndex(R.index),y.morphTargetsRelative=R.morphTargetsRelative;for(let v of R.groups)y.addGroup(v.start,v.count,v.materialIndex);R.boundingBox!==null&&(y.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(y.boundingSphere=R.boundingSphere.clone()),y.drawRange.start=R.drawRange.start,y.drawRange.count=R.drawRange.count,y.userData=Object.assign({},R.userData),C.geometry=y}let S=c[b];y.setAttribute(b,new wn(S.array,S.itemSize,S.normalized))}Rt.prototype.copy.call(C,m),this.parser.assignFinalMaterial(C),d.push(C)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Df="glTF",_a=12,Cf={JSON:1313821514,BIN:5130562},eu=class{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,_a),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Df)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-_a,r=new DataView(e,_a),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Cf.JSON){let l=new Uint8Array(e,_a+a,o);this.content=n.decode(l)}else if(c===Cf.BIN){let l=_a+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},tu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let f=ru[h]||h.toLowerCase();o[f]=a[h]}for(let h in e.attributes){let f=ru[h]||h.toLowerCase();if(a[h]!==void 0){let u=n.accessors[e.attributes[h]],d=vr[u.componentType];l[f]=d.name,c[f]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(f,u){i.decodeDracoFile(h,function(d){for(let m in d.attributes){let x=d.attributes[m],g=c[m];g!==void 0&&(x.normalized=g)}f(d)},o,l,At,u)})})}},nu=class{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},iu=class{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}},Pl=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,f=(n-t)/h,u=f*f,d=u*f,m=e*l,x=m-l,g=-2*d+3*u,p=d-u,T=1-g,C=p-u+f;for(let y=0;y!==o;y++){let b=a[x+y+o],S=a[x+y+c]*h,R=a[m+y+o],v=a[m+y]*h;r[y]=T*b+C*S+g*R+p*v}return r}},_v=new Mt,su=class extends Pl{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return _v.fromArray(r).normalize().toArray(r),r}},Ln={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},vr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Pf={9728:Lt,9729:st,9984:wo,9985:or,9986:fs,9987:Bt},If={33071:fn,33648:zs,10497:$t},Nh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ru={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},vv={CUBICSPLINE:void 0,LINEAR:rs,STEP:ss},Uh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function yv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new gn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ii})),s.DefaultMaterial}function xs(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ui(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Mv(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(i=!0),f.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let f=e[l];if(n){let u=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):s.attributes.position;a.push(u)}if(i){let u=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):s.attributes.normal;o.push(u)}if(r){let u=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):s.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],f=l[1],u=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=f),r&&(s.morphAttributes.color=u),s.morphTargetsRelative=!0,s})}function bv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Sv(s){let e,t=s.extensions&&s.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fh(t.attributes):e=s.indices+":"+Fh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Fh(s.targets[n]);return e}function Fh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function au(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Tv(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var wv=new Be,ou=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new xv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new un(this.options.manager):this.textureLoader=new na(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new er(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return xs(r,o,i),ui(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Si.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Nh[i.type],o=vr[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new gt(l,a,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Nh[i.type],l=vr[i.componentType],h=l.BYTES_PER_ELEMENT,f=h*c,u=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,x,g;if(d&&d!==f){let p=Math.floor(u/d),T="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,C=t.cache.get(T);C||(x=new l(o,p*d,i.count*d/h),C=new Ys(x,d/h),t.cache.add(T,C)),g=new Zs(C,c,u%d/h,m)}else o===null?x=new l(i.count*c):x=new l(o,u,i.count*c),g=new gt(x,c,m);if(i.sparse!==void 0){let p=Nh.SCALAR,T=vr[i.sparse.indices.componentType],C=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,b=new T(a[1],C,i.sparse.count*p),S=new l(a[2],y,i.sparse.count*c);o!==null&&(g=new gt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,v=b.length;R<v;R++){let w=b[R];if(g.setX(w,S[R*c]),c>=2&&g.setY(w,S[R*c+1]),c>=3&&g.setZ(w,S[R*c+2]),c>=4&&g.setW(w,S[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let u=(r.samplers||{})[a.sampler]||{};return h.magFilter=Pf[u.magFilter]||st,h.minFilter=Pf[u.minFilter]||Bt,h.wrapS=If[u.wrapS]||$t,h.wrapT=If[u.wrapT]||$t,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Lt&&h.minFilter!==st,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());let a=i.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(f){l=!0;let u=new Blob([f],{type:a.mimeType});return c=o.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(f){return new Promise(function(u,d){let m=u;t.isImageBitmapLoader===!0&&(m=function(x){let g=new Dt(x);g.needsUpdate=!0,u(g)}),t.load(Si.resolveURL(f,r.path),m,void 0,d)})}).then(function(f){return l===!0&&o.revokeObjectURL(c),ui(f,a),f.userData.mimeType=a.mimeType||Tv(a.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new js,mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Js,mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return gn}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[Ke.KHR_MATERIALS_UNLIT]){let f=i[Ke.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),l.push(f.extendParams(o,r,t))}else{let f=r.pbrMetallicRoughness||{};if(o.color=new ae(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){let u=f.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],At),o.opacity=u[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",f.baseColorTexture,Et)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Qt);let h=r.alphaMode||Uh.OPAQUE;if(h===Uh.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Uh.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Jt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ze(1,1),r.normalTexture.scale!==void 0)){let f=r.normalTexture.scale;o.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&a!==Jt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Jt){let f=r.emissiveFactor;o.emissive=new ae().setRGB(f[0],f[1],f[2],At)}return r.emissiveTexture!==void 0&&a!==Jt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Et)),Promise.all(l).then(function(){let f=new a(o);return r.name&&(f.name=r.name),ui(f,r),t.associations.set(f,{materials:e}),r.extensions&&xs(i,f,r),f})}createUniqueName(e){let t=yt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Lf(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=Sv(l),f=i[h];if(f)a.push(f.promise);else{let u;l.extensions&&l.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=Lf(new dt,l,t),l.mode===Ln.TRIANGLE_STRIP?u=u.then(d=>Dh(d,da)):l.mode===Ln.TRIANGLE_FAN&&(u=u.then(d=>Dh(d,hr))),i[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?yv(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],f=[];for(let d=0,m=h.length;d<m;d++){let x=h[d],g=a[d],p,T=l[d];if(g.mode===Ln.TRIANGLES||g.mode===Ln.TRIANGLE_STRIP||g.mode===Ln.TRIANGLE_FAN||g.mode===void 0){let C=r.isSkinnedMesh===!0,y=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");C&&y===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=C&&y?new zr(x,T):new at(x,T),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(g.mode===Ln.LINES)p=new Vr(x,T);else if(g.mode===Ln.LINE_STRIP)p=new cs(x,T);else if(g.mode===Ln.LINE_LOOP)p=new Gr(x,T);else if(g.mode===Ln.POINTS)p=new Wr(x,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&bv(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),ui(p,r),g.extensions&&xs(i,p,g),t.assignFinalMaterial(p),f.push(p)}for(let d=0,m=f.length;d<m;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return r.extensions&&xs(i,f[0],r),f[0];let u=new hn;r.extensions&&xs(i,u,r),t.associations.set(u,{meshes:e});for(let d=0,m=f.length;d<m;d++)u.add(f[d]);return u})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ot(Yt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ni(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ui(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let f=a[l];if(f){o.push(f);let u=new Be;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Hr(o,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let f=0,u=i.channels.length;f<u;f++){let d=i.channels[f],m=i.samplers[d.sampler],x=d.target,g=x.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,T=i.parameters!==void 0?i.parameters[m.output]:m.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",T)),l.push(m),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(f){let u=f[0],d=f[1],m=f[2],x=f[3],g=f[4],p=[];for(let C=0,y=u.length;C<y;C++){let b=u[C],S=d[C],R=m[C],v=x[C],w=g[C];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();let P=n._createAnimationTracks(b,S,R,v,w);if(P)for(let F=0;F<P.length;F++)p.push(P[F])}let T=new Jr(r,void 0,p);return ui(T,i),T})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],f=l[1],u=l[2];u!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(u,wv)});for(let d=0,m=f.length;d<m;d++)h.add(f[d]);if(h.userData.pivot!==void 0&&f.length>0){let d=h.userData.pivot,m=f[0];h.pivot=new E().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Ks:l.length>1?h=new hn:l.length===1?h=l[0]:h=new Rt,h!==l[0])for(let f=0,u=l.length;f<u;f++)h.add(l[f]);if(r.name&&(h.userData.name=r.name,h.name=a),ui(h,r),r.extensions&&xs(n,h,r),r.matrix!==void 0){let f=new Be;f.fromArray(r.matrix),h.applyMatrix4(f)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let f=i.associations.get(h);i.associations.set(h,{...f})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new hn;n.name&&(r.name=i.createUniqueName(n.name)),ui(r,n),n.extensions&&xs(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,f=c.length;h<f;h++){let u=c[h];u.parent!==null?r.add(Af(u)):r.add(u)}let l=h=>{let f=new Map;for(let[u,d]of i.associations)(u instanceof mn||u instanceof Dt)&&f.set(u,d);return h.traverse(u=>{let d=i.associations.get(u);d!=null&&f.set(u,d)}),f};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Zi[r.path]===Zi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(Zi[r.path]){case Zi.weights:h=yi;break;case Zi.rotation:h=Mi;break;case Zi.translation:case Zi.scale:h=Vi;break;default:switch(n.itemSize){case 1:h=yi;break;case 2:case 3:default:h=Vi;break}break}let f=i.interpolation!==void 0?vv[i.interpolation]:rs,u=this._getArrayFromAccessor(n);for(let d=0,m=c.length;d<m;d++){let x=new h(c[d]+"."+Zi[r.path],t.array,u,f);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=au(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Mi?su:Pl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ev(s,e,t){let n=e.attributes,i=new Tn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new E(c[0],c[1],c[2]),new E(l[0],l[1],l[2])),o.normalized){let h=au(vr[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new E,c=new E;for(let l=0,h=r.length;l<h;l++){let f=r[l];if(f.POSITION!==void 0){let u=t.json.accessors[f.POSITION],d=u.min,m=u.max;if(d!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),u.normalized){let x=au(vr[u.componentType]);c.multiplyScalar(x)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new pn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Lf(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(let a in n){let o=ru[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Ye.workingColorSpace!==At&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),ui(s,e),Ev(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Mv(s,e.targets,t):s})}ci();var Av=new un,lu=new Map;function Il(s,e,t,n=0){return new Promise((i,r)=>Av.load(s,a=>{let o=a;if(n&&a.image.width>n){let c=document.createElement("canvas");c.width=n,c.height=Math.round(n*a.image.height/a.image.width),c.getContext("2d").drawImage(a.image,0,0,c.width,c.height),o=new qr(c),a.dispose()}o.flipY=!1,o.colorSpace=e?Et:en,o.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),o.wrapS=o.wrapT=fn,i(o)},void 0,r))}async function Ei(s,e,{size:t=0,emissive:n=1,envMap:i=1}={}){let r=s+":"+t;if(lu.has(r))return lu.get(r);let a=(async()=>{let o=await new Rl().loadAsync(`assets/models/${s}.glb`),c={},l={};o.scene.updateMatrixWorld(!0),o.scene.traverse(p=>{if(p.isMesh){let T=p.geometry.clone();T.applyMatrix4(p.matrixWorld);let C=p.name.replace(/_\d+$/,"");c[C]=c[C]?Rv(c[C],T):T}else p.name&&p!==o.scene&&p.children.length===0&&(l[p.name]=p.getWorldPosition(new E))});let[h,f,u,d]=await Promise.all([Il(`assets/models/${s}_a.webp`,!0,e,t),Il(`assets/models/${s}_n.webp`,!1,e,t),Il(`assets/models/${s}_orm.webp`,!1,e,t),Il(`assets/models/${s}_e.webp`,!0,e,Math.min(t||1024,1024))]),m=new gn({map:h,normalMap:f,roughnessMap:u,metalnessMap:u,roughness:1,metalness:1,emissiveMap:d,emissive:new ae(1,1,1),emissiveIntensity:n*8,envMapIntensity:i});m.normalScale.set(1,-1);let x={value:.25};m.userData.burner=x,m.onBeforeCompile=p=>{p.uniforms.uBurner=x,p.fragmentShader=p.fragmentShader.replace("#include <common>",`#include <common>
uniform float uBurner;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
          { float orange = smoothstep(0.08, 0.3, totalEmissiveRadiance.r - totalEmissiveRadiance.b) * step(totalEmissiveRadiance.g, totalEmissiveRadiance.r * 0.75);
            totalEmissiveRadiance *= mix(1.0, uBurner, orange); }`)},gr(m);let g=1;for(let p of Object.values(c))p.computeBoundingSphere(),g=Math.max(g,p.boundingSphere.radius);return{kind:s,parts:c,material:m,marks:l,radius:g}})();return lu.set(r,a),a}function Rv(s,e){let t=new dt;for(let a of Object.keys(s.attributes)){let o=s.attributes[a],c=e.attributes[a];if(!c)continue;let l=new Float32Array(o.count*o.itemSize+c.count*c.itemSize);l.set(o.array,0),l.set(c.array,o.count*o.itemSize),t.setAttribute(a,new gt(l,o.itemSize))}let n=s.index?Array.from(s.index.array):[...Array(s.attributes.position.count).keys()],i=e.index?Array.from(e.index.array):[...Array(e.attributes.position.count).keys()],r=s.attributes.position.count;return t.setIndex(n.concat(i.map(a=>a+r))),t}function _s(s,{castShadow:e=!1}={}){let t=new hn;t.userData.parts={};for(let[n,i]of Object.entries(s.parts)){let r=new at(i,s.material);r.name=n,r.frustumCulled=!0,t.add(r),t.userData.parts[n]=r}return t}var Ll=new E,cu=new E,Dl=class{constructor(e){this.scene=e,this.group=new hn,this.pos=new E,this.heading=0,this.speed=9,this.alive=!0,this.team="blue",this.hp=3e3,this.maxHp=3e3,this.def={ship:!0,name:"CVN-77",hp:3e3},this.half=165,this.beam=30,this.height=60,this.radius=170,this.vel=new E}async load(e,t,n){let[i,r]=await Promise.all([Ei("carrier",e,{size:t.shipTex}),fetch("assets/models/carrier.json").then(u=>u.json())]);this.model=i,this.spec=r,this.deckZ=r.deckZ,this.outline=r.outline.map(([u,d])=>[u,-d]),this.cats=r.cats.map(([[u,d],[m,x]])=>({a:new E(u,0,-d),b:new E(m,0,-x)})),this.wires=r.wires.map(([[u,d],[m,x]])=>({a:new E(u,0,-d),b:new E(m,0,-x)}));let a=r.land;this.landDir=new E(a.dir[0],0,-a.dir[1]).normalize(),this.landOrigin=new E(a.origin[0],0,-a.origin[1]),this.landHalf=a.half;let o=this.wires[1],c=this.wires[2];this.aim=new E().addVectors(o.a,o.b).add(c.a).add(c.b).multiplyScalar(.25),this.aim.y=this.deckZ;let l=r.island;this.island={x0:l.x0,x1:l.x1,z0:-l.y1,z1:-l.y0,top:this.deckZ+45};let h=_s(i);this.group.add(h);let f=h.userData.parts.deck;if(f){let d=await new un().loadAsync("assets/models/carrier_deck.webp");d.colorSpace=Et,d.flipY=!1,d.anisotropy=Math.min(8,e.capabilities.getMaxAnisotropy()),d.generateMipmaps=!0,d.minFilter=Bt;let m=new gn({map:d,roughness:.82,metalness:0,envMapIntensity:.6}),{enableSkyFog:x}=await Promise.resolve().then(()=>(ci(),Sf));x(m),f.material=m}if(n){let u=n.parts.body,d=n.parts.gear,m=[[-24,-40,2.4],[-24,-24,2.4],[-23,-8,2.3],[-24,50,2.5],[-23,66,2.4],[22,110,-.6],[26,128,-.7]],x=new En(u,n.material,m.length),g=d?new En(d,n.material,m.length):null,p=new Be,T=new Mt;m.forEach(([C,y,b],S)=>{T.setFromAxisAngle(new E(0,1,0),b),p.compose(new E(C,this.deckZ+1.66,y),T,new E(1,1,1)),x.setMatrixAt(S,p),g?.setMatrixAt(S,p)}),this.group.add(x),g&&this.group.add(g)}return this.scene.add(this.group),this}place(e,t,n,i=9){this.pos.set(e,0,t),this.heading=n,this.speed=i,this.sync()}fwd(e=new E){return e.set(Math.sin(this.heading),0,Math.cos(this.heading))}sync(){this.group.position.copy(this.pos),this.group.rotation.set(0,this.heading,0),this.group.updateMatrixWorld(!0),this.fwd(this.vel).multiplyScalar(this.speed)}update(e){this.pos.addScaledVector(this.fwd(Ll),this.speed*e),this.sync()}toLocal(e,t=new E){let n=Math.cos(this.heading),i=Math.sin(this.heading),r=e.x-this.pos.x,a=e.z-this.pos.z;return t.set(r*n-a*i,e.y,r*i+a*n)}toWorld(e,t=new E){let n=Math.cos(this.heading),i=Math.sin(this.heading);return t.set(this.pos.x+e.x*n+e.z*i,e.y,this.pos.z-e.x*i+e.z*n)}dirToWorld(e,t=new E){let n=Math.cos(this.heading),i=Math.sin(this.heading);return t.set(e.x*n+e.z*i,e.y,-e.x*i+e.z*n)}onDeck(e){let t=this.outline,n=!1;for(let i=0,r=t.length-1;i<t.length;r=i++){let[a,o]=t[i],[c,l]=t[r];o>e.z!=l>e.z&&e.x<(c-a)*(e.z-o)/(l-o)+a&&(n=!n)}return n}collides(e){let t=this.toLocal(e,Ll);if(Math.abs(t.z)>175||Math.abs(t.x)>50)return!1;let n=this.island;return!!(t.x>n.x0-1&&t.x<n.x1+1&&t.z>n.z0-1&&t.z<n.z1+1&&t.y<n.top||t.y<this.deckZ-.5&&t.y>-12&&this.onDeck(t))}catYaw(e){let t=this.cats[e],n=Ll.subVectors(t.b,t.a);return this.heading+Math.atan2(n.x,n.z)}landingYaw(){return this.heading+Math.atan2(this.landDir.x,this.landDir.z)}glidePoint(e,t=3.5,n=new E){let i=cu.copy(this.aim).addScaledVector(this.landDir,-e);return i.y=this.deckZ+Math.tan(Yt.degToRad(t))*e,this.toWorld(i,n)}approach(e){let t=this.toLocal(e,Ll),n=cu.subVectors(t,this.aim),i=-(n.x*this.landDir.x+n.z*this.landDir.z),r=n.x*this.landDir.z-n.z*this.landDir.x,a=this.deckZ+Math.tan(Yt.degToRad(3.5))*Math.max(i,0);return{along:i,lat:r,vert:t.y-a,local:t}}wireAt(e){for(let t=0;t<this.wires.length;t++){let n=this.wires[t],i=cu.addVectors(n.a,n.b).multiplyScalar(.5),r=(e.x-i.x)*this.landDir.x+(e.z-i.z)*this.landDir.z;if(r>-3&&r<14&&Math.abs((e.x-i.x)*this.landDir.z-(e.z-i.z)*this.landDir.x)<this.landHalf)return t}return-1}};Zt();Zt();var yr=new Mt,Nl=new E,hu=new E,Cv=new E(1,0,0),Pv=new E(0,1,0),Iv=new E(0,0,1),Nf=9.81,va=class{constructor(e,t="blue"){this.def=e,this.team=t,this.pos=new E,this.quat=new Mt,this.vel=new E,this.speed=e.cruise||200,this.throttle=.55,this.hp=e.hp||100,this.maxHp=this.hp,this.alive=!0,this.g=1,this.pitchRate=0,this.rollRate=0,this.yawRate=0,this.burner=0,this.stall=0,this.hover=0,this.vs=0,this.gearDown=!1,this.onDeck=null,this.radius=e.big?22:9}forward(e=new E){return e.set(0,0,1).applyQuaternion(this.quat)}up(e=new E){return e.set(0,1,0).applyQuaternion(this.quat)}right(e=new E){return e.set(-1,0,0).applyQuaternion(this.quat)}attitude(){let e=this.forward(Nl),t=this.right(hu),n=Math.asin(Te(e.y,-1,1)),i=new E(0,1,0).applyQuaternion(this.quat).y,r=Math.atan2(-t.y,i);return{pitch:n,bank:r}}heading(){let e=this.forward(Nl);return Math.atan2(e.x,e.z)}setHeading(e,t=0,n=0){this.quat.setFromEuler(new Sn(-t,e,n,"YXZ"))}update(e,t){let n=this.def,{pitch:i,bank:r}=this.attitude(),a=this.speed,o=Te(.35+.75*Math.min(1,a/(n.cruise*.85))-Math.max(0,(a-n.cruise*1.35)/n.maxSpd)*.6,.25,1.1),c=0,l=0,h=0,f=n.vtol&&t.brake&&a<46&&!t.boost;if(this.hover=Te(this.hover+(f||this.hover>.5&&!t.boost?e*.9:-e*.7),0,1),this.hover>.02&&n.vtol){l=Te((t.steer*.25-r)*2.5,-1.2,1.2),c=Te((.06-i)*2.5,-.8,.8),h=-t.steer*.6,this.vs=Wn(this.vs,t.pitch*9,1-Math.exp(-e*2));let m=t.brake?0:25;this.speed=Math.max(0,Wn(this.speed,m,1-Math.exp(-e*.8)))}else{if(this.vs=Wn(this.vs,0,1-Math.exp(-e*3)),t.mode==="ai")l=Te(t.rollCmd,-1,1)*n.roll,c=Te(t.pitchCmd,-.4,1)*n.pitch*o,h=Te(t.yawCmd||0,-1,1)*(n.yaw||.4);else if(t.mode==="expert")l=t.steer*n.roll,c=t.pitch*n.pitch*o,h=-t.steer*n.yaw*.15;else{let p=Math.abs(i)>1.15,T=t.steer*1.38;if(p)l=t.steer*n.roll*.6;else{let y=T-r;y>Math.PI&&(y-=Math.PI*2),y<-Math.PI&&(y+=Math.PI*2),l=Te(y*4.5,-n.roll,n.roll)}let C=Math.abs(Math.sin(r))*Math.min(1,Math.abs(t.steer)*1.4)*.75*(Math.abs(r)<1.75?1:0);c=Te(t.pitch+C,-1,1)*n.pitch*o,h=-t.steer*n.yaw*.35*Math.cos(i)}let d=n.minSpd*1.02;this.stall=Te((d-a)/(d*.3+1),0,1)*(this.onDeck?0:1),this.stall>0&&(c=Wn(c,-.6*Math.cos(r)*Math.cos(i),this.stall*.8),l*=1-this.stall*.5);let m=n.cruise;t.throttle!=null&&(m=Wn(n.minSpd*1.25,n.maxSpd,t.throttle)),t.boost&&(m=n.maxSpd),t.brake&&(m=Math.max(n.minSpd*1.1,n.cruise*.42));let x=m>a?n.accel*(t.boost?1.2:.7):-n.accel*(t.brake?1.4:.5),g=Te((m-a)*1.2,-Math.abs(x),Math.abs(x));g+=-Nf*Math.sin(i)*.85,g-=Math.abs(c)*a*.022,this.onDeck&&(g=this.deckAccel??g),this.speed=Te(a+g*e,0,n.maxSpd*1.25)}this.burner=Wn(this.burner,t.boost?1:t.brake?0:.18,1-Math.exp(-e*5)),this.throttle=t.boost?1:t.brake?.1:.55;let u=1-Math.exp(-e*7);this.pitchRate+=(c-this.pitchRate)*u,this.rollRate+=(l-this.rollRate)*u,this.yawRate+=(h-this.yawRate)*u,this.onDeck&&!this.onDeck.launching&&(this.pitchRate=Math.max(0,this.pitchRate)*(this.speed>n.minSpd?1:0),this.rollRate=0,this.yawRate*=.2),yr.setFromAxisAngle(Cv,-this.pitchRate*e),this.quat.multiply(yr),yr.setFromAxisAngle(Iv,this.rollRate*e),this.quat.multiply(yr),yr.setFromAxisAngle(Pv,this.yawRate*e),this.quat.multiply(yr),this.quat.normalize(),this.forward(this.vel).multiplyScalar(this.speed),this.hover>0&&(this.vel.y+=this.vs*this.hover),this.stall>0&&(this.vel.y-=this.stall*18),this.g=Te(1+this.speed*Math.abs(this.pitchRate)/Nf*.33,-3,9.5),this.pos.addScaledVector(this.vel,e)}},Ul=class{constructor(e){this.cam=e,this.pos=new E,this.q=new Mt,this.init=!1,this.shake=0,this.fovBase=62,this.dist=1,this.mode="chase",this._t=0}update(e,t,n=1){let i=this.cam;this._t+=e;let r=(t.def.bomber?62:22)*n,a=(t.def.bomber?13:4.6)*n,o=Nl.set(0,a,-r).applyQuaternion(t.quat),c=hu.copy(t.pos).add(o);c.y=Math.max(c.y,3),this.init||(this.pos.copy(c),this.q.copy(t.quat),this.init=!0),this.q.slerp(t.quat,1-Math.exp(-e*6.5));let l=new E(0,a,-r).applyQuaternion(this.q);this.pos.copy(t.pos).add(l),this.pos.y=Math.max(this.pos.y,3),i.position.copy(this.pos);let h=Nl.set(0,a*.55,30*n).applyQuaternion(this.q).add(t.pos),f=hu.set(0,1,0).applyQuaternion(this.q);if(i.up.copy(f),i.lookAt(h),this.shake>0){let m=this.shake;i.rotateX((Math.random()-.5)*.012*m),i.rotateY((Math.random()-.5)*.012*m),this.shake=Math.max(0,m-e*3)}let u=Te((t.speed-t.def.cruise)/(t.def.maxSpd-t.def.cruise+1),-.5,1),d=this.fovBase+u*9+t.burner*2;i.fov=Wn(i.fov,d,1-Math.exp(-e*3)),i.updateProjectionMatrix()}};Zt();var vs=new E,Ki=new E,Uf=new Mt;function Fl(s,e,t=1){Uf.copy(s.quat).invert();let n=vs.subVectors(e,s.pos).applyQuaternion(Uf),i=-n.x,r=n.y,a=n.z,o=Math.atan2(Math.hypot(i,r),a),c,l;if(o<.06){let{bank:h}=s.attitude();c=Te(-h*.8+i*.02,-.4,.4),l=Te(r*.01,-.3,.4)}else if(o<.35&&r<0&&Math.abs(i)<-r*1.5){let{bank:h}=s.attitude();c=Te(-h*1.2+i*.004,-.6,.6),l=Te(Math.atan2(r,a)*3,-.4,0)}else{let h=Math.atan2(i,r);c=Te(h*2.2,-1,1)*t;let f=Math.abs(h)<.6?1:Math.abs(h)<1.4?.55:.15;l=Te(o*2.2,0,1)*f*t}return{rollCmd:c,pitchCmd:l}}var Ol=class{constructor(e,t,n={}){this.p=e,this.world=t,this.skill=n.skill??.6,this.role=n.role||"fighter",this.state="cruise",this.target=null,this.mslCd=4+Math.random()*6,this.gunCd=0,this.evadeT=0,this.flares=n.flares??(this.skill>.8?4:1),this.wp=n.waypoint?n.waypoint.clone():null,this.orbitC=n.orbit?n.orbit.clone():null,this.alt=n.alt??e.pos.y,this.goal=n.goal||null,this.aggroDist=n.aggro??22e3,this.thinkT=Math.random(),this.lead=new E,this.ctrl={mode:"ai",rollCmd:0,pitchCmd:0,yawCmd:0,boost:!1,brake:!1,throttle:.55}}pickTarget(){let e=this.world,t=null,n=1/0;for(let i of e.planes){if(!i.alive||i.team===this.p.team||i.def.ship)continue;let r=i.pos.distanceTo(this.p.pos);i.isPlayer&&(r*=this.p.team==="red"?.55:1),r<n&&(n=r,t=i)}return t}update(e){let t=this.p,n=this.world,i=this.ctrl;if(!t.alive)return;this.thinkT-=e,this.thinkT<=0&&(this.thinkT=.5+Math.random()*.4,(this.role==="fighter"||this.role==="escort")&&(!this.target||!this.target.alive||Math.random()<.1)&&(this.target=this.pickTarget()));let r=n.weapons.incoming(t);if(r.length&&this.role!=="drone"){let a=r[0],o=a.pos.distanceTo(t.pos);if(o<1800&&this.evadeT<=0&&!a.evadeRolled){if(a.evadeRolled=!0,Math.random()>.2+this.skill*.45)return this.fly(e);this.evadeT=2.2+Math.random()*1.5,this.evadeDir=Math.random()<.5?-1:1,this.flares>0&&o<1100&&Math.random()<.15+this.skill*.45&&(this.flares--,n.weapons.flare(t))}}this.fly(e)}fly(e){let t=this.p,n=this.world,i=this.ctrl,r=null,a=.6+this.skill*.4;if(i.boost=!1,i.brake=!1,i.throttle=.55,this.evadeT>0){this.evadeT-=e,i.rollCmd=this.evadeDir*1,i.pitchCmd=1,i.boost=!0;let{bank:l}=t.attitude();Math.abs(l)>1.3&&(i.rollCmd=-Math.sign(l)*.3)}else if(this.role==="bomber"||this.role==="drone"||this.role==="cruise"){if(this.goal&&this.goal.alive!==!1)r=Ki.copy(this.goal.pos),r.y=this.alt;else if(this.orbitC){let l=Math.atan2(t.pos.z-this.orbitC.z,t.pos.x-this.orbitC.x)+.35,h=this.orbitR||1500;r=Ki.set(this.orbitC.x+Math.cos(l)*h,this.alt,this.orbitC.z+Math.sin(l)*h)}else this.wp&&(r=this.wp);a=.45}else if(this.target){let l=this.target,h=l.pos.distanceTo(t.pos);if(h>this.aggroDist&&this.orbitC){let f=Math.atan2(t.pos.z-this.orbitC.z,t.pos.x-this.orbitC.x)+.4;r=Ki.set(this.orbitC.x+Math.cos(f)*1800,this.alt,this.orbitC.z+Math.sin(f)*1800)}else{let f=Te(h/900,0,1.5);this.lead.copy(l.pos).addScaledVector(l.vel,f*(.5+this.skill*.5)),r=this.lead,h>2500&&(i.boost=!0),h<500&&(i.brake=!0);let u=t.forward(vs),d=Ki.subVectors(l.pos,t.pos).normalize(),m=Math.acos(Te(u.dot(d),-1,1));this.mslCd-=e,this.gunCd-=e;let x=l.def.stealth?l.def.stealth:1;if(t.def.msl&&this.mslCd<=0&&h<3e3&&h>450&&m<.4&&n.missilesAt(l)<(l.isPlayer?n.maxIncoming:2)&&(!l.isPlayer||n.playerMslCd<=0)){if(l.isPlayer&&(n.playerMslCd=n.maxIncoming>1?3.5:6),Math.random()<.6*x+.25){let g=l.isPlayer||l.team==="blue"?"eaam":"aam";n.weapons.launch(g,t,t.pos.clone().addScaledVector(u,6).add(vs.set(0,-1.5,0)),l,{dmgMul:t.team==="blue"?.45:1}),l.isPlayer&&n.missileAlert()}this.mslCd=(this.skill>.8?5:8)+Math.random()*6}t.def.gun&&h<850&&m<.09&&this.gunCd<=0&&(this.gunCd=.07,Math.random()<.6&&n.weapons.gun(t,t.pos.clone().addScaledVector(u,9),.02))}}else if(this.orbitC){let l=Math.atan2(t.pos.z-this.orbitC.z,t.pos.x-this.orbitC.x)+.4;r=Ki.set(this.orbitC.x+Math.cos(l)*1600,this.alt,this.orbitC.z+Math.sin(l)*1600)}else r=Ki.copy(t.pos).addScaledVector(t.forward(vs),1e3),r.y=this.alt;if(r){let l=Fl(t,r,a);i.rollCmd=l.rollCmd,i.pitchCmd=l.pitchCmd}let o=t.forward(vs),c=this.role==="bomber"?400:260;if(t.pos.y<c+Math.max(0,-o.y)*900){let l=Ki.copy(t.pos).addScaledVector(o.setY(0).normalize(),600);l.y=t.pos.y+500;let h=Fl(t,l,1);i.rollCmd=h.rollCmd,i.pitchCmd=Math.max(h.pitchCmd,.8)}t.pos.y>9e3&&(i.pitchCmd=Math.min(i.pitchCmd,-.2)),t.update(e,i)}},Bl=class{constructor(e,t){this.s=e,this.world=t,this.aaT=0,this.samT=5+Math.random()*6,this.burst=0}update(e){let t=this.s,n=this.world;if(!t.alive)return;t.pos.x+=Math.sin(t.heading)*t.speed*e,t.pos.z+=Math.cos(t.heading)*t.speed*e,t.vel.set(Math.sin(t.heading)*t.speed,0,Math.cos(t.heading)*t.speed);let i=null,r=6500;for(let a of n.planes){if(!a.alive||a.team===t.team)continue;let o=a.pos.distanceTo(t.pos);o<r&&(r=o,i=a)}if(i){if(this.aaT-=e,this.samT-=e,r<2600&&this.aaT<=0){this.burst=this.burst>0?this.burst-1:8,this.aaT=this.burst>0?.09:1.2+Math.random();let a=vs.copy(t.pos);a.y+=18;let o=r/900,c=Ki.copy(i.pos).addScaledVector(i.vel,o).sub(a).normalize();c.x+=(Math.random()-.5)*.05,c.y+=(Math.random()-.5)*.05,c.z+=(Math.random()-.5)*.05,n.weapons.flak(a,c.normalize(),t.team)}if(t.def.sam!==!1&&r<6e3&&r>900&&this.samT<=0&&n.missilesAt(i)<(i.isPlayer?n.maxIncoming:1)){this.samT=9+Math.random()*8;let a=vs.copy(t.pos);a.y+=14,n.weapons.launch("sam",null,a,i,{team:t.team,dir:new E(0,1,0)}),i.isPlayer&&n.missileAlert()}}}};Zt();ci();var ys=new E,Vl=new E,kl=new E,zl=new Be,Hl=new Mt,Ff=new E(0,0,1),Lv=new E(0,1,0);function Dv(){let s=[],e=new Qn(.1,.1,3,10);e.rotateX(Math.PI/2),s.push(e);let t=new Zr(.1,.55,10);t.rotateX(Math.PI/2),t.translate(0,0,1.77),s.push(t);for(let n=0;n<4;n++){let i=new jn(.02,.42,.36);i.translate(0,.25,-1.3),i.rotateZ(n*Math.PI/2+Math.PI/4),s.push(i);let r=new jn(.02,.22,.25);r.translate(0,.15,.6),r.rotateZ(n*Math.PI/2+Math.PI/4),s.push(r)}return Of(s)}function Nv(){let s=[],e=new Qn(.22,.18,2.4,10);e.rotateX(Math.PI/2),s.push(e);let t=new hs(.22,10,6);t.translate(0,0,1.2),s.push(t);for(let n=0;n<4;n++){let i=new jn(.02,.5,.4);i.translate(0,.3,-1.05),i.rotateZ(n*Math.PI/2),s.push(i)}return Of(s)}function Of(s){let e=0;for(let r of s)e+=r.index?r.index.count:r.attributes.position.count;let t=[],n=[];for(let r of s){let a=r.index?r.toNonIndexed():r;t.push(...a.attributes.position.array),n.push(...a.attributes.normal.array)}let i=new dt;return i.setAttribute("position",new ot(t,3)),i.setAttribute("normal",new ot(n,3)),i}var Uv={aam:{speed:620,accel:260,turn:2.6,life:7,dmg:100,fuse:14,air:!0},sam:{speed:500,accel:190,turn:1.6,life:9,dmg:26,fuse:13,air:!0},eaam:{speed:540,accel:220,turn:1.5,life:6.5,dmg:26,fuse:12,air:!0},agm:{speed:480,accel:200,turn:2,life:12,dmg:210,fuse:20,air:!1},gpb:{speed:0,accel:0,turn:.9,life:40,dmg:260,fuse:26,air:!1,bomb:!0},mop:{speed:0,accel:0,turn:.6,life:40,dmg:900,fuse:30,air:!1,bomb:!0,radius:260}},Gl=class{constructor(e,t,n){this.scene=e,this.fx=t,this.audio=n,this.missiles=[],this.bullets=[],this.flares=[];let i=gr(new gn({color:14605526,roughness:.45,metalness:.15}));this.mslMesh=new En(Dv(),i,96),this.mslMesh.instanceMatrix.setUsage(vn),this.mslMesh.frustumCulled=!1,this.mslMesh.count=0,e.add(this.mslMesh);let r=gr(new gn({color:4869960,roughness:.6,metalness:.2}));this.bombMesh=new En(Nv(),r,64),this.bombMesh.instanceMatrix.setUsage(vn),this.bombMesh.frustumCulled=!1,this.bombMesh.count=0,e.add(this.bombMesh);let a=new Qn(.09,.05,9,5,1,!0);a.rotateX(Math.PI/2);let o=new Jt({color:new ae(6,3.6,1.4),transparent:!0,blending:Vn,depthWrite:!1,toneMapped:!1});this.tracer=new En(a,o,480),this.tracer.instanceMatrix.setUsage(vn),this.tracer.frustumCulled=!1,this.tracer.count=0,this.tracer.layers.set(1),e.add(this.tracer),this.etracer=new En(a,new Jt({color:new ae(5,1.2,.8),transparent:!0,blending:Vn,depthWrite:!1}),480),this.etracer.instanceMatrix.setUsage(vn),this.etracer.frustumCulled=!1,this.etracer.count=0,this.etracer.layers.set(1),e.add(this.etracer)}clear(){for(let e of this.missiles)e.trail&&(e.trail.dead=!0);this.missiles=[],this.bullets=[],this.flares=[]}gun(e,t,n=.004,i=e.team){let r=e.forward(ys).clone();r.x+=(Math.random()-.5)*n,r.y+=(Math.random()-.5)*n,r.z+=(Math.random()-.5)*n,r.normalize();let a=r.multiplyScalar(1050).add(e.vel);this.bullets.push({pos:t.clone(),prev:t.clone(),vel:a,life:1.35,team:i,owner:e,dmg:e.isPlayer?7:1.6})}flak(e,t,n){let i=t.clone().multiplyScalar(900);this.bullets.push({pos:e.clone(),prev:e.clone(),vel:i,life:2.6,team:n,owner:null,dmg:1.4,flak:!0})}launch(e,t,n,i,r={}){let a=Uv[e],o=t?t.forward(new E):r.dir||Lv.clone(),c={kind:e,W:a,owner:t,team:t?t.team:r.team,target:i,pos:n.clone(),life:0,vel:t?t.vel.clone():o.clone().multiplyScalar(80),speed:t?t.speed:80,dead:!1,trail:null,armed:0,dmgMul:r.dmgMul??1,decoyed:!1,bomb:!!a.bomb,puffT:0};return c.bomb?c.vel.y-=4:(c.vel.addScaledVector(o,8),c.trail=this.fx.trails.create({width:1.6,grow:3.2,life:e==="sam"?6:4.5,alpha:.55,minDist:7})),this.missiles.push(c),t?.isPlayer?this.audio?.missileLaunch():e==="sam"&&this.audio?.missileLaunch(.5),c}flare(e){for(let t=0;t<4;t++){let n=new E((Math.random()-.5)*2,-.6-Math.random(),-1).applyQuaternion(e.quat).normalize(),i={pos:e.pos.clone(),vel:e.vel.clone().multiplyScalar(.6).addScaledVector(n,40),life:3.2,trail:this.fx.trails.create({width:1.2,grow:2.2,life:2.2,alpha:.5})};this.flares.push(i)}for(let t of this.missiles)t.target===e&&!t.bomb&&Math.random()<.85&&(t.decoyed=!0,t.target=null);this.audio?.flare()}update(e,t){let n=this.fx,i=0,r=0;for(let l of this.missiles){if(l.dead)continue;l.life+=e;let h=l.W;if(l.target&&!l.target.alive&&l.owner?.isPlayer&&(l.target=this.retarget(l,t)),l.bomb){if(l.vel.y-=9.81*e,l.vel.multiplyScalar(Math.exp(-.02*e)),l.target&&l.target.alive){let u=l.target.pos,d=Math.max(.5,(l.pos.y-u.y)/Math.max(5,-l.vel.y)),m=ys.set((u.x+(l.target.vel?.x||0)*d-l.pos.x)/d,0,(u.z+(l.target.vel?.z||0)*d-l.pos.z)/d);l.vel.x+=Te(m.x-l.vel.x,-40*e*h.turn,40*e*h.turn),l.vel.z+=Te(m.z-l.vel.z,-40*e*h.turn,40*e*h.turn)}}else{l.speed=Math.min(h.speed+(l.owner?l.owner.speed*.5:0),l.speed+h.accel*e),l.life>h.life*.75&&(l.speed*=Math.exp(-.5*e));let u=Vl.copy(l.vel).normalize();if(l.target&&l.target.alive&&l.life>.18){let d=l.target.pos,m=l.target.vel||kl.set(0,0,0),x=ys.copy(d).sub(l.pos),p=x.length()/Math.max(100,l.speed),T=x.addScaledVector(m,p*.9).normalize(),C=h.turn*(l.target.isPlayer?t.difficultyMissile:1)*(l.life<.6?.5:1),y=u.angleTo(T);if(y>1e-4){let b=Math.min(1,C*e/y);u.lerp(T,b).normalize()}y>1.45&&l.life>1&&(l.target=null)}else l.decoyed&&(u.y-=e*.4,u.normalize());l.vel.copy(u).multiplyScalar(l.speed),n.flash(kl.copy(l.pos).addScaledVector(u,-1.8),4.5,[7,4.2,2.2],.05),l.trail&&n.trails.push(l.trail,kl.copy(l.pos).addScaledVector(u,-2))}l.pos.addScaledVector(l.vel,e);let f=null;if(l.bomb)(l.pos.y<=(l.target?.pos.y??0)+(l.target?.def?.ship?4:1)||l.pos.y<.5)&&(f="ground");else if(l.target&&l.target.alive&&l.pos.distanceTo(l.target.pos)<h.fuse+(l.target.radius||8)*.6)if(l.target.isPlayer&&l.team!=="blue"){let u=l.target.g||1,d=Te(.3+(u-2)*.09+(l.target.burner>.6?.05:0),.25,.8);Math.random()<d?(l.target=null,l.decoyed=!0,t.hudMsg("MISSILE EVADED","ok")):f=l.target}else f=l.target;if(f?this.detonate(l,f,t):(l.life>h.life||l.pos.y<0)&&(l.pos.y<0?n.splash(l.pos,l.bomb?1.6:.6):n.explosion(l.pos,.35),l.dead=!0),l.dead)l.trail&&(l.trail.emit=!1,l.trail.dead=!0);else{let u=l.bomb?this.bombMesh:this.mslMesh,d=l.bomb?r++:i++;d<u.instanceMatrix.count&&(Hl.setFromUnitVectors(Ff,ys.copy(l.vel).normalize()),zl.compose(l.pos,Hl,Vl.set(l.kind==="mop"?2.2:1,l.kind==="mop"?2.2:1,l.kind==="mop"?2.2:1)),u.setMatrixAt(d,zl))}}this.missiles=this.missiles.filter(l=>!l.dead),this.mslMesh.count=i,this.mslMesh.instanceMatrix.needsUpdate=!0,this.bombMesh.count=r,this.bombMesh.instanceMatrix.needsUpdate=!0;for(let l of this.flares)l.life-=e,l.vel.y-=9.81*e*.4,l.vel.multiplyScalar(Math.exp(-1.2*e)),l.pos.addScaledVector(l.vel,e),n.flash(l.pos,9,[9,6,3],.06),n.trails.push(l.trail,l.pos),l.life<=0&&(l.trail.emit=!1,l.trail.dead=!0);this.flares=this.flares.filter(l=>l.life>0);let a=0,o=0,c=t.planes;for(let l of this.bullets){l.life-=e,l.prev.copy(l.pos),l.vel.y-=9.81*e,l.pos.addScaledVector(l.vel,e);for(let u of c){if(!u.alive||u.team===l.team)continue;let d=(u.radius||8)*(l.owner?.isPlayer?1.15:.7);if(Fv(l.prev,l.pos,u.pos,d)){t.damage(u,l.dmg,l.owner,"gun",l.pos),l.life=0,n.flash(l.pos,4,[6,4,2],.08);break}}if(l.life>0&&l.team!=="red"){for(let u of t.ships)if(!(!u.alive||u.team===l.team)&&uu(u,l.pos)){t.damage(u,l.dmg*.7,l.owner,"gun",l.pos),l.life=0,n.flash(l.pos,5,[6,4,2],.08);break}}if(l.pos.y<0&&(Math.random()<.25&&n.puff(l.pos,{size:2,size1:7,life:.8,color:[1.2,1.2,1.25],alpha:.6,vel:new E(0,8,0)}),l.life=0),l.life<=0)continue;let h=l.team==="red"?this.etracer:this.tracer,f=l.team==="red"?o++:a++;f<480&&(Hl.setFromUnitVectors(Ff,ys.copy(l.vel).normalize()),zl.compose(l.pos,Hl,Vl.set(l.flak?2:1,l.flak?2:1,1)),h.setMatrixAt(f,zl))}this.bullets=this.bullets.filter(l=>l.life>0),this.tracer.count=a,this.tracer.instanceMatrix.needsUpdate=!0,this.etracer.count=o,this.etracer.instanceMatrix.needsUpdate=!0}detonate(e,t,n){e.dead=!0;let i=this.fx;if(t==="ground"){let r=e.W.radius||70,a=!1;for(let o of n.ships){if(!o.alive)continue;let c=Math.hypot(o.pos.x-e.pos.x,o.pos.z-e.pos.z)-(o.def.ship?35:5);c<r&&(n.damage(o,e.W.dmg*e.dmgMul*Te(1.3-c/r,.3,1),e.owner,e.kind,e.pos),a=!0)}e.pos.y<2&&i.splash(e.pos,e.kind==="mop"?4:2),i.explosion(new E(e.pos.x,Math.max(e.pos.y,6),e.pos.z),e.kind==="mop"?3.2:1.5),this.audio?.explosion(e.kind==="mop"?1.5:1,n.camDist(e.pos)),!a&&e.owner?.isPlayer&&n.hudMsg("MISS","miss");return}i.explosion(e.pos,.6,t.vel),n.damage(t,e.W.dmg*e.dmgMul,e.owner,e.kind,e.pos),this.audio?.explosion(.6,n.camDist(e.pos))}retarget(e,t){let n=null,i=e.bomb?1200:1800,r=e.bomb||e.kind==="agm"?t.ships:t.planes,a=kl.copy(e.vel).normalize();for(let o of r){if(!o.alive||o.team===e.team)continue;let c=e.bomb?Math.hypot(o.pos.x-e.pos.x,o.pos.z-e.pos.z):o.pos.distanceTo(e.pos);!e.bomb&&ys.subVectors(o.pos,e.pos).normalize().dot(a)<.5||c<i&&(i=c,n=o)}return n}incoming(e){return this.missiles.filter(t=>!t.dead&&!t.bomb&&t.target===e)}};function Fv(s,e,t,n){let i=ys.subVectors(e,s),r=Vl.subVectors(t,s),a=Te(r.dot(i)/Math.max(i.lengthSq(),1e-6),0,1),o=s.x+i.x*a-t.x,c=s.y+i.y*a-t.y,l=s.z+i.z*a-t.z;return o*o+c*c+l*l<n*n}function uu(s,e){let t=s.half||70,n=Math.sin(s.heading),i=Math.cos(s.heading),r=e.x-s.pos.x,a=e.z-s.pos.z,o=Te(r*n+a*i,-t,t),c=r-n*o,l=a-i*o;return c*c+l*l<(s.beam||12)**2&&e.y<(s.height||25)&&e.y>-5}var Gt={f15:{name:"F-15C EAGLE",short:"F-15C",role:"AIR SUPERIORITY",model:"f15",desc:"The Eagle. Twin-engine air superiority fighter with over a hundred air-to-air victories and no losses. Fast, rugged and forgiving.",cruise:230,maxSpd:390,minSpd:62,accel:46,pitch:1.18,roll:3.4,yaw:.42,hp:100,gun:!0,msl:64,sp:{id:"4AAM",name:"4AAM",count:16,kind:"aam",multi:4,range:4200},stats:{speed:.78,mobility:.7,stability:.85,air:.82,ground:.35,defense:.75},gearH:1.86,nozzleScale:1,burner:1,stall:"normal",engines:["nozzle_L","nozzle_R"],hook:!0,vtol:!1,unlock:null},f22:{name:"F-22A RAPTOR",short:"F-22A",role:"STEALTH AIR DOMINANCE",model:"f22",desc:"Fifth-generation stealth fighter with supercruise and thrust vectoring. Enemies have trouble locking on. Unmatched in a dogfight.",cruise:255,maxSpd:420,minSpd:48,accel:54,pitch:1.5,roll:3.9,yaw:.55,hp:100,gun:!0,msl:56,sp:{id:"6AAM",name:"6AAM",count:12,kind:"aam",multi:6,range:4800},stats:{speed:.9,mobility:.95,stability:.8,air:.98,ground:.4,defense:.8},gearH:1.86,nozzleScale:1,burner:1.15,stealth:.55,engines:["nozzle_L","nozzle_R"],hook:!0,vtol:!1,unlock:"m2"},f35a:{name:"F-35A LIGHTNING II",short:"F-35A",role:"STEALTH MULTIROLE",model:"f35a",desc:"Stealth multirole fighter with sensor fusion. Carries guided bombs that make short work of ships and ground targets.",cruise:225,maxSpd:370,minSpd:55,accel:44,pitch:1.3,roll:3.3,yaw:.5,hp:100,gun:!0,msl:52,sp:{id:"GPB",name:"GPB",count:16,kind:"gpb",multi:1,range:4e3},stats:{speed:.72,mobility:.78,stability:.9,air:.75,ground:.92,defense:.75},gearH:1.66,nozzleScale:1.15,burner:1,stealth:.7,engines:["nozzle_C"],hook:!0,vtol:!1,unlock:"m1"},f35b:{name:"F-35B LIGHTNING II",short:"F-35B",role:"STOVL MULTIROLE",model:"f35b",desc:"Short take-off / vertical landing variant. Hold BRAKE at low speed to transition into hover and land anywhere on the deck.",cruise:220,maxSpd:360,minSpd:0,accel:42,pitch:1.25,roll:3.2,yaw:.5,hp:100,gun:!0,msl:48,sp:{id:"4AGM",name:"4AGM",count:16,kind:"agm",multi:4,range:4200},stats:{speed:.68,mobility:.74,stability:.85,air:.72,ground:.88,defense:.78},gearH:1.66,nozzleScale:1.15,burner:1,stealth:.7,engines:["nozzle_C"],hook:!1,vtol:!0,unlock:"m4"},b2:{name:"B-2A SPIRIT",short:"B-2A",role:"STEALTH STRATEGIC BOMBER",model:"b2",desc:"Flying-wing stealth bomber. No gun, no air-to-air missiles - massive guided bomb loads and flares. Let the escorts handle the fighters.",cruise:200,maxSpd:290,minSpd:70,accel:18,pitch:.55,roll:1.25,yaw:.28,hp:220,gun:!1,msl:0,primary:{id:"GPB",name:"GPB",count:40,kind:"gpb",multi:1,range:5e3},sp:{id:"MOP",name:"MOP",count:4,kind:"mop",multi:1,range:5e3},flares:30,stats:{speed:.5,mobility:.2,stability:1,air:0,ground:1,defense:.95},gearH:0,nozzleScale:0,burner:0,stealth:.35,engines:["nozzle_L","nozzle_R"],hook:!1,vtol:!1,bomber:!0,unlock:"m3"}},$i=["f15","f35a","f22","f35b","b2"],du={bandit:{model:"bandit",name:"FIGHTER",hp:100,cruise:215,maxSpd:330,pitch:1,roll:3,msl:!0,gun:!0,score:300},ace:{model:"ace",name:"ACE",hp:250,cruise:245,maxSpd:380,pitch:1.4,roll:3.6,msl:!0,gun:!0,score:1500,ace:!0},bomber:{model:"bomber",name:"BOMBER",hp:260,cruise:175,maxSpd:220,pitch:.4,roll:.9,msl:!1,gun:!0,score:500,big:!0},drone:{model:"drone",name:"DRONE",hp:30,cruise:120,maxSpd:160,pitch:.6,roll:1.5,msl:!1,gun:!1,score:100},destroyer:{model:"destroyer",name:"DESTROYER",hp:420,ship:!0,score:800}},Bf={noon:{sky:{url:"assets/sky/clouds.webp",sunEl:38,sunAz:200,sunCol:[1,.97,.92],gain:1,fogGain:1,envGain:1,hazeSun:.25},sunI:3.2,cloudSun:[2.2,2.15,2.05],ambTop:[.45,.55,.75],ambBot:[.24,.27,.33],fog:[1/3e4,1/2800,1/22e4],grade:{lift:[0,.004,.012],gain:[1,1,1.02],sat:1.08,exposure:1}},sunset:{sky:{url:"assets/sky/sunset.webp",sunEl:2.6,sunAz:250,sunCol:[1,.62,.32],gain:1,fogGain:1,envGain:1,hazeSun:.55,sunSize:.8},sunI:3,cloudSun:[2.6,1.45,.7],ambTop:[.3,.3,.45],ambBot:[.13,.1,.13],fog:[1/22e3,1/2400,1/16e4],grade:{lift:[.01,0,.02],gain:[1.04,.98,.94],sat:1.15,exposure:1.05}},dawn:{sky:{url:"assets/sky/dawn.webp",sunEl:6,sunAz:95,sunCol:[1,.74,.62],gain:1,fogGain:1,envGain:1,hazeSun:.45,sunSize:.7},sunI:2.8,cloudSun:[2.2,1.55,1.25],ambTop:[.36,.38,.52],ambBot:[.16,.14,.18],fog:[1/24e3,1/2600,1/18e4],grade:{lift:[.008,0,.018],gain:[1.02,.99,1],sat:1.12,exposure:1}}};ci();var zt=new E,Ai=new E,fu=new Mt,Ji=Math.PI/180,Wl=class extends Error{},Xl=class{constructor(e){Object.assign(this,e),this.weapons=new Gl(this.scene,this.fx,this.audio),this.chase=new Ul(this.camera),this.sunLight=new us(16777215,3),this.sunLight.position.set(0,1,0),this.scene.add(this.sunLight,this.sunLight.target),this.planes=[],this.ships=[],this.rings=[],this.running=!1,this.paused=!1,this.difficultyMissile=.95,this.maxIncoming=2,this.views=new Set}async setEnv(e,t){let n=Bf[e];this.env=n,this.envKey!==e&&(await this.sky.load(n.sky,this.tier),this.envKey=e),Kt.fogP.value.x=n.fog[0],Kt.fogP.value.y=n.fog[1],Kt.fogP.value.z=n.fog[2];let i={sunDir:this.sky.sunDir,cloudSun:new ae(...n.cloudSun),ambTop:new ae(...n.ambTop),ambBot:new ae(...n.ambBot)};this.clouds.setPreset(wf[t]||null,i),this.ocean.setEnv(this.sky,this.clouds),this.sunLight.color.copy(this.sky.sunCol),this.sunLight.intensity=n.sunI,this.sunLight.position.copy(this.sky.sunDir).multiplyScalar(1e3);let r=n.grade,a=this.post.u;a.lift.value.set(...r.lift),a.gain.value.set(...r.gain),a.sat.value=r.sat,a.exposure.value=r.exposure,a.sunCol.value.copy(this.sky.sunCol),this.fx.setLight(n)}async start(e,t){this.clear(),this.mission=e,this.planeKey=t,this.time=0,this.kills=0,this.score=0,this.hits=0,this.shots=0,this.result=null,this.timers=[],this.waits=[],this.abortToken={aborted:!1},this.outT=0,this.alertCd=0,this.chatCd=6,this.hitCd=0,this.maxIncoming=e.maxIncoming||1,this.difficultyMissile=e.missileSkill||.92,await this.setEnv(e.env,e.clouds),this.carrier=null,e.carrier?(this.carrier=this.carrierObj,this.carrier.place(e.carrier.x??0,e.carrier.z??0,(e.carrier.heading??0)*Ji,e.carrier.speed??9),this.carrier.group.visible=!0,this.carrier.alive=!0,this.carrier.hp=this.carrier.maxHp,this.ships.push(this.carrier),this.carrier.label="CVN-77"):this.carrierObj&&(this.carrierObj.group.visible=!1);let n=Gt[t],i=new va(n,"blue");if(i.isPlayer=!0,i.label="",i.maxHp=i.hp=n.hp,this.player=i,this.ammo={primary:n.primary?n.primary.count:n.msl,sp:n.sp?n.sp.count:0,flares:n.flares||0},this.primary=n.primary||(n.msl?{id:"MSL",name:"MSL",kind:"aam",multi:1,range:3600}:null),this.special=n.sp||null,this.weapon="primary",this.pylonCd=[0,0],this.spCd=0,this.target=null,this.lockProgress=0,this.locks=[],this.lockT=new Map,this.gunT=0,await this.addPlaneView(i,n.model,!0),this.planes.push(i),e.start==="carrier"&&this.carrier)this.placeOnCatapult(0);else{let a=e.startPos||{x:0,y:2500,z:-8e3,heading:0};i.pos.set(a.x,a.y,a.z),i.setHeading((a.heading||0)*Ji),i.speed=n.cruise,i.gearDown=!1,this.state="air"}this.chase.init=!1,this.running=!0,this.paused=!1,this.hud.show(!0),this.hud.objective(""),this.radio.clear(),this.radio.prefetch(e.voice||[]),this.audio.music(e.music||"battle");let r=this.abortToken;return Promise.resolve().then(()=>e.run(this)).catch(a=>{a instanceof Wl||console.error(a)}),r}clear(){this.abortToken&&(this.abortToken.aborted=!0);for(let e of this.waits||[])e.reject(new Wl);this.waits=[];for(let e of[...this.planes,...this.ships])this.removeView(e);this.planes=[],this.ships=[];for(let e of this.rings)this.scene.remove(e.mesh);if(this.rings=[],this.weapons.clear(),this.running=!1,this.waypointPos=null,this.landing)for(let e of this.landing.gates)this.scene.remove(e.mesh);this.landing=null}async addPlaneView(e,t,n=!1){let i=await Ei(t,this.renderer,{size:n?this.tier.heroTex:this.tier.aiTex}),r=_s(i);if(e.view=r,e.model=i,e.radius=Math.max(e.radius,i.radius*.55),r.userData.parts.gear&&(r.userData.parts.gear.visible=!1),e.burners=[],e.def.burner!==0)for(let a of e.def.engines||["nozzle_L","nozzle_R"]){let o=i.marks[a];if(!o)continue;let c=(e.def.nozzleScale||1)*(t==="bomber"?.55:.5),l=Sl(c,(t==="bomber"?6:7.5)*(e.def.burner||1));l.position.copy(o),r.add(l),e.burners.push(l)}return e.tips=[i.marks.tip_L,i.marks.tip_R].filter(Boolean),e.vortex=null,this.scene.add(r),this.views.add(e),e}removeView(e){e.view&&e!==this.carrier&&this.scene.remove(e.view),e.vortex&&e.vortex.forEach(t=>{t.dead=!0,t.emit=!1}),e.smokeTrail&&(e.smokeTrail.dead=!0,e.smokeTrail.emit=!1),this.views.delete(e)}async spawnPlane(e,t,n=0,i={}){let r=!!Gt[e]&&i.team!=="red",a=r?Gt[e]:du[e],o={...a,hp:i.hp??a.hp,cruise:a.cruise,maxSpd:a.maxSpd,minSpd:a.minSpd??60,accel:a.accel??40,pitch:a.pitch,roll:a.roll,yaw:a.yaw??.4,msl:a.msl,gun:a.gun},c=new va(o,r?"blue":"red");return c.pos.copy(t),c.setHeading(n*Ji),c.speed=o.cruise,c.kind=e,c.label=i.label||"",c.mission=!!i.mission,c.score=a.score||200,c.radius=o.big?24:10,await this.addPlaneView(c,a.model),c.ai=new Ol(c,this,{skill:i.skill??(a.ace?.95:.55),role:i.role||(e==="bomber"?"bomber":e==="drone"?"drone":"fighter"),orbit:i.orbit,alt:i.alt??t.y,goal:i.goal,aggro:i.aggro,waypoint:i.waypoint}),i.orbitR&&(c.ai.orbitR=i.orbitR),this.planes.push(c),c}async spawnShip(e,t,n=0,i={}){let r=du[e],a=await Ei(r.model,this.renderer,{size:this.tier.shipTex}),o=_s(a),c={def:{...r},pos:t.clone().setY(0),heading:n*Ji,speed:i.speed??6,vel:new E,hp:i.hp??r.hp,maxHp:i.hp??r.hp,alive:!0,team:i.team||"red",view:o,half:76,beam:10,height:22,radius:70,mission:!!i.mission,label:i.label||"",score:r.score,kind:e};return c.ai=new Bl(c,this),this.scene.add(o),this.ships.push(c),this.views.add(c),c}ring(e,t=0,n=0,i=45){let r=new Qs(i,1.6,8,48),a=new Jt({color:new ae(.4,2.2,3),transparent:!0,blending:Vn,depthWrite:!1}),o=new at(r,a);o.position.copy(e),o.rotation.set(-n*Ji,t*Ji,0,"YXZ"),o.layers.set(1),this.scene.add(o);let c=new E(0,0,1).applyEuler(o.rotation),l={mesh:o,pos:e.clone(),n:c,r:i,passed:!1,prevSide:null,team:"ring",alive:!0,ring:!0,def:{}};return this.rings.push(l),l}wait(e){let t=this.abortToken;return new Promise((n,i)=>{this.waits.push({t:this.time+e,resolve:n,reject:i,tok:t})})}until(e,t=1/0){let n=this.abortToken;return new Promise((i,r)=>{this.waits.push({fn:e,t:this.time+t,resolve:i,reject:r,tok:n})})}say(e){this.radio.say(e)}objective(e){this.hud.objective(e)}waypoint(e){this.waypointPos=e?e.clone():null}alive(e){return e.filter(t=>t.alive)}allDead(e){return e.every(t=>!t.alive)}get enemies(){return[...this.planes,...this.ships].filter(e=>e.alive&&e.team==="red")}complete(e){this.result||(this.result={ok:!0,time:this.time,score:this.score+Math.max(0,Math.round(3e3-this.time*5)),kills:this.kills,bonusText:e},this.hud.message("MISSION ACCOMPLISHED","big ok",4),this.audio.music("win",{loop:!1,fade:.8}),this.endT=4.5)}fail(e="MISSION FAILED"){this.result||(this.result={ok:!1,time:this.time,score:this.score,kills:this.kills,reason:e},this.hud.message(e,"big bad",4),this.audio.music("lose",{loop:!1,fade:.8}),this.endT=4.5)}hudMsg(e,t){this.hud.message(e,t,1.3)}camDist(e){return this.camera.position.distanceTo(e)}missilesAt(e){let t=0;for(let n of this.weapons.missiles)n.target===e&&!n.dead&&!n.bomb&&t++;return t}missileAlert(){this.alertCd<=0&&(this.alertCd=14,Math.random()<.6&&this.radio.say(Math.random()<.5?"awacs_missile":"wing_missile"))}damage(e,t,n,i,r){if(e.alive){if(e.isPlayer){if(this.godMode)return;e.hp-=t,this.post.u.flash.value=Math.max(this.post.u.flash.value,i==="gun"||i==="flak"?.05:.25),this.chase.shake=Math.max(this.chase.shake,i==="gun"?.6:2.5),this.audio.hit(),navigator.vibrate?.(i==="gun"?15:80),i!=="gun"&&this.hitCd<=0&&(this.hitCd=10,this.radio.say(e.hp>40?"wing_hit":"awacs_damage")),e.hp<=0&&this.killPlayer("SHOT DOWN");return}e.hp-=t,n?.isPlayer&&(this.hits++,i!=="gun"&&e.hp>0&&this.hudMsg("HIT","hit")),e.hp<=0&&this.kill(e,n)}}kill(e,t){e.alive=!1;let n=e.def.ship?2.6:e.def.big?1.6:1;if(this.fx.explosion(e.pos,n,e.vel),this.audio.explosion(n,this.camDist(e.pos)),t?.isPlayer&&(this.kills++,this.score+=e.score||300,this.hudMsg("DESTROYED","kill"),this.chase.shake=Math.max(this.chase.shake,.4),this.chatCd<=0&&this.mission.chatter!==!1)){this.chatCd=9+Math.random()*6;let i=e.def.ship?["awacs_ship","wing_nice"]:e.def.ace?["awacs_ace_down"]:["wing_splash","awacs_splash","wing_nice","awacs_good"];this.radio.say(i[Math.floor(Math.random()*i.length)])}e.def.ship?e.sinkT=0:(e.wreckT=0,e.wreckSpin=(Math.random()-.5)*3,e.vel.y-=10)}killPlayer(e){let t=this.player;t.alive&&(t.alive=!1,this.fx.explosion(t.pos,1.2,t.vel),this.audio.explosion(1.5,0),this.audio.silence(),t.wreckT=0,t.wreckSpin=2,navigator.vibrate?.([100,60,200]),this.fail(e))}placeOnCatapult(e){let t=this.carrier,n=this.player,i=t.cats[e];this.state="cat",this.catI=e,this.catT=0,this.catHold=0,n.gearDown=!0,n.speed=0,n.onDeck=t,n.hover=0;let r=i.a.clone();r.y=t.deckZ+n.def.gearH,this.deckLocal=r,t.toWorld(r,n.pos),n.setHeading(t.catYaw(e),0,0)}beginLanding(e=!0){this.landing={optional:e,attempts:0,done:!1,gates:[]};for(let t of[5200,4200,3300,2500,1800,1200,750,400]){let n=new Qs(t>2e3?34:24,.9,6,40),i=new Jt({color:new ae(2.4,1.9,.5),transparent:!0,opacity:.85,blending:Vn,depthWrite:!1}),r=new at(n,i);r.layers.set(1),this.scene.add(r),this.landing.gates.push({d:t,mesh:r})}this.state=this.state==="cat"?"cat":"air",document.getElementById("b-skip")?.classList.toggle("hidden",!e)}updateCarrierOps(e){let t=this.carrier,n=this.player,i=this.input;if(this.state==="cat"||this.state==="launch"){let r=t.cats[this.catI],a=r.a.distanceTo(r.b),o=zt.subVectors(r.b,r.a).normalize();if(this.state==="cat"){if(this.catHold=i.boostV||this.autoPilot?this.catHold+e:0,n.burner=Wn(n.burner,i.boostV?1:.15,1-Math.exp(-e*4)),Math.random()<e*10){let c=t.toWorld(Ai.copy(r.a).addScaledVector(o,Math.random()*a).setY(t.deckZ+.5));this.fx.puff(c,{size:3,size1:12,life:1.6,color:[1.2,1.2,1.25],alpha:.35,rise:3,vel:t.vel.clone()})}this.catHold>.5&&(this.state="launch",this.catT=0,this.audio.play("cat",{gain:.9}),this.radio.say("cat_shoot")),this.deckLocal.copy(r.a).setY(t.deckZ+n.def.gearH)}else{let l=2*a/5.289999999999999;this.catT+=e;let h=Math.min(a,.5*l*this.catT*this.catT);this.deckLocal.copy(r.a).addScaledVector(o,h).setY(t.deckZ+n.def.gearH),n.burner=1;for(let f=0;f<2;f++)this.fx.puff(t.toWorld(Ai.copy(this.deckLocal).setY(t.deckZ+.6)),{size:4,size1:16,life:1.4,color:[1.2,1.2,1.25],alpha:.45,rise:2,vel:t.vel.clone()});if(this.chase.shake=.5,h>=a-.01){this.state="air",n.onDeck=null,n.speed=l*2.3+t.speed,n.setHeading(t.catYaw(this.catI),7*Ji,0),this.gearUpT=3,this.radio.say("tower_airborne");return}}return t.toWorld(this.deckLocal,n.pos),n.setHeading(t.catYaw(this.catI),0,0),n.vel.copy(t.vel),!0}return this.state==="trap"||this.state==="deck"?(this.trapV=Math.max(0,this.trapV-e*(this.state==="trap"?34:12)),this.deckLocal.addScaledVector(this.deckDir,this.trapV*e),t.toWorld(this.deckLocal,n.pos),n.vel.copy(t.vel),n.burner=Wn(n.burner,0,1-Math.exp(-e*3)),n.speed=this.trapV,this.trapV<=.1&&!this.landing.done&&(this.landing.done=!0,this.score+=2500,this.hud.message(this.state==="trap"?`TRAPPED - WIRE ${this.wireN}`:"LANDED","big ok",3),this.radio.say(this.state==="trap"?"lso_trap":"lso_vtol"),this.landed=!0),!0):!1}checkTouchdown(e){let t=this.carrier,n=this.player;if(!t||this.state!=="air")return;let i=t.toLocal(n.pos,zt);if(Math.abs(i.x)>60||Math.abs(i.z)>180||n.pos.y-(n.gearDown?n.def.gearH:1)>t.deckZ+.4||!t.onDeck(i))return;let{pitch:a,bank:o}=n.attitude(),c=n.vel.y-(n.hover>.5,0),l=n.speed,h=n.gearDown&&Math.abs(o)<.45&&a>-.22&&a<.35&&c>-11;if(this.lastTouch={bank:+o.toFixed(2),pitch:+a.toFixed(2),vs:+c.toFixed(1),spd:Math.round(l),gear:n.gearDown},!h){this.killPlayer(n.gearDown?"CRASHED ON DECK":"GEAR UP LANDING");return}this.deckLocal=i.clone(),this.deckLocal.y=t.deckZ+n.def.gearH;let f=n.forward(Ai);this.deckDir=new E(f.x,0,f.z).normalize();let u=Math.cos(t.heading),d=Math.sin(t.heading);if(this.deckDir.set(this.deckDir.x*u-this.deckDir.z*d,0,this.deckDir.x*d+this.deckDir.z*u),n.hover>.5||n.def.vtol&&l<70){this.state="deck",this.trapV=Math.max(0,l-t.speed),n.onDeck=t;return}let m=t.wireAt(i);if(m>=0&&n.def.hook&&l<125){this.state="trap",this.wireN=m+1,this.trapV=Math.max(0,l-t.speed),n.onDeck=t,this.audio.play("trap",{gain:1}),this.chase.shake=1.5,navigator.vibrate?.(120);return}this.landing&&this.landing.attempts++,this.hud.message(l>=125?"TOO FAST - BOLTER":"BOLTER","warn",2.5),this.radio.say("lso_bolter",!0),n.pos.y=t.deckZ+n.def.gearH+.6,a<.05&&n.setHeading(n.heading(),.08,0)}curWeapon(){return this.weapon==="sp"?this.special:this.primary}candidates(e){let t=[],n=e==="gpb"||e==="mop"||e==="agm";for(let i of this.planes)i.alive&&i.team==="red"&&!n&&t.push(i);for(let i of this.ships)i.alive&&i.team==="red"&&t.push(i);return t}updateTargeting(e){let t=this.player,n=this.curWeapon(),i=n?n.kind:"aam",r=this.candidates(i),a=t.forward(zt),o=u=>{let d=u.pos.distanceTo(t.pos),m=Ai.subVectors(u.pos,t.pos).normalize(),x=Math.acos(Te(m.dot(a),-1,1));return d*(.4+x*1.6)*(u.mission?.7:1)};if(this.input.consume("tgt")&&r.length){let u=r.slice().sort((m,x)=>o(m)-o(x)),d=u.indexOf(this.target);this.target=u[(d+1)%u.length],this.lockProgress=0,this.locks=[],this.lockT.clear(),this.audio.click()}(!this.target||!this.target.alive||!r.includes(this.target))&&(this.target=r.length?r.reduce((u,d)=>o(u)<o(d)?u:d):null,this.lockProgress=0);let c=n&&n.range||3600,l=i==="gpb"||i==="mop",h=u=>{if(u.pos.distanceTo(t.pos)>c*(u.def.ship&&!l?1.2:1))return!1;if(l){let x=Ai.subVectors(u.pos,t.pos);x.y=0;let g=x.length(),p=zt.copy(t.forward(zt));return p.y=0,p.normalize(),g<c&&x.normalize().dot(p)>.55&&t.pos.y-u.pos.y>150}return Ai.subVectors(u.pos,t.pos).normalize().dot(t.forward(zt))>Math.cos(33*Ji)},f=n?.multi||1;if(f>1){let u=r.filter(h).sort((d,m)=>o(d)-o(m)).slice(0,f);for(let d of u)this.lockT.set(d,Math.min(1,(this.lockT.get(d)||0)+e/.4));for(let[d,m]of this.lockT)u.includes(d)||this.lockT.set(d,Math.max(0,m-e*2));this.locks=u.filter(d=>this.lockT.get(d)>=1),this.lockProgress=this.target&&this.lockT.get(this.target)||0}else{let u=this.target;u&&h(u)?this.lockProgress=Math.min(1,this.lockProgress+e/.45):this.lockProgress=Math.max(0,this.lockProgress-e*2.5),this.locks=u&&this.lockProgress>=1?[u]:[]}}firePlayer(e){let t=this.player,n=this.input;this.pylonCd[0]-=e,this.pylonCd[1]-=e,this.spCd-=e,n.consume("sp")&&this.special&&(this.weapon=this.weapon==="sp"?"primary":"sp",this.locks=[],this.lockT.clear(),this.lockProgress=0,this.audio.select(),this.hudMsg(this.curWeapon().name,"info")),n.consume("flare")&&t.def.flares&&(this.ammo.flares>0?(this.ammo.flares--,this.weapons.flare(t)):this.hudMsg("NO FLARES","warn"));let i=!1;if(t.def.gun&&n.gunV&&this.state==="air"){for(i=!0,this.gunT-=e;this.gunT<=0;){this.gunT+=1/22;let r=t.model.marks.gun||new E(-1.5,.5,3),a=zt.copy(r).applyQuaternion(t.quat).add(t.pos);this.weapons.gun(t,a,.0035),this.shots++,Math.random()<.5&&this.fx.flash(a.clone().addScaledVector(t.forward(Ai),3),3.2,[6,4,2],.03,t.vel)}this.chase.shake=Math.max(this.chase.shake,.18)}if(this.audio.gun(i),n.consume("msl")&&this.state==="air"){let r=this.curWeapon();if(!r)return;let a=this.weapon==="sp",o=a?this.ammo.sp:this.ammo.primary;if(o<=0){this.hudMsg("NO AMMO","warn");return}if(a){if(this.spCd>0)return;let c=r.multi>1?this.locks.slice(0,Math.min(r.multi,o)):[this.locks[0]||null];r.multi>1&&!c.length&&c.push(null),c.forEach((l,h)=>setTimeout(()=>this.launchPlayer(r.kind,l,h),h*90)),this.ammo.sp-=Math.max(1,c.length),this.spCd=r.kind==="mop"?6:4.5}else{let c=this.pylonCd[0]<=0?0:this.pylonCd[1]<=0?1:-1;if(c<0)return;this.pylonCd[c]=r.kind==="gpb"?1.1:2.2,this.launchPlayer(r.kind,this.locks[0]||null,c),this.ammo.primary--}}}launchPlayer(e,t,n){let i=this.player;if(!i.alive)return;let r=i.model.marks,a;e==="gpb"||e==="mop"?a=zt.copy(r.bay||new E(0,-1.2,0)).applyQuaternion(i.quat).add(i.pos):a=zt.copy((n%2?r.msl_R:r.msl_L)||new E(n%2?-2:2,-.6,0)).applyQuaternion(i.quat).add(i.pos);let o=e==="aam"&&t?.def?.ship?"agm":e;this.weapons.launch(o,i,a.clone(),t,{dmgMul:e==="aam"&&t?.def?.ship?.5:1})}autoCtrl(e){let t=this.player,n,i=this.rings.find(o=>!o.passed);if(i)n=i.pos;else if(this.landing&&this.carrier){let o=this.carrier.approach(t.pos);o.along>5600||Math.abs(o.lat)>900?n=this.carrier.glidePoint(6e3).setY(Math.max(500,this.carrier.glidePoint(6e3).y)):n=this.carrier.glidePoint(Math.max(-60,o.along-Math.max(250,o.along*.25)))}else this.target&&this.target.alive?(n=this.target.pos.clone(),this.target.def.ship&&(n.y=Math.max(900,t.pos.y))):n=t.pos.clone().add(new E(0,0,3e3));if(n.y<600&&!this.landing&&(n.y=600),this.landing){this.input.hold.gun=0;let o=zt.subVectors(n,t.pos).applyQuaternion(fu.copy(t.quat).invert());return{mode:"assist",steer:Te(Math.atan2(-o.x,o.z)*2.5,-1,1),pitch:Te(Math.atan2(o.y,o.z)*5,-1,1),boost:!1,brake:t.speed>82}}let r=Fl(t,n,1),a=this.weapons.incoming(t);if(a.length&&a[0].pos.distanceTo(t.pos)<1500){r.rollCmd=1,r.pitchCmd=1;let{bank:o}=t.attitude();Math.abs(o)>1.4&&(r.rollCmd=-.3)}return t.pos.y<300&&!this.landing&&(r.pitchCmd=1),this.autoFireT=(this.autoFireT||0)-e,this.locks.length&&this.autoFireT<=0&&(this.input.events.add("msl"),this.autoFireT=1.2),this.input.hold.gun=this.target&&this.target.alive&&!this.target.def.ship&&this.target.pos.distanceTo(t.pos)<700?1:0,{mode:"ai",rollCmd:r.rollCmd,pitchCmd:r.pitchCmd,yawCmd:0,boost:!this.landing&&this.target&&this.target.pos.distanceTo(t.pos)>3e3,brake:!!this.landing}}update(e){if(!this.running||this.paused)return;this.time+=e;let t=this.player,n=this.input;for(let i of this.waits.slice())i.tok.aborted||(i.fn&&i.fn()||this.time>=i.t)&&(this.waits.splice(this.waits.indexOf(i),1),i.resolve(!0));if(this.alertCd-=e,this.chatCd-=e,this.hitCd-=e,this.playerMslCd=(this.playerMslCd||0)-e,this.carrier&&this.carrier.update(e),t.alive){if(!(this.carrier&&this.updateCarrierOps(e))){let c={mode:this.settings.expert?"expert":"assist",steer:n.steer,pitch:n.pitch,boost:!!n.boostV,brake:!!n.brakeV};if(this.autoPilot&&(c=this.autoCtrl(e)),t.hover>.5&&this.carrier){let l=this.carrier.toLocal(t.pos,zt);this.carrier.onDeck(l)&&l.y-this.carrier.deckZ<12&&c.pitch>-.3&&(c.pitch=-.3)}t.update(e,c),this.checkTouchdown(e)}if(this.gearUpT>0&&(this.gearUpT-=e,this.gearUpT<=0&&(t.gearDown=!1)),this.landing&&this.state==="air"){let c=this.carrier.approach(t.pos);this.approachInfo=c.along>-100&&c.along<9e3&&Math.abs(c.lat)<2500?{...c,gear:t.gearDown,fast:t.speed>115&&!t.def.vtol}:null,this.approachInfo&&c.along<4500&&t.pos.y<900&&!t.gearDown&&(t.gearDown=!0,this.hudMsg("GEAR DOWN","info")),t.gearDown&&t.pos.y>1400&&(t.gearDown=!1),t.def.vtol&&Math.abs(c.lat)<300&&c.along<1500&&(this.approachInfo={...c,gear:t.gearDown,fast:!1})}else this.approachInfo=null;this.state==="air"&&t.pos.y<1+(t.gearDown?t.def.gearH*.5:0)&&(!this.carrier||!this.carrier.onDeck(this.carrier.toLocal(t.pos,zt)))&&(this.fx.splash(t.pos,2),this.killPlayer("CRASHED")),this.state==="air"&&this.carrier&&this.carrier.collides(t.pos)&&this.killPlayer("CRASHED INTO CVN-77");for(let c of this.ships)c!==this.carrier&&c.alive&&uu(c,t.pos)&&this.killPlayer("CRASHED");let a=this.mission.area||3e4,o=this.mission.center||{x:0,z:0};Math.hypot(t.pos.x-o.x,t.pos.z-o.z)>a||t.pos.y>13e3?(this.outT=(this.outT||10)-e,this.outT<=0&&this.killPlayer("LEFT THE OPERATIONAL AREA")):this.outT=0,this.state==="air"?(this.updateTargeting(e),this.firePlayer(e)):(this.audio.gun(!1),this.locks=[])}for(let i of this.planes)i.alive?i.ai?.update(e):i.wreckT!=null&&this.updateWreck(i,e);for(let i of this.ships)i!==this.carrier&&(i.alive?i.ai.update(e):i.sinkT!=null&&(i.sinkT+=e,i.pos.y-=e*(.6+i.sinkT*.08),i.tilt=(i.tilt||0)+e*.02,Math.random()<e*3&&this.fx.puff(zt.copy(i.pos).add(new E((Math.random()-.5)*80,14,(Math.random()-.5)*20)),{size:18,size1:60,life:8,color:[.3,.28,.27],alpha:.7,rise:6}),i.sinkT<3&&Math.random()<e*4&&this.fx.explosion(zt.copy(i.pos).add(new E((Math.random()-.5)*100,15,(Math.random()-.5)*20)),1.1),i.sinkT>25&&(this.removeView(i),i.sinkT=null)));this.planes=this.planes.filter(i=>i.alive||i.wreckT!=null||i===t),this.ships=this.ships.filter(i=>i.alive||i.sinkT!=null||i===this.carrier);for(let i of this.rings){if(i.passed)continue;i.mesh.rotation.z+=e*.6;let r=zt.subVectors(t.pos,i.pos),a=Math.sign(r.dot(i.n));i.prevSide!=null&&a!==i.prevSide&&r.length()<i.r*1.15&&(i.passed=!0,i.mesh.material.color.setRGB(.6,3,.8),this.audio.select(),this.hudMsg("GOOD","ok"),setTimeout(()=>{this.scene.remove(i.mesh)},400)),i.prevSide=a}this.weapons.update(e,this),this.clouds.update(e),this.result&&this.endT>0&&(this.endT-=e,this.endT<=0&&this.onEnd?.(this.result))}updateWreck(e,t){e.wreckT+=t,e.vel.y-=9.81*t,e.pos.addScaledVector(e.vel,t),fu.setFromAxisAngle(new E(0,0,1),e.wreckSpin*t),e.quat.multiply(fu),e.smokeTrail||(e.smokeTrail=this.fx.trails.create({width:3,grow:6,life:5,alpha:.6,minDist:10})),this.fx.trails.push(e.smokeTrail,e.pos),Math.random()<t*20&&this.fx.flash(e.pos,10,[6,3,1],.1),(e.pos.y<0||e.wreckT>9)&&(e.pos.y<0&&this.fx.splash(e.pos,1.5),e.wreckT=null,e!==this.player?this.removeView(e):e.view.visible=!1)}render(e){let t=this.player;for(let r of this.views){if(!r.view)continue;if(r.def.ship){r!==this.carrier&&(r.view.position.copy(r.pos),r.view.rotation.set(r.tilt||0,r.heading,(r.tilt||0)*.5));continue}r.view.position.copy(r.pos),r.view.quaternion.copy(r.quat);let a=r.view.userData.parts.gear;if(a&&(a.visible=!!r.gearDown),r.isPlayer&&r.model.material.userData.burner&&(r.model.material.userData.burner.value=.02+Math.max(0,r.burner-.25)*1.3),r.alive&&r.burner>.4&&r.burners.length&&this.camera.position.distanceToSquared(r.pos)<1500*1500){let o=(r.burner-.4)/.6;for(let c of r.burners)this.fx.flash(zt.copy(c.position).add(Ai.set(0,0,-1.2)).applyQuaternion(r.quat).add(r.pos),2.2+3.5*o,[2.6*o,1.5*o,1.2*o],.03,r.vel)}for(let o of r.burners)o.material.uniforms.power.value=r.alive?Te((r.burner-.22)*1.35,0,1):0,o.material.uniforms.time.value+=e,o.scale.setScalar(.6+.5*r.burner);if(r.alive&&r.tips.length&&this.camera.position.distanceToSquared(r.pos)<2500*2500){let o=Te((r.g-3.5)/3.5,0,1)*Te(r.speed/150,0,1);!r.vortex&&o>.05&&(r.vortex=r.tips.map(()=>this.fx.trails.create({width:.5,grow:.6,life:1.4,alpha:.6,minDist:4}))),r.vortex&&r.tips.forEach((c,l)=>this.fx.trails.push(r.vortex[l],zt.copy(c).applyQuaternion(r.quat).add(r.pos),o)),o>.5&&r.isPlayer&&Math.random()<e*30&&this.fx.puff(zt.set(0,1.2,-2).applyQuaternion(r.quat).add(r.pos),{size:4,size1:9,life:.35,color:[1.3,1.3,1.35],alpha:.35*o,vel:r.vel.clone().multiplyScalar(.9),drag:0})}r.alive&&r.hp<r.maxHp*.5&&Math.random()<e*25&&this.fx.puff(zt.set(0,.5,-4).applyQuaternion(r.quat).add(r.pos),{size:3,size1:14,life:2.2,color:[.35,.33,.32],alpha:.6,vel:r.vel.clone().multiplyScalar(.2)})}if(t&&(this.chase.update(e,t,(t.def.bomber,1)),t.alive||this.camera.lookAt(t.pos)),this.landing&&this.carrier){let r=this.carrier.landingYaw(),a=Yt.degToRad(3.5),o=this.player?this.carrier.approach(this.player.pos).along:1e9;for(let c of this.landing.gates)this.carrier.glidePoint(c.d,3.5,c.mesh.position),c.mesh.rotation.set(-a,r,0,"YXZ"),c.mesh.visible=!this.landed&&c.d<o+50}this.ocean.update(e,this.camera);let n=this.ocean.u.ships.value,i=0;for(let r of this.ships){if(i>=n.length)break;!r.alive&&r!==this.carrier||n[i++].set(r.pos.x,r.pos.z,r.heading,r===this.carrier?165:75)}for(;i<n.length;i++)n[i].w=0}hudState(){let e=this.player,t=[];for(let a of this.planes)a.alive&&a!==e&&a.pos.distanceTo(e.pos)<24e3&&t.push({ent:a});for(let a of this.ships)a.alive&&a!==this.carrier&&a.pos.distanceTo(e.pos)<3e4&&t.push({ent:a});for(let a of this.rings)a.passed||t.push({ent:{pos:a.pos,team:"blue",def:{},label:"GATE"}});this.landing&&this.carrier&&!this.landed&&t.push({ent:{pos:this.carrier.toWorld(this.carrier.aim,new E),team:"blue",def:{},label:"CVN-77"}});let n=this.weapons.incoming(e),i=null,r=this.target;if(e.def.gun&&r&&r.alive&&!r.def.ship){let a=r.pos.distanceTo(e.pos);if(a<1200){let o=a/1050;i=Ai.copy(r.pos).addScaledVector(r.vel,o).addScaledVector(e.vel,-o*0)}}return{camera:this.camera,player:e,contacts:t,target:this.target,locks:this.locks,lockProgress:this.lockProgress,incoming:n,gunPipper:i?i.clone():null,weapon:this.weapon,primary:this.primary,special:this.special,ammo:this.ammo,reload:[Te(1-this.pylonCd[0]/2.2,0,1),Te(1-this.pylonCd[1]/2.2,0,1)],carrier:this.carrier,waypoint:this.waypointPos,approach:this.approachInfo,outOfArea:this.outT>0?this.outT:0,pullUp:e.pos.y<400&&e.forward(zt).y<-.25&&e.alive&&this.state==="air"&&!this.approachInfo,safeTop:this.safeTop||0,radarRange:9e3}}};Zt();var et=(s,e,t)=>new E(s,e,t),ya=["f15","f35a","f22","f35b"],Ri=[{id:"m0",code:"TRAINING",title:"BASIC FLIGHT TRAINING",env:"noon",clouds:"broken",start:"air",startPos:{x:0,y:2300,z:-6e3,heading:0},planes:["f15"],music:"calm",chatter:!1,area:26e3,center:{x:0,z:0},brief:"Learn to fly with your phone: tilt like a steering wheel to turn, lean to climb and dive. Gun drones, lock missiles, use your special weapon. Nobody shoots back.",briefVoice:"brief_m0",voice:["instr_welcome","instr_turn","instr_pitch","instr_boost","instr_gun","instr_msl","instr_tgt","instr_done","instr_good"],async run(s){s.godMode=!0,await s.wait(1.5),s.say("instr_welcome"),await s.wait(5),s.say("instr_turn"),s.objective("Fly through the gates");let e=s.player.pos,t=s.ring(et(0,2300,-3600),0),n=s.ring(et(-500,2300,-1700),-22),i=s.ring(et(-1500,2300,-200),-50);await s.until(()=>t.passed&&n.passed&&i.passed,140),s.say("instr_pitch"),s.objective("Climb through the high gate, dive through the low gate");let r=s.player.forward(new E);r.y=0,r.normalize();let a=Math.atan2(r.x,r.z)*180/Math.PI,o=s.ring(e.clone().addScaledVector(r,2400).setY(3e3),a,15),c=s.ring(e.clone().addScaledVector(r,5200).setY(2100),a,-15);await s.until(()=>o.passed&&c.passed,120),s.say("instr_boost"),s.objective("Hold BOOST, then BRAKE");let l=!1,h=!1;await s.until(()=>(l||=s.input.boostV,h||=l&&s.input.brakeV,h),25),s.say("instr_gun"),s.objective("Destroy the drones with your GUN");let f=s.player.forward(new E);f.y=0,f.normalize();let u=Math.atan2(f.x,f.z)*180/Math.PI,d=s.player.pos.clone().addScaledVector(f,1600),m=await s.spawnPlane("drone",d.clone().add(et(60,0,0)),u,{role:"drone",mission:!0,label:"DRONE",orbit:d.clone(),alt:d.y}),x=await s.spawnPlane("drone",d.clone().add(et(-150,40,200)),u,{role:"drone",mission:!0,label:"DRONE",orbit:d.clone(),alt:d.y+40});s.weaponLock="gun",await s.until(()=>s.allDead([m,x]),240),s.say("instr_good"),await s.wait(2),s.say("instr_msl"),s.objective("Lock on and destroy the drones with MISSILES");let g=s.player.pos.clone().addScaledVector(s.player.forward(new E).setY(0).normalize(),2600),p=[];for(let y=0;y<3;y++)p.push(await s.spawnPlane("drone",g.clone().add(et((y-1)*500,y*60,y*300)),u+90,{role:"drone",mission:!0,label:"DRONE",orbit:g.clone(),alt:g.y+y*60}));await s.until(()=>s.allDead(p),240),s.say("instr_tgt"),s.objective("Switch weapon with SP and lock several drones at once");let T=s.player.pos.clone().addScaledVector(s.player.forward(new E).setY(0).normalize(),3e3),C=[];for(let y=0;y<4;y++)C.push(await s.spawnPlane("drone",T.clone().add(et((y-1.5)*260,y%2*80,0)),u+180,{role:"drone",mission:!0,label:"DRONE",orbit:T.clone(),alt:T.y+y%2*80}));await s.until(()=>s.allDead(C),240),s.objective(""),s.say("instr_done"),await s.wait(5),s.complete()}},{id:"m1",code:"MISSION 01",title:"FIRST LIGHT",env:"dawn",clouds:"scattered",start:"carrier",carrier:{x:0,z:0,heading:0,speed:9},planes:ya,music:"battle",area:34e3,center:{x:0,z:6e3},brief:"Dawn patrol off the coast. Launch from CVN-77, intercept an enemy strike package of fighters and bombers before it reaches the fleet, then land back on deck.",briefVoice:"brief_m1",voice:["tower_cat","m1_start","m1_bombers","m1_wave2","m1_rtb","m1_carrier_hit","wing_join","lso_ball","bandit_1","bandit_2"],async run(s){await s.wait(1),s.say("tower_cat"),await s.until(()=>s.state==="air"),s.objective(""),await s.wait(3);let e=await s.spawnPlane(s.planeKey==="f15"?"f15":s.planeKey,s.player.pos.clone().add(et(60,30,-120)),0,{role:"escort",skill:.6,label:"VIPER 2"});s.say("wing_join"),await s.wait(3),s.say("m1_start"),s.objective("Destroy the strike package. Protect <b>CVN-77</b>");let t=s.carrier,n=et(0,3200,16e3),i=[];for(let l=0;l<4;l++)i.push(await s.spawnPlane("bandit",n.clone().add(et((l-1.5)*300,l*80,l*150)),180,{orbit:et(0,3e3,7e3),alt:3e3}));let r=[];for(let l=0;l<2;l++)r.push(await s.spawnPlane("bomber",et(-1500+l*3e3,2600,19e3),180,{role:"bomber",goal:t,alt:2400,mission:!0,label:"BOMBER"}));await s.wait(4),s.say("m1_bombers");let a=!1,o=()=>{for(let l of r)l.alive&&Math.hypot(l.pos.x-t.pos.x,l.pos.z-t.pos.z)<1500&&(a=!0);return a};if(await s.until(()=>o()||s.allDead([...i,...r])),a){s.say("m1_carrier_hit"),s.fail("CVN-77 WAS HIT");return}await s.wait(2),s.say("m1_wave2");let c=[];for(let l=0;l<4;l++)c.push(await s.spawnPlane("bandit",et(-9e3+l*400,3500+l*120,12e3),140,{orbit:et(0,3e3,6e3),alt:3200}));await s.until(()=>s.allDead(c)),await s.wait(2),s.say("m1_rtb"),s.objective("Land on <b>CVN-77</b> (optional)"),s.waypoint(t.glidePoint(4e3)),s.beginLanding(!0),await s.wait(6),s.say("lso_ball"),await s.until(()=>s.landed||s.skipLanding),await s.wait(s.landed?2.5:.2),s.complete(s.landed?"CARRIER LANDING +2500":"")}},{id:"m2",code:"MISSION 02",title:"ABOVE THE CLOUDS",env:"noon",clouds:"sea",start:"air",startPos:{x:0,y:3600,z:-9e3,heading:0},planes:ya,music:"battle",area:3e4,center:{x:0,z:0},brief:"Enemy fighters are operating above a solid cloud deck. Climb, find them and clear the sky. Watch for bandits popping out of the clouds.",briefVoice:"brief_m2",voice:["m2_start","m2_wave2","m2_wave3","m2_end","wing_clouds","bandit_1","bandit_3"],async run(s){let e=await s.spawnPlane(s.planeKey,et(80,3640,-9150),0,{role:"escort",skill:.6,label:"VIPER 2"});await s.wait(2),s.say("m2_start"),s.objective("Destroy all enemy fighters");let t=[];for(let r=0;r<5;r++)t.push(await s.spawnPlane("bandit",et((r-2)*700,3400+r%2*400,2e3+r*300),180,{orbit:et(0,3400,0),alt:3400}));await s.wait(12),s.say("bandit_1"),await s.until(()=>s.allDead(t)),s.say("m2_wave2");let n=[];for(let r=0;r<5;r++)n.push(await s.spawnPlane("bandit",et(5e3-r*500,2200,6e3+r*300),220,{orbit:et(0,3200,2e3),alt:3500}));await s.wait(6),s.say("wing_clouds"),await s.until(()=>s.allDead(n)),s.say("m2_wave3");let i=[];for(let r=0;r<2;r++)i.push(await s.spawnPlane("ace",et(-6e3+r*300,4200,8e3),150,{mission:!0,label:"ACE",orbit:et(0,3800,2e3),alt:3800}));await s.until(()=>s.allDead(i)),s.say("m2_end"),await s.wait(4),s.complete()}},{id:"m3",code:"MISSION 03",title:"SPIRIT OF ACE",env:"sunset",clouds:"scattered",start:"air",startPos:{x:0,y:3800,z:-14e3,heading:0},planes:["b2"],music:"ace",area:36e3,center:{x:0,z:0},brief:"Fly the B-2 Spirit deep into enemy waters. Two F-22 Raptors escort you. Sink the enemy fleet with guided bombs - bombs lock on ships ahead of and below you. Use flares against missiles.",briefVoice:"brief_m3",voice:["m3_start","m3_fleet","m3_fighters","m3_flares","m3_end","bandit_2"],async run(s){let e=[];for(let r=0;r<2;r++)e.push(await s.spawnPlane("f22",et((r?-1:1)*120,3900,-14200),0,{role:"escort",skill:.75,label:"RAPTOR "+(r+1)}));await s.wait(2),s.say("m3_start"),s.objective("Destroy the enemy fleet");let t=[],n=et(0,0,4e3);for(let r=0;r<5;r++)t.push(await s.spawnShip("destroyer",n.clone().add(et((r-2)*700,0,r%2*600)),90+r%2*10,{mission:!0,label:"DDG",speed:7}));s.waypoint(n),await s.until(()=>s.player.pos.distanceTo(n)<12e3,120),s.say("m3_fleet"),await s.wait(4),s.say("m3_fighters");let i=[];for(let r=0;r<6;r++)i.push(await s.spawnPlane("bandit",et((r-2.5)*500,3500,9e3),180,{orbit:n.clone().setY(3500),alt:3500}));await s.wait(8),s.say("m3_flares"),await s.until(()=>s.allDead(t)),s.say("m3_end"),await s.wait(4),s.complete()}},{id:"m4",code:"MISSION 04",title:"STEEL RAIN",env:"dawn",clouds:"broken",start:"air",startPos:{x:-14e3,y:3e3,z:0,heading:90},planes:ya,music:"battle",area:32e3,center:{x:0,z:0},brief:"An enemy surface group is shelling the coast, protected by air cover and SAMs. Sink every ship. Guided bombs and air-to-ground missiles are cleared hot.",briefVoice:"brief_m4",voice:["m4_start","m4_mid","m4_end","bandit_1"],async run(s){await s.wait(2),s.say("m4_start"),s.objective("Sink the enemy surface group");let e=[],t=et(2e3,0,0);for(let i=0;i<6;i++)e.push(await s.spawnShip("destroyer",t.clone().add(et(i%3*700-700,0,Math.floor(i/3)*900-450)),0,{mission:!0,label:"DDG",speed:6}));s.waypoint(t);let n=[];for(let i=0;i<4;i++)n.push(await s.spawnPlane("bandit",et(3e3,3200+i*150,(i-1.5)*600),270,{orbit:t.clone().setY(3200),alt:3200}));await s.until(()=>e.filter(i=>!i.alive).length>=3),s.say("m4_mid"),await s.until(()=>s.allDead(e)),s.say("m4_end"),await s.wait(4),s.complete()}},{id:"m5",code:"MISSION 05",title:"SHORT DECK",env:"sunset",clouds:"scattered",start:"carrier",carrier:{x:0,z:0,heading:20,speed:9},planes:ya,music:"battle",area:34e3,center:{x:0,z:4e3},brief:"A bomber raid is heading for the carrier. Launch, stop all six bombers, then bring your jet back. The F-35B can land vertically: hold BRAKE at low speed to hover.",briefVoice:"brief_m5",voice:["tower_cat","m5_start","m5_mid","m5_land","lso_vtol_hint","lso_ball","m1_carrier_hit"],async run(s){await s.wait(1),s.say("tower_cat"),await s.until(()=>s.state==="air"),s.objective(""),await s.wait(4),s.say("m5_start"),s.objective("Stop the bomber raid");let e=s.carrier,t=[],n=[];for(let a=0;a<6;a++)t.push(await s.spawnPlane("bomber",et(-3e3+a*1200,2400+a%2*300,21e3+a%3*800),180,{role:"bomber",goal:e,alt:2300+a%2*300,mission:!0,label:"BOMBER"}));for(let a=0;a<4;a++)n.push(await s.spawnPlane("bandit",et(-2e3+a*1300,3200,19e3),180,{orbit:et(0,3e3,12e3),alt:3e3}));let i=!1,r=()=>{for(let a of t)a.alive&&Math.hypot(a.pos.x-e.pos.x,a.pos.z-e.pos.z)<1500&&(i=!0);return i};if(await s.until(()=>r()||t.filter(a=>!a.alive).length>=3),i||(s.say("m5_mid"),await s.until(()=>r()||s.allDead(t))),i){s.say("m1_carrier_hit"),s.fail("CVN-77 WAS HIT");return}await s.wait(2),s.say("m5_land"),s.objective(s.player.def.vtol?"Hover and land on <b>CVN-77</b> (optional)":"Land on <b>CVN-77</b> (optional)"),s.beginLanding(!0),await s.wait(5),s.say(s.player.def.vtol?"lso_vtol_hint":"lso_ball"),await s.until(()=>s.landed||s.skipLanding),await s.wait(s.landed?2.5:.2),s.complete(s.landed?"CARRIER LANDING +2500":"")}},{id:"m6",code:"MISSION 06",title:"ACE OF ACES",env:"sunset",clouds:"sea",start:"air",startPos:{x:0,y:4200,z:-1e4,heading:0},planes:ya,music:"ace",area:28e3,center:{x:0,z:0},maxIncoming:2,missileSkill:1,brief:"The Crimson squadron: four red-tailed aces, the best the enemy has. Above the clouds at sunset, one sky, one winner.",briefVoice:"brief_m6",voice:["m6_start","m6_crimson1","m6_crimson2","m6_crimson3","m6_lead","m6_end"],async run(s){await s.wait(2),s.say("m6_start"),s.objective("Defeat the Crimson squadron");let e=[];for(let n=0;n<3;n++)e.push(await s.spawnPlane("ace",et((n-1)*500,4400,5e3+n*200),180,{mission:!0,label:"CRIMSON "+(n+2),orbit:et(0,4200,0),alt:4200,skill:.85}));let t=await s.spawnPlane("ace",et(0,4800,6500),180,{mission:!0,label:"CRIMSON 1",orbit:et(0,4400,0),alt:4400,skill:1,hp:520});await s.wait(5),s.say("m6_crimson1"),await s.until(()=>e.filter(n=>!n.alive).length>=1),s.say("m6_crimson2"),await s.until(()=>s.allDead(e)),s.say("m6_lead"),await s.until(()=>t.hp<260||!t.alive),s.say("m6_crimson3"),await s.until(()=>!t.alive),s.say("m6_end"),await s.wait(5),s.complete()}}],Ov=[[12e3,"S"],[8e3,"A"],[5e3,"B"],[0,"C"]];function kf(s){for(let[e,t]of Ov)if(s>=e)return t;return"C"}var me=s=>document.getElementById(s),Hf={low:{name:"low",dpr:1,msaa:0,bloomLevels:4,skyW:2048,clouds:!0,cloudScale:3,cloudSteps:26,particles:500,trailPts:2500,heroTex:1024,aiTex:512,shipTex:1024},medium:{name:"medium",dpr:1.5,msaa:0,bloomLevels:5,skyW:2048,clouds:!0,cloudScale:2.6,cloudSteps:34,particles:800,trailPts:4e3,heroTex:2048,aiTex:1024,shipTex:2048},high:{name:"high",dpr:2,msaa:0,bloomLevels:5,skyW:4096,clouds:!0,cloudScale:2.2,cloudSteps:42,particles:1100,trailPts:5e3,heroTex:2048,aiTex:1024,shipTex:2048},ultra:{name:"ultra",dpr:3,msaa:0,bloomLevels:6,skyW:4096,clouds:!0,cloudScale:2,cloudSteps:54,particles:1500,trailPts:6e3,heroTex:2048,aiTex:1024,shipTex:2048}},Ma=["low","medium","high","ultra"],pu=/iPhone|iPad|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,zf=navigator.maxTouchPoints>0,Ci=new URLSearchParams(location.search),Dn={get(s,e){try{let t=localStorage.getItem("aced."+s);return t==null?e:JSON.parse(t)}catch{return e}},set(s,e){try{localStorage.setItem("aced."+s,JSON.stringify(e))}catch{}}},Ms=Ci.get("q")||Dn.get("q",null)||"high";Hf[Ms]||(Ms="high");var Vf=!1;if(Dn.get("boot",0)===1&&!Ci.get("q")){let s=Math.max(0,Ma.indexOf(Ms)-1);s<Ma.indexOf(Ms)&&(Ms=Ma[s],Vf=!0,Dn.set("q",Ms))}Dn.set("boot",1);setTimeout(()=>Dn.set("boot",0),15e3);var on=Hf[Ms],pt=Object.assign({expert:!1,sens:1,invert:!1,music:.7,sfx:.85,voice:1,fps:!1},Dn.get("settings",{})),Wt=Object.assign({cleared:{},plane:"f15"},Dn.get("progress",{}));Ci.get("unlock")&&Ri.forEach(s=>{Wt.cleared[s.id]||="C"});function bs(s){let e=me("fatal");e.classList.remove("hidden"),e.textContent=`ACED COMBAT could not start.

`+s}window.addEventListener("error",s=>{window.__booted||bs(String(s.error?.stack||s.message))});window.addEventListener("unhandledrejection",s=>{window.__booted||bs(String(s.reason?.stack||s.reason))});var Mr=(s,e)=>{me("load-bar").firstElementChild.style.width=(s*100).toFixed(0)+"%",e&&(me("load-txt").textContent=e)},Bv=()=>new Promise(s=>requestAnimationFrame(()=>s()));function br(s){let e=Gt[s].unlock;return!e||!!Wt.cleared[e]}function kv(s){return s===0||s===1||!!Wt.cleared[Ri[s-1].id]}async function zv(){{let G=new Image;G.onload=()=>me("title").classList.add("art"),G.src="assets/ui/title.jpg"}let s=me("gl"),e;try{e=new ml({canvas:s,antialias:!1,alpha:!1,powerPreference:"high-performance",stencil:!1,depth:!1})}catch(G){return bs(`WebGL 2 is not available on this device/browser.
`+G.message)}if(!e.capabilities.isWebGL2)return bs("WebGL 2 is required.");if(e.info.autoReset=!1,e.setClearColor(329741,1),e.toneMapping=An,e.outputColorSpace=At,!(e.extensions.has("EXT_color_buffer_float")||e.extensions.has("EXT_color_buffer_half_float")))return bs("This device does not support half-float render targets.");s.addEventListener("webglcontextlost",G=>{G.preventDefault();let se=Math.max(0,Ma.indexOf(on.name)-1);Dn.set("q",Ma[se]),bs("The GPU ran out of memory (WebGL context lost). Reload the page - the graphics level was lowered automatically.")}),Th();let n=new os;n.fog=wh();let i=new Ot(62,1,1,12e4);n.add(i);let r=new _l(e,{msaa:on.msaa,bloomLevels:on.bloomLevels}),a=new yl(on),o={scale:pu?.8:1,minScale:.5,lock:0,w:0,h:0,fixed:Ci.has("fixed")};o.fixed&&(o.scale=+Ci.get("fixed")||1);function c(G=!1){let se=Math.min(window.devicePixelRatio||1,on.dpr)*o.scale,ve=Math.max(64,Math.floor(window.innerWidth*se)),Ne=Math.max(64,Math.floor(window.innerHeight*se));!G&&ve===o.w&&Ne===o.h||(o.w=ve,o.h=Ne,e.setPixelRatio(1),e.setSize(ve,Ne,!1),r.resize(ve,Ne),a.resize(ve,Ne),i.aspect=ve/Ne,i.updateProjectionMatrix())}let l=()=>me("rotate").classList.toggle("hidden",!(window.innerWidth>window.innerHeight*1.15&&zf&&window.innerWidth<1100));window.addEventListener("resize",()=>{c(),l()}),c(!0),l(),Mr(.05,"SKY");let h=new vl(e,n),f=new Ml(n),u=new bl(n,on),d=new El,m=new wl,x=new Al(d,m),g=new Tl;g.sens=pt.sens,g.invert=pt.invert;let p=[["CLOUDS",()=>a.load()],["OCEAN",()=>f.load()],["EFFECTS",()=>u.load()],["RADIO",()=>x.loadManifest()]],T=0;for(let[G,se]of p)Mr(.08+.3*(T++/p.length),G),await se();Mr(.4,"CARRIER");let C=new Dl(n),y=await Ei("f35a",e,{size:1024});await C.load(e,on,y),C.group.visible=!1,Mr(.65,"AIRCRAFT"),await Ei(Wt.plane in Gt?Gt[Wt.plane].model:"f15",e,{size:on.heroTex});let b=new Xl({scene:n,camera:i,renderer:e,post:r,sky:h,clouds:a,ocean:f,fx:u,audio:d,radio:x,hud:m,input:g,tier:on,settings:pt});b.carrierObj=C,b.autoPilot=Ci.has("auto"),Mr(.8,"SKY"),await b.setEnv(Ci.get("env")||"sunset",Ci.get("cl")||"sea"),Mr(1,"READY"),await Bv();let S={group:null,key:null,t:0,pos:new E(0,3350,0),quat:new Mt,burners:[],vortex:null};async function R(G){let se=await Ei(Gt[G].model,e,{size:on.heroTex});if(S.group&&n.remove(S.group),S.group=_s(se),S.group.userData.parts.gear&&(S.group.userData.parts.gear.visible=!1),S.burners=[],Gt[G].burner!==0)for(let ve of Gt[G].engines){if(!se.marks[ve])continue;let Ne=Sl(.5*(Gt[G].nozzleScale||1),7.5);Ne.position.copy(se.marks[ve]),S.group.add(Ne),S.burners.push(Ne)}S.model=se,S.key=G,n.add(S.group)}await R(Wt.plane in Gt&&br(Wt.plane)?Wt.plane:"f15");function v(G){if(!S.key)return;S.t+=G;let se=Gt[S.key],ve=se.cruise;S.pos.z+=ve*G,S.pos.z>6e4&&(S.pos.z=-6e4);let Ne=Math.sin(S.t*.25)*.35,Qe=Math.sin(S.t*.17)*.06;if(S.quat.setFromEuler(new Sn(-Qe,Math.sin(S.t*.11)*.08,Ne,"YXZ")),S.pos.y=3350+Math.sin(S.t*.17)*30,S.group){S.group.position.copy(S.pos),S.group.quaternion.copy(S.quat);for(let bt of S.burners)bt.material.uniforms.power.value=.35+.15*Math.sin(S.t*.5),bt.material.uniforms.time.value+=G}let Oe=se.bomber?75:27,_t=S.t*.12+2.2,D=new E(Math.sin(_t)*Oe,Oe*.18+Math.sin(S.t*.2)*Oe*.08,Math.cos(_t)*Oe);i.position.copy(S.pos).add(D),i.up.set(0,1,0),i.lookAt(S.pos.clone().add(new E(0,Oe*.12,0))),i.fov=52,i.updateProjectionMatrix(),f.update(G,i),a.update(G)}let w="title",P=["title","menu","campaign","briefing","hangar","settings","pause","debrief"],F="menu";function U(G){for(let se of P)me(se).classList.toggle("hidden",se!==G);G!=="settings"&&G!=="pause"&&(F=G)}document.querySelectorAll(".back").forEach(G=>G.addEventListener("click",()=>{d.back();let se=P.find(ve=>!me(ve).classList.contains("hidden"));if(se==="settings"&&w==="paused"){U("pause");return}if(se==="briefing"){U(I===0?"menu":"campaign"),x.clear(),d.music("menu");return}U("menu"),d.music("menu")})),me("press").addEventListener("click",async()=>{let G=g.requestMotion();d.unlockMusic();let se=d.start(),ve=await G;await se,d.setVol("music",pt.music),d.setVol("sfx",pt.sfx),d.setVol("voice",pt.voice),g.bindButtons(),d.music("menu"),d.select(),w="menu",U("menu"),me("menu-foot").textContent=`GRAPHICS ${on.name.toUpperCase()} \xB7 ${ve?"TILT READY":"TILT UNAVAILABLE"}${zf?"":" \xB7 DESKTOP: ARROWS/WASD, SPACE GUN, F MISSILE, Q SP, E TARGET, SHIFT BOOST, B BRAKE"}`,!ve&&pu&&m.message("ENABLE MOTION: SETTINGS \u203A SAFARI \u203A MOTION","warn",5);try{screen.orientation?.lock?.("portrait").catch(()=>{})}catch{}}),document.querySelectorAll(".mi").forEach(G=>G.addEventListener("click",()=>{d.select();let se=G.dataset.go;se==="campaign"?(H(),U("campaign")):se==="training"?K(0):se==="hangar"?(j=Math.max(0,$i.indexOf(S.key)),te(),U("hangar"),d.music("calm")):se==="settings"&&(Re(),U("settings"))}));function H(){let G=me("mission-list");G.innerHTML="",Ri.forEach((se,ve)=>{if(ve===0)return;let Ne=kv(ve),Qe=document.createElement("button");Qe.className="mcard"+(Ne?"":" locked"),Qe.innerHTML=`<span class="code">${se.code}</span><span class="tt">${se.title}</span><span class="rk">${Wt.cleared[se.id]||(Ne?"":"LOCKED")}</span>`,Ne&&Qe.addEventListener("click",()=>{d.select(),K(ve)}),G.appendChild(Qe)})}let I=0,B="f15",X=[];function K(G){I=G;let se=Ri[G];me("br-code").textContent=se.code,me("br-title").textContent=se.title,me("br-text").textContent=se.brief,X=se.planes.filter(br),X.length||(X=[se.planes[0]]),B=X.includes(Wt.plane)?Wt.plane:X[0],q(),U("briefing"),d.music("calm"),x.clear(),se.briefVoice&&x.say(se.briefVoice)}function ie(G){return Object.entries({speed:"SPEED",mobility:"MOBILITY",stability:"STABILITY",air:"AIR-TO-AIR",ground:"AIR-TO-GND",defense:"DEFENSE"}).map(([ve,Ne])=>`<span>${Ne}</span><i><b style="width:${Math.round(G.stats[ve]*100)}%"></b></i>`).join("")}function q(){let G=Gt[B];me("ac-name").textContent=G.name,me("ac-role").textContent=G.role+(X.length>1?`  \xB7  ${X.indexOf(B)+1}/${X.length}`:""),me("ac-stats").innerHTML=ie(G)+`<span>WEAPONS</span><span style="color:#e9f1f6">${G.gun?"GUN \xB7 ":""}${G.primary?G.primary.name:"MSL"} \xB7 ${G.sp.name}${G.flares?" \xB7 FLARES":""}</span>`,S.key!==B&&R(B)}me("ac-prev").addEventListener("click",()=>{let G=X.indexOf(B);B=X[(G-1+X.length)%X.length],d.click(),q()}),me("ac-next").addEventListener("click",()=>{let G=X.indexOf(B);B=X[(G+1)%X.length],d.click(),q()}),me("sortie").addEventListener("click",()=>{d.select(),Wt.plane=B,Dn.set("progress",Wt),lt(I,B)});let j=0;function te(){let G=$i[j],se=Gt[G],ve=br(G);me("hg-name").textContent=se.name,me("hg-name").classList.toggle("locked",!ve);let Ne=se.unlock?Ri.find(Qe=>Qe.id===se.unlock):null;me("hg-role").textContent=ve?se.role:`LOCKED \xB7 CLEAR ${Ne.code} "${Ne.title}"`,me("hg-desc").textContent=se.desc,me("hg-stats").innerHTML=ie(se),R(G)}me("hg-prev").addEventListener("click",()=>{j=(j-1+$i.length)%$i.length,d.click(),te()}),me("hg-next").addEventListener("click",()=>{j=(j+1)%$i.length,d.click(),te()});function Re(){document.querySelectorAll("#q-chips button").forEach(G=>G.classList.toggle("on",G.dataset.q===on.name)),document.querySelectorAll("#c-chips button").forEach(G=>G.classList.toggle("on",G.dataset.c==="expert"===pt.expert)),document.querySelectorAll("#i-chips button").forEach(G=>G.classList.toggle("on",G.dataset.i==="1"===pt.invert)),document.querySelectorAll("#f-chips button").forEach(G=>G.classList.toggle("on",G.dataset.f==="1"===pt.fps)),me("s-sens").value=pt.sens,me("s-music").value=pt.music,me("s-sfx").value=pt.sfx,me("s-voice").value=pt.voice}let Se=()=>Dn.set("settings",pt);document.querySelectorAll("#q-chips button").forEach(G=>G.addEventListener("click",()=>{G.dataset.q!==on.name&&(Dn.set("q",G.dataset.q),location.reload())})),document.querySelectorAll("#c-chips button").forEach(G=>G.addEventListener("click",()=>{pt.expert=G.dataset.c==="expert",Se(),Re(),d.click()})),document.querySelectorAll("#i-chips button").forEach(G=>G.addEventListener("click",()=>{pt.invert=G.dataset.i==="1",g.invert=pt.invert,Se(),Re(),d.click()})),document.querySelectorAll("#f-chips button").forEach(G=>G.addEventListener("click",()=>{pt.fps=G.dataset.f==="1",me("fps").classList.toggle("hidden",!pt.fps),Se(),Re(),d.click()})),me("s-sens").addEventListener("input",G=>{pt.sens=+G.target.value,g.sens=pt.sens,Se()}),me("s-music").addEventListener("input",G=>{pt.music=+G.target.value,d.setVol("music",pt.music),Se()}),me("s-sfx").addEventListener("input",G=>{pt.sfx=+G.target.value,d.setVol("sfx",pt.sfx),Se()}),me("s-voice").addEventListener("input",G=>{pt.voice=+G.target.value,d.setVol("voice",pt.voice),Se()}),me("fps").classList.toggle("hidden",!pt.fps);async function lt(G,se){let ve=Ri[G];I=G,B=se,x.clear(),U(null),me("flight").classList.remove("hidden"),me("prompt").textContent="LOADING",me("prompt").classList.remove("hidden"),document.body.classList.toggle("b2",!!Gt[se].bomber),me("b-flare").classList.toggle("hidden",!Gt[se].flares),me("b-skip").classList.add("hidden"),S.group&&(n.remove(S.group),S.group=null,S.key=null),w="loading",b.onEnd=Ne=>je(Ne),b.godMode=!1,b.landed=!1,b.skipLanding=!1,await b.start(ve,se),me("prompt").classList.add("hidden"),g.calibrate(),g.clearEvents(),g.enabled=!0,w="flight"}function je(G){w="debrief",m.show(!1),d.silence(),me("flight").classList.add("hidden");let se=Ri[I];me("db-res").textContent=G.ok?"MISSION ACCOMPLISHED":"MISSION FAILED",me("db-res").classList.toggle("bad",!G.ok),me("db-title").textContent=`${se.code} \xB7 ${se.title}${G.ok?"":" \xB7 "+G.reason}`;let ve=Math.floor(G.time/60),Ne=Math.floor(G.time%60);me("db-time").textContent=`${ve}:${String(Ne).padStart(2,"0")}`,me("db-kills").textContent=G.kills,me("db-score").textContent=G.score;let Qe=G.ok?kf(G.score):"-";me("db-rank").textContent=Qe;let Oe=G.bonusText||"";if(G.ok){let _t=$i.filter(br),D=Wt.cleared[se.id];(!D||"SABC".indexOf(Qe)<"SABC".indexOf(D))&&(Wt.cleared[se.id]=Qe),Dn.set("progress",Wt);let it=$i.filter(br).filter(A=>!_t.includes(A));it.length&&(Oe+=(Oe?" \xB7 ":"")+"NEW AIRCRAFT: "+it.map(A=>Gt[A].short).join(", "))}me("db-extra").textContent=Oe,me("db-next").textContent=G.ok?"CONTINUE":"BACK TO MENU",U("debrief"),b.clear(),C.group.visible=!1}me("db-next").addEventListener("click",async()=>{d.select(),await tt(),I>0&&(H(),U("campaign"))}),me("db-retry").addEventListener("click",()=>{d.select(),lt(I,B)});async function tt(){b.clear(),m.show(!1),d.silence(),me("flight").classList.add("hidden"),C.group.visible=!1,w="menu",U("menu"),d.music("menu"),await b.setEnv("sunset","sea"),await R(Wt.plane&&br(Wt.plane)?Wt.plane:"f15")}let Y=()=>{w==="flight"&&(w="paused",b.paused=!0,d.silence(),d.ctx?.suspend?.(),U("pause"))},ee=()=>{w="flight",b.paused=!1,d.ctx?.resume?.(),U(null),g.clearEvents()};me("b-pause").addEventListener("click",Y),me("p-resume").addEventListener("click",()=>{d.click(),ee()}),me("p-cal").addEventListener("click",()=>{g.calibrate(),m.message("TILT RECENTERED","info",1.2),ee()}),me("p-restart").addEventListener("click",()=>{d.ctx?.resume?.(),b.paused=!1,lt(I,B)}),me("p-settings").addEventListener("click",()=>{Re(),U("settings")}),me("p-quit").addEventListener("click",async()=>{d.ctx?.resume?.(),b.paused=!1,await tt()}),me("b-skip").addEventListener("click",()=>{b.skipLanding=!0,me("b-skip").classList.add("hidden")}),Ci.has("nopause")||document.addEventListener("visibilitychange",()=>{document.hidden&&Y()}),me("load").classList.add("hidden"),me("press").classList.remove("hidden"),setTimeout(()=>me("title").classList.add("live"),300),window.__booted=!0,Vf&&m.message("GRAPHICS LOWERED TO "+on.name.toUpperCase(),"warn",4),window.__ac={game:b,renderer:e,scene:n,camera:i,post:r,clouds:a,sky:h,ocean:f,fx:u,audio:d,input:g,state:o,tier:on,show:S,carrier:C,MISSIONS:Ri};let ye=performance.now(),Fe=0,xe=0,Ve=0,Ct=0,Xe=0;function nt(G){let se=(G-ye)/1e3;ye=G,se>.25&&(se=.25);let ve=Math.min(se,1/20);if(g.update(ve),w==="flight"||w==="paused"||w==="loading"){if(w==="flight"&&(g.consume("pause")&&Y(),b.update(ve)),b.player&&(b.render(w==="flight"?ve:0),i.updateMatrixWorld(!0),h.update(i),u.update(w==="flight"?ve:0,i),w==="flight")){let Qe=b.hudState();m.update(ve,Qe),x.update(ve);let Oe=b.player,_t=b.locks.length?2:b.lockProgress>.05?1:0,D=Qe.incoming.length?Math.min(...Qe.incoming.map(A=>A.pos.distanceTo(Oe.pos))):1e9;d.update(ve,{on:Oe.alive,speed01:Oe.speed/Oe.def.maxSpd,boost:Oe.burner>.5?Oe.burner:0,g:Oe.g,lock:Oe.alive?_t:0,alert:Qe.incoming.length?D<1200?2:1:0});let bt=r.u;bt.speed.value=Te((Oe.speed-Oe.def.cruise)/(Oe.def.maxSpd-Oe.def.cruise+1),0,1)*.6*Oe.burner,bt.flash.value*=Math.exp(-ve*6),bt.dmg.value=Te(1-Oe.hp/Oe.maxHp-.45,0,.55)*1.6;let it=a.densityAt(i.position);if(bt.inCloud.value+=(Te(it*3,0,1)-bt.inCloud.value)*(1-Math.exp(-ve*4)),Xe-=se,Xe<=0){Xe=.2;let A=b.time;me("timer").textContent=`${String(Math.floor(A/60)).padStart(2,"0")}:${String(Math.floor(A%60)).padStart(2,"0")}`,me("score").textContent=b.score;let _=b.curWeapon();me("msl-label").textContent=_?_.name:"MSL";let O=me("prompt");b.state==="cat"?(O.textContent="HOLD BOOST TO LAUNCH",O.classList.remove("hidden")):O.textContent!=="LOADING"&&O.classList.add("hidden"),b.landing&&!b.landed&&!b.skipLanding&&b.landing.optional?me("b-skip").classList.remove("hidden"):me("b-skip").classList.add("hidden")}}}else v(ve),i.updateMatrixWorld(!0),h.update(i),u.update(ve,i),m.update(ve,null),x.update(ve),r.u.speed.value=0,r.u.dmg.value=0,r.u.inCloud.value=0,r.u.flash.value=0;let Ne=i.position.clone().addScaledVector(h.sunDir,1e4).project(i);if(r.u.sunUV.value.set(Ne.x*.5+.5,Ne.y*.5+.5,Ne.z<1&&Math.abs(Ne.x)<1.3&&Math.abs(Ne.y)<1.3?1:0),r.u.time.value=G/1e3,e.info.reset(),r.render(n,i,a),xe++,Fe+=se,Ve+=se*1e3,Fe>=.5){let Qe=Ve/xe;pt.fps&&(me("fps").textContent=`${Math.round(xe/Fe)} FPS \xB7 ${Qe.toFixed(1)} MS \xB7 ${o.w}\xD7${o.h} \xB7 ${r.sceneInfo.calls} DC \xB7 ${on.name.toUpperCase()}`),G>o.lock&&w!=="loading"&&!o.fixed&&(Qe>20&&o.scale>o.minScale?(o.scale=Math.max(o.minScale,o.scale-.08),c(),o.lock=G+2500,o.upLock=(o.upLock||0)+1):Qe<17.2&&o.scale<1&&G>Ct&&(o.scale=Math.min(1,o.scale+.04),c(),o.lock=G+4e3,Ct=G+6e3*(1+(o.upLock||0)))),Fe=0,xe=0,Ve=0}}e.setAnimationLoop(nt)}zv().catch(s=>bs(String(s?.stack||s)));
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
