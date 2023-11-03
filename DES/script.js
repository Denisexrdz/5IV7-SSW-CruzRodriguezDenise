import CryptoJS from 'crypto-js';

const textToEncrypt = 'Texto secreto a cifrar';

const key = CryptoJS.enc.Utf8.parse('1234567890123456'); 
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); 

const encrypted = CryptoJS.AES.encrypt(textToEncrypt, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
const ciphertext = encrypted.toString();

console.log('Texto cifrado:', ciphertext);
