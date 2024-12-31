/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2012/07/24 */

/**
 * file dict.js<br />
 *
 * @fileoverview 多言語対応辞書クラス。（英語）<br />
 * file-> dict_message.js
 * @author Shimizu
 * @version 1.0.0
 *
 * History(date|version|name|desc)<br />
 *  2011/02/10|1.0.0|Shimizu|新規作成<br />
 */
/*-----------------------------------------------------------------------------
 * サービス情報高度化プロジェクト
 * 更新履歴
 * 2011/02/10 Shimizu ・新規作成
 *---------------------------------------------------------------------------*/
/**
 * 多言語対応辞書クラス（英語）
 * @namespace 多言語対応辞書クラス（英語）
 */
var Dict = {
  //key: value,     Translate the value of dialogue box message or title.  Don't change key.
  MVWF0011AAE:                        'Techstream Boot has failed.\nConfirm that the following conditions have been met:\n- Techstream is installed.\n- Techstream can be booted independently.\nError Code: ',  // manual_page   GTS function call message
  MVWF0012AAE:                        'The operation failed because Techstream was processing.\nRetry after comfirming the Techstream information displayed on your screen.\nError Code: ',  // manual_page   GTS function call message
  MVWF0013AAE:                        'The operation failed because the following function was in operation.\nTerminate the following function and retry.\n  Utility, CARB OBD II, CUW, SUW\nError Code: ',  // manual_page   GTS function call message
  MVWF0014AAE:                        'The operation failed.\nIf Techstream is already booted, terminate Techstream and retry.\nError Code: ',  // manual_page   GTS function call message
  MVWF0015AAE:                        'The operation failed.\nError Code:',  // manual_page   GTS function call message
  MVWF0016AAE:                        'The operation failed.\nConfirm that the following condition has been met:\n- Techstream is installed.\nError Code: ',  // manual_page   GTS function call message
  MVWF0017AAE:                        'The operation failed because Techstream is running in another browser.\nClose other browser and retry.\nError Code: ',  // manual_page   GTS function call message
  MVWF0021AAI:                        'Preparing...',  // manual_page   GTS function call message
  MVWF0022AAI:                        'Preparation: OK',  // manual_page   GTS function call message
  MVWF0023AAI:                        'Techstream Booting...',  // manual_page   GTS function call message
  MVWF0024AAI:                        'Techstream Boot: OK',  // manual_page   GTS function call message
  MVWF0025AAI:                        'Function Booting...',  // manual_page   GTS function call message
  MVWF0123DAE:                        'An unexpected error has occurred.',  // manual_page  ERROR function call message
  MVWF0124DAE:                        'Close the browser and retry.',  // manual_page  ERROR function call message
  MVWF0125DAE:                        'System Error',  // manual_page  ERROR function call message
  MVWF0141AAE:                        'Failed to start GlobalTechStream+.\nAfter checking if GlobalTechStream+ is installed, restart your PC and try again.\nError Code: ',
  MVWF0142AAE:                        'The operation failed because the following function was in operation.\nTerminate the following function and retry.\n  Utility\nError Code:',
  MVWF0143AAE:                        'The operation failed because the following function was in operation.\nTerminate the following function and retry.\n  CUW+\nError Code: ',
  MVWF0144AAE:                        'The operation failed.\nThe GlobalTechStream+ vehicle selection process has timed out.\nPlease try again. \nError Code: ',
  MVWF0145AAE:                        'The operation failed.\nMake sure that the vehicle in the repair manual matches the vehicle connected by GlobalTechStream+, and then try again.\nError Code: ',
  MVWF0146AAE:                        'The operation failed.\nPlease create and submit an error report.\nError Code:',
  MVWF0147AAE:                        'The operation failed.\nCheck if the corresponding ECU is connected, and then try again.\nError Code: ',
  MVWF0148AAE:                        'The operation failed.\nPlease create and submit an error report.\nError Code:',
  MVWF0149AAE:                        'The operation failed.\nReturn GTS+ to the main menu and try again.\nError Code:',
  MVWF0150AAE:                        'The operation failed.\nAfter completing the GTS + model selection work, try again.\nError Code:',
  CONST_FACEBOX_IMAGE_TITLE:          'Exit',
  CONST_GTS_FACEBOX_TITLE:            'GTS Sending/Receiving...',  // manual_page   GTS function call title
  CONST_CONTENTS_TITLE_PRINT:         'Print-Toyota Service Information',  // manual_page  print function call title
  CONST_CONTENTS_TITLE_DIAGNOSTIC:    'Diagnostic Help - Toyota Service Information',   // manual_page  diagnostic function call title
  CONST_CONTENTS_TITLE_INSPECTION:    'Inspection Procedure - Toyota Service Information',   // manual_page inspection function call title
  CONST_CONTENTS_TITLE_REFERENCE:     'Reference Page - Toyota Service Information',    // manual_page  reference function title
  CONST_CONTENTS_FIXED_HEAD:          '<div class="fontEn" id="header_head"><div id="head_buttons"><input type="button" class="button_style" id="btn_print" value="Print"></div><div id="navigation"><p><a href="javascript:void(0);" class="link" id="lnk_close">Exit</a></p></div></div>',      // manual_page common header, translate these words   "Print" and Exit
  CONST_CONTENTS_FIXED_HEAD_IE:       '<div class="fontEn" id="header_head"><div id="head_buttons"><input type="button" class="button_style" id="btn_print" value="Print"><input type="button" class="button_style" id="btn_printpreview" value="Preview"></div><div id="navigation"><p><a href="javascript:void(0);" class="link" id="lnk_close">Exit</a></p></div></div>',     // manual_page common header, translate these words   "Print" and "PrintPreview" and Exit
  CONST_CONTENTS_FIXED_FOOT:          '<div class="fontEn" id="footer_message">&copy; 2012 TOYOTA MOTOR CORPORATION. All Rights Reserved.</div>',     // manual_page  common footer
  CONST_CONTENTS_FLOW_NAVE_TITLE:     'Overview',  // manual_page flow function call title
  CONST_CONTENTS_FLOW_BTN_PROC:       'Procedures',  // manual_page flow function call title
  CONST_CONTENTS_FLOW_BTN_JUDGE:      'Criteria'  // manual_page flow function call title
};

// START_MARK: Don't change below program code between START_MARK and END_MARK.
/**
 * 初期化
 */
Dict.$init = function() {
  var METHODNAME = 'Dict.$init';
  try {

    var len = DictConst.Keys.length;
    //DictConstの定義を言語ごとの定義にセット
    for(var i = 0; i < len; i++) {
      var key = DictConst.Keys[i];
      Dict[key] = DictConst[key];
    }

  } catch(err) {
    Use.SystemError.$show(err, METHODNAME);
  }
};
// END_MARK: Don't change above program code between START_MARK and END_MARK.
