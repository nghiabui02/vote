import './addAVG.css'
import '../page/vote/vote.css'
import {useNavigate} from "react-router-dom";
import {Box, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as React from "react";


export default function AddAVG({close, addAvgPoint}) {
    const navigate = useNavigate()
    console.log(close)

    const formikAVG = useFormik({
        initialValues: {
            avg_point:'',
            name: ''
        },
        onSubmit: (values) => {
            addAvgPoint(values).then(r => {
                close(false)
                navigate('')
            })
        }
    });


    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    justifyContent:'center'
                }}
                noValidate
                autoComplete="off"
                onSubmit={formikAVG.handleSubmit}
            >
                <Typography variant="outlined" sx={{margin:'auto'}}>
                    Add avg Point
                </Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined" name='name' value={formikAVG.values.name} onChange={formikAVG.handleChange} />
                <TextField id="filled-basic" label="Avg point" variant="outlined" name='avg_point' value={formikAVG.values.avg_point} onChange={formikAVG.handleChange}/>
                <button type="submit">Submit</button>
            </Box>
        </>
    )
}