import axios from 'axios';

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,  // 依據不同環境設置 baseURL，最終請求時的URL 為baseURL + 發送請求時寫的URL
    timeout: 8000,  //請求超時
    // headers: {'X-Custom-Header': 'foobar'}
  });


  /**
 * 請求攔截
 * Add a request interceptor
 */


  /**
 * 響應攔截
 * Add a response interceptor
 */

  export default request //  導出自定義創建 axios