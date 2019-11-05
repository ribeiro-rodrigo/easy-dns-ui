import { Component } from 'react';

class ProtectedComponent extends Component{
    constructor(props){
        super(props); 

        if ( ! localStorage.getItem('token')){
            this.redirectToList(); 
        }
    }

    redirectToList(){
        window.location = '/'
    }
}

export default ProtectedComponent; 