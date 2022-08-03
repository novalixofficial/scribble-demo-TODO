import {withErrorCaught} from "../../../utils/withErrorCaught";
import DrawingThumbnail from "./DrawingThumbnail";

function DrawingList({drawings = []}) {
    return <>
        {
            drawings.map((drawing, i) => <div key={i} style={{margin: '1em'}}>
                <DrawingThumbnail drawing={drawing}/>
            </div>)
        }
    </>
}

export default withErrorCaught(DrawingList)
