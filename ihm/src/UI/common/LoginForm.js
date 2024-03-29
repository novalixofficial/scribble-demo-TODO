﻿import {Button, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import useSession from "../../utils/useSession";

const isFormValid = (form) => {
    const errors = {}
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
        errors.confirmPassword = "Not the same as password"
    }
    if (!form.password || form.password.length < 5) {
        errors.password = "Password must be 6 char long"
    }
    if (!form.login || form.login.length < 3) {
        errors.login = "Login must be 3 char long"
    }

    return errors
}

export default function LoginForm({onClose = x => x}) {
    const [session, tryLogin, trySignup] = useSession()
    const [isSignup, setIsSignup] = useState(false)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const dataBind = field => e => {
        setErrors({})
        setForm({...form, [field]: e.target.value})
    }

    const sendForm = x => {
        const errors = isFormValid(form)
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return
        }

        if (isSignup) {
            trySignup(form.login, form.password).catch(
                err => setErrors({login: err.error})
            )
        } else {
            tryLogin(form.login, form.password).catch(
                err => setErrors({login: err.error})
            )
        }

        onClose()
    }

    return <>
        <DialogTitle>
            {isSignup ? "Signup" : "Login"}
        </DialogTitle>
        <DialogContent style={{padding: "2em", display: "flex", flexDirection: "column"}}>
            <TextField
                onChange={dataBind("login")}
                error={errors.login != null}
                helperText={errors.login ?? ""}
                label={"login"}
                value={form.login ?? ""}
            />
            <TextField
                onChange={dataBind("password")}
                error={errors.password != null}
                helperText={errors.password ?? ""}
                label={"password"}
                value={form.password ?? ""}
                type={"password"}
            />
            {isSignup && <>
                <TextField
                    onChange={dataBind("confirmPassword")}
                    error={errors.confirmPassword != null}
                    helperText={errors.confirmPassword ?? ""}
                    label={"Confirm password"}
                    value={form.confirmPassword ?? ""}
                    type={"password"}
                />
            </>}
            <Button
                onClick={x => setIsSignup(!isSignup)}>{isSignup ? "I already have an account !" : "I don't have an account"}</Button>
        </DialogContent>
        <DialogActions>
            <Button onClick={x => sendForm()}>{isSignup ? "Signup" : "Login"} </Button>
            <Button color={"secondary"} onClick={onClose}>Close</Button>
        </DialogActions></>
}
