/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2017/08/31 */

/**
 * file service.js<br />
 *
 * @fileoverview このファイルには、閲覧画面(CD版)についての処理が<br />
 * 定義されています。<br />
 * file-> service.js
 * @author 渡会
 * @version 1.3.0
 *
 * History(date|version|name|desc)<br />
 *  2011/03/09|1.0.0   |渡会|新規作成<br />
 *  2017/01/04|1.2.0   |森  |REL_00313<br />
 *  2017/08/31|1.3.0|市川(KSE)|REL_00341 手順SeePage見せ方改善<br />
 */
/*-----------------------------------------------------------------------------
 * サービス情報高度化プロジェクト
 * 更新履歴
 * 2011/03/09 渡会 ・新規作成
 * 2017/08/31 市川(KSE) ・REL_00341 17年改善(利用) 手順SeePage見せ方改善
 *---------------------------------------------------------------------------*/
/**
 * 閲覧画面クラス
 * @namespace 閲覧画面クラス
 */
var Service = {};

/**
 * タブインスタンス
 * @type object(連想配列)
 */
Service.TAB_FACT = {};

/**
 * 処理内のキー変換用定数
 * @type object(連想配列)
 */
Service.TAB_CONV = {
  SR:                 "tab_search_result",
  RM:                 "tab_repair",
  NM:                 "tab_ncf",
  EM:                 "tab_ewd",
  BM:                 "tab_brm",
  OM:                 "tab_om",
  WC:                 "tab_wel",
  HR:                 "tab_res",
  ER:                 "tab_erg",
  DM:                 "tab_dm",
  1:                  "tab_repair",
  2:                  "tab_search_result",
  3:                  "tab_search_result",
  tab_search_result:  "SR",
  tab_repair:         "RM",
  tab_ncf:            "NM",
  tab_ewd:            "EM",
  tab_brm:            "BM",
  tab_om:             "OM",
  tab_wel:            "WC",
  tab_res:            "HR",
  tab_erg:            "ER",
  tab_dm:             "DM"
};

/**
 * 新規Window時のオプション
 * @type string
 */
Service.WINDOW_OPEN_OPTION = "left=0,top=0,\
                              toolbar=no,menubar=no,directories=no,\
                              status=no,scrollbars=yes,resizable=yes";

/**
 * ヘルプ画面表示時のサイズ(幅)
 * @type string
 */
Service.SHOW_HELP_WINDOW_SIZE_W = "1024";

/**
 * ヘルプ画面表示時のサイズ(高さ)
 * @type string
 */
Service.SHOW_HELP_WINDOW_SIZE_H = "768";

/**
 * pub.xml、property.xml用XPATH
 * @type object(連想配列)
 */
Service.XML_XPATH = {
  MANUALS:            "//bind-manual",
  RM:                 "//term-base/term[@date]",
  NM:                 "//term-base/term[@date]",
  EM:                 "//term-base/term[@date]",
  BM:                 "//term-base/term[@date]"
};

/**
 * GTS用XPATH
 * @type object(連想配列)
 */
Service.XML_GTS_XPATH = {
  ROOT:               "//pub[@id][@type]",
  NAME:               "//pub/name",
  CODE:               "//engine-code",
  MY:                 "//year-base[@model-year]"
};

/**
 * 表示モード
 * @type object(連想配列)
 */
Service.SHOW_MODE = {
  INITIAL:            "0",
  TABCLICK:           "1"
};

/**
 * 検索モード
 * @type object(連想配列)
 */
Service.SEARCH_MODE = {
  NOTSEARCH:          "0",
  SIMPLE:             "1",
  FULL:               "2",
  YOKOGUSI:           "3"
};

/**
 * 検索時の1ページあたりの件数
 * @type number
 */
Service.SEARCH_COUNT = 20;

/**
 * 隠し項目一覧
 * @type object(連想配列)
 */
Service.globalInfo  = {
  VIEW_LANG:          "",
  PUB_BIND_ID:        "",
  FOR_LANG:           "",
  BRAND:              "",
  BRAND_NAME:         "",
  CAR_NAME:           "",
  TYPE:               "",
  OPTION1:            "",
  OPTION2:            "",
  OPTION3:            "",
  OPTION4:            "",
  OPTION5:            "",
  TEKI_DATE:          "",
  LANG_CODE:          "",
  LANG_NAME:          "",
  CAR_TYPE:           "",
  MANUALS:            "",
  START_TYPE:         "",
  SEARCH_TYPE:        "",
  FROM_DATE:          "",
  MODEL_YEAR:         "",
  PARTS_CD:           "",
  VALID_SIMPLE:       "",
  VALID_YOKO:         "",
  SCH_OPT_DEF:        "",
  SCH_OPT_SEL:        "",
  SCH_OPT_RES:        "",
  SCH_OPT_INF:        "",
  CONTENT_TYPE:       "",
  SEARCH_TYPE:        "0",
  REPAIR_CONTENTS_TYPE_GROUPS:  "10",
  NCF_CONTENTS_TYPE_GROUPS:  "10",
  EWD_CONTENTS_TYPE_GROUPS:  "",
  BRM_CONTENTS_TYPE_GROUPS:  "",
  KEYWORD:            null,
  SYSTEM_TYPE:        "0"
};

/**
 * 索引画面から設定された検索キーワード
 * @private
 * @type string
 */
Service.indexKeywordTxt = "";

/**
 * 品名コード一時領域
 * @type string
 */
Service.instancePartsCode = "";

/**
 * タブ全般の情報管理ハッシュ
 * @private
 * @type object(連想配列)
 */
// Service.tabInfo[i][j]
// i: タブ略名をキーにする
// j: 以下のいずれかをキーにする
//   FACT: インスタンス    NAME: hover時表示名  DEFF: 通常時表示名
//   ELEM: 対象エレメント  DATE: 適用時期       GTS:  GTS情報
Service.tabInfo = {};

/**
 * 現在表示タブ
 * @private
 * @type element
 */
Service.current = null;

/**
 * 現在のウィンドウサイズ
 * @private
 * @type number
 */
Service.currHeight = null;

/**
 * フェイスボックスインスタンス
 * @private
 * @type Facebox
 */
Service.faceBox = null;

/**
 * 配線図プロパティ
 * @private
 * @type object(連想配列)
 */
Service.ewdProps = {
  "processType" : "",
  "linkKey"     : "",
  "functionId"  : ""
};

/**
 * 閲覧画面クラスの初期化処理
 */
