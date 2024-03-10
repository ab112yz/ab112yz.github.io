var w3c=(document.getElementById)? true:false;
var agt=navigator.userAgent.toLowerCase();
var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1) && (agt.indexOf("omniweb") == -1));
var ie5=(w3c && ie)? true : false;
var ns6=(w3c && (navigator.appName=="Netscape"))? true: false;
var op8=(navigator.userAgent.toLowerCase().indexOf("opera")==-1)? false:true;

String.prototype.replaceAll = function(s1,s2){
this.str=this;
if(s1.length==0)return this.str;
 var idx=this.str.indexOf(s1);
 while(idx>=0){
 this.str=this.str.substring(0, idx)+s2+this.str.substr(idx+s1.length);
 idx=this.str.indexOf(s1);
 }
 return this.str;
}

var sRootDir="../"; //临时路径

function $(o){
 var o=document.getElementById(o)?document.getElementById(o):o;
 return o;
}

document.getElementsByClassName = function(className,oBox) {
 this.d= oBox || document;
 var children = this.d.getElementsByTagName('*') || document.all;
 var elements = new Array();
 for (var i = 0; i < children.length; i++) {
 var child = children[i];
 var classNames = child.className.split(' ');
 for (var j = 0; j < classNames.length; j++) {
 if (classNames[j] == className) {
 elements.push(child);
 break;
 }
 }
 }
 return elements;
}

$Cls = function (s,o){
return document.getElementsByClassName(s,o);
};

function ExCls(o,a,b){
 o.className=(o.className.indexOf(a)!=-1)?b:a;
}

function addCls(o,s){
 if (o.className.length>0) {
	 o.className+=" "+s;
 } else {
	 o.className=s;
 }
}

function delCls(o,s){
 o.className=o.className.replace(s,"");
  o.className=o.className.replaceAll("  ","");
}


function SetCookie(name,value){
     var argv=SetCookie.arguments;
     var argc=SetCookie.arguments.length;
     var expires=(2<argc)?argv[2]:null;
     var path=(3<argc)?argv[3]:null;
     var domain=(4<argc)?argv[4]:null;
     var secure=(5<argc)?argv[5]:false;
     document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
}

function GetCookie(Name) {
 var search = Name + "=";
 var returnvalue = "";
 if (document.cookie.length > 0) {
  offset = document.cookie.lastIndexOf(search);
  if (offset != -1) {
   offset += search.length;
   end = document.cookie.indexOf(";", offset);
   if (end == -1)
   end = document.cookie.length;
   returnvalue=unescape(document.cookie.substring(offset,end));
  }
 }
 return returnvalue;
}

function GetSubCookie(Name, CookieValue) {
 var search = Name + "=";
 var returnvalue = "";
 if (CookieValue.length > 0) {
  offset = CookieValue.indexOf(search);
  if (offset != -1) {
   offset += search.length;
   end = CookieValue.indexOf("&", offset);
   if (end == -1)
   end = CookieValue.length;
   returnvalue=unescape(CookieValue.substring(offset,end));
  }
 }
 return returnvalue;
}


function SavMyHit(o){
 var MyHitStatus=GetCookie("MyHitStatus");
 if (MyHitStatus=="close") return;
 var sNewSite=o.innerHTML+"|"+o.href+";";
 var sOldSite=GetCookie("My265Hits");
  sOldSite.length>2048?sOldSite=sOldSite.substring(0,2048):"";
 if (sOldSite.indexOf(sNewSite)!=-1) {
  sOldSite=sOldSite.replace(sNewSite,"");
 }
  sNewSite+=sOldSite;
  var expdate=new Date();
  expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
  SetCookie("My265Hits",sNewSite,expdate,"/","265.com",false);
}

