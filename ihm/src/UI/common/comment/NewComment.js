import { withErrorCaught } from "../../../utils/withErrorCaught";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { apiPostComment } from "../../../services/rest-com/endpoints/commentEndpoints";
import useSession from "../../../utils/useSession";

function NewComment({ drawingId, onChange = x => x }) {
    /*
        TODO 3.1 - LVL 1
        Allow a user to publish a comment
        
    *   TODO 3.2 - LVL 2
    *   If a user is not connected, he can't publish a comment
    */
    return <p>New comment field</p>
}

export default withErrorCaught(NewComment)
