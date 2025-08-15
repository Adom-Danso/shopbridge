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

const LoginBuyer = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [currentUserType, setCurrentUserType] = useContext(UserTypeContext);

    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const resp = await httpClient.post("/auth/login/buyer", values);
            const data = await resp.data;
            if (resp.status === 200) {
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
            email: "",
            password: "",
        },
        validationSchema: YupObject({
            email: string().email().required("Required"),
            password: string().required("Required"),
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
                            Login
                        </Typography>
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
                            justifyContent: "space-between",
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
                            Don't have an account?
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: colors.grey[100] }}
                        >
                            Forgotten password?
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default LoginBuyer;
