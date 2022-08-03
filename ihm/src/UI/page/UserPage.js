import UserDetail from "../common/user/UserDetail";
import UserComments from "../common/user/UserComments";
import UserDrawings from "../common/user/UserDrawings";
import {useParams} from "react-router-dom";
import {withErrorCaught} from "../../utils/withErrorCaught";
import useSession from "../../utils/useSession";
import UserEdit from "../common/user/UserEdit";

function UserPage({}) {
    let {id} = useParams();
    const [session, tryLogin, trySignup, tryLogout] = useSession()

    return <div>
        <UserDetail userId={id}/>
        {session.connected && (session.username === id) && <UserEdit userId={id}/>}
        <h3>Drawings</h3>
        <UserDrawings userId={id}/>
        <h3>Comments</h3>
        <UserComments userId={id}/>
    </div>
}

export default withErrorCaught(UserPage)
