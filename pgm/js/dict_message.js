/*! All Rights Reserved. Copyright 2012 (C) TOYOTA  MOTOR  CORPORATION.
Last Update: 2012/10/24 */

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
  MVWF1008AAE:                        '{0} contains an invalid character.\nFor further details, refer to Help.',  // top.html,service.html   search function  call  message
  MVWF1011AAE:                        'There is no inputted data in {0}.',  // top.html,service.html   search function  call  message
  MVWF0003AAE:                        'Service Information cannot be opened because vehicle \ninformation has not been selected.\nSelect all required items (*) from the pull-down menus.',  // top.html,service.html   search function  call  message
  MVWF0004AAE:                        'Input search keywords.',  // top.html,service.html   search function  call  message
  MVWF0005AAE:                        'Input search keywords within 200 characters.',  // top.html,service.html   search function  call  message
  MVWF0006AAE:                        'Input the keyword YOKOGUSHI with no spaces in between and \nwith 5 or more characters.',  // top.html,service.html   search function  call  message
  MVWF0007AAE:                        'Input search keywords within 30 words.',  // top.html,service.html   search function  call  message
  MVWF0009AAE:                        'The keyword contains an invalid character.\nRefer to {0} and input keywords again.',  // top.html,service.html   search function  call  message
  MVWF0028AAE:                        '0 search results',  // service.html  search function  call  message
  MVWF0031AAE:                        'Select a title.',  // service.html   title_select screen function  call  message
  MVWF0032AAE:                        'The search results exceed the maximum number of records, 500.\nAdd search options to narrow your search and then retry.',  //  service.html   search function  call  message
  MVWF0035AAE:                        'Select a keyword.',  // top.html,service.html  index_screen function call message
  MVWF0036DEE:                        'A search error has occurred.',  //  service.html   search function  call  message
  MVWF0123DAE:                        'An unexpected error has occurred.',  // top.html  service.html ERROR function call message
  MVWF0124DAE:                        'Close the browser and retry.',  // top.html  service.html ERROR function message
  MVWF0125DAE:                        'System Error',  // top.html  service.html ERROR function message
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
  CONST_FACEBOX_IMAGE_TITLE:          'Exit',  // service.html function display title
  CONST_README_TTL:                   'Read Me First',  // top.html readme_page (1)
  CONST_TITLESELECT_TITLE:            'Title Selection',  // service.html title_page (31)
  CONST_FLOW_TITLE:                   'Troubleshoot Caution/Notice/Hint',  // service.html Troubleshoot_page(39)
  CONST_MANUAL_NAME_RM:               'Repair Manual', // top.html (26)
  CONST_MANUAL_NAME_NM:               'New Car Features', // top.html (26)
  CONST_MANUAL_NAME_EM:               'Electrical Wiring Diagram', // top.html (26)
  CONST_MANUAL_NAME_BM:               'Body Repair Manual', // top.html (26)
  CONST_MANUAL_NAME_OM:               'Owner\'s Manual', // top.html (26)
  CONST_MANUAL_NAME_WC:               'Welcab Manual', // top.html (26)
  CONST_MANUAL_NAME_HR:               'Hybrid Rescue Manual', // top.html (26)
  CONST_MANUAL_NAME_ER:               'Emergency Response Guide', // top.html (26)
  CONST_MANUAL_NAME_DM:               'Hybrid Vehicle Dismantling Manual', // top.html (26)
  CONST_SERVICE_TAB_NAME_SR:          'Results',  // service.html (7)
  CONST_SERVICE_TAB_NAME_RM:          'Repair Manual',  // service.html  (8)
  CONST_SERVICE_TAB_NAME_NM:          'New Car Features',  // service.html  (9)
  CONST_SERVICE_TAB_NAME_EM:          'Electrical Wiring Diagram',  // service.html  (10)
  CONST_SERVICE_TAB_NAME_BM:          'Body Repair Manual',  // service.html  (11)
  CONST_SERVICE_TAB_NAME_OM:          'Owner\'s Manual',  // service.html  (12)
  CONST_SERVICE_TAB_NAME_WC:          'Welcab Manual',  //  service.html  (reserved)
  CONST_SERVICE_TAB_NAME_HR:          'Hybrid Rescue Manual',  //  service.html  (reserved)
  CONST_SERVICE_TAB_NAME_ER:          'Emergency Response Guide',  // service.html  (13)
  CONST_SERVICE_TAB_NAME_DM:          'Hybrid Vehicle Dismantling Manual',  // service.html  (14)
  CONST_RESULT_KEYWORD:               'Results For "{keyword}"',  //  service.html (15)
  CONST_RESULT_KEYWORD_YOKOGUSHI:     'YOKOGUSHI Results For "{keyword}"',  //  service.html (15)
  CONST_RESULT_KEYWORD_LEN:           '28',  //  service.html (15)
  CONST_RESULT_KEYWORD_LEN_YOKOGUSHI: '18',  //  service.html (15)
  CONST_RESULT_NUMBER:                '{min}-{max} of {all}', //  service.html (21)
  CONST_RESULT_RM:                    'Repair Manual({result})', //  service.html (19)
  CONST_RESULT_NM:                    'New Car Features({result})', //  service.html (19)
  CONST_RESULT_EM:                    'Electrical Wiring Diagram({result})', //  service.html (21)
  CONST_RESULT_BM:                    'Body Repair Manual({result})', //  service.html (?)
  CONST_DEFKEYROWD:                   'Keyword',  //  top.html (21), service.html (4)
  CONST_KEYWORD_NM:                   'Keyword',  //  top.html (21), service.html (4)
  CONST_YOKOGUSHI_VCHECK_ERROR:       'What is "YOKOGUSHI"?', //  top.html (21), service.html (4)
  CONST_LANG_NAME_VIEW_AND_MANUAL:    'English',  //  top.html (17)

