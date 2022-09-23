import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
    Alert,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid,
    TextField
} from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";
import Copyright from "../Copyright";


export default function SignUp() {
    const {handleSubmit, handleInput, error, openDialog, handleDialog, emailRef} = useSignUp()

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    {error && <Alert variant="outlined" severity="error" style={{marginTop: "10px", width: "100%"}}>
                        {error.message}
                    </Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleInput}
                            inputRef={emailRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User name"
                            name="username"
                            autoComplete="username"
                            onChange={handleInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first-name"
                            label="First name"
                            name="firstName"
                            autoComplete="given-name"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last-name"
                            label="Last name"
                            name="lastName"
                            autoComplete="family-name"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/sign-in" variant="body2">
                                    {"Have account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>

            <Dialog
                open={openDialog}
                onClose={handleDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You've successfully registered. Now you can proceed to log in
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}