
//用户名正则，4到16位（字母，数字，下划线，减号）
var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;

//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
// 手机号正则
var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;

export default{
    uPattern,
    pPattern,
    mPattern,
}

  // 正则验证
