// import * as Forge from 'node-forge';
// import * as CryptoJS from 'crypto-js';
// import { constant } from './constants';
// const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
// const Base64 = {
//     btoa: (input: string = '') => {
//         let str = input;
//         let output = '';

//         for (let block = 0, charCode, i = 0, map = chars;
//             str.charAt(i | 0) || (map = '=', i % 1);
//             output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

//             charCode = str.charCodeAt(i += 3 / 4);

//             if (charCode > 0xFF) {
//                 throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
//             }

//             block = block << 8 | charCode;
//         }

//         return output;
//     },

//     atob: (input: string = '') => {
//         let str = input.replace(/=+$/, '');
//         let output = '';

//         if (str.length % 4 == 1) {
//             throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
//         }
//         for (let bc = 0, bs = 0, buffer, i = 0;
//             buffer = str.charAt(i++);

//             ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
//                 bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
//         ) {
//             buffer = chars.indexOf(buffer);
//         }

//         return output;
//     }
// };
// export default class RsaHelperService {
//     newGuid() {
//         function s4() {
//             return Math.floor((1 + Math.random()) * 0x10000)
//                 .toString(16)
//                 .substring(1);
//         }

//         return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
//     }
//     encryptWithPublicKey(valueToEncrypt: string): string {
//         //debugger;
//         const rsa = Forge.pki.publicKeyFromPem(constant.publicKey);
//         let base64encoded = Base64.btoa(unescape(encodeURIComponent(valueToEncrypt)));// + "|" + utility.newGuid();
//         let splitData = base64encoded.match(/.{1,50}/g);
//         let enData = [];
//         splitData?.forEach(item => {
//             let enc = rsa.encrypt(item);
//             enData.push(Base64.btoa(enc));
//         });

//         return enData.join("|") + "|" + Base64.btoa(rsa.encrypt(this.newGuid()));
//     }

//     decryptData(payload) {
//         if (payload) {
//             var data = CryptoJS.enc.Base64.parse(payload);
//             var decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.lib.WordArray.create(data.words.slice(8)) }, CryptoJS.lib.WordArray.create(data.words.slice(0, 4)), { iv: CryptoJS.lib.WordArray.create(data.words.slice(4, 8)) });
//             return decrypted.toString(CryptoJS.enc.Utf8);
//         }
//     }
// }
