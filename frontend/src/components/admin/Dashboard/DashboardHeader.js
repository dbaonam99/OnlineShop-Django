import React from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import { faEllipsisV, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 

export default function DashboardHeader(props) {
   
    const openMenuOnClick = () => {
        props.setOpenMenuOnClick()
    }
    
    return (
        <div className="dashboard-header flex">
            <div className="flex-center">
                <div className="menu-opt flex-center"
                    onClick={openMenuOnClick}>
                    { props.openMenu && <FontAwesomeIcon icon={faEllipsisV}/>}
                    { props.openMenu === false && <FontAwesomeIcon icon={faListUl}/>}
                </div>
                <p>{props.itemName}</p>
            </div> 
            <div className="flex-center menu-search-container">
                <form className="menu-search flex">
                    <input type="text" placeholder="Search..." className="menu-search-input"></input>
                    <div className="flex-center">
                        <FontAwesomeIcon icon={faSearch} className="icon"/>
                    </div>
                </form> 
            </div>
        </div>
    )
}