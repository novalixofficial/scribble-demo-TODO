import { useEffect, useRef, useState } from "react";
import { Button, Slider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiCreateDrawing } from "../../../services/rest-com/endpoints/drawingEndpoints";
import { withErrorCaught } from "../../../utils/withErrorCaught";

const availableColors = [[0, 0, 0], [255, 255, 255], [255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 0, 255], [255, 255, 0], [0, 255, 255]]

/**
 * Drawing tuto : https://blog.openreplay.com/2d-sketches-with-react-and-the-canvas-api
 */

const NewDrawing = () => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [pencil, _setPencil] = useState({
        width: 5,
        colorIndex: 0,
        color: availableColors[0],
        opacity: 1,
        drawing: false
    })
    const pencilRef = useRef(pencil);
    const setPencil = (newState) => {
        newState = { ...pencilRef.current, ...newState }
        newState.color = availableColors[newState.colorIndex]
        pencilRef.current = newState
        _setPencil(newState)
    }

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const databind = label => e => {
        const newForm = { ...form }

        newForm[label] = e.target.value

        setErrors({})
        setForm(newForm)
    }

    const getFormErrors = (form) => {
        const errors = {}
        if (!form.title) {
            errors.title = "Need a title"
        }
        if (form.title && form.title.length < 5) {
            errors.title = "Title must be at least 5 char long !"
        }

        const fileLimit = 5 * 1000 * 1000
        if (form.file && form.file.size > fileLimit) {
            errors.file = "Drawing must be less than " + Math.round(fileLimit / 1000000) + " Mo"
        }

        return errors
    }

    const createImageBlob = () => {
        return new Promise((resolve) => {
            canvasRef.current.toBlob(function (blob) {
                    resolve(new File([blob], form.title + '.jpeg', {type: 'image/jpeg'}))
                }
            )
        })
    }

    const submitForm = async e => {
        const file = await createImageBlob()
        const finalForm = {...form, file}
        const errors = getFormErrors(finalForm)
        if (Object.keys(errors).length > 0) {
            return setErrors(errors)
        }


        apiCreateDrawing(form.title, form.file).then(r => {
            if (!r.error && r) {
                navigate("/drawing/" + r.id);
            } else {
                setErrors({ form: r.error })
            }
        }
        )
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            // For supporting computers with higher screen densities, we double the screen density
            // Setting the context to enable us draw
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = `blue`;
            ctx.strokeStyle = `blue`;
            ctx.lineCap = 'round';
            ctxRef.current = ctx;

            canvas.addEventListener("mousedown", startDraw)
            canvas.addEventListener("mouseup", stopDraw)
            canvas.addEventListener("mousemove", draw)
        }
    }, []);


    /**
     * TODO 6 - LVL 3
     * The user must be able to draw a line on the canvas that is affected by : 
     * - width
     * - opacity
     * - color
     * 
     * that is set by the menu bellow
     */
    const startDraw = (e) => {
        console.log("You have to code that !")
    };

    const draw = (e) => {
        console.log("You have to code that !")
    };

    const stopDraw = () => {
        console.log("You have to code that !")
    };

    const clear = () => {
        if (!ctxRef.current) return
        const ctx = ctxRef.current

        ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
    };


    return <div style={{
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center"
    }}>
        < TextField
            fullWidth
            error={Boolean(errors.title)}
            helperText={errors.title ?? ""}
            label={"Title"}
            onChange={databind("title")}
            value={form.title ?? ""}
        />
        <div>
            <canvas
                id={"drawingCanvas"}
                style={{
                    borderRadius: '1em',
                    margin: "4em",
                    cursor: "url(pencil.png)",
                    boxShadow: "rgba(255,0,0,0.2) 1em 1em 1em," +
                        "rgba(0,255,0,0.2) -1.5em -1.5em 1em," +
                        "rgba(0,0,255,0.2) 2em -2em 1em," +
                        "rgba(255,255,0,0.2) -2.5em 2.5em 1em"
                }}
                ref={canvasRef}
                width={window.innerWidth / 2}
                height={window.innerHeight / 2}
            />
        </div>
        <div style={{ display: "flex", width: '33%', margin: 'auto' }}>
            <div style={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Slider value={pencil.width} onChange={e => setPencil({ width: e.target.value })} min={5} max={100}
                    step={5} />
                <Slider value={pencil.opacity} onChange={e => setPencil({ opacity: e.target.value })} min={0} max={1}
                    step={0.001} />
            </div>
            <div style={{
                backgroundColor: `rgba(${pencil.color.join(',')},${pencil.opacity})`,
                borderRadius: pencil.width + 'px',
                width: pencil.width + 'px',
                height: pencil.width + 'px'
            }} />
        </div>
        <div style={{
            width: 'fit-content',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'end'
        }}>{availableColors.map((c, i) =>
            <Button
                key={i}
                onClick={x => setPencil({ colorIndex: i })}
                sx={{
                    transition: 'all 0.5s',
                    margin: '0em 0.5em 3em 0.5em',
                    marginBottom: (i === pencil.colorIndex ? '0' : '3em'),
                    height: (i === pencil.colorIndex ? '6em' : '3em'),
                    backgroundColor: `rgba(${c.join(',')})`,
                    boxShadow: 'grey 0em 0.5em 0.5em',
                    "&:hover": {
                        margin: '0em 0.5em 0em 0.5em',
                        transition: 'all 0.5s',
                        backgroundColor: `rgba(${c.join(',')})`,
                        height: '6em'
                    },
                }}
            />)
            }</div>

        <Button onClick={x => submitForm()}>Submit</Button>
    </div>
}

export default withErrorCaught(NewDrawing)