function GetMyHit(n){
 this.maxlength=n || 20;
 var sOldSite=GetCookie("My265Hits");
 sOldSite=sOldSite.split(";");
 var nMaxNum=sOldSite.length>this.maxlength?this.maxlength+1:sOldSite.length;
 var sHtml="<ul class=\"Top listUrl\">\n";
 for (i=0;i<nMaxNum-1;i++) {
  var sTempInfo=sOldSite[i].split("|");
  sHtml+="<li><b>"+(i+1)+".</b><a href=\""+sTempInfo[1]+"\" target=\"_blank\">"+sTempInfo[0]+"</a></li>\n";
 }
 if (nMaxNum<=1) {
   sHtml="<ul class=\"Top listUrl\">\n";
   sHtml+="<li>暂无浏览记录！</li>\n"
 }
 sHtml+="</ul>\n";
 sHtml+="<div id=\"clearHits\"><a href=\"javascript:;\" title=\"点此可以清除您“最近浏览网站”的所有记录。\" onclick=\"clearMyHit();\">[清除记录]</a>&nbsp;";
  var MyHitStatus=GetCookie("MyHitStatus");
  if (MyHitStatus=="open"||MyHitStatus=="")
    sHtml+="<a href=\"javascript:;\" title=\"点此停用“最近浏览网站”的功能，系统将不再记录您最近浏览过的网站。\" onclick=\"chgMyHit('close');\">[停用]</a></div>";
  else
    sHtml+="<a href=\"javascript:;\" title=\"点此启用“最近浏览网站”的功能，系统将记录您最近浏览过的网站。\" onclick=\"chgMyHit('open');\">[启用]</a></div>";

 $("My265His").innerHTML=sHtml;
}

function clearMyHit(){
  var expdate=new Date();
  expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
  SetCookie("My265Hits","",expdate,"/","265.com",false);
  SetCookie("My265Hits","",expdate,"/",null,false);
  GetMyHit();
}

function set265Hit(allSiteBox){
  var arrSites="";
  for(var i=0;i<allSiteBox.length;i++){
   arrSites=allSiteBox[i].getElementsByTagName("a");
   for(var j=0;j<arrSites.length;j++){
	arrSites[j].onclick=function(){
	 SavMyHit(this);
	}
   }
  }
}

function chgMyHit(stat){
  var expdate=new Date();
  expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
  SetCookie("MyHitStatus",stat,expdate,"/","265.com",false);
  GetMyHit();
}

function ExChgDir(){
 var oBox=$("Bodyer");
 var sCls="noBSide";
 var havCls=(oBox.className.indexOf(sCls)!=-1);
 if (havCls) {
   delCls(oBox,sCls);
   $("BtnCloseDir").innerHTML="关闭目录";
 } else {
   addCls(oBox,sCls);
   $("BtnCloseDir").innerHTML="打开目录";
 }
}

function MySkin(n){
 var sHtml="";
 if (n!=1) {
 sHtml="<a id=\"BtnCloseDir\" href=\"javascript:void(0)\" onclick=\"ExChgDir();\">关闭目录</a>&nbsp;|&nbsp;"
 sHtml+="<a href=\"http://my.265.com/hd/archive/topic/11/11925.asp\" target=\"_blank\">新手上路</a>";
 } else {
 sHtml="<a href=\"http://my.265.com/hd/archive/topic/11/11925.asp\" target=\"_blank\">新手上路</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href=\"about:blank\" title=\"比直接打开IE浏览器更快、更方便！\" target=\"_blank\">打开空白页</a>&nbsp;";
 }
 sHtml="<p id=\"OrdSkin\">"+sHtml+"</p>";
 document.write (sHtml);
}


function HitFam(n1,n2){
 for (var i=1;i<=n2;i++) {
   if (i==n1) {
	$("FamTab"+i).className="active";
	$("famSiteBox"+i).className="famSiteBox";
   } else {
 	$("FamTab"+i).className="";
	$("famSiteBox"+i).className="hidden";
   }
 }
}

function HitTree(e){
 var tag = ie ? e.srcElement : e.target;ExCls(tag.parentNode,"open","close");
}

function SetEvt(o,a,b){
 ie?o.attachEvent("on"+a,b):o.addEventListener(a,b, false);
}



