import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import uuid from "uuid-random";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

const steps = ["Personal ", "Academics ", "Contact"];

export function Steps(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={props.step - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default function Form(props) {
  const [formIndex, setFormIndex] = React.useState(0);
  const [formData, setFormData] = React.useState({ BirthDate: "2017-05-24" });

  const formsArry = [
    <PersonalDetailsForm
      currentProfileData={props.currentProfileData}
      setFormData={setFormData}
      setFormIndex={setFormIndex}
    />,
    <AccademicDetailsForm
      currentProfileData={props.currentProfileData}
      setFormData={setFormData}
      setFormIndex={setFormIndex}
    />,
    <ContactForm
      currentProfileData={props.currentProfileData}
      setFormData={setFormData}
      setFormIndex={setFormIndex}
    />,
    <Button
    variant="contained"
    sx={{ m: 2 }}
    onClick={() => handleSubmit()}
  >
    Confirm ? &gt;
  </Button>
  ];
  const handleSubmit = () => {
    if (props.currentProfileData !== undefined) {
      props.addData((data) => {
        const newData = [...data];
        const index = newData.findIndex(
          (val) => val.id === props.currentProfileData.id
        );
        newData[index] = {
          ...newData[index],
          ...formData,
        };

        return newData;
      });
      props.handle(false);
      return;
    } else {
      formData.id = uuid();
      props.addData((data) => {
        const newData = [...data];
        newData.unshift(formData);
        return newData;
      });
    }

    clearForm();
  };

  const clearForm = () => {
    setFormData({});
    setFormIndex(1);
    props.setDisplayForm(false);
  };
  return (
    <Box
      component="form"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "10px",
        width: "85%",

        alignItems: "center",
      }}
    >
      <Steps step={formIndex}></Steps>
  
      
      <Box style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
      {formsArry[formIndex]}
        <Button
          sx={{ marginTop: "1px  " }}
          onClick={() => {
            props?.handle && props.handle(false);
            props.setDisplayForm !== undefined && props.setDisplayForm(false);
          }}
        >
          Cancle
        </Button>
      </Box>
    </Box>
  );
}

export const PersonalDetailsForm = (props) => {
  const [name, setName] = useState("");
  const dateFormatter = Intl.DateTimeFormat("sv-SE");
  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "800px",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Name"
          name="Name"
          style={{ width: "300px" }}
          defaultValue={
            props.currentProfileData !== undefined
              ? props.currentProfileData.Name
              : ""
          }
          onChange={(e) => {
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }));
            setName(e.target.value);
          }}
        />

        <TextField
          id="outlined-password-input"
          label="Birth Date"
          name="BirthDate"
          type="date"
          style={{ width: "300px" }}
          defaultValue={
            props.currentProfileData !== undefined &&
            props.currentProfileData.BirthDate !== undefined
              ? dateFormatter.format(
                  new Date(props.currentProfileData.BirthDate)
                )
              : "2017-05-24"
          }
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <TextField
          id="outlined-multiline-static"
          label="About"
          name="About"
          multiline
          style={{ width: "300px" }}
          minRows={4}
          defaultValue={
            props.currentProfileData !== undefined
              ? props.currentProfileData.About
              : ""
          }
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />
      </div>
      <Button
        variant="contained"
        sx={{ margin: "2px 125px", height: "35px", minWidth: "80px" }}
        onClick={() => {
          name !== "" || props.currentProfileData !== undefined
            ? props.setFormIndex(1)
            : alert("You Have to Enter Name Atleast");
        }}
      >
        Next&gt;
      </Button>
    </div>
  );
};

