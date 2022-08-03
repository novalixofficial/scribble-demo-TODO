import {useEffect, useState} from "react";
import {apiGetUserDrawings} from "../../../services/rest-com/endpoints/userEndpoints";
import {withErrorCaught} from "../../../utils/withErrorCaught";

function UserDrawings({userId}) {
    /**
     * TODO 8 - LVL 1
     * 
     * Display the drawings of the user
     */
    return <p>user's drawing list !</p>
}

export default withErrorCaught(UserDrawings)
