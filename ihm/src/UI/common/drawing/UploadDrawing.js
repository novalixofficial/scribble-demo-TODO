import { Box, Button, FormControl, FormHelperText, Input, TextField } from "@mui/material";
import { useState } from "react";
import { apiCreateDrawing } from "../../../services/rest-com/endpoints/drawingEndpoints";
import { useNavigate } from "react-router-dom";


export default function UploadDrawing({ }) {
    const [form, setForm] = useState({})
    const navigate = useNavigate();

    /**
     * TODO 7.1 - LVL 1
     * The User can't upload a drawing if : 
     * - the title is empty or length < 5
     * - the file is not of type jpg
     * - the file is bigger than 5 Mo
     * 
     * TODO 7.2 - LVL 2
     * The errors must be displayed to the user 
     * 
     */

    const databind = label => e => {
        const newForm = { ...form }
        if (label === "file") {
            newForm.file = e.target.files.item(0)
        } else {
            newForm[label] = e.target.value
        }

        setForm(newForm)
    }


    const submitForm = e => {
        apiCreateDrawing(form.title, form.file).then(r => {
            if (!r.error && r) {
                navigate("/drawing/" + r.id);
            } else {
                console.error(r)
            }
        }
        )
    }

    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "33%",
        margin: "auto",
        "&>*": {
            margin: "1em"
        }
    }}>
        < TextField
            label={"Title"}
            onChange={databind("title")}
            value={form.title ?? ""}
        />
        <FormControl>
            <Input
                onChange={databind("file")}
                type={"file"}
                id="newDrawing"
                aria-describedby="newDrawingHelp"
            />
            <FormHelperText
                id="newDrawingHelp"
            >
                You can also just upload a new drawing
            </FormHelperText>
        </FormControl>
        <Button onClick={x => submitForm()}>Submit</Button>

    </Box>
}
