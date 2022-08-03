import {withErrorCaught} from "../../../utils/withErrorCaught";
import {apiDeleteDrawing, apiGetOneDrawing} from "../../../services/rest-com/endpoints/drawingEndpoints";
import {useEffect, useState} from "react";
import {Button, CardHeader} from "@mui/material";
import {config} from "../../../services/config";
import {getAverageRgb} from "../../../utils/getAvgColor";
import {Link, useNavigate} from "react-router-dom";
import Base64Avatar from "../user/Base64Avatar";
import useSession from "../../../utils/useSession";

function DrawingDetail({drawingId}) {
    /*
        TODO 2 - LVL 1
        Display the drawing in full size with it's infos : 
        - The author of the drawing 
        - The avatar of the author
        - The date of the drawing
    */ 
    /*
        TODO 2 - LVL 2
        If the user is the owner of the drawing, you must have a button that allow him to delete the drawing and then send you to the home page
    */
   
    return <p>DrawingDetail</p>
}

export default withErrorCaught(DrawingDetail)
