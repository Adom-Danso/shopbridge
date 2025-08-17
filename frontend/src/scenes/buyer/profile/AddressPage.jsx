import { Grid, Typography, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

import { themeColors } from "../../../theme";

const AddressPage = ({ currentUser }) => {
    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    const formik = useFormik({
        initialValues: {
            address: currentUser.address || "",
            city: currentUser.city || "",
            country: currentUser.country || "",
            zipCode: currentUser.zipCode || ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })

    console.log(currentUser)
    
    return (
        <Grid container sx={{ padding: 3 }} spacing={2}>
            <form>
                <TextField
                    id="address"
                    label="Address"
                    variant="filled"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    sx={{
                        "& .MuiFormLabel-root": {
                            color: colors.grey[100],
                        },
                        "& .MuiInputBase-root": {
                            padding: "10px 0px",
                        },
                    }}
                />
                <TextField
                    id="city"
                    label="City"
                    variant="filled"
                    name="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    sx={{
                        "& .MuiFormLabel-root": {
                            color: colors.grey[100],
                        },
                        "& .MuiInputBase-root": {
                            padding: "10px 0px",
                        },
                    }}
                />
                <TextField
                    id="country"
                    label="Country"
                    variant="filled"
                    name="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    sx={{
                        "& .MuiFormLabel-root": {
                            color: colors.grey[100],
                        },
                        "& .MuiInputBase-root": {
                            padding: "10px 0px",
                        },
                    }}
                />
                <TextField
                    id="zipcode"
                    label="ZipCode"
                    variant="filled"
                    name="zipCode"
                    onChange={formik.handleChange}
                    value={formik.values.zipCode}
                    sx={{
                        "& .MuiFormLabel-root": {
                            color: colors.grey[100],
                        },
                        "& .MuiInputBase-root": {
                            padding: "10px 0px",
                        },
                    }}
                />
            </form>
        </Grid>
    );
};

export default AddressPage;
