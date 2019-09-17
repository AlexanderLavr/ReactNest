import React from 'react';

export class Profile extends React.Component<any>{
    state:any={
        changePhoto: '',
        srcPhoto: ''
    }
    valueChangePhoto(e:any){
        let currentPhoto:any = document.getElementById('photo');
        let src:string = currentPhoto.currentSrc;
        this.setState({srcPhoto: src})

        let defaultPhoto = this.props.imageProfile
        let img:any = document.querySelector('#photo');
        const toBase64 = (file:any) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        async function Main(){
            const file:any = e.target.files[0];
            if(!file){
                return defaultPhoto
            }
            return await toBase64(file)
        }
        Main().then(res =>{
            this.setState({changePhoto: res})
            img.src = res;
        })
    }
    savePhotoProfile(){
        if(this.state.changePhoto === ''){
            this.setState({changePhoto: this.state.srcPhoto})
        }
       this.props.saveImgProfile({img:this.state.changePhoto, id:this.props.idUser})
    }
     render(){
        return(
            <div>
                <div className="item">
                    <div className="container-Photo">
                        <img id="photo" src={this.props.imageProfile} alt="photo-profile"/>
                    </div>
                    <div className="container-button">
                        <label htmlFor="choosePhoto"><input  onChange={(e)=>{this.valueChangePhoto(e)}}id="choosePhoto" type="file"/></label>
                        <button onClick={()=>{this.savePhotoProfile()}}>Save</button>
                    </div>
                </div>
            </div>
        )
    }
}