function CNLTree(id,ClsOpen,ClsClose,ClsChild){
 this.id=id;
 this.ClassOpen=ClsOpen || "open";
 this.ClassClose=ClsClose || "close";
 this.ClassChild=ClsChild || "child";
 this.AddEvt = function () {
  var arrObj=$(this.id).getElementsByTagName("img");
  for (var i=0;i<arrObj.length; i++) {
   if (arrObj[i].className=="s") {
     SetEvt(arrObj[i],"click",HitTree);
	 ie?arrObj[i].style.cursor="hand":"";
   }
  }
 }
}
function gt(f){
 var t;
 var u;
 if(f.a0 != undefined){
  u = 'Y:';
  t = f.q.value;
  if(f.a0.checked==true){u+='0;';}
  if(f.a1.checked==true){u+='1;';}
  if(f.a2.checked==true){u+='2;';}
  if(f.a3.checked==true){u+='3;';}
  if(f.a4.checked==true){u+='4;';}
  if(f.a5.checked==true){u+='5;';}
  if(f.a6.checked==true){u+='6;';}
  if(f.a7.checked==true){u+='7;';}
  if(f.a8.checked==true){u+='8;';}
  if(f.a9.checked==true){u+='9;';}
  if(f.a10.checked==true){u+='10;';}
  if(f.a11.checked==true){u+='11;';}
  if(f.a12.checked==true){u+='12;';}
  if(f.a13.checked==true){u+='13;';}
  if(f.a14.checked==true){u+='14;';}
  if(f.a15.checked==true){u+='15;';}
 }
 else{
  t = f.Ka.value;
  u = 'G';
 }
 try{
  new Image().src = "http://statis.265.com/url?a=S&u="+u+"&t="+t;
 }catch(ex){}
}

function s4(){
 var v=$("Kaa").value
 var sList = new Array();
 sList["a0"]=new Array("http://www.google.cn/search","q","client,aff-avalanche; forid,1; channel,prefill; ie,gb; oe,UTF-8; hl,zh-CN");
 sList["a1"]=new Array("http://www.yok.com/go.php","Key","NO,8");
 sList["a2"]=new Array("http://www.baidu.com/baidu","word","tn,265com");
 sList["a3"]=new Array("http://www.yok.com/go.php","Key","NO,13");
 sList["a4"]=new Array("http://www.yok.com/go.php","Key","NO,10");
 sList["a5"]=new Array("http://www.yok.com/go.php","Key","NO,11");
 sList["a6"]=new Array("open","http://www.google.com/base/s2?a_y0=9&a_n0=%E6%88%BF%E5%B1%8B&q="+encodeURIComponent(v)+"&a_n1=%E5%9F%8E%E5%B8%82&a_y1=1&a_o1=0&a_v1=&a_n2=%E7%B1%BB%E5%88%AB&a_y2=1&a_o2=0&a_v2=%E5%87%BA%E7%A7%9F&hl=zh-CN&gl=CN&view=Table&gdci=true");
 sList["a7"]=new Array("open","http://cb.kingsoft.com/search?s="+encodeURIComponent(v));
 sList["a8"]=new Array("http://www.yok.com/go.php","Key","NO,28");
 sList["a9"]=new Array("http://www.yok.com/go.php","Key","NO,34");
 sList["a10"]=new Array("http://www.yok.com/go.php","Key","NO,158");
 sList["a11"]=new Array("http://www.yok.com/go.php","Key","NO,174");
 sList["a12"]=new Array("http://images.google.cn/images","q","client,aff-avalanche; forid,1; channel,prefill; ie,gb; oe,UTF-8; hl,zh-CN");
 sList["a13"]=new Array("http://www.yok.com/go.php","Key","NO,49");
 sList["a14"]=new Array("http://news.google.cn/news","q","client,aff-avalanche; forid,1; channel,prefill; ie,gb; oe,UTF-8; hl,zh-CN");
 sList["a15"]=new Array("http://www.yok.com/go.php","Key","NO,153");
 var sForm = $("SoAll");
 var cusSea="";
 for(i=0;i<16;i++){
  var cur="a"+i;
  gValue="";
  if($(cur).checked && sList[cur] != null ) {
   cusSea=cusSea+i+"|";
   if (sList[cur][0]=="open") {
    window.open(sList[cur][1]);
   }else{
     sForm.action=sList[cur][0];
     $("Kaa").name=sList[cur][1];
     if (sList[cur][2] != null) {     
      var aPairs = sList[cur][2].split("; ");
      for (var j=0; j< aPairs.length; j++) {
       var aPair = aPairs[j].split(",");
       gValue +="<input type='hidden' name='"+aPair[0]+"' value='"+aPair[1]+"'>";
      }
     }
     $("gForm").innerHTML=gValue;
     sForm.submit();
   } 
  }
 }
 if (cusSea=="") cusSea = "0|1";
 else cusSea=cusSea.substr(0,cusSea.length-1);
 setCusSea(cusSea);
 return false;
}
function setCusSea(cusSea){
 var expdate=new Date();
 expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
 SetCookie("cusSea_265",cusSea,expdate,"/","265.com",false);
}
function getCusSea() {
 var cusSea = GetCookie("cusSea_265")?GetCookie("cusSea_265"):"0|1";
 cusSea=cusSea.split("|");
 for(var i=0;i<16;i++){
  $("a"+i).checked=false;
 }
 for(var j=0;j<cusSea.length;j++){
  $("a"+cusSea[j]).checked=true;
 }
}


