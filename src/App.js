import "./App.css";
import { styled } from "@mui/material/styles";
import ToolBar from "./components/Toolbar";
import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
import ProfileItem from "./components/ProfileItem";
import Form from "./components/Form";
import { ProfileData } from "./ProfileData";
import { useEffect, useState } from "react";
import { AddCircle } from "@mui/icons-material";

function App() {
  const [savedData, setSavedData] = useState(ProfileData);
  const [newDataFlag, setNewDataFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (val) => setOpen(false);
  const handleNewData = (val) => setNewDataFlag(!newDataFlag);
  const [editObj, setEditObj] = useState();
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    return () => {};
  }, [handleNewData, setDisplayForm]);

  const onDelete = (id) => {
    setSavedData((savedData) => savedData.filter((val) => val.id !== id));
  };

  const onEdit = (...obj) => {
    setEditObj(...obj);
    handleOpen();
  };

  return (
    <div className="App">
      <ToolBar setDisplayForm={setDisplayForm}></ToolBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        justifyContent="center"
      
      >
        <Box sx={style}>
          <Form handle={setOpen} obj={editObj} newData={handleNewData}></Form>
        </Box>
      </Modal>

      <Container>
        {displayForm === true ? (
          <Form setDisplayForm={setDisplayForm} newData={handleNewData}></Form>
        ) : (
          ""
        )}
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>
          {savedData.map((val) => {
            return (
              <ProfileItem
                key={val.id}
                data={val}
                delete={onDelete}
                editId={onEdit}
              ></ProfileItem>
            );
          })}
        </Grid>
        <IconButton
              size="large"
           
              
              aria-label="show more"
              sx={{  height:'60px', width:"60px",position:'fixed',right:"30px",bottom:"40px",zIndex:'10000',backgroundColor:'#ffffff',boxShadow:'5px 5px 10px 3px   gray'}}
              onClick={() => setDisplayForm(true)}
              aria-haspopup="true"
              color="inherit"
            >
              <AddCircle></AddCircle>
            </IconButton>
      </Container>
     
    </div>
  );
}

export default App;
const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: "20px",
  minHeight: "100vh",
  justifyContent: "center",

  backgroundColor: "#edf1ff",
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
