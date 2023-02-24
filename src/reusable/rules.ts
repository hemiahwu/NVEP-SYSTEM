import { Rules } from "../types/index";
import { checkAccount, checkPassword } from "../utils/validator";

const baseRules = {
  required: true,
  trigger: "blur",
};

const accountRules = { ...baseRules, validator: checkAccount };

const passwordRules = { ...baseRules, validator: checkPassword };

const userGroupRules = {
  ...baseRules,
  message: "请选择用户组",
  trigger: "change",
};

export const rules = reactive<Rules>({
  account: accountRules,
  password: passwordRules,
  userGroup: userGroupRules,
});
