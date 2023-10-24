/**
 * 发送异步请求的函数ajax
 * 
 */
import axios from "axios";
export default function ajax(url, data = {}, type = 'GET', isContainsFiles = false) {
   const token =  'A'
   return new Promise((resolve, reject) => {
      let promise;
      //发送GET请求
      //send GET request
      if (type === 'GET') {
         let config = {
            headers: {
               'Authorization': token,
            }
         }
         promise = axios.get(url, {
            params: data, ...config
         });
         //发送POST请求
         //Send POST request
      } else if (type === 'POST') {
         // 默认application/json方式提交
         // Submit by default application/json
         let config = {
            headers: {
               'Authorization': token,
               'Content-Type': 'application/json'
            }
         };
         //  文件提交
         // file submission
         if (isContainsFiles === true) {
            config = {
               headers: {
                  'Authorization': token,
                  'content-type': 'multipart/form-data'
               }
            };
         }
         promise = axios.post(url, data, config)
      } else if (type === 'PUT') {
         // 默认application/json方式提交
         // Submit by default application/json
         let config = {
            headers: {
               'Authorization': token,
               'Content-Type': 'application/json'
            }
         };
         //  文件提交
         // file submission
         if (isContainsFiles === true) {
            config = {
               headers: {
                  'Authorization': token,
                  'content-type': 'multipart/form-data'
               }
            };
         }
         promise = axios.put(url, data, config)
      } else if (type === 'DELETE') {
         // Submit by default application/json
         let config = {
            headers: {
               'Authorization': token,
               'Content-Type': 'application/json'
            }
         };
         // file submission
         if (isContainsFiles === true) {
            config = {
               headers: {
                  'Authorization': token,
                  'content-type': 'multipart/form-data'
               }
            };
         }
         promise = axios.delete(url, { data, ...config })
      }
      promise.then(response => {
         if (response.data.code === 401) {
            window.location.href="/login"
         }
         resolve(response);
      }).catch(error => {
         resolve(error);
      })
   })

}
