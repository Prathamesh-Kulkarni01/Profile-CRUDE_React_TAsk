import { styled } from "@mui/material/styles";
import { Box, Grid, IconButton, Modal } from "@mui/material";

import { useState } from "react";

import { ProfileData } from "./ProfileData";
import ProfileItem from "./components/ProfileItem";
import Form from "./components/Form";
import ToolBar from "./components/Toolbar";

import { AddCircle } from "@mui/icons-material";

import "./App.css";

function App() {
  const [profiles, setProfiles] = useState(ProfileData);
  const [newDataFlag, setNewDataFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNewData = () => setNewDataFlag(!newDataFlag);
  const [editObj, setEditObj] = useState();
  const [displayForm, setDisplayForm] = useState(false);

  const onDelete = (id) => {
    setProfiles((savedData) => savedData.filter((val) => val.id !== id));
  };

  const onEdit = (...obj) => {
    setEditObj(...obj);
    handleOpen();
  };

  return (
    <div className="App">
      <ToolBar savedData={profiles} data={setProfiles} setDisplayForm={setDisplayForm}></ToolBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form
            addData={setProfiles}
            handle={setOpen}
            obj={editObj}
            newData={handleNewData}
          ></Form>
        </Box>
      </Modal>

      <Container>
        {displayForm === true ? (
          <Form
            addData={setProfiles}
            setDisplayForm={setDisplayForm}
            newData={handleNewData}
          ></Form>
        ) : (
          ""
        )}
        <Grid container spacing={0} sx={{ justifyContent: "center" }}>
          {profiles.map((val) => {
            return (
              <ProfileItem
                key={val.id + val.Name}
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
          sx={{
            height: "60px",
            width: "60px",
            position: "fixed",
            right: "30px",
            bottom: "40px",
            zIndex: "10000",
            backgroundColor: "#ffffff",
            boxShadow: "5px 5px 10px 3px   gray",
          }}
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
