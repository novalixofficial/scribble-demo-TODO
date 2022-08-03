import UploadDrawing from "../common/drawing/UploadDrawing";
import NewDrawing from "../common/drawing/NewDrawing";
import { useState } from "react";
import { Paper, Switch } from "@mui/material";
import useSession from "../../utils/useSession";
import LoginForm from "../common/LoginForm";


export default function NewDrawingPage({ }) {
    const [creation, setCreation] = useState(true)
    const [session] = useSession()

    /**
     * TODO 5 - LVL 2
     * If a user is not connected, he can't create a drawing
     * 
     * TODO 5.1 - LVL 1
     * If a user is not connected, instead of a drawing page, there is the login form displayed here
     */

    return <div style={{
        margin: '2em'
    }}>
        {creation && <NewDrawing />}
        {!creation && <UploadDrawing />}
        <Paper style={{
            width: "fit-content",
            padding: "1em",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            right: '1em',
            top: '33%'
        }}>
            <span>
                Upload a drawing
                <Switch
                    onClick={x => setCreation(!creation)}
                    checked={creation}
                />
                Draw myself
            </span>
        </Paper>


    </div>
}
