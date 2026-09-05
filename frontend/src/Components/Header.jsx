import "./Header.css" // syntax to import the css file

function Header(){
    return(
        <div className="header">
            <div className="Starting">
                <img id="logo" src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-650-80.jpg" ></img>
                <form id="user_input">
                    <input id="search_bar" placeholder="Search" type="text" width="40%"></input>
                    <button id="search_button">Search</button>
                </form>
            </div>
            <div className="Ending">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5g2XbED_2c-W4YofdtJ7D3G5s-GoksSwJLUYaZUZfg&s" id="bell" alt="Image of bell icon for notification"></img>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPwVjMtwurTClsmCnRsRLT_cSsBTm6QFQdkBo8M3Gqw&s=10" id="user_logo" alt="User Image logo"></img>       
            </div>            
        </div>
    )
}

export default Header;