function tracking(e){
 e = e ? e : window.event;
 var s = e.srcElement ? e.srcElement : e.target;
 var a = s.tagName;
 var u = s.href;
 var t = s.innerText ? s.innerText : s.textContent;
 if(a == "A" || a == "IMG"){
  if(a == "IMG"){
   t = s.href || s.src;
   u = s.parentElement || s.parentNode;
  }
  try{
   new Image().src = "http://statis.265.com/url?a="+a+"&u="+escape(u)+"&t="+t;
  }catch(ex){}
 }
 return true;
}

function LTrim(str){
var whitespace = new String(" \t\n\r");
var s = new String(str);
if (whitespace.indexOf(s.charAt(0)) != -1){
var j=0, i = s.length;
while (j < i && whitespace.indexOf(s.charAt(j)) != -1){
	j++;
}
s = s.substring(j, i);
}
return s;
}

function RTrim(str){
var whitespace = new String(" \t\n\r");
var s = new String(str);
if (whitespace.indexOf(s.charAt(s.length-1)) != -1){
var i = s.length - 1;
while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1){
i--;
}
s = s.substring(0, i+1);
}
return s;
}

function getBase() {
    var base_265 = GetCookie("base_265")?GetCookie("base_265"):"1";
    if (base_265==1)  setBase(1);
    showBase(base_265);
}

function setBase(n){
 var tar="";
 n!=0?tar="_blank":"";
 var urls=$("hSiteCate").getElementsByTagName("a");
 for (var i=0;i<urls.length;i++ ) {
  if(urls[i].target!="_self")
   urls[i].target=tar;
 }
 urls=$("hCoolSite").getElementsByTagName("dt");
 for (var i=0;i<urls.length;i++ ) {
  urls[i].getElementsByTagName("a")[0].target=tar;
 }
  var expdate=new Date();
 expdate.setTime(expdate.getTime()+(24*60*60*1000*365));
 SetCookie("base_265",n,expdate,"/","265.com",false);
 showBase(n);
}
function showBase(n) {
    if (n=="" || n==0) {
        $("setBase").innerHTML = "<a href='javascript:setBase(1);' target='_self'>在当前页打开链接</a>";
    } else {
        $("setBase").innerHTML = "<a href='javascript:setBase(0);' target='_self'>在新窗口打开链接</a>";
    }
}
function showUrl(hot) {
for(i=0;i<hot.length;i++){
  var lst = '';
  if (i == (hot.length -1))
    lst = ' class="lst"';
  document.write('<LI'+lst+'><b>'+(i+1)+'.</b><a href="'+unescape(hot[i][0])+'" target="_blank">'+hot[i][1]+"</a></LI>");
}
}

