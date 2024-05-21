import {
  Box,
  Button,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Input from "./Input";

const CreatePlayListModal = ({
  isOpen,
  onClose,
  setPlaylist,
  playList,
  playlistName,
  setPlayListName,
  handleAddtoPlaylist,
  handleMoviesToPlaylist,
  movie,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 2,
          mx: "auto",
          my: "20%",
        }}
      >
        <CardContent>
          {/* <input
            type="text"
            placeholder="name your playlist"
            value={playlistName}
            onChange={(e) => setPlayListName(e.target.value)}
          />

          <Button onClick={handleAddtoPlaylist}>Create new playlist</Button> */}

          <Input
            value={playlistName}
            onClick={handleAddtoPlaylist}
            setPlayListName={setPlayListName}
          />
        </CardContent>
        {playList.map((list, index) => (
          <Typography key={index} gutterBottom variant="h6" component="div">
            <Button onClick={() => handleMoviesToPlaylist(list._id, movie)}>
              {list.name}
            </Button>
          </Typography>
        ))}
      </Box>
    </Modal>
  );
};

export default CreatePlayListModal;
