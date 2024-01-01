/* 正则表达式 */

// 邮箱
export const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

// 手机
export const regPhone = /^[1][345789]\d{3,9}$/;

// 身份证
export const regIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// 工龄「支持 1 位小数」
export const regWorkNum = /^[0-9]+([.][0-9]{1,})?$/;

// 姓名「汉字或英文名字」
export const regUserName = /(^[\sa-zA-Z\u4e00-\u9fa5]+$)/;

// 密码「必须包含字母和数字，或英文符号」
export const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[!-/:-@[-`{-\x7F\w]{6,32}$/;

// 表情包
export const regEmoj = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

// 英文特殊字符
export const regChartEn = /(?=.*\d)[!-/:-@[-`{-\x7F\w]{6,32}$/;
