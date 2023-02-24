// 验证账号
export const checkAccount = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入账号"));
  } else if (!/^[a-zA-Z0-9\u4E00-\u9FA5]{3,20}$/.test(value)) {
    callback(new Error("字母/数字 6 ~ 20 位"));
  } else {
    callback();
  }
};

// 验证密码
export const checkPassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入密码"));
  } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
    callback(new Error("字母/数字 6 ~ 18 位"));
  } else {
    callback();
  }
};
