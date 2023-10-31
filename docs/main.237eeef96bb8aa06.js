"use strict";(self.webpackChunksnapface=self.webpackChunksnapface||[]).push([[179],{263:(u,l,a)=>{a.d(l,{e:()=>n});var s=a(4650);let n=(()=>{class r{login(){this.token="MyFakeToken"}getToken(){return this.token}}return r.\u0275fac=function(f){return new(f||r)},r.\u0275prov=s.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},9062:(u,l,a)=>{var s=a(1481),n=a(4650),r=a(3456);const m=function(){return{exact:!0}};let f=(()=>{class e{constructor(t){this.router=t}ngOnInit(){}onAddNewFaceSnap(){this.router.navigateByUrl("facesnaps/create")}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(r.F0))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-header"]],decls:10,vars:2,consts:[["routerLink","","routerLinkActive","active",3,"routerLinkActiveOptions"],["routerLink","facesnaps","routerLinkActive","active"],[3,"click"]],template:function(t,i){1&t&&(n.TgZ(0,"header")(1,"h1"),n._uU(2,"SnapFace"),n.qZA(),n.TgZ(3,"nav")(4,"a",0),n._uU(5,"Home"),n.qZA(),n.TgZ(6,"a",1),n._uU(7,"SnapFaces"),n.qZA()(),n.TgZ(8,"button",2),n.NdJ("click",function(){return i.onAddNewFaceSnap()}),n._uU(9," + "),n.qZA()()),2&t&&(n.xp6(4),n.Q6J("routerLinkActiveOptions",n.DdM(1,m)))},dependencies:[r.yS,r.Od],styles:["header[_ngcontent-%COMP%]{text-align:center;overflow:auto;background-color:#eee;margin-bottom:20px;padding:10px}a[_ngcontent-%COMP%]{margin:5px 10px;color:#333;text-decoration:none}a[_ngcontent-%COMP%]:hover{text-decoration:underline}.active[_ngcontent-%COMP%]{color:#666;text-decoration:underline}"]}),e})(),C=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-root"]],decls:2,vars:0,template:function(t,i){1&t&&n._UZ(0,"app-header")(1,"router-outlet")},dependencies:[r.lC,f]}),e})();var c=a(4006);const M=[{path:"",pathMatch:"full",component:(()=>{class e{constructor(t){this.router=t,this.emailInput="myemail@news.snap"}ngOnInit(){}onRedirect(){this.router.navigateByUrl("facesnaps")}onSubmit(t){console.log(t.value)}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(r.F0))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-landing-page"]],decls:13,vars:1,consts:[[1,"landing-block"],[3,"ngSubmit"],["emailForm","ngForm"],["for","emailInput"],["id","emailInput","name","userEmail",3,"ngModel","ngModelChange"],["type","submit"],["alt","Snapface logo","src","assets/snapface.png"],[1,"landing-links"],[3,"click"]],template:function(t,i){if(1&t){const p=n.EpF();n.TgZ(0,"div",0)(1,"form",1,2),n.NdJ("ngSubmit",function(){n.CHM(p);const v=n.MAs(2);return n.KtG(i.onSubmit(v))}),n.TgZ(3,"label",3),n._uU(4,"Veuillez renseigner votre email pour recevoir nos newsletter! "),n.qZA(),n.TgZ(5,"input",4),n.NdJ("ngModelChange",function(v){return i.emailInput=v}),n.qZA(),n._uU(6,"\xa0\xa0 "),n.TgZ(7,"button",5),n._uU(8,"OK"),n.qZA()(),n._UZ(9,"img",6),n.TgZ(10,"div",7)(11,"button",8),n.NdJ("click",function(){return i.onRedirect()}),n._uU(12,"Continuer vers Snapface"),n.qZA()()()}2&t&&(n.xp6(5),n.Q6J("ngModel",i.emailInput))},dependencies:[c._Y,c.Fj,c.JJ,c.JL,c.On,c.F],styles:[".landing-block[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.landing-links[_ngcontent-%COMP%]{width:100%;text-align:center}.landing-links[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:22px}"]}),e})()},{path:"facesnaps",loadChildren:()=>a.e(152).then(a.bind(a,2152)).then(e=>e.FaceSnapsModule)}];let y=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[r.Bz.forRoot(M),r.Bz]}),e})();var d=a(6895),h=a(529),A=a(263);let _=(()=>{class e{constructor(t){this.authService=t}intercept(t,i){const p=(new h.WM).append("Authaurization",`Bearer ${this.authService.getToken()}`),g=t.clone({headers:p});return i.handle(g)}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(A.e))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac}),e})();const Z=[{provide:h.TP,useClass:_,multi:!0}];var x=a(6076),F=a(7009);let L=(()=>{class e{constructor(){(0,d.qS)(x.Z)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({providers:[{provide:n.soG,useValue:"fr-FR"},Z],imports:[d.ez,r.Bz,h.JF,F.ZX]}),e})(),P=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[d.ez,c.u5]}),e})();const T=[{path:"login",component:(()=>{class e{constructor(t,i){this.authService=t,this.router=i}ngOnInit(){}onLogin(){this.authService.login(),this.router.navigateByUrl("facesnaps")}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(A.e),n.Y36(r.F0))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-login"]],decls:14,vars:0,consts:[[1,"form-card"],[1,"form-group"],["for","email"],["id","email","type","text"],["for","password"],["id","password","type","password"],[3,"click"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0)(1,"h2"),n._uU(2,"Connexion"),n.qZA(),n.TgZ(3,"div",1)(4,"label",2),n._uU(5,"Email"),n.qZA(),n._UZ(6,"input",3),n.qZA(),n.TgZ(7,"div",1)(8,"label",4),n._uU(9,"Mot de passe"),n.qZA(),n._UZ(10,"input",5),n.qZA(),n.TgZ(11,"div")(12,"button",6),n.NdJ("click",function(){return i.onLogin()}),n._uU(13,"Connexion"),n.qZA()()())},styles:[".form-card[_ngcontent-%COMP%]{box-sizing:border-box;width:50%;margin:20px auto;padding:10px 30px;box-shadow:#d3d3d3 4px 4px 20px}.form-group[_ngcontent-%COMP%]{margin:10px auto;width:80%;display:flex;justify-content:space-between}input[_ngcontent-%COMP%]{width:50%}button[_ngcontent-%COMP%]{display:block;margin:20px auto}"]}),e})()}];let b=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[r.Bz.forChild(T),r.Bz]}),e})(),S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[d.ez,b]}),e})();var k=a(1516);let O=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e,bootstrap:[C]}),e.\u0275inj=n.cJS({imports:[s.b2,y,L,P,S,k.PW]}),e})();(0,n.G48)(),s.q6().bootstrapModule(O).catch(e=>console.error(e))}},u=>{u.O(0,[736],()=>u(u.s=9062)),u.O()}]);