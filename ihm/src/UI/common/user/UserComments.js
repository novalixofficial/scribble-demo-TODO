import {useEffect, useState} from "react";
import {apiGetUserComments} from "../../../services/rest-com/endpoints/userEndpoints";
import {withErrorCaught} from "../../../utils/withErrorCaught";

function UserComments({userId}) {
    /*
        TODO 4.2 - LVL 1
        Display the list of comments of a user
    */
    return <p>User comments</p>
}

export default withErrorCaught(UserComments)
