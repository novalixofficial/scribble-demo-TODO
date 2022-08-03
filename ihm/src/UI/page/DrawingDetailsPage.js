import {useParams} from "react-router-dom";
import DrawingDetail from "../common/drawing/DrawingDetail";
import DrawingComments from "../common/drawing/DrawingComments";

const DrawingDetailsPage = (props) => {
    const {id} = useParams()
    
    return <div>
        <DrawingDetail drawingId={id}/>
        <DrawingComments drawingId={id}/>
    </div>
}

export default DrawingDetailsPage
