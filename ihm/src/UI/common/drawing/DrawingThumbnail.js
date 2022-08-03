import {Card, CardHeader, CardMedia} from "@mui/material";
import {config} from "../../../services/config";
import {Link, useNavigate} from "react-router-dom";
import Base64Avatar from "../user/Base64Avatar";

const DrawingThumbnail = ({user_name, drawing = {user_name: ""}}) => {
    /*
        TODO 1 - LVL 1
        Display a small drawing thumbnail that shows : 
        - The image of the drawing 
        - The author of the drawing
        - The Date of the drawing
    */ 
    /*
        TODO 1 - LVL 2
        A click on the user name brings you to its user profile 
        A click on the drawing brings you to the drawing page
    */
   
    return <p>DrawingThumbnail</p>
}

export default DrawingThumbnail
