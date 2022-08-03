import { withErrorCaught } from "../../../utils/withErrorCaught";

import { apiGetDrawingComments } from "../../../services/rest-com/endpoints/drawingEndpoints";
import { useEffect, useState } from "react";
import NewComment from "../comment/NewComment";

function DrawingComments({ drawingId }) {
    /*
        TODO 4.1 - LVL 1
        Display the list of comments of a drawing
    */
    return <div>
        <NewComment/>
        <p>DrawingComments</p>
        </div>
}

export default withErrorCaught(DrawingComments)
