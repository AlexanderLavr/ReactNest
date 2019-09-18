export function request(url:string,  method: string, body?: object) {
    return (fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',  
            'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
        },
        body: JSON.stringify(body)
    }).then((response : any) => {return  response.text().then(function(text :any) {
        return text ? JSON.parse(text) : {}
            }) 
        })
    );
  
} 




