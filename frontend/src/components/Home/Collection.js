import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';

function Collection(props) { 

    return( 
        <div className="Collection"> 
            <div className="collection-container">
                <div className="collection-box">
                    <img src="https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/woman.jpg" alt=""></img>
                    <div className="collection-overlay flex-center">
                        <div className="collection-title">Women collection</div>
                        <div  
                            className="collection-link" 
                        >Discover Now</div>
                    </div>
                </div>
                <div className="collection-box">
                    <img src="https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/09/man.jpg" alt=""></img>
                    <div className="collection-overlay flex-center">
                        <div className="collection-title">Man collection</div>
                        <div  
                            className="collection-link" 
                        >Discover Now</div>
                    </div>
                </div>
            </div> 
        </div>
    ) 
}
export default withRouter(Collection)
