import request from "../utils/request";

export const handleOrderList = (params: any) => {
  return request({
    url: "/order/list",
    method: "get",
    params,
  });
};

export const handleOrderEdit = (data: any) => {
  return request({
    url: "/order/edit",
    method: "post",
    data,
  });
};

export const handleOrderTotal = () => {
  return request({
    url: "/order/edit",
    method: "get",
  });
};

// 获取首页统计数据
export const getTotalData = () => {
  return request({
    url: "/order/totaldata",
    method: "get",
  });
};

// 获取订单统计数据
export const getOrderTotal = (params: any) => {
  return request({
    url: "/order/ordertotal",
    method: "get",
    params,
  });
};
