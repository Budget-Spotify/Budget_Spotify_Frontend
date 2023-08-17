import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";

export function TextareaComment() {
  const [eventData, setEventData] = useState("");
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const songId = useParams().id;
  const commentsArray = eventData;

  useEffect(() => {
    UserService.showCommentInSong(songId)
      .then((result) => {
        setEventData(result.data.allComment);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleComment = () => {
    if (comment) {
      UserService.submitComment(comment, songId)
        .then(() => {
          setComment("");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleDeleteComment = () => {
    UserService.deleteComment(commentId)
      .then()
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8000/sse/comment-on-song/" + songId
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log(eventData);
      if(eventData.songId===songId){
        setEventData(eventData.relatedComments);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <FormControl sx={{width:"75vw"}}>
      <FormLabel sx={{ color: "white", marginLeft: "10px", fontSize: "16px" }}>
        Comment here
      </FormLabel>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%"
        }}
      >
        <TextField
          placeholder="Type something here…"
          multiline
          minRows={3}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    "&:hover": {
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                  }}
                  onClick={handleComment}
                >
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#bdbdbd",
                },
              },
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      </Box>

      <h1 style={{ color: "white", marginLeft: "10px", fontSize: "16px" }}>
        All Comments
      </h1>
      {commentsArray &&
        commentsArray.length > 0 &&
        commentsArray.map((comment) => (
          <Box
            key={comment._id}
            sx={{
              marginLeft: "10px",
              border: "1px solid black",
              padding: "5px",
              boxShadow: "3px 3px 5px rgba(1, 1, 1, 1)",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ color: "white" }}>
              {comment.user?.username}
            </Typography>
            <Typography sx={{ color: "white" }}>{comment.content}</Typography>
            <Typography sx={{ color: "white" }}>
              {comment.uploadTime}
            </Typography>
          </Box>
        ))}
    </FormControl>
  );
}
