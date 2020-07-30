/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-07-19 21:19:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-07-20 09:18:45
 */ 
//CryptoJS 加密类
import CryptoJS from 'crypto-js'            

//CryptoJS 密钥和偏移量
const key = CryptoJS.enc.Latin1.parse("SfDalao1234888DC");
const iv = CryptoJS.enc.Latin1.parse('SfDalao1234888DC');

/**
 * @author xxxx
 * @description 保存cookie
 * @param {String} name 需要存储cookie的key
 * @param {String} value 需要存储cookie的value
 * @param {Number} timer 默认存储多少天
 */
function setCookie(name, value, timer = 1) {
    var Days = timer; //默认将被保存 1 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * @author xxxx
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2])
    } else {
        return null
    }
}

/**
 * @author xxxx
 * @description 删除cookie
 * @param {String} name 需要删除cookie的key
 */
function clearCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * @name: Encrypt
 * @test: test font
 * @msg:  CryptoJS 加密
 * @param {type} 需要加密的参数
 * @return: 
 */
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

/**
 * @name: Decrypt
 * @test: test font
 * @msg:  CryptoJS 解密
 * @param {type} 需要解密的参数
 * @return: 
 */
function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}


export default {
    setCookie,
    getCookie,
    clearCookie,
    Encrypt,
    Decrypt
}