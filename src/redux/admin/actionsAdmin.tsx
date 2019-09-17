export enum AdminProc{
    DO_ADMIN = 'DO_ADMIN',
    ADMIN_ARRAY = 'ADMIN_ARRAY',
    DO_EDIT_USER = 'DO_EDIT_USER',
    EDIT_USER_SERVER = 'EDIT_USER_SERVER',
    DO_SAVE_EDIT_USER = 'DO_SAVE_EDIT_USER',
    UPDATE_USER = 'UPDATE_USER',
    CLOSE_MODAL = 'CLOSE_MODAL',
    DO_DELETE_USER = 'DO_DELETE_USER'
}
export function queryServer(){
    return {type: AdminProc.DO_ADMIN};
}

export function closeModal(){
    return {type: AdminProc.CLOSE_MODAL};
}

export function saveEditUser(data:any){
    return {type: AdminProc.DO_SAVE_EDIT_USER, data};
}


//table of users

export function deleteUser(id:string){
    return {type: AdminProc.DO_DELETE_USER, id};
}
export function editUser(id:string){
    return {type: AdminProc.DO_EDIT_USER, id};
}
