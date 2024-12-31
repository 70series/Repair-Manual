﻿<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="html" encoding="UTF-8" /><xsl:template match="/"><xsl:apply-templates select="PartsRef" /></xsl:template><xsl:template match="PartsRef"><xsl:apply-templates select="ID"><xsl:with-param name="objId" select="@objId" /></xsl:apply-templates></xsl:template><xsl:template match="ID"><xsl:param name="objId"/><xsl:call-template name="Table"><xsl:with-param name="objId" select="$objId" /></xsl:call-template></xsl:template><xsl:template name="Table"><xsl:param name="objId"/><xsl:if test=". != '0'"><hr/><br/></xsl:if><table class="p_table1"><col width="150"/><tr><td class="gray3_dark_left">Name</td><td class="gray4_" colspan="4"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_name_<xsl:value-of select="@Pininfo"/></xsl:attribute></td></tr><tr><td class="gray3_dark_left">Code</td><td class="gray4_"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_id_<xsl:value-of select="@Pininfo"/></xsl:attribute></td><td class="gray3_dark_left">Part Number</td><td class="gray4_1"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_no_<xsl:value-of select="@Pininfo"/></xsl:attribute></td><td class="gray5_"><input disabled="disabled" class="gray5_1" type="submit"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_namecode_<xsl:value-of select="@Pininfo"/></xsl:attribute></input></td></tr><tr><td class="gray3_dark_left">Spec</td><td class="gray4_"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_spec_<xsl:value-of select="@Pininfo"/></xsl:attribute></td><td class="gray3_dark_left">Color</td><td class="gray4_" colspan="2"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_color_<xsl:value-of select="@Pininfo"/></xsl:attribute></td></tr></table><table><tr><td><span class="text" style="display:none;"><xsl:attribute name="id">repair_wh_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>E1L('<xsl:value-of select="@Pininfo"/>', 'en')</xsl:attribute><xsl:attribute name="onMouseOver"><xsl:value-of select="$objId"/>EeO(true)</xsl:attribute><xsl:attribute name="onMouseOut"><xsl:value-of select="$objId"/>EeS()</xsl:attribute></span><span class="info_close"><xsl:attribute name="id">repair_info<xsl:value-of select="@Pininfo"/></xsl:attribute></span></td></tr></table><input type="hidden"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_type_<xsl:value-of select="@Pininfo"/></xsl:attribute></input><input type="hidden"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_code_<xsl:value-of select="@Pininfo"/></xsl:attribute></input><input type="hidden"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_subcode_<xsl:value-of select="@Pininfo"/></xsl:attribute></input><table style="margin: 5px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>tblFig_<xsl:value-of select="@Pininfo"/></xsl:attribute><tr style="page-break-inside: avoid;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>Fig_View_tr_<xsl:value-of select="@Pininfo"/></xsl:attribute><td align="center" style="padding-top: 5px;padding-bottom: 5px; padding-left: 10px;padding-right: 10px;background:#ECF0F2;" ><div style="width:500px; height:280px; overflow: auto; background:#FFFFFF;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>fig_view_<xsl:value-of select="@Pininfo"/></xsl:attribute><input type="hidden"><xsl:attribute name="id"><xsl:value-of select="$objId"/>pin_info_<xsl:value-of select="@Pininfo"/></xsl:attribute></input></div></td><td valign="top"><div style="visibility:visivle;max-width:800px;position: relative;width:380px; height:280px;padding-top: 5px;padding-bottom: 5px; padding-left: 5px;padding-right: 5px;background:#ECF0F2;overflow: auto;"><div style="visibility:visivle;position:absolute;max-width:450px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>divcon_<xsl:value-of select="@Pininfo"/></xsl:attribute><p style="visibility:hidden;width:0px;height:0px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>refs_<xsl:value-of select="@Pininfo"/></xsl:attribute>Colors differ due to the specifications. (Refer to the circuit diagram link)</p><p style="visibility:hidden;width:0px;height:0px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>refssex_<xsl:value-of select="@Pininfo"/></xsl:attribute>Colors differ due to being male/female (Refer to the circuit diagram link)</p><p style="visibility:hidden;width:0px;height:0px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>nouse_<xsl:value-of select="@Pininfo"/></xsl:attribute>Unused Pin</p><p style="visibility:hidden;width:0px;height:0px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>noinfo_<xsl:value-of select="@Pininfo"/></xsl:attribute>No wire color information</p><p style="visibility:hidden;width:0px;height:0px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>shielded_<xsl:value-of select="@Pininfo"/></xsl:attribute>Shielded</p><table style="text-align: center;" border="1" cellspacing="0" cellpadding="0" bordercolor="#FFFFFF"><tbody><tr><th class="gray6_dark_left">Terminal No.</th><th  colspan="3"  class="gray6_dark_center">Wire color</th><th class="gray6_dark_right">Remarks</th></tr><xsl:for-each select="PININFO"><tr><xsl:attribute name="id"><xsl:value-of select="$objId"/>trpin_<xsl:value-of select="@no"/>_<xsl:value-of select="@color"/></xsl:attribute><td class="gray6_" rowspan="1"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_no_<xsl:value-of select="@no"/></xsl:attribute><xsl:value-of select="@no"/></td><xsl:choose><xsl:when test="@color='G'"><td  colspan="3" class="gray6_G"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='Y'"><td  colspan="3" class="gray6_Y"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='R'"><td  colspan="3" class="gray6_R"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='L'"><td  colspan="3" class="gray6_L"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='B'"><td  colspan="3" class="gray6_B"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='P'"><td  colspan="3" class="gray6_P"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='V'"><td  colspan="3" class="gray6_V"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='BE'"><td  colspan="3" class="gray6_BE"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='BR'"><td  colspan="3" class="gray6_BR"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='GR'"><td  colspan="3" class="gray6_GR"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='O'"><td  colspan="3" class="gray6_O"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='SB'"><td  colspan="3" class="gray6_SB"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='W'"><td  colspan="3" class="gray6_W"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='LG'"><td  colspan="3" class="gray6_LG"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="@color='DG'"><td  colspan="3" class="gray6_DG"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:when><xsl:when test="contains(@color, 'Shielded')"><td  colspan="3" class="gray6_NULL"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute>Shielded</td></xsl:when><xsl:when test="contains(@color, '-')"><td class="{concat('gray6_',normalize-space(substring-before(@color, '-')))}"><xsl:value-of select="normalize-space(substring-before(@color, '-'))"/></td><td class="{concat('gray6_',normalize-space(substring-after(@color, '-')))}">-</td><td class="{concat('gray6_',normalize-space(substring-before(@color, '-')))}"><xsl:value-of select="normalize-space(substring-after(@color, '-'))"/></td></xsl:when><xsl:otherwise><td  colspan="3" class="gray6_NULL"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_color_<xsl:value-of select="."/></xsl:attribute><xsl:value-of select="@color"/></td></xsl:otherwise></xsl:choose><td class="gray6_"><xsl:attribute name="id"><xsl:value-of select="pin"/>parts_pin_spec_<xsl:value-of select="."/></xsl:attribute><xsl:if test="@count = 0 ">Unused Pin</xsl:if><xsl:if test="@count &lt; 2 and not(@color ='') and not(@color ='#')">-</xsl:if><xsl:if test="@color ='' and not(@count = 0 )">No wire color information</xsl:if><xsl:if test="@color ='#' and not(@count = 0 )">No wire color information</xsl:if><xsl:if test="@count &gt; 1 and @mcount = 0 and @fcount = 0">Colors differ due to the specifications. (Refer to the circuit diagram link)</xsl:if><xsl:if test="@count &gt; 1 and @mcount = 1 and @fcount = 1">Colors differ due to being male/female (Refer to the circuit diagram link)</xsl:if><xsl:if test="@mcount &gt; 1 or @fcount &gt; 1">Colors differ due to the specifications. (Refer to the circuit diagram link)</xsl:if></td></tr></xsl:for-each></tbody></table></div></div><xsl:apply-templates select="PinInfo"/></td></tr><tr style="page-break-inside: avoid;"><td valign="top" style="width:200px;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>Link_Select_td_<xsl:value-of select="@Pininfo"/></xsl:attribute><table style="text-align: left;width:100%;" cellspacing="0" cellpadding="0"><xsl:attribute name="id"><xsl:value-of select="$objId"/>Pin_Select_tb_<xsl:value-of select="@Pininfo"/></xsl:attribute><tbody><tr><td style="padding:10px;"><input type="radio"><xsl:attribute name="id"><xsl:value-of select="$objId"/>optAllPin_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="name"><xsl:value-of select="$objId"/>pin_<xsl:value-of select="@Pininfo"/></xsl:attribute></input><span class="terminal">All terminals</span><br/><input type="radio"><xsl:attribute name="id"><xsl:value-of select="$objId"/>optSelectedPin_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="name"><xsl:value-of select="$objId"/>pin_<xsl:value-of select="@Pininfo"/></xsl:attribute></input><span class="terminal">Select terminal</span><br/><input type="button" value="show" class="font_en"><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>Eeb(<xsl:value-of select="@Pininfo"/>)</xsl:attribute></input></td><td style="padding:10px;display:inline-flex;width:150px;float:right;"><img src="icon/reset.png" style="cursor: pointer;" title="Reset"><xsl:attribute name="id">reset_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>E5P('<xsl:value-of select="@Pininfo"/>')</xsl:attribute></img><img src="icon/vbar.png" /><img src="icon/minus.png" style="cursor: pointer;" title="Zoom Out"><xsl:attribute name="id">item_zOut_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>E5R('<xsl:value-of select="@Pininfo"/>')</xsl:attribute></img><img src="icon/zoombar_04.png" title="Zoom Level"><xsl:attribute name="id">item_zoombar<xsl:value-of select="@Pininfo"/></xsl:attribute></img><img src="icon/plus.png" style="cursor: pointer;" title="Zoom In"><xsl:attribute name="id">item_zIn_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>E5Q('<xsl:value-of select="@Pininfo"/>')</xsl:attribute></img><img src="icon/vbar.png" /></td></tr></tbody></table><table><xsl:attribute name="id"><xsl:value-of select="$objId"/>Link_Select_tb_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="style"></xsl:attribute><tr><td colspan="2" style="vertical-align:top">Location</td><td width="50"></td><td><xsl:attribute name="id"><xsl:value-of select="$objId"/>to_wiringrouting_<xsl:value-of select="@Pininfo"/></xsl:attribute></td></tr><tr><td colspan="2" style="vertical-align:top">System</td><td width="50"></td><td><xsl:attribute name="id"><xsl:value-of select="$objId"/>to_systemcircuit_<xsl:value-of select="@Pininfo"/></xsl:attribute></td></tr></table></td><td style="padding-top: 2px;padding-bottom: 5px;padding-left: 5px;padding-right: 5px;" valign="top"><div style="visibility:visivle;max-width:450px;position: relative;width:340px;" ><xsl:attribute name="id"><xsl:value-of select="$objId"/>fig-pos_view_<xsl:value-of select="@Pininfo"/></xsl:attribute><div style="visibility: visible;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_detail_<xsl:value-of select="@Pininfo"/></xsl:attribute><div class="con-titleBar"><div class="con-text" style="float:left;width:60px;"><div id="E5400.code"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_pngid_<xsl:value-of select="@Pininfo"/></xsl:attribute></div></div><div><img class="playButton" src="icon/reset.png" title="Reset"><xsl:attribute name="id">reset_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>E0OI('<xsl:value-of select="@Pininfo"/>')</xsl:attribute></img><img class="playButton" src="icon/Shrink.png" title="Shrink"><xsl:attribute name="id">png_zIn_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>E0OH('<xsl:value-of select="@Pininfo"/>')</xsl:attribute></img><img class="playButton" src="icon/Enlarge.png" title="Enlarge"><xsl:attribute name="id">png_zOut_<xsl:value-of select="@Pininfo"/></xsl:attribute><xsl:attribute name="onClick"><xsl:value-of select="$objId"/>E0OD('<xsl:value-of select="@Pininfo"/>')</xsl:attribute></img></div></div><div style="position:relative;display:table;border: solid 1px #333333;width: 100%;"><div style="display:table-row;width:100%;height:100%;"><div id="E5400.name" class="con-nameCell"><xsl:attribute name="id"><xsl:value-of select="$objId"/>parts_pngname_<xsl:value-of select="@Pininfo"/></xsl:attribute></div></div></div><div class="con-fig" style="width:350px;height:240px;overflow: auto;"><div style="width:340px;background:#FFFFFF;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>png_view_<xsl:value-of select="@Pininfo"/></xsl:attribute><input type="hidden"><xsl:attribute name="id"><xsl:value-of select="$objId"/>pin_info_<xsl:value-of select="@Pininfo"/></xsl:attribute></input><input type="hidden" zoomindex="0"><xsl:attribute name="id"><xsl:value-of select="$objId"/>zoom_info_<xsl:value-of select="@Pininfo"/></xsl:attribute></input></div></div></div></div></td></tr></table><div class="text" style="display:none;"><xsl:attribute name="id"><xsl:value-of select="$objId"/>single_<xsl:value-of select="@Pininfo"/></xsl:attribute></div></xsl:template></xsl:stylesheet>