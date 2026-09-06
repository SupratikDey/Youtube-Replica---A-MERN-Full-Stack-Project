import "./Header.css" // syntax to import the css file
import { useState } from "react";
import { Link } from "react-router-dom";

function Header(){
    //const[data,setdata] = useState([data]);
    const [search,setsearch] = useState("");
    function handleSearch(event){
        event.preventDefault(); // Code to prevent default value?

        // setdata(Data.map(e=>{
        //     e.title.toLowerCase().contains(search.toLowerCase());
        // }))
    }
    return(
        <div className="header">
            <div className="Starting">
                <img id="logo" src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-650-80.jpg" ></img>
                <form id="user_input">
                    <input id="search_bar" placeholder="Search" type="text" onChange={(e)=>setsearch(e.target.value)}></input>
                    <button id="search_button" onSubmit={handleSearch}>Search</button>
                    {/* // Onsubmit accepts values even if user presses enter */}
                </form>
            </div>
            <div className="Ending">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5g2XbED_2c-W4YofdtJ7D3G5s-GoksSwJLUYaZUZfg&s" id="bell" alt="Image of bell icon for notification"></img>
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPwVjMtwurTClsmCnRsRLT_cSsBTm6QFQdkBo8M3Gqw&s=10" id="user_logo" alt="User Image logo"></img>  */}
                <button id="signin_button"><Link to="/login">Sign In</Link></button>      
            </div>            
        </div>
    )
}

export default Header;