// START_MARK: Don't change below program code between START_MARK and END_MARK.
  MVWF0011AAE:                        'Techstream Boot has failed.\nConfirm that the following conditions have been met:\n- Techstream is installed.\n- Techstream can be booted independently.\nError Code: ',  // (reserved)
  MVWF0012AAE:                        'The operation failed because Techstream was processing.\nRetry after comfirming the Techstream information displayed on your screen.\nError Code: ',  // (reserved)
  MVWF0013AAE:                        'The operation failed because the following function was in operation.\nTerminate the following function and retry.\n  Utility, CARB OBD II, CUW, SUW\nError Code: ',  // (reserved)
  MVWF0014AAE:                        'The operation failed.\nIf Techstream is already booted, terminate Techstream and retry.\nError Code: ',  // (reserved)
  MVWF0015AAE:                        'The operation failed.\nError Code:',  // (reserved)
  MVWF0016AAE:                        'The operation failed.\nConfirm that the following condition has been met:\n- Techstream is installed.\nError Code: ',  // (reserved)
  MVWF0017AAE:                        'The operation failed because Techstream is running in another browser.\nClose other browser and retry.\nError Code: ',  // (reserved)
  MVWF0021AAI:                        'Preparing...',  // (reserved)
  MVWF0022AAI:                        'Preparation: OK',  // (reserved)
  MVWF0023AAI:                        'Techstream Booting...',  // (reserved)
  MVWF0024AAI:                        'Techstream Boot: OK',  // (reserved)
  MVWF0025AAI:                        'Function Booting...',  // (reserved)
  MVWF0034AAE:                        'Select search options.',  // (reserved)
  MVWF0038AAI:                        'Search Option cannot be opened because there are no \nmanuals that match your query.',  // (reserved)
  CONST_GTS_FACEBOX_TITLE:            'GTS Sending/Receiving...',  // (reserved)
  CONST_GLOBAL_INDEX:                 '\
<div id="index_search_contents">\
<div id="index_search_body">\
<div id="initial">\
<ul id="shift_initial">\
<li>\
<a href="javascript:void(0);" id="alphaLnk" tabIndex="1003">Alphanumeric</a>\
</li>\
</ul>\
<div id="alphanum_list" class="initial_list invisible">\
<div class="alphabet">\
<a href="javascript:void(0);" class="initial" tabIndex="1004">A</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">B</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">C</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">D</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">E</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">F</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">G</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">H</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">I</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">J</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">K</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">L</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">M</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">N</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">O</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">P</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">Q</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">R</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">S</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">T</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">U</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">V</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">W</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">X</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">Y</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">Z</a>\
</div>\
<div class="number">\
<a href="javascript:void(0);" class="initial" tabIndex="1004">1</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">2</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">3</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">4</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">5</a>\
<br>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">6</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">7</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">8</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">9</a>\
<a href="javascript:void(0);" class="initial" tabIndex="1004">0</a>\
</div>\
</div>\
</div>\
<div id="index_area">\
<div class="list_head">\
<div class="list_title">Index List</div>\
<div class="list_pager">\
<ul class="list_pager">\
<li class="invisible"><a id="firstPageIcn" tabIndex="1005" href="javascript:void(0);"><img src="./img/png/page_first.png" width="32" height="22" alt="<<" title="<<"></a></li>\
<li><a id="firstPageIcn_g" tabIndex="1005" href="javascript:void(0)"><img src="./img/png/page_first_g.png" width="32" height="22" alt="<<" title="<<"></a></li>\
<li class="invisible"><a id="prevPageIcn" tabIndex="1006" href="javascript:void(0);"><img src="./img/png/page_prev.png" width="32" height="22" alt="<" title="<"></a></li>\
<li><a id="prevPageIcn_g" tabIndex="1006" href="javascript:void(0)"><img src="./img/png/page_prev_g.png" width="32" height="22" alt="<" title="<"></a></li>\
<li class="invisible"><a id="nextPageIcn" tabIndex="1007" href="javascript:void(0);"><img src="./img/png/page_next.png" width="32" height="22" alt=">" title=">"></a></li>\
<li><a id="nextPageIcn_g" tabIndex="1007" href="javascript:void(0)"><img src="./img/png/page_next_g.png" width="32" height="22" alt=">" title=">"></a></li>\
<li class="invisible"><a id="lastPageIcn" tabIndex="1008" href="javascript:void(0);"><img src="./img/png/page_last.png" width="32" height="22" alt=">>" title=">>"></a></li>\
<li><a id="lastPageIcn_g" tabIndex="1008" href="javascript:void(0)"><img src="./img/png/page_last_g.png" width="32" height="22" alt=">>" title=">>"></a></li>\
</ul>\
</div>\
<div class="list_count" id="index_list_count"></div>\
</div>\
<div id="index_list"></div>\
</div>\
</div>\
<div id="index_search_foot">\
<input class="button_style" type="button" id="okBtn" tabIndex="1010" value="OK">\
<input class="button_style" type="button" id="cancelBtn" tabIndex="1011" value="Cancel">\
</div>\
</div>',
  CONST_INDEX_NAME:                   'Index',  // (reserved)
  CONST_INDEX_COUNT:                  '{1}-{2} of {0}',  // (reserved)
  CONST_INDEX_EMPTY_COUNT:            '{0}',  // (reserved)
  CONST_INDEX_PAGER_FIRST:            'First',  // (reserved)
  CONST_INDEX_PAGER_PREV:             'Prev',  // (reserved)
  CONST_INDEX_PAGER_NEXT:             'Next',  // (reserved)
  CONST_INDEX_PAGER_LAST:             'Last',  // (reserved)
  CONST_SEARCH_OPTION_TITLE:          'Search Option',  // (reserved)
  CONST_SEARCH_OPTION_REPAIR:         'Repair Manual',  // (reserved)
  CONST_SEARCH_OPTION_ALL:            'All',  // (reserved)
  CONST_SEARCH_OPTION_LAYOUT:         'Parts Location/Components',  // (reserved)
  CONST_SEARCH_OPTION_TROUBLE:        'Troubleshoot (DTC Chart/Problem Symptoms)',  // (reserved)
  CONST_SEARCH_OPTION_REMOVE:         'Removal/Installation/Disassembly/Replacement/Adjustment',  // (reserved)
  CONST_SEARCH_OPTION_MAINTENANCE:    'Inspection/ON-Vehicle Inspection',  // (reserved)
  CONST_SEARCH_OPTION_CUSTOM:         'Customize Parameters',  // (reserved)
  CONST_SEARCH_OPTION_PREPARED:       'Preparation',  // (reserved)
  CONST_SEARCH_OPTION_OTHER:          'Others',  // (reserved)
  CONST_SEARCH_OPTION_NCF:            'New Car Features',  // (reserved)
  CONST_SEARCH_OPTION_EWD:            'Electrical Wiring Diagram',  // (reserved)
  CONST_SEARCH_OPTION_RESET:          'Reset',  // (reserved)
  CONST_SEARCH_OPTION_ENTRY:          'OK',  // (reserved)
  CONST_SEARCH_OPTION_CLOSE:          'Cancel',  // (reserved)
  CONST_SEARCH_OPTION_RETURN_TRUE:    'Yes',  // (reserved)
  CONST_SEARCH_OPTION_RETURN_FALSE:   'No'  // (reserved)
};

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
