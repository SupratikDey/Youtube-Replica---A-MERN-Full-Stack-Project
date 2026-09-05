import Video_card from "./Video_card";
import {data}from data;

function Video_grid(){
    return(
        <div>
            {data.map((videos)=>{
                <Video_card key={videos.id} props={videos} />
            })}
        </div>
    )
}

export default Video_grid;