Service.$init = function() {
  var METHODNAME = "Service.$init";
  try {
    
    var key = "";
    var ary = [];
    
    Util.$disableWindow();
    
    Service.faceBox = new Facebox();
    
    Use.$init(Service.faceBox);
    Use.Util.$stopSubmit(document.forms[0]);
    
    // TabFact初期化
    Service.TAB_FACT = {
      SR: Service.SearchResult,
      RM: Service.Repair,
      NM: Service.NCF,
      EM: Service.EWD,
      BM: Service.BRM,
      OM: Service.OM,
      WC: Service.WEL,
      HR: Service.RES,
      ER: Service.ERG,
      DM: Service.DM
    };
    
    // GlobalInfo取得
    Service.$setGlobalInfo();
    
    // GlobalInfoチェック
    Service.$chkGlobalInfo();
    
    // パブ形式区分が"1"(SIAS2.1)の場合、背景色を設定
    if(Service.globalInfo.PUB_FORMAT == "1") {
      Element.$addClassName("header", "sias21");
    }
    
    // 車両情報初期化
    $("car_info").innerHTML = Service.globalInfo.CAR_NAME + " > "
                            + Service.globalInfo.TYPE + " > "
                            + Service.globalInfo.TEKI_DATE;
    
    // ブランドがTOYOTAの場合、TOYOTAロゴを表示
    if(Service.globalInfo.BRAND == "E1") {
      Element.$removeClassName($("logo_toyota"), "invisible");
    // ブランドがLEXUSの場合、LEXUSロゴを表示
    } else if(Service.globalInfo.BRAND == "E2") {
      Element.$removeClassName($("logo_lexus"), "invisible");
    // ブランドがSCIONの場合、SCIONロゴを表示
    } else if(Service.globalInfo.BRAND == "E3") {
      Element.$removeClassName($("logo_scion"), "invisible");
    // ブランドが上記以外の場合、TOYOTAロゴを表示
    } else {
      Element.$removeClassName($("logo_toyota"), "invisible");
    }
    
    // イベント登録
    Service.$observeEvent();
    
    // 画面項目の活性/非活性制御
    Service.$disableItem();
    
    // 検索キーワード設定
    Service.$setKeyword();
    
    // タブの初期化
    Service.$initTab();
    
    // 検索/横串検索ボタンの活性化制御
    Service.$setAbledSearchBtn();
    
    // ブラウザによるコンテンツエリアサイズの指定
    Util.$setContentsSize(
        Service.globalInfo.EWD_CONTENTS_TYPE_GROUPS 
            == DictConst.C_CONTENTS_TYPE_OLD_NOSEARCH, 
        Service.globalInfo.BRM_CONTENTS_TYPE_GROUPS 
            == DictConst.C_CONTENTS_TYPE_OLD);
    
    // コンテンツ表示エリアのリサイズイベント登録
    Service.$setWindowResizeEvent();
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * イベントの登録処理
 * @private
 */
Service.$observeEvent = function() {
  var METHODNAME = "Service.$observeEvent";
  try {
    
    /* @private */
    var observeTabEvt = function(key) {
      Use.Util.$observe($(key), "click", Service.$doClickTabLnk);
      Use.Util.$observe($(key), "mouseout", Service.$doOutTabLnk);
      Use.Util.$observe($(key), "mouseover", Service.$doOverTabLnk);
    };
    observeTabEvt("tab_search_result");
    observeTabEvt("tab_repair");
    observeTabEvt("tab_ncf");
    observeTabEvt("tab_ewd");
    observeTabEvt("tab_brm");
    observeTabEvt("tab_om");
    observeTabEvt("tab_wel");
    observeTabEvt("tab_res");
    observeTabEvt("tab_erg");
    observeTabEvt("tab_dm");
    
    Use.Util.$observe($("mdl_index"), "click", Service.$doClickSakuinLnk);
    Use.Util.$observe($("btn_search"), "click", Service.$doBeforeClickSearchBtn.
        curry(DictConst.C_SERVICE_SIMPLE_SEARCH, "", ""));
    Use.Util.$observe($("btn_yokogushi"), "click", Service.$doBeforeClickYokogushiBtn);
    Use.Util.$observe($("lnk_help"), "click", Service.$doClickHelpLnk);
    Use.Util.$observe($("lnk_yokogushi"), "click", Service.$doClickYokogushiHelpIcn);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 画面項目の活性/非活性制御
 */
Service.$disableItem = function() {
  var METHODNAME = "Service.$disableItem";
  try {
    
    var objGlobalInfo =Service.$getGlobalInfo();
    
    // 英語の場合のみ、索引アイコンを活性にする
    if(objGlobalInfo.VIEW_LANG  == "en") {
      Element.$addClassName($("mdl_index_g"), "invisible");
      Element.$removeClassName($("mdl_index"), "invisible");
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * グローバルインフォの設定処理
 * @private
 */
Service.$setGlobalInfo = function() {
  var METHODNAME = "Service.$setGlobalInfo";
  try {
    
    var owner = window.opener;
    var myMap = Service.$getGlobalInfo();
    var parentGi = owner.Top.$getGlobalInfo();
    
    myMap.VIEW_LANG   = parentGi.VIEW_LANG;
    myMap.PUB_BIND_ID = parentGi.PUB_BIND_ID;
    myMap.FOR_LANG    = parentGi.FOR_LANG;
    myMap.BRAND       = parentGi.BRAND;
    myMap.BRAND_NAME  = parentGi.BRAND;
    myMap.OPTION1     = parentGi.OPTION1;
    myMap.OPTION2     = parentGi.OPTION2;
    myMap.OPTION3     = parentGi.OPTION3;
    myMap.OPTION4     = parentGi.OPTION4;
    myMap.OPTION5     = parentGi.OPTION5;
    myMap.PARTS_CD    = parentGi.PARTS_CD;
    myMap.LANG_CODE   = parentGi.LANG_CODE;
    myMap.LANG_NAME   = parentGi.LANG_NAME;
    myMap.START_TYPE  = parentGi.START_TYPE;
    myMap.CAR_NAME    = parentGi.CAR_NAME;
    myMap.CAR_TYPE    = parentGi.CAR_TYPE;
    myMap.TYPE        = parentGi.TYPE;
    myMap.KEYWORD     = parentGi.KEYWORD;
    myMap.MANUALS     = parentGi.MANUALS;
    myMap.FROM_DATE   = parentGi.TEKI_DATE.split("/")[0];
    myMap.MODEL_YEAR  = parentGi.TEKI_DATE.split("/")[1];
    myMap.TEKI_DATE   = parentGi.TEKI_DATE.split("/")[2];
    myMap.VALID_SIMPLE = parentGi.VALID_SIMPLE;
    myMap.VALID_YOKO  = parentGi.VALID_YOKO;
    myMap.SCH_OPT_DEF = parentGi.SCH_OPT_DEF;
    myMap.SCH_OPT_SEL = parentGi.SCH_OPT_SEL;
    myMap.SCH_OPT_INF = parentGi.SCH_OPT_INF;
    myMap.SYSTEM_TYPE = Use.SYSTEM_TYPE;
    myMap.CONTENT_TYPE = parentGi.CONTENT_TYPE;
    myMap.RM_LINK_FLAG = parentGi.RM_LINK_FLAG;
    myMap.PUB_FORMAT   = parentGi.PUB_FORMAT;
    
    // 品名コードがある場合、引き継がれた検索キーワードは、
    // 索引画面から設定された値のため保持する
    if(parentGi.PARTS_CD != "") {
      Service.indexKeywordTxt = parentGi.KEYWORD;
    }
    
    Service.instancePartsCode = parentGi.PARTS_CD;
    
    // ブランドが空白以外の場合、変換する
    if(myMap.BRAND != "") {
      myMap.BRAND = DictConst.C_BRAND_CODE[myMap.BRAND];
    }
    
    // 仕向けが空白以外の場合、変換する
    if(myMap.FOR_LANG != "") {
      myMap.FOR_LANG = DictConst.C_TRGT_CODE[myMap.FOR_LANG];
    }
    
    // モデルイヤーが空白以外の場合、変換する
    if(myMap.MODEL_YEAR != "") {
      myMap.MODEL_YEAR = myMap.MODEL_YEAR + "MY";
    }
    
    // SIAS2.1の場合、配線図を検索対象からはずす
    if(myMap.PUB_FORMAT == "1") {
      myMap.SCH_OPT_DEF = myMap.SCH_OPT_DEF.replace(/(,?20)+/g, "");
      myMap.SCH_OPT_SEL = myMap.SCH_OPT_SEL.replace(/(,?20)+/g, "");
    }
    
    Service.globalInfo = myMap;
    
    Use.Util.$setViewLang(parentGi.VIEW_LANG);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * グローバルインフォのチェック処理
 * @private
 */
Service.$chkGlobalInfo = function() {
  var METHODNAME = "Service.$chkGlobalInfo";
  try {
    
    var valid     = Use.Validator;
    var myMap     = Service.globalInfo;
    var isVLang   = valid.$isNotEmpty(myMap.VIEW_LANG);
    var isPubID   = valid.$isNotEmpty(myMap.PUB_BIND_ID);
    var isFLang   = valid.$isNotEmpty(myMap.FOR_LANG);
    var isBrand   = valid.$isNotEmpty(myMap.BRAND);
    var isCName   = valid.$isNotEmpty(myMap.CAR_NAME);
    var isCType   = valid.$isNotEmpty(myMap.TYPE);
    var isTDate   = valid.$isNotEmpty(myMap.TEKI_DATE);
    var isLangC   = valid.$isNotEmpty(myMap.LANG_CODE);
    var isLangN   = valid.$isNotEmpty(myMap.LANG_NAME);
    var isManual  = valid.$isNotEmpty(myMap.MANUALS);
    var isSimple  = valid.$isNotEmpty(myMap.VALID_SIMPLE);
    var isYoko    = valid.$isNotEmpty(myMap.VALID_YOKO);
    var isSchInf  = valid.$isNotEmpty(myMap.SCH_OPT_INF);
    var isContent = valid.$isNotEmpty(myMap.CONTENT_TYPE);
    var isPubForm = valid.$isNotEmpty(myMap.PUB_FORMAT);
    
    // START_TYPEが"2"の場合はキーワードが必須のため、キーワードチェックを行い
    // それ以外は任意のためtrueを設定する
    var isKeyword = myMap.START_TYPE == "2" ?
                    valid.$isNotEmpty(myMap.KEYWORD) : true;
    
    // 必須項目に未設定がある場合はシステムエラー
    if(!(isVLang && isPubID && isFLang && isBrand && isCName &&
        isCType && isTDate && isLangC && isLangN && isKeyword &&
        isManual && isSimple && isYoko && isSchInf && isContent && isPubForm)) {
      Use.SystemError.$show(null, METHODNAME, "MVWF0123DAE");
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * グローバルインフォの取得処理
 * @return {object(連想配列)} グローバルインフォ
 */
Service.$getGlobalInfo = function() {
  var METHODNAME = "Service.$getGlobalInfo";
  try {
    
    var giCopy = {};
    var key = "";
    var info = Service.tabInfo;
    
    Util.$propcopy(Service.globalInfo, giCopy);
    
    // 現在選択タブが配線図の場合、戻り値のglobalInfoの適用時期に
    // 配線図の適用時期を上書きする
    if(Service.current != null) {
      key = Service.TAB_CONV[Service.current.id];
      if(key == "EM") {
        giCopy.FROM_DATE = info[key].DATE;
      }
    }
    
    return giCopy;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タブ初期化
 */
Service.$initTab = function() {
  var METHODNAME = "Service.$initTab";
  try {
    
    var key = "";
    var matchs = Service.globalInfo.SCH_OPT_SEL.split(",");
    var info = Service.tabInfo;
    var prefix = "CONST_SERVICE_TAB_NAME_";
    var currTab = null;
    var aryManuals = Service.globalInfo.MANUALS.split(",");
    var lenManuals = aryManuals.length;
    var eleTab = null;
    var aryEleTabs = [];
    var lenEleTabs = 0;
    var elmTabBrm = null;
    var copyElmTabBrm = null;
    
    // 表示マニュアルのタブを初期化
    for(var i = 0; i < lenManuals; i++) {
      key = aryManuals[i];
      // 例:"00"→"RM"
      key = DictConst.C_PUB_TYPE_CONVERTER[key];
      
      info[key] = {
        "FACT":   Service.TAB_FACT[key].$getInstance(),
        "ELEM":   $(Service.TAB_CONV[key]),
        "DATE":   "",
        "OVER":   Use.Util.$getMessage(prefix + key),
        "OUT":    $(Service.TAB_CONV[key]).innerHTML,
        "GTS":    null
      };
      
      Element.$removeClassName(info[key].ELEM, "invisible");
      
      // 修理書、解説書、配線図、ボデー修理書の場合はXMLの取得
      if(Util.$getIndexOfArray(matchs, DictConst.C_PUB_TYPE_CONVERTER[key]) != -1) {
        Service.$loadPubXml(key);
        if(Service.tabInfo[key].DATE == "") {
          continue;
        }
        if(key == DictConst.C_MANUAL_EWD) {
          Service.globalInfo.EWD_CONTENTS_TYPE_GROUPS 
              = DictConst.C_CONTENTS_TYPE_NEW;
        }
        if(key == DictConst.C_MANUAL_BRM) {
          Service.globalInfo.BRM_CONTENTS_TYPE_GROUPS 
              = DictConst.C_CONTENTS_TYPE_NEW;
        }
      // それ以外のタブは個別に表示処理を行う
      } else {
        if(key == DictConst.C_MANUAL_EWD) {
          Service.globalInfo.EWD_CONTENTS_TYPE_GROUPS 
              = DictConst.C_CONTENTS_TYPE_OLD_NOSEARCH;
        }
        if(key == DictConst.C_MANUAL_BRM) {
          Service.globalInfo.BRM_CONTENTS_TYPE_GROUPS 
              = DictConst.C_CONTENTS_TYPE_OLD;
        }
        info[key].FACT.init(Service.$getGlobalInfo());
      }
    }
    
    // 配線図リンク用に配線図の適用時期を格納
　　// ※配線図が存在しない場合は、修理書の適用時期を格納
    if(Service.tabInfo["EM"]) {
      Service.globalInfo.EWD_TEKI_DATE = Service.tabInfo["EM"].DATE;
    } else if(Service.tabInfo["RM"]) {
      Service.globalInfo.EWD_TEKI_DATE = Service.tabInfo["RM"].DATE;
    } else {
      Service.globalInfo.EWD_TEKI_DATE = "";
    }

    // テキスト検索XMLと横串検索XMLの両方が存在しない場合
    if(Service.globalInfo.VALID_SIMPLE == "no" 
        && Service.globalInfo.VALID_YOKO == "no") {
      // 各検索処理を行わず、サービス情報ボタンの処理へ移行する
      Service.globalInfo.START_TYPE = "1";
    } else {
      // 検索結果タブを初期化
      info["SR"] = {
        "FACT":   Service.TAB_FACT["SR"].$getInstance(),
        "ELEM":   $(Service.TAB_CONV["SR"]),
        "DATE":   "",
        "OVER":   Use.Util.$getMessage(prefix + "SR"),
        "OUT":    $(Service.TAB_CONV["SR"]).innerHTML,
        "GTS":    null
      };
      Element.$removeClassName(info["SR"].ELEM, "invisible");
      info["SR"].FACT.init(Service.globalInfo);
    }
    
    // ボデー修理書が旧構成の場合、
    // ボデー修理書タブを右寄せにする（デフォルトで左寄せ）
    if(Service.globalInfo.BRM_CONTENTS_TYPE_GROUPS 
        == DictConst.C_CONTENTS_TYPE_OLD) {
      Service.$moveBrmOldTabPosition();
    }
    
    // サービス情報ボタンから遷移した場合、タブクリックイベントを実行
    if(Service.globalInfo.START_TYPE == "1") {
      aryEleTabs = Util.Selector.$select("a", $("tabs"));
      lenEleTabs = aryEleTabs.length;
      // 表示されているマニュアルタブのうち、左から1番目を選択タブとする
      for(var i = 1; i < lenEleTabs; i++) {
        eleTab = aryEleTabs[i];
        if(Element.$hasClassName(eleTab, "invisible") == false) {
          currTab = eleTab;
          break;
        }
      }
      // カレントタブが無い場合
      if(currTab == null) {
        throw Use.Util.$getMessage("MVWF0123DAE");
      }
      Event.$fireEvent(currTab, "click");
      currTab.focus();
    // 検索ボタンから遷移した場合、簡易検索を実行
    } else if(Service.globalInfo.START_TYPE == "2") {
      Service.$doBeforeClickSearchBtn(DictConst.C_SERVICE_SIMPLE_SEARCH, "", "");
      currTab = $(Service.TAB_CONV["SR"]);
      currTab.focus();
    // 横串検索ボタンから遷移した場合、横串検索を実行
    } else if(Service.globalInfo.START_TYPE == "3") {
      Service.$doBeforeClickYokogushiBtn();
      currTab = $(Service.TAB_CONV["SR"]);
      Event.$fireEvent(currTab, "click");
      currTab.focus();
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タブ別XMLの取得処理(pub.xml)
 * @private
 */
Service.$loadPubXml = function(key) {
  var METHODNAME = "Service.$loadPubXml";
  try {
    
    var prefix = "C_SERVICE_PUBBIND_XML_PATH_";
    var url = Use.Util.$getContentsPath(prefix + key);
    
    Use.Util.$request(
      url,
      false,
      function(res) { Service.$getPubOnSuccess(res, key) },
      function(res) { Service.$getPubOnFailure(res, key) },
      true,
      true
    );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * pub.xmlの取得成功処理
 * @param {Response} res レスポンスオブジェクト
 * @param {string} key タブ種別
 */
Service.$getPubOnSuccess = function(res, key) {
  var METHODNAME = "Service.$getPubOnSuccess";
  try {
    
    var doc = res.responseXML;
    var els = null
    var len = 0;
    var sorts = [];
    var teki = "";
    var myGi = {};
    var info = Service.tabInfo;
    var fromDate = "";
    var strSchOptDef = Service.globalInfo.SCH_OPT_DEF;
    var strSchOptSel = Service.globalInfo.SCH_OPT_SEL;
    
    els = Util.$getNodes(doc, Service.XML_XPATH[key]);
    len = els.length;
    // 最新の適用時期取得のため並び替え
    for(var i = 0; i < len; i++) {
      teki = Util.$getAttrValue(els[i], "date");
      // 引継ぎの適用時期以下か判定する
      if(Service.globalInfo.FROM_DATE >= teki) {
        sorts.push(teki);
      }
    }
    // 降順にソートする
    sorts.sort(function(bef, aft) { return bef > aft ? -1 : 1; } );
    
    // 取得件数が1件以上ある場合のみ処理
    if(sorts.length >= 1) {
      fromDate = sorts[0];
    }
    
    // 適用時期が取得できない場合
    if(fromDate == "") {
      // 修理書の場合
      if(key == DictConst.C_MANUAL_REPAIR) {
        // タブを非表示にする
        Element.$addClassName(info[key].ELEM, "invisible");
        // 検索対象から除外する
        strSchOptDef = strSchOptDef.replace(/(,?00)+/g, "");
        strSchOptSel = strSchOptSel.replace(/(,?00)+/g, "");
      // 解説書の場合
      } else if(key == DictConst.C_MANUAL_NCF) {
        // タブを非表示にする
        Element.$addClassName(info[key].ELEM, "invisible");
        // 検索対象から除外する
        strSchOptDef = strSchOptDef.replace(/(,?10)+/g, "");
        strSchOptSel = strSchOptSel.replace(/(,?10)+/g, "");
      // 配線図の場合
      } else if(key == DictConst.C_MANUAL_EWD) {
        // TOP画面で選択した適用時期を設定
        fromDate = Service.globalInfo.FROM_DATE;
      // ボデー修理書の場合
      } else if(key == DictConst.C_MANUAL_BRM) {
        // タブを非表示にする
        Element.$addClassName(info[key].ELEM, "invisible");
        // 検索対象から除外する
        strSchOptDef = strSchOptDef.replace(/(,?30)+/g, "");
        strSchOptSel = strSchOptSel.replace(/(,?30)+/g, "");
      }
      
      // 修理書、解説書、ボデー修理書の場合、検索対象から除外するため、検索対象を再設定する
      if(key == DictConst.C_MANUAL_REPAIR 
          || key == DictConst.C_MANUAL_NCF 
          || key == DictConst.C_MANUAL_BRM) {
        // 先頭のカンマを除去する
        if(strSchOptDef.indexOf(",") == 0) {
          strSchOptDef = strSchOptDef.substr(1);
        }
        // 先頭のカンマを除去する
        if(strSchOptSel.indexOf(",") == 0) {
          strSchOptSel = strSchOptSel.substr(1);
        }
        Service.globalInfo.SCH_OPT_DEF = strSchOptDef;
        Service.globalInfo.SCH_OPT_SEL = strSchOptSel;
        
        // テキスト検索XMLは存在するが、修理書、解説書、配線図、ボデー修理書が対象外の場合
        if(Service.globalInfo.VALID_SIMPLE == "yes" && strSchOptSel == "") {
          Service.globalInfo.VALID_SIMPLE = "no";
        }
        // 横串検索XMLは存在するが、修理書、解説書、配線図が対象外の場合
        if(Service.globalInfo.VALID_YOKO == "yes" 
            && strSchOptDef.replace(/(,?30)+/g, "") == "") {
          Service.globalInfo.VALID_YOKO = "no";
        }
      }
    }
    
    // 修理書、解説書、ボデー修理書の場合
    if(key == DictConst.C_MANUAL_REPAIR 
        || key == DictConst.C_MANUAL_NCF 
        || key == DictConst.C_MANUAL_BRM) {
      info[key].DATE = fromDate;
      info[key].GTS = Service.$getGtsInfo(doc);
      info[key].FACT.init(
        Service.$getGlobalInfo(),
        info[key].GTS,
        info[key].DATE);
    // 配線図の場合
    } else {
      info[key].DATE = fromDate;
      info[key].FACT.init(Service.$getGlobalInfo());
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * pub.xmlの取得失敗処理
 * @param {Response} res レスポンスオブジェクト
 * @param {string} key タブ種別
 */
Service.$getPubOnFailure = function(res, key) {
  var METHODNAME = "Service.$getPubOnFailure";
  try {
    
    var info = Service.tabInfo;
    var fromDate = Service.globalInfo.FROM_DATE;
    
    // 配線図のpub.xmlが取得できない場合は処理を続行する
    if(key == DictConst.C_MANUAL_EWD) {
      info[key].DATE = fromDate;
      info[key].FACT.init(Service.$getGlobalInfo());
    } else {
      Use.SystemError.$show(null, METHODNAME, "MVWF0123DAE");
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * GTS情報の取得処理
 * @private
 * @param {object} doc DOM ROOTオブジェクト(pub.xml)
 */
Service.$getGtsInfo = function(doc) {
  var METHODNAME = "Service.$getGtsInfo";
  try {
    
    var xPath = Service.XML_GTS_XPATH;
    var gtsInfo = {};
    /* @private */
    var getAttrValue = function(xpath, attr) {
      var els = Util.$getNodes(doc, xpath);
      var len = els.length;
      var ret = "";
      // 要素分ループ
      for(var i = 0; i < len; i++) {
        // カウンタが0以外はカンマを付与する
        if (i > 0) {
          ret += ",";
        }
        ret += Util.$getAttrValue(els[i], attr);
      }
      return ret;
    };
    /* @private */
    var getNodeValue = function(xpath) {
      var ele = Util.$getSingleNode(doc, xpath);
      var ret = Util.$getNodeText(ele);
      // 無い場合は空白を返す
      return ret ? ret : "";
    };
    /* @private */
    var getNodeValues = function(xpath, attr) {
      var els = Util.$getNodes(doc, xpath);
      var len = els.length;
      var ret = "";
      // 要素分ループ
      for(var i = 0; i < len; i++) {
        // カウンタが0以外はカンマを付与する
        if (i > 0) {
          ret += ",";
        }
        ret += Util.$getNodeText(els[i]);
      }
      return ret;
    };
    
    gtsInfo.NAME   = getNodeValue(xPath.NAME);
    gtsInfo.ID     = getAttrValue(xPath.ROOT, "id");
    gtsInfo.TYPE   = getAttrValue(xPath.ROOT, "type");
    gtsInfo.MY     = getAttrValue(xPath.MY, "model-year");
    gtsInfo.ENGINE = getNodeValues(xPath.CODE);
    gtsInfo.VIN    = "";
    
    return gtsInfo;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索/横串検索ボタンの活性化制御
 */
Service.$setAbledSearchBtn = function() {
  var METHODNAME = "Service.$setAbledSearchBtn";
  try {
    // テキスト検索XMLが有効の場合
    if(Service.globalInfo.VALID_SIMPLE == "yes") {
      // 検索ボタンを活性にする
      Use.Util.$setDisabled($("btn_search"), false);
    }
    // 横串検索XMLが有効の場合
    if(Service.globalInfo.VALID_YOKO == "yes") {
      // 横串検索ボタンを活性にする
      Use.Util.$setDisabled($("btn_yokogushi"), false);
    }
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * コンテンツ表示エリアのイベント設定処理
 * @private
 * @param {document} owner この画面の親画面DOM情報
 */
Service.$setWindowResizeEvent = function(owner) {
  var METHODNAME = "Service.$setWindowResizeEvent";
  try {
    
    /* @private */
    var myFunc  = function() {
      var targets = $$("div.tab_body");
      var len     = targets.length;
      var myStyle = { height: "" };
      var elmH = 0;
      var curH = Util.$getClientHeight(true);
      var rate = 0;
      var winSize = "";
      var winHeight = "";
      
      // 現在の画面サイズが未取得の場合は取得
      if(Service.currHeight === null) {
        winSize = Util.$createWindowOption("",1);
        winHeight = winSize.split(",");
        Service.currHeight = winHeight[1].substring(7);
        // 表示領域のサイズからタブの高さを取得
        elmH = Service.currHeight - 175;
        // 検索結果
        myStyle.height = (elmH - 14) + "px";
        Element.$setStyle($('tab_body_search_result'), myStyle);
        // 修理書、解説書
        myStyle.height = elmH + "px";
        Element.$setStyle($('tab_body_repair'), myStyle);
        Element.$setStyle($('tab_body_ncf'), myStyle);
        // 配線図
        myStyle.height = elmH + "px";
        Element.$setStyle($('tab_body_ewd'), myStyle);
        // ボデー修理書の構成により、heightを切替える
        if(Service.globalInfo.BRM_CONTENTS_TYPE_GROUPS 
            == DictConst.C_CONTENTS_TYPE_NEW) {
          Element.$setStyle($('tab_body_brm'), myStyle);
        } else {
          myStyle.height = (elmH - 3) + "px";
          Element.$setStyle($('tab_body_brm'), myStyle);
        }
        // その他
        myStyle.height = (elmH - 3) + "px";
        Element.$setStyle($('tab_body_om'), myStyle);
        Element.$setStyle($('tab_body_wel'), myStyle);
        Element.$setStyle($('tab_body_res'), myStyle);
        Element.$setStyle($('tab_body_erg'), myStyle);
        Element.$setStyle($('tab_body_dm'), myStyle);
        Element.$redraw($("footer"));
      }
      
      rate = curH - Service.currHeight;
      
      // rateが0以外の場合はサイズ変更処理を行う
      if(rate) {
        // サイズ変更の対象エレメント数だけループする
        for(var i = 0; i < len; i++) {
          elmH = (!Util.$isUndefined(targets[i]._currHeight)) ?
              targets[i]._currHeight : parseInt(
              Element.$getStyle(targets[i], "height").replace("px", ""), 10);
          // 対象エレメントのスタイルがある場合は取得高さ+差分を、無い場合は
          // 0を設定する
          elmH = !isNaN(elmH) ? elmH + rate : 0;
          // 対象エレメントのサイズを隠し属性で保持
          targets[i]._currHeight = elmH;
          // 0未満になった場合は0にする
          if(elmH < 0) {
            elmH = 0;
          }
          myStyle.height = elmH + "px";
          Element.$setStyle(targets[i], myStyle);
          Element.$redraw(targets[i]);
        }
        Service.currHeight = curH;
        Element.$redraw($("footer"));
      }
    };
    
    Use.Util.$observe(window, "load", function() {
      Use.Util.$observe(window, "resize", myFunc);
      Event.$fireEvent(window, 'resize');
    });
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索キーワードの初期化・設定処理
 * @private
 */
Service.$setKeyword = function() {
  var METHODNAME = "Service.$setKeyword";
  try {
    
    var target = $("keyword");
    var defTxt = Use.Util.$getMessage("CONST_DEFKEYROWD");
    
    // TOPより引継ぎのキーワードがない場合はクラス設定
    if(!Service.globalInfo.KEYWORD) {
      Field.$setValue(target, defTxt);
      Element.$addClassName(target, "deftxt");
    // TOPより引継ぎのキーワードがある場合は値変更
    } else {
      Field.$setValue(target, Service.globalInfo.KEYWORD);
    }
    
    Use.Util.$observe(target, "change", Service.$doBeforeChangeKeywordTxt);
    Use.Util.$observe(target, "keydown", Service.$doKeydownKeywordTxt);
    Use.Util.$observe(target, "focus",
      function(evt) { Service.$doFocusKeywordTxt(evt) });
    Use.Util.$observe(target, "blur",
      function(evt) { Service.$doBlurKeywordTxt(evt) });
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索キーワードのonChange制御
 * @param {Event} evt イベントオブジェクト
 */
Service.$doBeforeChangeKeywordTxt = function(evt) {
  var METHODNAME = "Service.$doBeforeChangeKeywordTxt";
  try {
    
    var ele = Event.$element(evt);
    Element.$removeClassName(ele, Use.Util.CLASS_INPUT_ERROR);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索キーワード内でキー押下
 * @param {Event} evt イベントオブジェクト
 */
Service.$doKeydownKeywordTxt = function(evt) {
  var METHODNAME = "Service.$doKeydownKeywordTxt";
  try {
    
    var keyCode = Event.$getKeyCode(evt);
    
    // Enterキー押下の場合は簡易検索処理の実行
    if(keyCode == Event.KEY_RETURN) {
      // テキスト検索XMLが有効の場合
      if(Service.globalInfo.VALID_SIMPLE == "yes") {
        Element.$removeClassName($("keyword"), Use.Util.CLASS_INPUT_ERROR);
        // 簡易検索処理の実行
        Service.$doBeforeClickSearchBtn(DictConst.C_SERVICE_SIMPLE_SEARCH, "", "");
        Event.$stop(evt);
      // テキスト検索XMLが無効の場合
      } else if(Service.globalInfo.VALID_SIMPLE == "no") {
        // 横串検索XMLが有効の場合
        if(Service.globalInfo.VALID_YOKO == "yes") {
          Element.$removeClassName($("keyword"), Use.Util.CLASS_INPUT_ERROR);
          // 横串検索処理の実行
          Service.$doBeforeClickYokogushiBtn();
          Event.$stop(evt);
        }
      }
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 検索キーワード 入力欄(検索キーワード変更時)
 * @param {Event} evt イベントオブジェクト
 */
Service.$doFocusKeywordTxt = function(evt) {
  var METHODNAME = "Service.$doFocusKeywordTxt";
  try {
    
    var target = Event.$element(evt);
    
    // deftxtクラスがある場合、未入力にする
    if(Element.$hasClassName(target, "deftxt") == true) {
      Field.$setValue(target, "");
      Element.$removeClassName(target, "deftxt");
      Util.$setTextBoxSelection(target);
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索キーワードのonBlur制御
 * @param {Event} evt イベントオブジェクト
 */
Service.$doBlurKeywordTxt = function(evt) {
  var METHODNAME = "Service.$doBlurKeywordTxt";
  try {
    
    var target = Event.$element(evt);
    
    // 未入力の場合、デフォルト値を設定
    if(Field.$getValue(target) == "") {
      Field.$setValue(target, Use.Util.$getMessage("CONST_DEFKEYROWD"));
      Element.$addClassName(target, "deftxt");
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タブ選択処理
 * @param {Event} evt イベントオブジェクト
 */
Service.$doClickTabLnk = function(evt) {
  var METHODNAME = "Service.$doClickTabLnk";
  try {
    
    var ele    = Event.$element(evt);
    var myGi   = {};
    var tabKey = Service.TAB_CONV[ele.id];
    var curKey = "";
    var func = null;
    
    Util.$disableWindow();
    
    // イベントの削除
    Event.$stopObserving(ele);
    
    // 現在タブがある場合はイベント登録
    if(Service.current) {
      // イベントの登録
      Use.Util.$observe(
        Service.current, "click", Service.$doClickTabLnk);
      Use.Util.$observe(
        Service.current, "mouseout", Service.$doOutTabLnk);
      Use.Util.$observe(
        Service.current, "mouseover", Service.$doOverTabLnk);
      
      // 表示内容削除
      curKey = Service.TAB_CONV[Service.current.id];
      Service.tabInfo[curKey].FACT.close();
      Event.$fireEvent(Service.current, "mouseout");
      Element.$removeClassName(Service.current, "selected");
    }
    
    window.focus();
    
    ele.focus();
    
    // 表示文字制御
    Util.$setNodeText(ele, Service.tabInfo[tabKey].OVER);
    
    // クラス設定
    Element.$addClassName(ele, "selected");
    
    Service.ewdProps.processType = Service.SHOW_MODE.TABCLICK;
    Service.globalInfo.SEARCH_TYPE = Service.SEARCH_MODE.NOTSEARCH;
    
    Service.current = ele;
    myGi = Service.$getGlobalInfo();
    
    func = function() {
        Service.tabInfo[tabKey].FACT.show(
          myGi,
          Service.SHOW_MODE.TABCLICK,
          Service.SEARCH_MODE.NOTSEARCH
        );
    };
    Use.Util.$delay(func, 0.1);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タブマウスオーバー処理
 * @param {Event} evt イベントオブジェクト
 */
Service.$doOverTabLnk = function(evt) {
  var METHODNAME = "Service.$doOverTabLnk";
  try {
    
    var ele = Event.$element(evt);
    var tabKey = Service.TAB_CONV[ele.id];
    Util.$setNodeText(ele, Service.tabInfo[tabKey].OVER);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タブマウスアウト処理
 * @param {Event} evt イベントオブジェクト
 */
Service.$doOutTabLnk = function(evt) {
  var METHODNAME = "Service.$doOutTabLnk";
  try {
    
    var ele = Event.$element(evt);
    var tabKey = Service.TAB_CONV[ele.id];
    Util.$setNodeText(ele, Service.tabInfo[tabKey].OUT);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 現在表示タブ名称の取得処理
 * @return {string} タブ名称
 */
Service.$getCurrentTabName = function() {
  var METHODNAME = "Service.$getCurrentTabName";
  try {
    
    return Service.TAB_CONV[Service.current.id];
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 閲覧保持の表示時間の取得処理
 * @return {number} 表示時間(ms)
 */
Service.$getInitDate = function() {
  var METHODNAME = "Service.$getInitDate";
  try {
    
    return Use.Util.$getInitDate();
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 警告・注意画面表示(診断フロー警告・注意画面表示アイコンクリック時)
 * @param {string} paraId パラグラフID
 * @param {string} filterRefId 絞込み対象の参照先ID
 */
Service.$doClickCautionNoticeIcn = function(paraId
// 2017/08/31 add start ver1.3.0
                                          , filterRefId
// 2017/08/31 add end ver1.3.0
                                                  ) {
  var METHODNAME = "Service.$doClickCautionNoticeIcn";
  try {
    
    Service.Flow.$show(Service.faceBox, paraId, $("repair_attentions")
// 2017/08/31 add start ver1.3.0
      // 絞込み対象の参照先ID (手順SeePage見せ方改善)
      , filterRefId
// 2017/08/31 add start ver1.3.0
    );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 索引リスト選択画面表示(索引リスト選択画面表示アイコンクリック時)
 */
Service.$doClickSakuinLnk = function() {
  var METHODNAME = "Service.$doClickSakuinLnk";
  try {
    
    Use.Index.$show(
      Service.faceBox,
      Service.$setIndexResults,
      Service.globalInfo.VIEW_LANG,
      Service.globalInfo.LANG_CODE,
      $("mdl_index")
    );
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 索引画面のコールバック処理
 * @param {element} article 選択品名行
 */
Service.$setIndexResults = function(article) {
  var METHODNAME = "Service.$setIndexResults";
  try {
    
    var target = $("keyword");
    var paragraph = null;
    var articlecd = null;
    var partsName = null;
    
    // 検索キーワードのエラーをクリア
    Element.$removeClassName(target, Use.Util.CLASS_INPUT_ERROR);
    
    paragraph = Util.Selector.$select("div.paragraph", article)[0];
    articlecd = Util.Selector.$select("div.articlecode", article)[0];
    
    partsName = Util.$getNodeText(paragraph);
    
    Field.$setValue(target, partsName);
    Service.indexKeywordTxt = partsName;
    Service.instancePartsCode  = Util.$getNodeText(articlecd);
    
    Element.$removeClassName(target, "deftxt");
    Util.$setTextBoxSelection(target);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * ヘルプ画面表示(ヘルプリンククリック時)
 */
Service.$doClickHelpLnk = function() {
  var METHODNAME = "Service.$doClickHelpLnk";
  try {
    
    var target = Use.Util.$getContentsPath(
      "C_SERVICE_OPEN_HELP_WINDOW", "", Service.globalInfo.CAR_TYPE, "");
    var name = "guidebook_" + Use.Util.$getInitDate();
    var option = Service.WINDOW_OPEN_OPTION;
    Util.$openUrl(target, name, option, Util.WINDOW_SIZE_2);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 横串検索ヘルプ アイコン
 */
Service.$doClickYokogushiHelpIcn = function() {
  var METHODNAME = "Service.$doClickYokogushiHelpLnk";
  try {
    
    var target = Use.Util.$getContentsPath(
      "C_SERVICE_OPEN_YOKOGUSHI_HELP", "", Service.globalInfo.CAR_TYPE, "");
    var name = "yokogushiHelp_" + Use.Util.$getInitDate();
    var option = Service.WINDOW_OPEN_OPTION;
    Util.$openUrl(target, name, option, Util.WINDOW_SIZE_2);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 簡易検索(検索ボタン押下時)
 * @param {string} rmLnkFlg 修理書へのリンクフラグ
 * @param {string} keyword 検索キーワード
 * @param {string} partsCode 品名コード
 */
Service.$doBeforeClickSearchBtn = function(rmLnkFlg, keyword, partsCode) {
  var METHODNAME = "Service.$doBeforeClickSearchBtn";
  try {
    
    var msg = "";
    var valid = Use.Validator;
    var target = Field.$getValue($("keyword"));
    var keyname = Use.Util.$getMessage("CONST_KEYWORD_NM");
    var manuals = [];
    var searchKeyword = "";
    var searchPartsCode = "";
    
    // 入力値がデフォルト値の場合は未入力とする
    if(Element.$hasClassName($("keyword"), "deftxt")) {
      target = "";
    }
    
    // 検索キーワードのエラーをクリア
    Element.$removeClassName($("keyword"), Use.Util.CLASS_INPUT_ERROR);
    
    // 検索ボタンの場合
    if(rmLnkFlg == DictConst.C_SERVICE_SIMPLE_SEARCH) {
      // テキストの必須チェック
      if(!valid.$isNotEmpty(target)) {
        msg = "MVWF0004AAE";
      // テキストのサイズチェック
      } else if(!valid.$checkSize(target, 200)) {
        msg = "MVWF0005AAE";
      // 単語数チェック
      } else if(!valid.$checkNumberOfWords(target, 30)) {
        msg = "MVWF0007AAE";
      // 禁止文字チェック
      } else if(valid.$checkPermissionWord(target) != -1) {
        msg = "MVWF1008AAE";
      // 空文字チェック
      } else if(valid.$isAllBlank(target)) {
        msg = "MVWF1011AAE";
      }
    }
    
    // チェック結果に文字列がない場合は検索処理を行う
    if(!msg) {
      Util.$disableWindow();
      
      // 検索キーワードが、索引画面から設定された検索キーワードと異なる場合
      // 品名コードをクリアする
      if(Field.$getValue($("keyword")) != Service.indexKeywordTxt) {
        Service.instancePartsCode = "";
      }
      
      // 修理書へのリンクフラグを判定し、
      // 検索オプション、検索キーワード、品名コードを設定する
      if(rmLnkFlg == DictConst.C_SERVICE_SIMPLE_SEARCH) {
        // 検索ボタンの場合
        manuals = Service.globalInfo.SCH_OPT_SEL.split(",");
        searchKeyword = target;
        searchPartsCode = Service.instancePartsCode;
      } else if(rmLnkFlg == DictConst.C_SERVICE_SIMPLE_RMSEARCH) {
        // 修理書へのリンクの場合
        manuals = [DictConst.C_SEARCH_OPTION_CD_REPAIR, 
                   DictConst.C_SEARCH_OPTION_CD_REMOVE];
        searchKeyword = keyword;
        searchPartsCode = partsCode;
      }
      
      Service.SimpleSearch.$search(
        Service.$callbackSimpleSearch.curry(
            rmLnkFlg, manuals, searchKeyword, searchPartsCode),
        Service.globalInfo.LANG_CODE,
        Service.globalInfo.PUB_BIND_ID,
        Service.globalInfo.FROM_DATE,
        manuals,
        Service.globalInfo.CAR_TYPE,
        searchPartsCode,
        searchKeyword,
        1,
        Service.SEARCH_COUNT,
        rmLnkFlg
      );
    // チェック結果に文字列がある場合はメッセージ表示
    } else {
      Use.Util.$alert(
        Use.Util.$getMessage(msg, keyname),
        [$("keyword")], null);
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 簡易検索後の画面制御用コールバック処理
 * @param {string} rmLnkFlg 修理書へのリンクフラグ
 * @param {Array} manuals 検索対象マニュアル情報
 * @param {string} keyword 検索キーワード
 * @param {string} partsCode 品名コード
 * @param {array} results 簡易検索結果
 */
Service.$callbackSimpleSearch = function(rmLnkFlg, manuals, keyword, partsCode, results) {
  var METHODNAME = "Service.$callbackSimpleSearch";
  try {
    
    var ele    = $(Service.TAB_CONV["SR"]);
    var myGi   = {};
    var tabKey = Service.TAB_CONV[ele.id];
    var curKey = "";
    
    // 現在表示タブが検索結果以外の場合は以下の処理
    if(Service.current != ele) {
      // イベントの削除
      Event.$stopObserving(ele);
      // 現在表示タブがある場合のみ処理
      if(Service.current) {
        // イベントの登録
        Use.Util.$observe(
          Service.current, "click", Service.$doClickTabLnk);
        Use.Util.$observe(
          Service.current, "mouseout", Service.$doOutTabLnk);
        Use.Util.$observe(
          Service.current, "mouseover", Service.$doOverTabLnk);
        
        // 表示内容削除
        curKey = Service.TAB_CONV[Service.current.id];
        Service.tabInfo[curKey].FACT.close();
        Event.$fireEvent(Service.current, "mouseout");
        
        Element.$removeClassName(Service.current, "selected");
      }
      
      // 表示文字制御
      Util.$setNodeText(ele, Service.tabInfo[tabKey].OVER);
      
      // クラス設定
      Element.$addClassName(ele, "selected");
      
      Service.current = ele;
    }
    
    Service.globalInfo.SEARCH_TYPE = Service.SEARCH_MODE.SIMPLE;
    Service.globalInfo.KEYWORD = keyword;
    Service.globalInfo.PARTS_CD = partsCode;
    Service.globalInfo.RM_LINK_FLAG = rmLnkFlg;
    Service.globalInfo.SCH_OPT_RES = manuals;
    
    myGi = Service.$getGlobalInfo();
    
    // タブインスタンス表示
    Service.tabInfo[tabKey].FACT.show(
      myGi,
      Service.SHOW_MODE.TABCLICK,
      Service.SEARCH_MODE.SIMPLE,
      results);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 横串検索(横串検索ボタン押下時)
 */
Service.$doBeforeClickYokogushiBtn = function() {
  var METHODNAME = "Service.$doBeforeClickYokogushiBtn";
  try {
    
    var keywordElm = $("keyword");
    var keywordTxt = Field.$getValue(keywordElm);
    var keywordName = Use.Util.$getMessage("CONST_KEYWORD_NM");
    var yokoHelpName = Use.Util.$getMessage("CONST_YOKOGUSHI_VCHECK_ERROR");
    var message = "";
    
    var paternLen = "^.{5,200}$";
    var paternAtr = "^[Ａ-Ｚａ-ｚ／０-９A-Za-z/0-9]+$";
    
    myGlobalInfo = Service.$getGlobalInfo();
    
    // 検索キーワードのエラーをクリア
    Element.$removeClassName(keywordElm, Use.Util.CLASS_INPUT_ERROR);
    
    // 入力値がデフォルト値の場合は未入力とする
    if(Element.$hasClassName(keywordElm, "deftxt")) {
      keywordTxt = "";
    }
    
    // 必須
    if(!Use.Validator.$isNotEmpty(keywordTxt)) {
      message = Use.Util.$getMessage("MVWF0004AAE");
    // 桁数
    } else if(!Use.Validator.$isCorrectPattern(keywordTxt, paternLen)) {
      message = Use.Util.$getMessage("MVWF0006AAE");
    // 単語数
    } else if(!Use.Validator.$checkNumberOfWords(keywordTxt, 1)) {
      message = Use.Util.$getMessage("MVWF0006AAE");
    // 全空白
    } else if(Use.Validator.$isAllBlank(keywordTxt)) {
      message = Use.Util.$getMessage("MVWF0009AAE", yokoHelpName);
    // 属性
    } else if(!Use.Validator.$isCorrectPattern(keywordTxt, paternAtr)) {
      message = Use.Util.$getMessage("MVWF0009AAE", yokoHelpName);
    // 禁止文字
    } else if(Use.Validator.$checkPermissionWord(keywordTxt) != -1) {
      message = Use.Util.$getMessage("MVWF0009AAE", yokoHelpName);
    }
    
    // メッセージIDがある場合は表示
    if(message != "") {
      Use.Util.$alert(message, keywordElm);
    // 
    } else {
      Util.$disableWindow();
      
      // 検索キーワードが、索引画面から設定された検索キーワードと異なる場合
      // 品名コードをクリアする
      if(Field.$getValue(keywordElm) != Service.indexKeywordTxt) {
        Service.instancePartsCode = "";
      }
      
      Service.YokogushiSearch.$search(
        Service.$doAfterClickYokogushiBtn,
        Service.globalInfo.LANG_CODE,
        Service.globalInfo.PUB_BIND_ID,
        Service.globalInfo.FROM_DATE,
        Service.globalInfo.SCH_OPT_DEF.replace(/(,?30)+/g, ""),
        Service.globalInfo.CAR_TYPE,
        Service.instancePartsCode,
        keywordTxt,
        1,
        Service.SEARCH_COUNT
      );
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 横串検索のコールバック処理
 * @param {object(連想配列)} results 横串検索結果
 */
Service.$doAfterClickYokogushiBtn = function(results) {
  var METHODNAME = "Service.$doAfterClickYokogushiBtn";
  try {
    
    var ele = $(Service.TAB_CONV["SR"]);
    var myGi   = {};
    var tabKey = Service.TAB_CONV[ele.id];
    var curKey = "";
    var target = Field.$getValue($("keyword"));
    
    // 入力値がデフォルト値の場合は未入力とする
    if(Element.$hasClassName($("keyword"), "deftxt")) {
      target = "";
    }
    
    // 現在表示タブが検索結果以外の場合は以下の処理
    if(Service.current != ele) {
      // イベントの削除
      Event.$stopObserving(ele);
      // 現在表示タブがある場合のみ処理
      if(Service.current) {
        // イベントの登録
        Use.Util.$observe(
          Service.current, "click", Service.$doClickTabLnk);
        Use.Util.$observe(
          Service.current, "mouseout", Service.$doOutTabLnk);
        Use.Util.$observe(
          Service.current, "mouseover", Service.$doOverTabLnk);
        
        // 表示内容削除
        curKey = Service.TAB_CONV[Service.current.id];
        Service.tabInfo[curKey].FACT.close();
        Event.$fireEvent(Service.current, "mouseout");
        
        Element.$removeClassName(Service.current, "selected");
      }
      
      // 表示文字制御
      Util.$setNodeText(ele, Service.tabInfo[tabKey].OVER);
      
      // クラス設定
      Element.$addClassName(ele, "selected");
      
      Service.current = ele;
    }
    
    Service.globalInfo.SEARCH_TYPE = Service.SEARCH_MODE.YOKOGUSI;
    Service.globalInfo.KEYWORD  = target;
    Service.globalInfo.PARTS_CD = Service.instancePartsCode;
    Service.globalInfo.RM_LINK_FLAG = "";
    
    Util.$propcopy(Service.globalInfo, myGi);
    
    // タブインスタンス表示
    Service.tabInfo[tabKey].FACT.show(
      myGi,
      Service.SHOW_MODE.TABCLICK,
      Service.SEARCH_MODE.SIMPLE,
      results);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 検索結果画面内のリンク処理の制御処理
 * @param {string} tabType タブ種別区分
 * @param {string} linkKey 表示するパラグラフのリンクキー
 * @param {string} partsCd 品名コード
 * @param {string} searchType 検索モード
 */
Service.$callbackBridgingSearchResult = function(
    tabType, linkKey, partsCd, searchType) {
  var METHODNAME = "Service.$callbackBridgingSearchResult";
  try {
    
    var tabKey = DictConst.C_PUB_TYPE_CONVERTER[tabType];
    var ele = $(Service.TAB_CONV[tabKey]);
    var curKey = "";
    var func = null;
    
    // 品名コードがundefined以外の場合は横串検索と判断し、値を設定する
    if(!Util.$isUndefined(partsCd) && partsCd != "") {
      Service.globalInfo.PARTS_CD = partsCd;
    }
    
    // 検索モードがundefined以外の場合は検索モードを再設定する
    if(!Util.$isUndefined(searchType) && searchType != "") {
      Service.globalInfo.SEARCH_TYPE = searchType;
    }
    
    // 遷移後画面のイベント停止
    Event.$stopObserving(ele);
    
    // 遷移後画面の表示文字制御
    Util.$setNodeText(ele, Service.tabInfo[tabKey].OVER);
    
    // 検索結果のイベント登録
    Use.Util.$observe(
      Service.current, "click", Service.$doClickTabLnk);
    Use.Util.$observe(
      Service.current, "mouseout", Service.$doOutTabLnk);
    Use.Util.$observe(
      Service.current, "mouseover", Service.$doOverTabLnk);
    
    // 検索結果の表示内容削除
    curKey = Service.TAB_CONV[Service.current.id];
    Service.tabInfo[curKey].FACT.close();
    Event.$fireEvent(Service.current, "mouseout");
    
    // クラス設定
    Element.$removeClassName(Service.current, "selected");
    Element.$addClassName(ele, "selected");
    
    Service.current = ele;
    
    func = function() {
      Service.tabInfo[tabKey].FACT.show(Service.globalInfo, 3, linkKey);
      // 遷移先のタブにフォーカスを当てる
      ele.focus();
    };
    Use.Util.$delay(func, 0.1);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * タイトル選択画面表示
 * @param {Event} evt イベントオブジェクト
 * @param {array} spans 選択したエレメント内の<span>配列
 */
Service.$doClickTitleLnk = function(evt, spans) {
  var METHODNAME = "Service.$doClickTitleLnk";
  try {
    
    var tabKey = Service.TAB_CONV[Service.current.id];
    var len = spans.length;
    var linkKey = "";
    var elm = Event.$element(evt);
    
    // spanがない場合はシステムエラー
    if(len < 1) {
      Use.SystemError.$show(null, METHODNAME);
    // spanの数が1以下の場合はタイトル選択画面は出さずに処理
    } else if(len == 1) {
      linkKey = spans[0].innerHTML;
      Service.tabInfo[tabKey].FACT.doClickTitleLnk(linkKey);
    // spanの数が2以上の場合はタイトル選択画面の表示
    } else {
      Service.TitleSelect.$show(
        Service.faceBox,
        Service.tabInfo[tabKey].FACT.doClickTitleLnk,
        spans,
        elm
      );
    }
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 印刷イメージ表示画面表示
 * @param {string} path 表示するパラグラフのURL
 */
Service.$doClickPrintLnk = function(path) {
  var METHODNAME = "Service.$doClickPrintLnk";
  try {
    
    var showURL = path;
    var option  = Service.WINDOW_OPEN_OPTION;
    var tabKey  = Service.TAB_CONV[Service.current.id];
    var target  = Service.TAB_CONV[Service.current.id];
    target += "ModelessWindow_" + Use.Util.$getInitDate();
    target += "PrintMode";
// 2017/08/31 add start ver1.3.0
//  showURL += "?PUB_TYPE=" + Service.$getCurrentTabName();
    if(showURL.indexOf("?") == -1) {
      showURL += "?PUB_TYPE=" + Service.$getCurrentTabName();
    } else {
      showURL += "&PUB_TYPE=" + Service.$getCurrentTabName();
    }
// 2017/08/31 add end ver1.3.0
    showURL += "&MODE=1";
    
    Util.$propcopy(
        Service.tabInfo[tabKey].FACT.mySuccession, 
        Service.tabInfo[tabKey].FACT.mySuccessionMode1
    );
    
    Service.$setModelessParam("1", "MODE", "1");
    
    Util.$openUrl(showURL, target, option, Util.WINDOW_SIZE_2);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * パラグラフ表示のコールバック処理
 * @param {object(連想配列)} paraInfo パラグラフ内情報
 * @param {boolean} isExpand 展開・縮小の有無
 * @param {string} isFlow 診断フロー警告・注意画面表示の有無
 */
Service.$callbackParagraph = function(paraInfo, isExpand, isFlow) {
  var METHODNAME = "Service.$callbackParagraph";
  try {
    
    var tabKey = Service.TAB_CONV[Service.current.id];
    Service.tabInfo[tabKey].FACT.setHistory(paraInfo, isExpand, isFlow);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 展開・縮小状態のコールバック処理
 * @param {number} expandState コンテンツ内の展開・縮小状態
 */
Service.$callbackExpand = function(expandState) {
  var METHODNAME = "Service.$callbackExpand";
  try {
    
    var tabKey = Service.TAB_CONV[Service.current.id];
    Service.tabInfo[tabKey].FACT.setExpandState(expandState);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 要領参照リンクのコールバック処理
 * @param {string} linkKey 表示するパラグラフのリンクキー
 */
Service.$callbackReference = function(linkKey) {
  var METHODNAME = "Service.$callbackReference";
  try {
    
    var tabKey = Service.TAB_CONV[Service.current.id];
    Service.tabInfo[tabKey].FACT.doClickReferenceLnk(linkKey);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 手順詳細のコールバック処理
 * @param {string} pubType 表示するコンテンツのPUB_TYPE
 * @param {string} paraId パラグラフID
 * @param {string} anchor アンカー
 * @param {object(連想配列)} param 診断フローからの引継ぎ情報
 * @param {boolean} isCallFlow true : 診断フロー警告注意から表示する場合
 *                             false: そのほか
 */
Service.$callbackProcedures = function(
    pubType, paraId, anchor, param, isCallFlow) {
  var METHODNAME = "Service.$callbackProcedures";
  try {
    
    Service.tabInfo[pubType].FACT.openProceduresWindow(
        paraId, anchor, param, isCallFlow);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

// 2017/08/31 add start ver1.3.0
// ---------------------
// 手順SeePage見せ方改善
// ---------------------
/**
 * 手順詳細のコールバック処理 ※「絞込み対象の参照先ID」ありバージョン
 * @param {string} pubType     表示するコンテンツのPUB_TYPE
 * @param {string} paraId      パラグラフID
 * @param {string} anchor      アンカー
 * @param {object(連想配列)} param 診断フローからの引継ぎ情報
 * @param {boolean} isCallFlow true : 診断フロー警告注意から表示する場合
 *                             false: そのほか
 * @param {string} filterRefId 絞込み対象の参照先ID
 */
Service.$callbackProceduresWithFilterRefId = function(pubType, paraId, anchor, param, isCallFlow, filterRefId) {
  var METHODNAME = "Service.$callbackProceduresWithFilterRefId";
  try {
    
    Service.tabInfo[pubType].FACT.openProceduresWindow(paraId, anchor, param, isCallFlow, filterRefId);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};
// 2017/08/31 add end ver1.3.0

/**
 * モーダレス画面用引継ぎ項目取得処理
 * @param {string} mdlPubType モーダレス画面のPUB_TYPE
 * @param {string} mdlMode モーダレス画面のMODE
 * @return {object(連想配列)} 引継ぎ情報
 */
Service.$getModelessParam = function(mdlPubType, mdlMode) {
  var METHODNAME = "Service.$getModelessParam";
  try {
    
    var ret = {};
    var tabId = "";
    // パラグラフ表示エリアから実行された場合
    if(mdlPubType == "") {
      tabId = Service.TAB_CONV[Service.current.id];
    // モーダレス画面から実行された場合
    } else {
      tabId = mdlPubType;
    }
    Util.$propcopy(
        Service.tabInfo[tabId].FACT.getModelessParam(mdlMode), ret);
    return ret;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * モーダレス画面の引継ぎ情報用の更新処理
 * @param {string} mode モード
 * @param {string} key 更新対象のキー
 * @param {string} val 更新対象の値
 */
Service.$setModelessParam = function(mode, key, val) {
  var METHODNAME = "Service.$setModelessParam";
  try {
    
    var tabKey = Service.TAB_CONV[Service.current.id];
    Service.tabInfo[tabKey].FACT.setModelessParam(mode, key, val);
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * コンテンツ表示処理終了処理
 */
Service.$showContentsEnd = function() {
  var METHODNAME = "Service.$showContentsEnd";
  try {
    
    var tabKey = Service.TAB_CONV[Service.current.id];
    Service.tabInfo[tabKey].FACT.showContentsEnd();
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * Faceboxインスタンス取得
 * @return {Facebox} Faceboxインスタンス
 */
Service.$getFacebox = function() {
  var METHODNAME = "Service.$getFacebox";
  try {
    
    return Service.faceBox;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * ボデー修理書のタブ表示位置を右寄せする
 * ※デフォルトで左寄せ
 */
Service.$moveBrmOldTabPosition = function() {
  var METHODNAME = "Service.$moveBrmOldTabPosition";
  try {
    var elmTabBrm = $("tab_brm");
    var copyElmTabBrm = null;
    
    // エレメントのコピー前にイベントハンドラーの関連付けを解除
    // ※cloneNodeでイベントハンドラーがコピーされないブラウザがあるため、
    //   一律でイベントハンドラーの関連付けを解除する。
    Event.$stopObserving(elmTabBrm, "click");
    Event.$stopObserving(elmTabBrm, "mouseout");
    Event.$stopObserving(elmTabBrm, "mouseover");
    
    // コピー元のエレメントのid属性を削除(一時的なid属性の重複を回避)
    Util.$setAttrValue(elmTabBrm, "id", "");
    
    // コピー元のエレメントをディープコピー
    copyElmTabBrm = elmTabBrm.cloneNode(true);
    
    // コピー先のエレメントにid属性を追加
    Util.$setAttrValue(copyElmTabBrm, "id", "tab_brm");
    
    // コピー元のエレメントを削除
    Element.$remove(elmTabBrm);
    
    // イベントハンドラーを関連付ける
    Use.Util.$observe(copyElmTabBrm, "click", Service.$doClickTabLnk);
    Use.Util.$observe(copyElmTabBrm, "mouseout", Service.$doOutTabLnk);
    Use.Util.$observe(copyElmTabBrm, "mouseover", Service.$doOverTabLnk);
    
    // ボデー修理書のタブ表示位置を右寄せする
    Element.$insert($$("div.tabs_other")[0], {'top': copyElmTabBrm});
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * 修理書へのリンク用の検索キーワード作成
 * @param {string} target 検索キーワード
 * @return {string} 修理書へのリンク用の検索キーワード
 */
Service.$makeRmLinkKeyword = function(target) {
  var METHODNAME = "Service.$makeRmLinkKeyword";
  try {
    var work = target;
    var aryWork = [];
    var arySpace = [];
    var aryWorkNew = [];
    var arySpaceNew = [];
    var aryLen = 0;
    
    // &nbsp;を半角スペースに置換する
    work = work.replace(new RegExp(String.fromCharCode(160), 'g'), " ");
    
    // トリム
    work = Use.Validator.$trim(work);
    
    // 単語の配列を取得
    aryWork  = work.split(new RegExp('[ 　]+', 'g'));
    // 単語の区切文字（全半角スペース）の配列を取得
    arySpace = work.split(new RegExp('[^ 　]+', 'g'));
    
    // IEの場合、単語の区切文字の配列を作成すると、
    // 先頭と末尾の空文字が配列に格納されないため、処理の都合で追加する
    if(arySpace[0] != "") {
      arySpace = [""].concat(arySpace.concat([""]));
    }
    
    aryLen = aryWork.length;
    
    // 30単語を超える場合、31単語目から後ろを削除
    if(aryLen > 30) {
      aryWorkNew = aryWork.slice(0, 30);
      arySpaceNew = arySpace.slice(0, 31);
      
      work = "";
      aryLen = aryWorkNew.length;
      // 単語と区切文字を再連結する
      for(var i = 0; i < aryLen; i++) {
        work += arySpaceNew[i].concat(aryWorkNew[i]);
        if(i == aryLen - 1) {
          work += arySpaceNew[i + 1];
        }
      }
    }
    
    // 200文字を超える場合、201文字目から後ろを削除
    if(Use.Validator.$checkSize(work, 200) == false) {
      work = work.substring(0, 200);
    }
    // トリム
    work = Use.Validator.$trim(work);
    
    return work;
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

// 配線図要求API対応

/**
 * 
 */
Service.$getProcessType = function() {
  var METHODNAME = "Service.$getProcessType";
  try {
    
    return Service.ewdProps.processType;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME, "", true);
  }
};

/**
 * リンクキー取得処理
 * @return string リンクキー
 */
Service.$getLinkKey = function() {
  var METHODNAME = "Service.$getLinkKey";
  try {
    
    return Service.ewdProps.linkKey;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME, "", true);
  }
};

/**
 * 配線図プロパティのセッター
 * @param {string} linkKey リンクキー
 * @param {string} process 処理区分
 */
Service.$setEWDProperty = function(linkKey, process) {
  var METHODNAME = "Service.$setEWDProperty";
  try {
    
    Service.ewdProps.linkKey = linkKey || "";
    Service.ewdProps.processType = process || "";
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
}

/**
 * 閲覧ログ登録処理
 * @param {string} funcId 機能ID
 */
Service.$entryAccessLog = function(funcId) {
  var METHODNAME = "Service.$entryAccessLog";
  try {
    
    
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME, "", true);
  }
};

/**
 * システム区分取得処理
 * @return number システムタイプ(1) 1:CD版 2:Web版
 */
Service.$getSystemType = function() {
  var METHODNAME = "Service.$getSystemType";
  try {
    
    return Service.globalInfo.SYSTEM_TYPE;
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME, "", true);
  }
};

/**
 * 配線図用 ツールアイコンエリア制御処理
 * @param {string} icnType 対象アイコン "1":印刷、"2":診断メモ
 * @param {boolean} isState 対象アイコンの状態制御 true:活性、false:非活性
 */
Service.$setToolIconEnable = function(icnType, isState) {
  var METHODNAME = "Service.$setToolIconEnable";
  try {
    
    var icnTypeMap = {
      "1" : "ewd_print",
      "2" : "ewd_memo"
    };
    var befElm = icnTypeMap[icnType];
    var aftElm = icnTypeMap[icnType];
    
    // trueの時は活性制御を行う
    if(isState) {
      befElm += "_g";
    // falseの時は非活性制御を行う
    } else {
      aftElm += "_g";
    }
    
    Element.$addClassName(befElm, "invisible");
    Element.$removeClassName(aftElm, "invisible");
    
  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};

/**
 * Serviceユーティリティクラスを実現する。
 * @namespace Serviceユーティリティクラス
 */
Service.Util = {};
