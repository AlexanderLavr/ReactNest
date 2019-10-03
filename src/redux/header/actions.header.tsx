export enum HeaderProc{
    DO_HEADER = 'DO_HEADER',
    HEADER_LOCAL_STORE = 'HEADER_LOCAL_STORE',
    DO_SAVE_PHOTO = 'DO_SAVE_PHOTO',
    SAVE_PHOTO = 'SAVE_PHOTO',
    LOG_OUT = 'LOG_OUT'
}

export function logOut(){
    return {type: HeaderProc.LOG_OUT};
}

export function localStoreUser(obj:any){
    return {type: HeaderProc.DO_HEADER, obj};
}

export function saveImgProfile(saveImg:{}){
    return {type: HeaderProc.DO_SAVE_PHOTO, saveImg};
}