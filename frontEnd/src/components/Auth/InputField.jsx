import React, { useState } from 'react'

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const InputField = ({
    name, state, type = 'text', setState
}) => {

    const [show, setShow] = useState(false)

    const handleClickShowPassword = () => {
        setShow(!show)
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    return (
        <FormControl fullWidth style={{
        }} >
            <InputLabel htmlFor="standard-adornment-password">{name}</InputLabel>
            <Input
                fullWidth
                id="standard-adornment-password"
                type={type === 'password' ? show ? 'text' : 'password' : type}
                value={state}
                onChange={e => setState(e.target.value)}

                endAdornment={
                    type === 'password' &&
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}

export default InputField
