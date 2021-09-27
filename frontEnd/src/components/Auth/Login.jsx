import React, { useState } from 'react'
import { Container, Typography, Card, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import InputField from './InputField'

import { login } from '../../api/expressApi'
import { useDispatch } from 'react-redux'
import { USER_UPDATE } from '../../store/action/user'

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,

        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
    },
    info: {
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 20,
        marginTop: '10px'
    },
    singinBtn: {
        marginTop: 30,
        width: '100%'
    },
    errMsg: {
        paddingTop: 8,
        color: 'red',
    }
})

const Login = () => {
    const classes = useStyles()
    const dispatch = useDispatch()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const logRes = login({
            email: email,
            password: password
        })

        logRes.then(res => {
            localStorage.setItem('token', res.data)
            dispatch({
                type: USER_UPDATE,
                payload: res.data
            })
        }).catch(err => {
            setErrMsg('Login Failed')
            setIsError(true)
            setTimeout(() => {
                setErrMsg('')
                setIsError(false)
            }, 1500)
        })
    }

    return (
        <Container maxWidth="sm" className={classes.container}>
            <Card className={classes.root}>
                <Typography className={classes.info}>
                    Please Enter Login Information
                </Typography>
                <form onSubmit={onSubmitHandler}>

                    <InputField name="Email" state={email} setState={setEmail} type="text" />
                    <InputField name="password" state={password} setState={setPassword} type="password" />

                    {isError && <Typography className={classes.errMsg} variant='p'>{errMsg}l</Typography>}

                    <Button type='submit' onClick={onSubmitHandler} className={classes.singinBtn}
                        variant="contained" color="primary">Sign In</Button>
                </form>
                <Typography style={{ marginTop: 10 }}>Do not have account? <Button color='primary' component={Link} to="/register">Register</Button></Typography>
            </Card>
        </Container>
    )
}

export default Login
