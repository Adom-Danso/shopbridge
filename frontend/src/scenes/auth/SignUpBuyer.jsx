import { Box, Button, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { string, object as YupObject } from "yup";
import { useTheme } from "@emotion/react";
import { useContext } from "react";
import { useNavigate } from "react-router";

import { themeColors } from "../../theme";
import httpClient from "../../httpClient";
import { UserContext, UserTypeContext } from "../../context";

const SignUpBuyer = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [currentUserType, setCurrentUserType] = useContext(UserTypeContext);

    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const resp = await httpClient.post("/auth/buyer/register", values);
            const data = await resp.data;
            if (resp.status === 201) {
                setCurrentUser(data.user);
                setCurrentUserType(data.userType);
                navigate("/profile");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
        },
        validationSchema: YupObject({
            firstName: string().required("Required"),
            lastName: string().required("Required"),
            email: string().email().required("Required"),
            password: string().required("Required"),
            password2: string().required("Required"),
        }),
        onSubmit: (values) => handleSubmit(values),
    });

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <Paper sx={{ width: "500px", padding: "15px" }}>
                <Grid container columns={6} rowGap={5} sx={{ width: "100%" }}>
                    <Grid
                        size={6}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100px",
                            border: "1px solid grey",
                            borderWidth: "0 0 1px 0",
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{ fontWeight: 500, color: colors.grey[100] }}
                        >
                            SignUp
                        </Typography>
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            error={
                                !!formik.touched.firstName &&
                                !!formik.errors.firstName
                            }
                            helperText={
                                formik.touched.firstName &&
                                formik.errors.firstName
                            }
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            variant="filled"
                            sx={{
                                "& .MuiFormLabel-root": {
                                    color: colors.grey[100],
                                },
                                "& .MuiInputBase-root": {
                                    padding: "10px 0px",
                                },
                                padding: "0 5px 0 0",
                            }}
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            error={
                                !!formik.touched.lastName &&
                                !!formik.errors.lastName
                            }
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            variant="filled"
                            sx={{
                                "& .MuiFormLabel-root": {
                                    color: colors.grey[100],
                                },
                                "& .MuiInputBase-root": {
                                    padding: "10px 0px",
                                },
                                padding: "0 0 0 5px",
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={
                                !!formik.touched.email && !!formik.errors.email
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            id="email"
                            name="email"
                            label="Email"
                            variant="filled"
                            sx={{
                                "& .MuiFormLabel-root": {
                                    color: colors.grey[100],
                                },
                                "& .MuiInputBase-root": {
                                    padding: "10px 0px",
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={
                                !!formik.touched.password &&
                                !!formik.errors.password
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            id="password"
                            name="password"
                            label="Passsword"
                            variant="filled"
                            sx={{
                                "& .MuiFormLabel-root": {
                                    color: colors.grey[100],
                                },
                                "& .MuiInputBase-root": {
                                    padding: "10px 0px",
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password2}
                            error={
                                !!formik.touched.password2 &&
                                !!formik.errors.password2
                            }
                            helperText={
                                formik.touched.password2 &&
                                formik.errors.password2
                            }
                            id="password2"
                            name="password2"
                            label="Confirm Password"
                            variant="filled"
                            sx={{
                                "& .MuiFormLabel-root": {
                                    color: colors.grey[100],
                                },
                                "& .MuiInputBase-root": {
                                    padding: "10px 0px",
                                },
                            }}
                        />
                    </Grid>
                    <Grid
                        size={6}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button variant="contained" type="submit" size="large">
                            Submit
                        </Button>
                    </Grid>
                    <Grid
                        size={6}
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            height: "50px",
                            border: "1px solid grey",
                            borderWidth: "1px 0 0 0",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: colors.grey[100] }}
                        >
                            Already have an account?
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default SignUpBuyer;
