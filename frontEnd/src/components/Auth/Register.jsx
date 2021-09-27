import React, { useState } from 'react'
import { Container, Typography, Grid, Card, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import InputField from './InputField'
import { useDispatch } from 'react-redux'
import { USER_UPDATE } from '../../store/action/user'
import { register } from '../../api/expressApi'

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
        marginTop: 25,
        width: '100%'
    },
    errMsg: {
        paddingTop: 8,
        color: 'red',
    }
})

const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        const regRes = register({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        regRes.then(res => {
            localStorage.setItem('token', res.data)
            dispatch({
                type: USER_UPDATE,
                payload: res.data
            })
        }).catch(err => {
            setErrMsg('Email already taken.')
            setIsError(true)
            setTimeout(() => {
                setErrMsg('')
                setIsError(false)
            }, 1500)
        })
    }

    const classes = useStyles()
    return (
        <Container maxWidth="sm" className={classes.container}>
            <Card className={classes.root}>
                <Typography className={classes.info}>
                    Please Enter Your Information
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputField name='First Name' state={firstName} setState={setFirstName} type='text' />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField name="Last Name" state={lastName} setState={setLastName} type='text' />
                        </Grid>
                    </Grid>
                    <InputField name="email" state={email} setState={setEmail} type="text" />
                    <InputField name="password" state={password} setState={setPassword} type="password" />

                    {isError && <Typography className={classes.errMsg} variant='p'>{errMsg}l</Typography>}


                    <Button onClick={onSubmit} type="submit" className={classes.singinBtn}
                        variant="contained" color="primary">Sign Up</Button>
                </form>
                <Typography style={{ marginTop: 10 }}>Already have a account? <Button component={Link} to='/login' color='primary'>login</Button></Typography>
            </Card>
        </Container>
    )
}

export default Register
