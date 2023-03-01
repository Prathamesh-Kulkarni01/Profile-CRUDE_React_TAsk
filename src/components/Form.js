import  React, {  useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import uuid from 'uuid-random';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';
import { ProfileData } from '../ProfileData';

const steps = [
  'Personal ',
  'Academics ',
  'Contact',
];

export  function Steps(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={props.step-1} alternativeLabel>
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
  const [formNo,setFormNo]=React.useState(1);
  const [formData,setFormData]=React.useState({});



 const handleOnSubmit=()=>{
 
  if(props.obj!==undefined){
const index = ProfileData.findIndex(val=>
  val.id===props.obj.id
)
ProfileData[index]={
  ...ProfileData[index],
  ...formData
}
props.handle(false)
return ;
  }else{
  setFormData(data=>({...data,id:uuid()}))
ProfileData.push(formData)
  }
  props.newData(false);
  clearForm();
 }


 const clearForm=()=>{
  setFormData({})
  setFormNo(1)
props.setDisplayForm(false)
 }
  return (
   
    <Box
      component="form"
      justifyContent="center"
      alignItems="center"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },backgroundColor:'white' ,padding:'10px',borderRadius:'10px',width:'85%',alignItems:"center"
      }}
    >
       <Steps step={formNo}></Steps>
      {
        formNo===1&&<Form1 obj={props.obj} setFormData={setFormData} setForm={setFormNo}></Form1>
      }
      {
        formNo===2&&<Form2  setFormData={setFormData} setForm={setFormNo}></Form2>
      }
       {
        formNo===3&&<Form3 setFormData={setFormData} setForm={setFormNo}></Form3>
      }
       {
        formNo===4&&<Button variant="contained" sx={{m:2}} onClick={()=>handleOnSubmit()}>Confirm ? &gt;</Button>
      }
     <Button sx={{marginTop:'-15px'}} onClick={()=>props.setDisplayForm(false)}>Cancle</Button>
    </Box>
  );
}




export const Form1 = (props) => {

  return (
    <div> <div>
    <TextField
      required
      id="outlined-required"
      label="Name"
      name="Name"
      defaultValue={props.obj!==undefined?props.obj.Name:""}
      onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
    />
   
    <TextField
      id="outlined-password-input"
      label="BirthDate"
      name="BirthDate"
      type="date"

      defaultValue={props.obj!==undefined?props.obj.BirthDate:"2017-05-24"}
      onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
    />
    <TextField
      required
      id="outlined-required"
      label="About"
      name="About"
      defaultValue={props.obj!==undefined?props.obj.About:""}
      
      onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
    />
   </div>
 
   <Button variant="contained" sx={{m:2}} onClick={()=>{props.setForm(2);}}>Next &gt;</Button>

    </div>
  )
}



export function Form2(props) {
 
  return (
    <div>
          <div>
        <TextField
       
          id="outlined-required"
          label="SSC Marks"
          name="SSC_Marks"
          type="number"
          defaultValue={props.obj!==undefined?props.obj.SSC_Marks:""}
          onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
        />
       
        <TextField
          id="outlined-password-input"
       
          type="number"
         label="HSC Marks"
         
         name={"HSC_Marks"}
         defaultValue={props.obj!==undefined?props.obj.HSC_Marks:""}
         onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
        />
          <TextField
          id="outlined-password-input"
          label="BTech Marks"
          name="BTech_Marks"
          type="number"
          defaultValue={props.obj!==undefined?props.obj.BTech_Marks:""}
          onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
          
        />
          <SkillsCkeckBox formData={props.setFormData}></SkillsCkeckBox>
      </div>
  
      <Button variant="contained" sx={{m:2}} onClick={()=>props.setForm(3)}>Next &gt;</Button>
      </div>
  )
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
      defaultValue={props.obj!==undefined?props.obj.Phone:""}
      onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
    />
   
    <TextField
      id="outlined-password-input"
      label="Address"
      name="Address"
      type="address"
      defaultValue={props.obj!==undefined?props.obj.Address:""}
      onChange={(e)=>props.setFormData(Data=>({...Data,[e.target.name]:e.target.value}))}
    />
  
  </div>
  <Button variant="contained"  sx={{m:2}}onClick={()=>props.setForm(4)}>Submit</Button>
 
  </div>
  )
}




export const SkillsCkeckBox = (props) => {
  const [checkList, setCheckList] = useState([])
  const handleChange=(e)=>{

if(!e.target.checked){
  console.log("Unckeck :",e.target.checked);
  if(checkList.includes(e.target.name)){
setCheckList((data)=>data.filter((item)=>item!==e.target.name))
  }
}else{
  console.log("ckeck :",e.target.checked);
  checkList.push(e.target.name);
  
}
console.log(checkList);
props.formData(data=>({...data,Skills:checkList}))
}

  
  return (
    <Box sx={{ display: 'flex',flexWrap:'wrap' }}>
    <FormControl sx={{ margin: "3px 10px",display:'flex',flexDirection:'row',flexWrap:'wrap' }} component="fieldset" variant="standard">
     <FormLabel component="legend">Skills</FormLabel>
     <FormGroup sx={{display:'flex', margin:'5px 50px',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
       <FormControlLabel
         control={
           <Checkbox onChange={handleChange} name="Java" />
         }
         label="Java"
       />
       
       <FormControlLabel
         control={
           <Checkbox  onChange={handleChange} name="Data Stracture" />
         }
         label="Data Stracture"
       />
     </FormGroup>
     <FormGroup sx={{display:'flex', margin:'5px 50px',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
      
       <FormControlLabel
         control={
           <Checkbox  onChange={handleChange} name="JavaScript" />
         }
         label="JavaScript"
       />
       <FormControlLabel
         control={
           <Checkbox  onChange={handleChange} name="React Js" />
         }
         label="React Js"
       />
     </FormGroup>
     <FormGroup sx={{display:'flex', margin:'5px 50px',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
      
      <FormControlLabel
        control={
          <Checkbox  onChange={handleChange} name="Data Science" />
        }
        label="Data Science"
      />
      <FormControlLabel
        control={
          <Checkbox  onChange={handleChange} name="Android" />
        }
        label="Android"
      />
    </FormGroup>
   </FormControl>
   </Box>
  )
}
