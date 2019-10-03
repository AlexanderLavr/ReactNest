export enum LoginProc{
    DO_LOGIN = 'DO_LOGIN',
    ERROR_VALIDE = 'ERROR_VALIDE',
    LOGIN_SUCCESS_USER = 'LOGIN_SUCCESS_USER',
    LOGIN_SUCCESS_ADMIN = 'LOGIN_SUCCESS_ADMIN',
    SUCCESS_REGISTER_TEXT = 'SUCCESS_REGISTER_TEXT',
    LOGIN_ERROR = 'LOGIN_ERROR',
}

export function doLogin(currentObj:{}, history:{}){
    return {type: LoginProc.DO_LOGIN, obj: currentObj, history};
}