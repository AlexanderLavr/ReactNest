import axios from 'axios';

export function request(url: string, method: any, body?: object) {
    return (
        axios({
            url: `http://localhost:4200/${url}`,
            method: method,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
            }
        }
        ).then((response: any) =>  response.data )
    );
}

