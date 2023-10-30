/**
 * Including all interface request functions in the application
 */

// ajax('http://local.fr.com/login',{username:"admin",password:"admin123"},"POST")

import ajax from "./ajax";

// Timetrack service

const Host = 'http://127.0.0.1:55555/api'/**
 * @param {*} method 
 * @returns 
 */
export const ApiGetBooks = (data, method) => ajax(Host + "/get_book_list", data, method, false);
export const ApiGetHerbs = (data, method) => ajax(Host + "/get_herbs_list", data, method, false);
export const ApiGetHerbsDetail = (data, method) => ajax(Host + "/get_herbs_detail", data, method, false);
export const ApiSearchPrescription = (data, method) => ajax(Host + "/search_prescription", data, method, false);


// Global Core Setting List
export default {
    // 定义日期显示格式
    getHerbsList:Host + "/get_herbs_list" 
}
