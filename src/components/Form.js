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
  const [formNo, setFormNo] = React.useState(1);
  const [formData, setFormData] = React.useState({});



  const handleOnSubmit = () => {
    if (props.obj !== undefined) {
      props.addData(data=>{
        const newData=[...data]
       const index = newData.findIndex((val) => val.id === props.obj.id);
      newData[index] = {
        ...newData[index],
        ...formData,
      };
      
        return newData
      })
      props.handle(false);
      return;
    } else {
  
      setFormData((data) => ({ ...data, id: uuid() }));
      console.log(formData);
      props.addData(data=>{const newData=[...data];newData.unshift(formData); return newData })
    }
    

    clearForm();
  };

  const clearForm = () => {
    setFormData({});
    setFormNo(1);
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
      <Steps step={formNo}></Steps>
      {formNo === 1 && (
        <Form1
          obj={props.obj}
          setFormData={setFormData}
          setForm={setFormNo}
        ></Form1>
      )}
      {formNo === 2 && (
        <Form2   obj={props.obj} setFormData={setFormData} setForm={setFormNo}></Form2>
      )}
      {formNo === 3 && (
        <Form3    obj={props.obj} setFormData={setFormData} setForm={setFormNo}></Form3>
      )}
      <Box>
      {formNo === 4 && (
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => handleOnSubmit()}
        >
          Confirm ? &gt;
        </Button>
      )}
      
      <Button
        sx={{ marginTop: "1px  " }}
        onClick={() => {props?.handle&&props.handle(false); props.setDisplayForm(false)}}
      >
        Cancle
      </Button>
      </Box>
    </Box>
  );
}

export const Form1 = (props) => {
  const [name, setName] = useState("")
  const dateFormatter = Intl.DateTimeFormat('sv-SE');
  return (
    <div>
      {" "}
      <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
        <TextField
          required
          id="outlined-required"
          label="Name"
          name="Name"
          defaultValue={props.obj !== undefined ? props.obj.Name : ""}
          onChange={(e) =>{
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }));
            setName(e.target.value)
          }
          }
        />

        <TextField
          id="outlined-password-input"
          label="BirthDate"
          name="BirthDate"
          type="date"
          value="2017-05-03"
          defaultValue={
            props.obj!==undefined &&props.obj.BirthDate !== undefined ?dateFormatter.format(new Date(props.obj.BirthDate)) : "2017-05-24"
          }
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <TextField
          required
          id="outlined-multiline-flexible"
          label="About"
          name="About"
          multiline
          maxRows={4}
          defaultValue={props.obj !== undefined ? props.obj.About : ""}
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
        sx={{ margin:'2px 125px',height:'35px' ,minWidth:'80px'}}
        
        onClick={() => {
        name!==""||props.obj!==undefined?
          props.setForm(2):alert("You Have to Enter Name Atleast")
        }}
      >
        Next&gt;
      </Button>
    </div>
  );
};

export function Form2(props) {
  return (
    <div>
      <div>
        <TextField
          id="outlined-required"
          label="SSC Marks"
          name="SSC_Marks"
          type="number"
          defaultValue={props.obj !== undefined ? props.obj.SSC_Marks : ""}
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
          defaultValue={props.obj !== undefined ? props.obj.HSC_Marks : ""}
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
          defaultValue={props.obj !== undefined ? props.obj.BTech_Marks : ""}
          onChange={(e) =>{
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))}
          }
        />
        <SkillsCkeckBox skill={props.obj} formData={props.setFormData}></SkillsCkeckBox>
      </div>

      <Button
        variant="contained"
        sx={{ margin:'2px 125px' }}
        onClick={() =>{if(props.obj){props.setForm(3); return }props.setFormData(data=>{
         
         if( data&&data.Skills&&data.Skills.length>0){
          props.setForm(3)}else{
            alert("You have to add atleast one skill")
          }
        return data;
        })}}
      >
        Next&gt;
      </Button>
    </div>
  );
}

export const Form3 = (props) => {
  return (
    <div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Phone"
          name="Phone"
          type="phone"
          defaultValue={props.obj !== undefined ? props.obj.Phone : ""}
          onChange={(e) =>
            props.setFormData((Data) => ({
              ...Data,
              [e.target.name]: e.target.value,
            }))
          }
        />

        <TextField
          id="outlined-password-input"
          label="Address"
          name="Address"
          type="address"
          defaultValue={props.obj !== undefined ? props.obj.Address : ""}
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
        sx={{ margin:'2px 125px' }}
        onClick={() => props.setForm(4)}
      >
        Submit
      </Button>
    </div>
  );
};

export const SkillsCkeckBox = (props) => {  
  const [checkList, setCheckList] = useState(props.skill!==undefined?props.skill.Skills:[]);
  const handleChange = (e) => {
    if (!e.target.checked) {
      if (checkList.includes(e.target.name)) {
        if(checkList.length===1){
alert("You to keep atleast one skill...Select any other skills to remove this skill")
        }else{
          setCheckList((data) => data.filter((item) => item !== e.target.name));
        }
      }
    } else {
      checkList.push(e.target.name);
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
            control={<Checkbox checked={checkList.includes("Java")?true:false} onChange={handleChange} name="Java" />}
            label="Java"
          />

          <FormControlLabel
            control={<Checkbox checked={checkList.includes("Data Stracture")?true:false} onChange={handleChange} name="Data Stracture" />}
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
            control={<Checkbox checked={checkList.includes("JavaScript")?true:false} onChange={handleChange} name="JavaScript" />}
            label="JavaScript"
          />
          <FormControlLabel
            control={<Checkbox  checked={checkList.includes("React Js")?true:false} onChange={handleChange} name="React Js" />}
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
            control={<Checkbox checked={checkList.includes("Data Science")?true:false} onChange={handleChange} name="Data Science" />}
            label="Data Science"
          />
          <FormControlLabel
            control={<Checkbox checked={checkList.includes("Android")?true:false} onChange={handleChange} name="Android" />}
            label="Android"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};
