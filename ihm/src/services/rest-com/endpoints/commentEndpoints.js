import {postData} from "../rest";

export function apiPostComment(drawingId,text) {
    return postData(`/drawing/${drawingId}/comments`, null, {text: text})
}

