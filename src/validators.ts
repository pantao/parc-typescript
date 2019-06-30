import { PRC_CITIZEN_ID } from "./patterns";
import { getPRCCitizenIDCheckCode } from "./utils";
export type ValidatorFunction = (value: any, ...options: any) => boolean;

export const prcCitizenID: ValidatorFunction = (value: string) => {
  const checkCode = value.substring(17).toUpperCase();
  if (PRC_CITIZEN_ID.test(value)) {
    return getPRCCitizenIDCheckCode(value.substring(0, 17)) === `${checkCode}`;
  }
  return false;
};
