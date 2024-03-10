var Acts=new Array();
Acts[0]="http://www.google.cn/search";
Acts[1]="http://images.google.cn/images";
Acts[2]="http://news.google.cn/news";
Acts[3]="http://music.yahoo.com.cn/search";
Acts[4]="http://www.yok.com/buy.php";
var sLink=new Array();
sLink[0]="http://www.google.cn/search?ie=gb&oe=UTF-8&hl=zh-CN&client=aff-avalanche&forid=1&channel=prefill&q=";
sLink[1]="http://images.google.cn/images?ie=gb&oe=UTF-8&hl=zh-CN&client=aff-avalanche&forid=1&channel=prefill&q=";
sLink[2]="http://news.google.cn/news?client=aff-avalanche&forid=1&channel=prefill&ie=gb&oe=UTF-8&hl=zh-CN&ned=ccn&q=";
sLink[3]="http://music.yahoo.com.cn/search?source=yisou_union_265&amp;pid=200523_1006&amp;p=";
sLink[4]="http://www.yok.com/buy.php?p=";

var Paras=new Array();
Paras[0]=new Array();
Paras[0][0]="q";
Paras[0][1]="client";
Paras[0][2]="aff-avalanche";
Paras[0][3]="forid";
Paras[0][4]="1";
Paras[0][5]="images/logo_google_0708.gif";
Paras[0][6]="GoogleËÑË÷";
Paras[0][7]="http://www.google.cn/search?hl=zh-CN&client=aff-avalanche&forid=1&channel=logo&q=";
Paras[1]=Paras[0].slice(0);
Paras[1][7]="http://images.google.cn/imghp?hl=zh-CN&client=aff-avalanche&forid=1&channel=logo&q=";
Paras[2]=Paras[0].slice(0);
Paras[2][7]="http://news.google.cn/news?hl=zh-CN&client=aff-avalanche&forid=1&channel=logo&ned=ccn&q=";
Paras[3]=new Array();
Paras[3][0]="p";
Paras[3][1]="source";
Paras[3][2]="yisou_union_265";
Paras[3][3]="pid";
Paras[3][4]="200523_1006";
Paras[3][5]="images/logo_yahoo.gif";
Paras[3][6]="YahooËÑË÷";
Paras[3][7]="http://www.yahoo.com.cn/";
Paras[4]=new Array();
Paras[4][0]="p";
Paras[4][1]="source";
Paras[4][2]="yisou_union_265";
Paras[4][3]="pid";
Paras[4][4]="200523_1006";
Paras[4][5]="images/logo_eachnet.gif";
Paras[4][6]="Ò×È¤";
Paras[4][7]="http://adfarm.mediaplex.com/ad/ck/4080-22903-9499-0?aid=wu_265;text;hp&!mpro=http://www.eachnet.com";

var KNo=Math.floor(10*Math.random())+4;
function So(n){
 $("SoForm").style.display="";
 for (var i=0;i<=5;i++) {
  $("STab"+(i+1)).className=(n==i+1)?"tab active":"tab";
 }
 var nLeft=110+(n-1)*69;
 $("SoFormBox").style.backgroundPosition=nLeft+"px 0";
 $("SoForm").action=Acts[n-1];
 $("Ka").name=Paras[n-1][0];
 $("G1").name=Paras[n-1][1];
 $("G1").value=Paras[n-1][2];
 $("G2").name=Paras[n-1][3];
 $("G2").value=Paras[n-1][4];
 $("soLogo").src=Paras[n-1][5];
 $("soLogo").alt=Paras[n-1][6];
 $("soUrl").href=Paras[n-1][7];
 if (n>3)
   $("Ka").value=Keys[n-1][KNo];
 else
    $("Ka").value="";
 $("Kaa").value=Keys[n-1][KNo];
 $("Ka").focus();
 $("SoNo").value=n;
 var sHTML="";
 var tLen=0;
 String.prototype.lenb = function() { return this.replace(/[^\x00-\xff]/g,"**").length; }
 for (var i=0;i<14;i++) {
  tLen+=Keys[n-1][i].lenb();
  if ((tLen+i*2)<=44) {
    sHTML+="&nbsp;&nbsp;<a href=\""+sLink[n-1]+Keys[n-1][i]+"\"  title=\""+sLink[n-1]+Keys[n-1][i]+"\" target=\"_blank\">"+Keys[n-1][i]+"</a>";
  } else {
    break;
  }
 }
 $("Kb").innerHTML=sHTML;
}

function SoKx(){
 for (var i=1;i<=5;i++) {
  $("STab"+i).className="tab";
 }
 $("STab6").className="tab active";
 var nLeft=110+(6-1)*69;
 $("SoFormBox").style.backgroundPosition=nLeft+"px 0";
 $("SoForm").style.display="none";
 $("KxForm").style.display="";
}

function kooxooSub(obj){
 var t=obj.T.value;
 var c=obj.Cat;
 if(t=='HrB'){c.value='1';}
 else if(t=='Rent'||t=='Friend'){c.value='sale';}
 else{c.value='';}
 ti = obj.q.value;
 u = 'K';
 try{
  new Image().src = "http://statis.265.com/url?a=S&u="+u+"&t="+ti;
 }catch(ex){}

 return true;
}

function clearInp() {
  if ($("ch").value == "prefill") {
    $("ch").value = "search";        
    $("Ka").value = "";
  }
}

function dgSub() {
  var gForm = $("SoForm");
  var n = $("SoNo").value;
  var kValue = $("Ka").value;
  var pStr = "ÇëÊäÈë¹Ø¼ü´Ê£¬ÀýÈç£º";
  if (n>=1 && n<=3 && kValue.indexOf(pStr)!=-1)
    $("Ka").value = $("Ka").value.replace(pStr, "");
  gForm.submit();
  gt(gForm);
  $("Ka").value = kValue;
}
