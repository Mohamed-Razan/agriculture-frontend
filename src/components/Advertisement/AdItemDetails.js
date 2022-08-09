import React, { useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  makeStyles,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DegreeProgramme, Departments, Semester } from "./module-store";
import userservice from "../../service/userservice";
import { ToastContainer, toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "noWrap",
  },
  textBox: {
    width: "110px",
    height: "25px",
  },
  button: {
    width: "75px",
    height: "25px",
  },
}));
const validationSchema = Yup.object({
//   degreeProgramme: Yup.string("Select Module Offered Course").required(
//     "Module offered Course is Required"
//   ),
//   semester: Yup.string("Select Module Offered Semester").required(
//     "Module offered Semester is Required"
//   ),
//   department: Yup.string("Select Module Offered Department").required(
//     "Module offered department is required"
//   ),
//   moduleCodeIndex: Yup.string("Enter Module code number").required(
//     "Module code is required"
//   ),
//   moduleName: Yup.string("Enter Module Name").required(
//     "Module Name is required"
//   ),
//   credits: Yup.string("Enter module graded credits").required(
//     "Credit for module is required"
//   ),
});

const AdItemDetails = ({adItem}) => {

  const classes = useStyles();

  const formik = useFormik({
    initialValues: { ...adItem, isEdit: false },
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values) => {},
  });

  const handleEdit = () => {
    formik.setFieldValue("isEdit", true);
  };

  const handleSave = () => {
    console.log("clicked");
    userservice.updateModule(formik.values).then((res) => {
      if (res.status === 200) {
        toast.success(res.data, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });

    formik.setFieldValue("isEdit", false);
  };

  return (
    <Grid item xs={12}>
      <Box>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='flex-end'
          spacing={1}
          className={classes.root}>
          <Grid item>
            <Box className={classes.textBox}>
              <TextField
                type='text'
                name='degreeProgramme'
                variant='outlined'
                size='small'
                label='Degree'
                fullWidth
                select
                color='primary'
                onBlur={formik.handleBlur}
                value={formik.values.degreeProgramme}
                onChange={formik.handleChange}
                disabled={!formik.values.isEdit}
                error={
                  formik.touched.degreeProgramme &&
                  Boolean(formik.errors.degreeProgramme)
                }
                helperText={
                  formik.touched.degreeProgramme &&
                  formik.errors.degreeProgramme
                }>
                {DegreeProgramme.map((degree) => (
                  <MenuItem key={degree.id} value={degree.name}>
                    {degree.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item>
            <Box className={classes.textBox}>
              <TextField
                id='semester'
                name='semester'
                select
                size='small'
                variant='outlined'
                fullWidth
                disabled={!formik.values.isEdit}
                onBlur={formik.handleBlur}
                value={formik.values.semester}
                onChange={formik.handleChange}
                error={
                  formik.touched.semester && Boolean(formik.errors.semester)
                }
                helperText={formik.touched.semester && formik.errors.semester}>
                {Semester.map((semester) => (
                  <MenuItem key={semester.id} value={semester.name}>
                    {semester.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item>
            <Box className={classes.textBox}>
              <TextField
                id='department'
                name='department'
                size='small'
                variant='outlined'
                select
                fullWidth
                disabled={!formik.values.isEdit}
                onBlur={formik.handleBlur}
                value={formik.values.department}
                onChange={formik.handleChange}
                error={
                  formik.touched.department && Boolean(formik.errors.department)
                }
                helperText={
                  formik.touched.department && formik.errors.department
                }>
                {Departments.map((department) => (
                  <MenuItem key={department.id} value={department.name}>
                    {department.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item>
            <Box className={classes.textBox}>
              <TextField
                type='text'
                name='moduleCode'
                variant='outlined'
                size='small'
                label='Module Code'
                fullWidth
                disabled={!formik.values.isEdit}
                color='primary'
                value={module.moduleCode}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box className={classes.textBox}>
              <TextField
                id='moduleName'
                name='moduleName'
                size='small'
                fullWidth
                disabled={!formik.values.isEdit}
                onBlur={formik.handleBlur}
                value={formik.values.moduleName}
                onChange={formik.handleChange}
                error={
                  formik.touched.moduleName && Boolean(formik.errors.moduleName)
                }
                helperText={
                  formik.touched.moduleName && formik.errors.moduleName
                }
                variant='outlined'
              />
            </Box>
          </Grid>
          <Grid item>
            <Box className={classes.textBox}>
              <TextField
                id='credits'
                type='number'
                size='small'
                step='0.1'
                variant='outlined'
                name='credits'
                fullWidth
                disabled={!formik.values.isEdit}
                onBlur={formik.handleBlur}
                value={formik.values.credits}
                onChange={formik.handleChange}
                error={formik.touched.credits && Boolean(formik.errors.credits)}
                helperText={formik.touched.credits && formik.errors.credits}
              />
            </Box>
          </Grid>

          <Grid item>
            <Box className={classes.button}>
              <Button variant='contained' color='inherit' onClick={handleEdit}>
                Edit
              </Button>
            </Box>
          </Grid>

          <Grid item>
            <Box className={classes.button}>
              <Button variant='contained' color='primary' onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Grid>
  );
};

export default AdItemDetails;
