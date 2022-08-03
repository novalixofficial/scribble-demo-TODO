import {useEffect, useState} from "react";
import {apiGetAllDrawings, apiSearchDrawings} from "../../services/rest-com/endpoints/drawingEndpoints";
import DrawingList from "../common/drawing/DrawingList";
import {CircularProgress, TextField} from "@mui/material";


export default function AllDrawingsPage(props) {
    const [drawings, setDrawings] = useState([])
    const [criteria, setCriteria] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        apiGetAllDrawings().then(res => {
            setDrawings(res)
        }).finally(() => {
            setLoading(false)
        })
    }, [props])

    const searchDrawings = (e) => {
        setCriteria(e.target.value)
        setLoading(true)

        apiSearchDrawings(e.target.value).then(res => {
            setDrawings(res)
        }).finally(() => {
            setLoading(false)
        })
    }

    return <div style={{marginTop: '2em', width: 'auto', textAlign: "center"}}>
        <TextField onChange={searchDrawings} value={criteria} label={"filter by ..."}/>
        <div style={{display: "flex", flexWrap: "wrap", textAlign: "center"}}>

            {loading && <CircularProgress/>}
            {!loading && drawings && <DrawingList drawings={drawings}/>}
        </div>
    </div>

}
