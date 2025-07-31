import { Box, Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { string, object as YupObject } from "yup";

const SignUpBuyer = () => {

    const handleSubmit = (values) => {
		console.log("submitted")
		console.log(values)
	}

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
            }}
            component="form"
            onSubmit={formik.handleSubmit}
        >
            {/* <Paper sx={{ alignSelf: "center", width: "80%", height: "60%" }}>Hello</Paper> */}
                <Grid container columns={12} sx={{ width: "100%" }}>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            error={!!formik.touched.firstName && !!formik.errors.firstName}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            variant="filled"
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            error={!!formik.touched.lastName && !!formik.errors.lastName}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            variant="filled"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={!!formik.touched.email && !!formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                            id="email"
                            name="email"
                            label="Email"
                            variant="filled"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={!!formik.touched.password && !!formik.errors.password}
                            helperText={formik.touched.password && formik.errors.password}
                            id="password"
                            name="password"
                            label="Passsword"
                            variant="filled"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password2}
                            error={!!formik.touched.password2 && !!formik.errors.password2}
                            helperText={formik.touched.password2 && formik.errors.password2}
                            id="password2"
                            name="password2"
                            label="Confirm Password"
                            variant="filled"
                        />
                    </Grid>
                    <Grid>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Grid>
                </Grid>
=        </Box>
    );
};

export default SignUpBuyer;
