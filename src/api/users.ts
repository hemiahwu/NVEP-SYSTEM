import { AccountFormType } from "../types";
import request from "../utils/request";

export const handleLogin = (data: AccountFormType) => {
  return request({
    url: "/users/login",
    method: "post",
    data,
  });
};

export const handleAccountAdd = (data: AccountFormType) => {
  return request({
    url: "/users/add",
    method: "post",
    data,
  });
};

export const handleAccountList = (params: any) => {
  return request({
    url: "/users/list",
    method: "get",
    params,
  });
};

export const handleAccountDelete = (params: any) => {
  return request({
    url: "/users/delete",
    method: "get",
    params,
  });
};

export const handleAccountBatchDelete = (data: any) => {
  return request({
    url: "/users/batchdelete",
    method: "post",
    data,
  });
};

export const handleAccountEdit = (data: any) => {
  return request({
    url: "/users/edit",
    method: "post",
    data,
  });
};

export const handlePasswordValidate = (params: any) => {
  return request({
    url: "/users/checkoldpwd",
    method: "get",
    params,
  });
};

export const handlePasswordEdit = (data: any) => {
  return request({
    url: "/users/editpwd",
    method: "post",
    data,
  });
};

export const handlePersonInfo = () => {
  return request({
    url: "/users/info",
    method: "get",
  });
};

export const handleAvatarEdit = (params: any) => {
  return request({
    url: "/users/avataredit",
    method: "get",
    params,
  });
};
