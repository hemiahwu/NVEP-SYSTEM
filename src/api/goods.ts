import request from "../utils/request";
// 查询所有分类名
export const handleCategories = () => {
  return request({
    url: "/goods/categories",
    method: "get",
  });
};

export const handleCategoryAdd = (data: any) => {
  return request({
    url: "/goods/addcategory",
    method: "post",
    data,
  });
};

export const handleGoodsList = (params: any) => {
  return request({
    url: "/goods/list",
    method: "get",
    params,
  });
};

export const handleGoodsEdit = (data: any) => {
  return request({
    url: "/goods/edit",
    method: "post",
    data,
  });
};

export const handleGoodsDelete = (params: any) => {
  return request({
    url: "/goods/delete",
    method: "get",
    params,
  });
};

export const handleCategoryDelete = (params: any) => {
  return request({
    url: "/goods/deletecategory",
    method: "get",
    params,
  });
};

export const handleGoodsAdd = (data: any) => {
  return request({
    url: "/goods/add",
    method: "post",
    data,
  });
};

export const handleGoodsSales = () => {
  return request({
    url: "/goods/sales",
    method: "get",
  });
};
