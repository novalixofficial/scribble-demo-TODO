import * as React from 'react';
import {Paper} from "@mui/material";

export default function Footer() {
    return (
        <footer style={{marginTop: '5em'}}>
            <Paper style={{
                margin : "auto",
                padding: '1em',
                color: "white",
                backgroundColor: "#1976d2",
                width: "50%",
                display: "flex",
                flexWrap: "wrap"
            }}>
                <pre>This demo is only here to demonstrate your skills as developper who learns.</pre>
                <pre>Completing everything is not as important as expressing your way of working through the core of our job : Code !</pre>
                <pre>Use git commits as a way of documenting your work/learing/experimenting process, use comments to describe your thoughts...</pre>
                <b>Good luck !</b>
            </Paper>
        </footer>
    );
}
