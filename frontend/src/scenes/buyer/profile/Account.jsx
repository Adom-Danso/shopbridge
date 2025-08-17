import { Grid, Typography, Box, useTheme, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import { themeColors } from "../../../theme";

const Account = ({ currentUser }) => {
    const [disabled, setDisabled] = useState(true);
    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    const formik = useFormik({
        initialValues: {
            firstName: currentUser.firstName || "",
            lastName: currentUser.lastName || "",
            email: currentUser.email || "",
            phone: currentUser.phone || "",
            address: currentUser.address || "",
            city: currentUser.city || "",
            country: currentUser.country || "",
            zipCode: currentUser.zipCode || "",
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const editCommand = () => {
        setDisabled(!disabled);
    };

    return (
        <Box component="form">
            <Grid container sx={{ padding: 3 }} spacing={2}>
                <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    size={12}
                >
                    <Typography fontWeight="bold" variant="h2">Account Info</Typography>
                    <Button
                        variant="text"
                        size="large"
                        color={colors.grey[200]}
                        onClick={editCommand}
                    >
                        Edit <EditIcon />
                    </Button>
                </Grid>
                <Grid
                    container
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            label="First Name"
                            variant="filled"
                            name="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            disabled={disabled}
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
                            id="lastName"
                            label="Last Name"
                            variant="filled"
                            name="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            disabled={disabled}
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
                            id="email"
                            label="Email"
                            variant="filled"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            disabled={disabled}
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
                            id="phone"
                            label="Phone"
                            variant="filled"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            disabled={disabled}
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
                            id="address"
                            label="Address"
                            variant="filled"
                            name="address"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            disabled={disabled}
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
                    <Grid size={2}>
                        <TextField
                            id="city"
                            label="City"
                            variant="filled"
                            name="city"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            disabled={disabled}
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
                    <Grid size={2}>
                        <TextField
                            id="country"
                            label="Country"
                            variant="filled"
                            name="country"
                            onChange={formik.handleChange}
                            value={formik.values.country}
                            disabled={disabled}
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
                    <Grid size={2}>
                        <TextField
                            id="zipcode"
                            label="ZipCode"
                            variant="filled"
                            name="zipCode"
                            onChange={formik.handleChange}
                            value={formik.values.zipCode}
                            disabled={disabled}
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
                    { !disabled && (
                        <Grid size={12} sx={{display: "flex", justifyContent: "end", gap: 3}}>
                            <Button variant="contained" color="success" >Save</Button>
                            <Button variant="contained" color="error" onClick={() => setDisabled(true)}>Cancel</Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Account;
