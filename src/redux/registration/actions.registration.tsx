export enum RPr{
    DO_REGISTER = 'DO_REGISTER',
    ADD_USER = 'ADD_USER',
    SUCCESS_REGISTRATION = 'SUCCESS_REGISTRATION',
    USER_EXSIST = 'USER_EXSIST',
    ERROR_REGISTRATION = 'ERROR_REGISTRATION',
    ERROR_VALIDE_REGISTRATION = 'ERROR_VALIDE_REGISTRATION'
}


export function doRegister(currentObj:{}, history:{}){
    return {type: RPr.DO_REGISTER, obj: currentObj, history};
}