function getCurCity() {
    var curCity = GetCookie("guide_city");
    var curCityUrl = GetCookie("guide_url");
    if (curCity == null||curCity == "") {
        document.write("<script src='http://weather.265.com/get_weather.php?action=get_city&fromindex=yes&type=guide_city'><\/script>");
    } else {
        $("curCity").innerHTML="<a href='http://www.265.com/"+curCityUrl+"' target='_blank'>"+curCity+"</a>";
    }
}
var c = '500x30_265';
var querystr = location.href;
var f = 'nounion';
function ADsend(id,type,placeid){
        var pid = RTrim(LTrim(id));
        var newpid = parseInt(pid)-parseInt(10000);
        var path = parseInt(newpid/1000);
        open_url = "http://count.e78.com/page/WD_9588/"+path+"/sendring"+pid+".htm?p="+id+"&t="+type+"&c="+c+"&f="+f+"&u="+querystr;
        window.open(open_url,'open','width=460 height=490');
}



function moveBox(sId,n){
var oSelf=$(sId);
var oParent=oSelf.parentNode;
var arrIDS=[];
var j=0;
var nCurNo=0;
for (var i=0;i<oParent.childNodes.length;i++) {
	if (oParent.childNodes[i].nodeType==1) {
		 arrIDS[j]=oParent.childNodes[i].id;
		 oParent.childNodes[i]==oSelf?nCurNo=j:"";
		 j++;
	}
}
if (nCurNo+n>-1 && nCurNo+n<arrIDS.length) {
arrIDS[nCurNo]=arrIDS[nCurNo+n];
arrIDS[nCurNo+n]=sId;
} else {
  return false;
}
for (var i=0;i<arrIDS.length;i++) {
	 oParent.appendChild($(arrIDS[i]));
	 setMovBtn(arrIDS[i],arrIDS.length,i);
}
  var expdate=new Date();
  expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
  SetCookie("My265Boxes",arrIDS.join("|"),expdate,"/","265.com",false);
}

function resetBox(){
var arrIDS=GetCookie("My265Boxes").split("|");
if (arrIDS.length<=1) {
     arrIDS=["hSiteCate","hCoolSite"];
}
for (var i=0;i<arrIDS.length;i++) {
	 $(arrIDS[i]).parentNode.appendChild($(arrIDS[i]));
	 $(arrIDS[i]).style.visibility="visible";
	 setMovBtn(arrIDS[i],arrIDS.length,i);
}
}

function setMovBtn(sId,nMax,nNow){
 if (sId=="hSiteCate") {
    var upstr = "将“网址分类”版块移动至“实用酷站”版块之上。";
    var downstr = "将“网址分类”版块移动至“实用酷站”版块之下。";
 } else {
    var upstr = "将“实用酷站”版块移动至“网址分类”版块之上。";
    var downstr = "将“实用酷站”版块移动至“网址分类”版块之下。";
 }

 if(nNow<=0) {
	 $("btn_"+sId).innerHTML="<a href=\"javascript:;\" target='_self' onclick=\"moveBox('"+sId+"',1);\" title='"+downstr+"'>下移↓</a>";
 } else {
	if (nNow>=nMax-1) {
	 $("btn_"+sId).innerHTML="<a href=\"javascript:;\" target='_self' onclick=\"moveBox('"+sId+"',-1);\" title='"+upstr+"'>上移↑</a>";
	} else {
	 $("btn_"+sId).innerHTML="<a href=\"javascript:;\" target='_self' onclick=\"moveBox('"+sId+"',-1);\" title='"+upstr+"'>上移↑</a>&nbsp;<a href=\"javascript:;\" target='_self' onclick=\"moveBox('"+sId+"',1);\" title='"+downstr+"'>下移↓</a>";
	}
 }
}

