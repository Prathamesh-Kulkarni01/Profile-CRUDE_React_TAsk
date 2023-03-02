import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Business, Code, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  Grid,
  ListItemIcon,
  Stack,
  Tooltip,
} from "@mui/material";

export default function ProfileItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 380,
        minWidth: 370,
        maxHeight: 480,
        margin: 1,
        borderRadius: "10px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.data.Name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.data.Name}
        subheader={props.data.BirthDate}
      />
      <Divider sx={{ m: 0 }} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.data.About}
        </Typography>
        <Divider sx={{ m: 1 }} />
        <Box sx={{ display: "flex" }}>
          <ListItemIcon>
            <Business sx={{ borderRadius: "50%" }} />
          </ListItemIcon>
          <Typography primary="Skills">Marks</Typography>
        </Box>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
          spacing={2}
        >
          <Grid item >
            <Typography>SSC:{" " + props.data.SSC_Marks}</Typography>
          </Grid>
          <Grid item >
            <Typography>HSC:{" " + props.data.HSC_Marks}</Typography>
          </Grid>
          <Grid item >
            {props.data.BTech_Marks && (
              <Typography>BTech:{" " + props.data.BTech_Marks}</Typography>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ m: 1 }} />
        <Box sx={{ display: "flex" }}>
          <ListItemIcon>
            <Code sx={{ borderRadius: "50%" }}></Code>
          </ListItemIcon>
          <Typography primary="Skills">Skills</Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          <Stack direction="row" overflow="auto"  justifyContent="center" spacing={1}>
            {props.data.Skills.map((val) => {
              return <Chip  key={val} label={val} />;
            })}
          </Stack>
        </Box>

        <Divider sx={{ margin: "10px 0px" }} />

        <Box sx={{ display: "flex" }}>
          <ListItemIcon>
            <Business sx={{ borderRadius: "50%" }} />
          </ListItemIcon>
          <Typography primary="Skills">Address</Typography>
        </Box>
        <Typography variant="body2" sx={{ m: 1 }} color="text.secondary">
          {props.data.Address.substring(0, 140)}
        </Typography>
      </CardContent>
      <Divider sx={{ m: 0 }} />
      <CardActions sx={{ float: "right", display: "flex" }} disableSpacing>
        <Tooltip title="Edit">
          <IconButton onClick={() => props.editId(props.data)}>
            <Edit  />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton  onClick={() => props.delete(props.data.id)}>
            <Delete
              color="red"
            ></Delete>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
