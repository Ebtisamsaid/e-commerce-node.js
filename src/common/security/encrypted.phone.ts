import * as CryptoJS from "crypto-js";

export function encrypted( plainText:string, secret_key = process.env.secret_key ):string{
   return  CryptoJS.AES.encrypt(plainText,secret_key as string).toString()
}
export function dencrypted( encrypted :string, secret_key = process.env.secret_key ):string{
    return  CryptoJS.AES.decrypt(encrypted,secret_key as string).toString(CryptoJS.enc.Utf8)
 }
