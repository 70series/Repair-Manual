var Ef3={};Ef3.currHeight=null;Ef3.Ert=function(){var EfK="EWDFeedBack.$init";};Ef3.Ef4=function(){var EfK="EWDFeedBack.Ef4";EMUtil.$init(true);Ef3.$Eru();var Efb=getParameter("VIEW_LANG");window.document.title=EwdDict[Efb]['CONST_PRINT_WINDOW_TITLE'];Ef3.Erv(Efb);E1.Efj(E1.EgY);var EfU=opener.VWFeedback.$getLinkKey();var EfV=[];EfV=Ef3.Erw(EfU);if(EfV[0]=="connlist"||EfV[0]=="component"){Ejb=new Ejy.Ejd();var Ehp=EfV[3].split(",");EfV[2]=E1.convertType(EfV[2]);var Ejz=EfV[2].split(",");for(var i=0;i<Ehp.length;i++){Ejb.Eiz(Ejz[i],Ehp[i].replace(/:/g,","));}Ejb.EgE=EfV[4];Ejb.EgF="";Ejy.Ejj("contents",Ejb);Ef3.Erx();}else if(EfV[0]=="fuselist"){Ef3.EjD(EfV[1],EfV[4]);Ef3.Ery();}else if(EfV[0]=="intro"){Ef3.EjC(EfV[1]);}};Ef3.Erv=function(Efb){var EfK="EWDFeedBack.$createFrame";$EM("lnk_close").innerHTML=EwdDict[Efb]['CONST_CONTENTS_EXIT_HEAD'];$EM("btn_print").value=EwdDict[Efb]['CONST_CONTENTS_PRINT_HEAD'];Event.$observe($EM("lnk_close"),"click",Ef3.Erz);Event.$observe($EM("btn_print"),"click",Ef3.Es0);};Ef3.$Eru=function(){var METHODNAME="Contents.$setWindowResizeEvent";var myFunc=function(){if(Ef3.currHeight===null){Ef3.currHeight=EMUtil.$getClientHeight(true);}var myStyle={height:""};var elmH=0;var curH=EMUtil.$getClientHeight(true);var rate=curH-Ef3.currHeight;var wrapper=null;if(rate){wrapper=$EM("wrapper");elmH=(!EMUtil.$isUndefined(wrapper._currHeight))?wrapper._currHeight:parseInt(Element.$getStyle(wrapper,"height").replace("px",""),10);elmH=!isNaN(elmH)?elmH+rate:0;wrapper._currHeight=elmH;if(elmH<0){elmH=0;}myStyle.height=elmH+"px";Element.$setStyle(wrapper,myStyle);Ef3.currHeight=curH;Element.$redraw(wrapper);}};Event.$observe(window,"load",function(){Event.$observe(window,"resize",myFunc);});};Ef3.Erz=function(){var EfK="EWDFeedBack.$doClickExitLnk";window.close();};Ef3.Es0=function(){var EfK="Contents.$doClickPrintLnk";window.print();};getParameter=function(key){var Es1;var str=location.search.split("?");if(str.length<2){return"";}var Ejb=str[1].split("&");for(var i=0;i<Ejb.length;i++){Es1=Ejb[i].split("=");if(Es1[0]==key&&Es1.length==2){return decodeURIComponent(Es1[1]);}}return"";};Ef3.Ery=function(){var elm=$$EM("span.loads_ref");for(var i=0;i<elm.length;i++){elm[i].onclick=null;}elm=$EM("contents").getElementsByTagName("input");elm[0].onclick=null;};Ef3.Erx=function(){var elm=$EM("contents").getElementsByTagName("img");for(var i=0;i<elm.length;i++){elm[i].onclick=null;}elm=$EM("contents").getElementsByTagName("div");for(var i=0;i<elm.length;i++){elm[i].onclick=null;elm[i].onmouseover=null;elm[i].onmouseout=null;}elm=$EM("contents").getElementsByTagName("input");for(var i=0;i<elm.length;i++){elm[i].onclick=null;}};Ef3.EjC=function(Efm){var METHODNAME="E1.EjC";var EjT=new EjU(E1.Egb);var Egs=EjT.EjV(Efm);var EjW="intro/"+Egs.EjX+".html";Ef3.EjY(EjW);Egs=null;};Ef3.EjY=function(EjX){var myFunc=function(EnD){$EM("contents").innerHTML=EnD.responseText;};var En9={asynchronous:true,onSuccess:myFunc,onFailure:null,onException:null,isCheckExist:true,isXML:false};new EMRequest(EjX,En9);};Ef3.EjD=function(EfS,EgE){var Egq;var EhK;var Eh9=[];var Ehp;var Eja=EfS;var Ejk=E1.Egg;if(E1.EgF!=""&&E1.EgF!=null){Ejk+="/models/"+E1.EgF;}Ejk+="/ps-"+EgE+".xml";var Ejl=new Ejm(Ejk);var Ejn=E1.Ejo();Ejl.Ejq(Ejn);Ejl.Ejr(Eja.split("-")[1]);Ejl.Ejs(E1.Egf,$EM("contents"));};Ef3.Erw=function(Eg3){var EfK="EWDFeedBack.$spliceLinkKey";var Eg9=[];var EfV=[];var Eg8;if(Eg3!=null){Eg8=Eg3.split(";");for(var i=0;i<Eg8.length;i++){Eg9=Eg8[i].split("=");if(Eg9[0]=="ewd_type"){EfV[0]=Eg9[1];}else if(Eg9[0]=="ewd"){EfV[1]=Eg9[1];}else if(Eg9[0]=="type"){EfV[2]=Eg9[1];}else if(Eg9[0]=="code"){EfV[3]=Eg9[1];}else if(Eg9[0]=="term"){EfV[4]=Eg9[1];}}}return EfV;};