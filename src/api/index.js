/**
 * Including all interface request functions in the application
 */

// ajax('http://local.fr.com/login',{username:"admin",password:"admin123"},"POST")

import ajax from "./ajax";

// Timetrack service

const Host = 'https://lbkz.wqzbxh.site/'/**
 * @param {*} method 
 * @returns 
 */
export const ApiGetBooks = (data, method) =>
  ajax(Host + "admin/books/getBooklist", data, method, false);
