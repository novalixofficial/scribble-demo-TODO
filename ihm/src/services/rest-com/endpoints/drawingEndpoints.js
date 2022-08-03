import {deleteData, getData, postFormData} from "../rest";

export function apiGetAllDrawings() {
    return getData('/drawing')
}

export function apiSearchDrawings(criteria) {
    return getData('/drawing/search', {title: criteria,username:criteria})
}

export function apiGetOneDrawing(drawingId) {
    return getData('/drawing/' + drawingId)
}

export function apiCreateDrawing(title, bytesData) {
    return postFormData('/drawing', null, {title: title, drawing: bytesData})
}

export function apiGetDrawingComments(drawingId) {
    return getData(`/drawing/${drawingId}/comments`)
}

export function apiDeleteDrawing(drawingId) {
    return deleteData(`/drawing/${drawingId}`)
}

