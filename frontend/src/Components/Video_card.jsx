// Syntax to props , using props as a parameter to access user define values 


function Video_card(props){
    return(
        <div id="card">
            <img src={props.Video.thumbnailUrl} alt="Thumbnail"></img>
            <div id="Information">
                <h2>{props.Video.title}</h2>
                <p>{props.Video.uploader}</p>
                <p>{props.Video.views}  {props.Video.uploadDate}</p>
            </div>
        </div>
    )
}

export default Video_card;