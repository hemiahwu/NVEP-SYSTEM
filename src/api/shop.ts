import request from "../utils/request";

export const handleShopInfo = () => {
  return request({
    url: "/shop/info",
    method: "get",
  });
};

export const handleShopEdit = (data: any) => {
  return request({
    url: "/shop/edit",
    method: "post",
    data,
  });
};