function check(i){
 if(i.MailBox.options.selectedIndex==0){
	 alert("提示：请正确选择你使用的邮箱");
	 return false;
 } else {
	  var expdate=new Date();
	  expdate.setTime(expdate.getTime()+(24*60*60*1000*30));
	  SetCookie("My265Mail",i.MailBox.value,expdate,"/","265.com",false);
 }
 if(i.Username.value=="" || i.Username.value=="请在此输入您的用户名"){
	 alert("提示：邮箱用户名必须填写！");
	 i.Username.focus();
	 return false;
 }
 if(i.Password.value=="" || i.Password.value.length<3){
	 alert("提示：邮箱密码必须填写完整！");
	 i.Password.focus();
	 return false;
 }
var MailList = new Array(); 
MailList["26500"]=new Array("http://mail.265.com","login","passwd");
MailList["26501"]=new Array("http://reg.163.com/in.jsp?url=http://fm163.163.com/coremail/fcg/ntesdoor2?language=0&style=1","username","password");
MailList["26502"]=new Array("http://vip.163.com/logon.m","username","password","enterVip,true; style,");
MailList["26503"]=new Array("http://entry.126.com/cgi/login","user","pass","domain,126.com; language,0; bCookie,");
MailList["26504"]=new Array("http://mail.sina.com.cn/cgi-bin/login.cgi","u","psw","logintype,uid; product,mail");
MailList["26505"]=new Array("http://vip.sina.com.cn/cgi-bin/login.cgi","user","pass");
MailList["26506"]=new Array("http://passport.sohu.com/login.jsp","loginid","passwd","fl,1; vr,1|1; appid,1000; ru,http://login.mail.sohu.com/servlet/LoginServlet; eru,http://login.mail.sohu.com/login.jsp; ct,1173080990; sg,5082635c77272088ae7241ccdf7cf062","@sohu.com");
MailList["26507"]=new Array("http://passport.sohu.com/login.jsp","loginid","passwd","fl,1; vr,1|1; appid,1013; ru,http://vip.sohu.com/login/viplogin11.jsp; eru,; ct,1173857434; sg,885ebb7884194ee547f224fc8a6a5877","@vip.sohu.com");
MailList["26508"]=new Array("http://passport.21cn.com/maillogin.jsp","LoginName","passwd","NeedMoreSecurity,on; NeedIpCheck,on");
MailList["26509"]=new Array("http://g2wm.263.net/xmweb","usr","pass","domain,263.net; func,login");
MailList["26510"]=new Array("http://bjweb.163.net/cgi/163/login_pro.cgi","user","pass","type,0; style,10");
MailList["26511"]=new Array("http://mail.china.com//coremail/fcg/login","user","pass");
MailList["26512"]=new Array("http://reg.mail.188.com/servlet/coremail/login","user","pass","domain,188.com; language,0; style,-1");
MailList["26513"]=new Array("http://edit.bjs.yahoo.com/config/login","login","passwd",".intl,cn; .done,http://mail.yahoo.com");
MailList["26515"]=new Array("https://www.google.com/accounts/ServiceLoginAuth","Email","Passwd","continue,http://mail.google.com/mail?zy=l; service,mail; hl,zh-CN");
var iMail = i.MailBox.value;
var UserName = $("Username").value;
if (MailList[iMail] != null) {
    var cMail = MailList[iMail];
    i.action = cMail[0];
    $("Username").name = cMail[1];
    $("Password").name = cMail[2];
    if (cMail[3] != null) {
    	var aPairs = cMail[3].split("; ");
    	for (var j=0; j< aPairs.length; j++) {
    		var aPair = aPairs[j].split(",");
    		var el = document.createElement("INPUT");
    		el.type="hidden";
    		el.name=aPair[0];
    		el.value=aPair[1];
    		$("MailCheck").appendChild(el);
    	}
    }
    if (cMail[4] != null)
        $("Username").value = UserName + cMail[4];
} else {
 alert("请选择正确的邮箱！");
}
i.submit();
$("Username").value = UserName;
$("Password").value = "";
}

function init265Mail(){
	var sMail=GetCookie("My265Mail");
	if (sMail!="") {
		var oSel=$("MailBox");
		for (var i=0;i<oSel.length;i++){
		   if (oSel[i].value==sMail) {
			 oSel[i].selected=true;
			 return(false);
		   }
		}
	}
}

function CP(input){
 input.Password.value="";
}

function AddFav(sUrl, sTitle) {
  if ( window.sidebar && "object" == typeof( window.sidebar ) && "function" == typeof( window.sidebar.addPanel ) ) {
    window.sidebar.addPanel( sTitle, sUrl, '' );    
  } else if ( document.all && "object" == typeof( window.external ) ) {
    window.external.addFavorite( sUrl, sTitle );
  }
} 