export function AccademicDetailsForm(props) {
  return (
    <div>
      <div>
        <TextField
          id="outlined-required"
          label="SSC Marks"
          name="SSC_Marks"
          type="number"
          defaultValue={
            props.currentProfileData !== undefined
              ? props.currentProfileData.SSC_Marks
              : ""
          }
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />

        <TextField
          id="outlined-password-input"
          type="number"
          label="HSC Marks"
          name={"HSC_Marks"}
          defaultValue={
            props.currentProfileData !== undefined
              ? props.currentProfileData.HSC_Marks
              : ""
          }
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <TextField
          id="outlined-password-input"
          label="BTech Marks"
          name="BTech_Marks"
          type="number"
          defaultValue={
            props.currentProfileData !== undefined
              ? props.currentProfileData.BTech_Marks
              : ""
          }
          onChange={(e) => {
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }));
          }}
        />
        <SkillsCkeckBox
          skill={props.currentProfileData}
          formData={props.setFormData}
        ></SkillsCkeckBox>
      </div>

      <Button
        variant="contained"
        sx={{ margin: "2px 125px" }}
        onClick={() => {
          if (props.currentProfileData) {
            props.setFormIndex(2);
            return;
          }
          props.setFormData((data) => {
            if (data && data.Skills && data.Skills.length > 0) {
              props.setFormIndex(2);
            } else {
              alert("You have to add atleast one skill");
            }
            return data;
          });
        }}
      >
        Next&gt;
      </Button>
    </div>
  );
}

export const ContactForm = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-password-input"
          label="Phone"
          name="Phone"
          style={{ width: "320px" }}
          type="phone"
          defaultValue={
            props.currentProfileData !== undefined
              ? props.currentProfileData.Phone
              : ""
          }
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />

        <TextField
          label="Address"
          id="outlined-multiline-static"
          multiline
          style={{ width: "320px" }}
          maxRows={8}
          name="Address"
          type="address"
          defaultValue={
            props.currentProfileData !== undefined
              ? props.currentProfileData.Address
              : ""
          }
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />
      </div>
      <Button
        variant="contained"
        sx={{ margin: "2px 125px" }}
        onClick={() => props.setFormIndex(3)}
      >
        Submit
      </Button>
    </div>
  );
};

export const SkillsCkeckBox = (props) => {
  const [checkList, setCheckList] = useState(
    props.skill !== undefined ? props.skill.Skills : []
  );
  const handleChange = (e) => {
    if (!e.target.checked) {
      if (checkList.includes(e.target.name)) {
        if (checkList.length === 1) {
          alert(
            "You to keep atleast one skill...Select any other skills to remove this skill"
          );
        } else {
          setCheckList((data) => {
            const arr = data.filter((item) => item !== e.target.name);
            return arr;
          });
        }
      }
    } else {
      if (checkList.length > 2) {
        alert("You Can Add Maximum 3 Skills");
      } else {
        checkList.push(e.target.name);
      }
    }

    props.formData((data) => ({ ...data, Skills: checkList }));
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <FormControl
        sx={{
          margin: "3px 10px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        component="fieldset"
        variant="standard"
      >
        <FormLabel component="legend">Skills</FormLabel>
        <FormGroup
          sx={{
            display: "flex",
            margin: "5px 50px",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checkList.includes("Java") ? true : false}
                onChange={handleChange}
                name="Java"
              />
            }
            label="Java"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkList.includes("Data Stracture") ? true : false}
                onChange={handleChange}
                name="Data Stracture"
              />
            }
            label="Data Stracture"
          />
        </FormGroup>
        <FormGroup
          sx={{
            display: "flex",
            margin: "5px 50px",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checkList.includes("JavaScript") ? true : false}
                onChange={handleChange}
                name="JavaScript"
              />
            }
            label="JavaScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkList.includes("React Js") ? true : false}
                onChange={handleChange}
                name="React Js"
              />
            }
            label="React Js"
          />
        </FormGroup>
        <FormGroup
          sx={{
            display: "flex",
            margin: "5px 50px",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checkList.includes("Data Science") ? true : false}
                onChange={handleChange}
                name="Data Science"
              />
            }
            label="Data Science"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkList.includes("Android") ? true : false}
                onChange={handleChange}
                name="Android"
              />
            }
            label="Android"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};
