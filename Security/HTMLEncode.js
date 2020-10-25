// https://juejin.im/post/6844903684900388871#heading-4
const HtmlEncode = (str) => {
  // 设置 16 进制编码，方便拼接
  const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  // 赋值需要转换的HTML
  const preescape = str;
  let escaped = "";
  for (let i = 0; i < preescape.length; i++) {
      // 获取每个位置上的字符
      let p = preescape.charAt(i);
      // 重新编码组装
      escaped = escaped + escapeCharx(p);
  }

  return escaped;
  // HTMLEncode 主要函数
  // original 为每次循环出来的字符
  function escapeCharx(original) {
      // 默认查到这个字符编码
      let found = true;
      // charCodeAt 获取 16 进制字符编码
      const thechar = original.charCodeAt(0);
      switch (thechar) {
          case 10: return "<br/>"; break; // 新的一行
          case 32: return "&nbsp;"; break; // space
          case 34: return "&quot;"; break; // "
          case 38: return "&amp;"; break; // &
          case 39: return "&#x27;"; break; // '
          case 47: return "&#x2F;"; break; // /
          case 60: return "&lt;"; break; // <
          case 62: return "&gt;"; break; // >
          case 198: return "&AElig;"; break; // Æ
          case 193: return "&Aacute;"; break; // Á
          case 194: return "&Acirc;"; break; // Â
          case 192: return "&Agrave;"; break; // À
          case 197: return "&Aring;"; break; // Å
          case 195: return "&Atilde;"; break; // Ã
          case 196: return "&Auml;"; break; // Ä
          case 199: return "&Ccedil;"; break; // Ç
          case 208: return "&ETH;"; break; // Ð
          case 201: return "&Eacute;"; break; // É
          case 202: return "&Ecirc;"; break;
          case 200: return "&Egrave;"; break;
          case 203: return "&Euml;"; break;
          case 205: return "&Iacute;"; break;
          case 206: return "&Icirc;"; break;
          case 204: return "&Igrave;"; break;
          case 207: return "&Iuml;"; break;
          case 209: return "&Ntilde;"; break;
          case 211: return "&Oacute;"; break;
          case 212: return "&Ocirc;"; break;
          case 210: return "&Ograve;"; break;
          case 216: return "&Oslash;"; break;
          case 213: return "&Otilde;"; break;
          case 214: return "&Ouml;"; break;
          case 222: return "&THORN;"; break;
          case 218: return "&Uacute;"; break;
          case 219: return "&Ucirc;"; break;
          case 217: return "&Ugrave;"; break;
          case 220: return "&Uuml;"; break;
          case 221: return "&Yacute;"; break;
          case 225: return "&aacute;"; break;
          case 226: return "&acirc;"; break;
          case 230: return "&aelig;"; break;
          case 224: return "&agrave;"; break;
          case 229: return "&aring;"; break;
          case 227: return "&atilde;"; break;
          case 228: return "&auml;"; break;
          case 231: return "&ccedil;"; break;
          case 233: return "&eacute;"; break;
          case 234: return "&ecirc;"; break;
          case 232: return "&egrave;"; break;
          case 240: return "&eth;"; break;
          case 235: return "&euml;"; break;
          case 237: return "&iacute;"; break;
          case 238: return "&icirc;"; break;
          case 236: return "&igrave;"; break;
          case 239: return "&iuml;"; break;
          case 241: return "&ntilde;"; break;
          case 243: return "&oacute;"; break;
          case 244: return "&ocirc;"; break;
          case 242: return "&ograve;"; break;
          case 248: return "&oslash;"; break;
          case 245: return "&otilde;"; break;
          case 246: return "&ouml;"; break;
          case 223: return "&szlig;"; break;
          case 254: return "&thorn;"; break;
          case 250: return "&uacute;"; break;
          case 251: return "&ucirc;"; break;
          case 249: return "&ugrave;"; break;
          case 252: return "&uuml;"; break;
          case 253: return "&yacute;"; break;
          case 255: return "&yuml;"; break;
          case 162: return "&cent;"; break;
          case '\r': break;
          default: found = false; break;
      }
      if (!found) {
          // 如果和上面内容不匹配且字符编码大于127的话，用unicode(非常严格模式)
          if (thechar > 127) {
              let c = thechar;
              let a4 = c % 16;
              c = Math.floor(c / 16);
              let a3 = c % 16;
              c = Math.floor(c / 16);
              let a2 = c % 16;
              c = Math.floor(c / 16);
              let a1 = c % 16;
              return "&#x" + hex[a1] + hex[a2] + hex[a3] + hex[a4] + ";";
          } else {
              return original;
          }
      }
  }
}
