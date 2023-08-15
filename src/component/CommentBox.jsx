import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import Typography from "@mui/material/Typography";
import {useParams} from 'react-router-dom';
import UserService from "../services/user.service";

export function TextareaComment() {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [eventData, setEventData] = useState('');
    const [comment, setComment] = useState('');
    const songId = useParams().id;
    const commentsArray = eventData;

    const handleComment = () => {
        UserService.submitComment(comment, songId)
            .then()
            .catch(e => {
                console.log(e)
            });
    }

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8000/sse/comment-on-song');

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);

            if (eventData.eventData) {
                setEventData(eventData.relatedComments);
            } else {
                setEventData(eventData.initialComments);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <FormControl>
            <FormLabel sx={{color: "white", marginLeft: "10px", fontSize: "16px"}}>Comment here</FormLabel>
            <Textarea
                placeholder="Type something here…"
                minRows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',

                        }}
                    >
                        <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <FormatBold/>
                            <KeyboardArrowDown fontSize="md"/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            size="sm"
                            placement="bottom-start"
                            sx={{'--ListItemDecorator-size': '24px'}}
                        >
                            {['200', 'normal', 'bold'].map((weight) => (
                                <MenuItem
                                    key={weight}
                                    selected={fontWeight === weight}
                                    onClick={() => {
                                        setFontWeight(weight);
                                        setAnchorEl(null);
                                    }}
                                    sx={{fontWeight: weight}}
                                >
                                    <ListItemDecorator>
                                        {fontWeight === weight && <Check fontSize="sm"/>}
                                    </ListItemDecorator>
                                    {weight === '200' ? 'lighter' : weight}
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                        >
                            <FormatItalic/>
                        </IconButton>
                        <Button
                            sx={{ml: 'auto', backgroundColor: "#4CAF50"}}
                            onClick={handleComment}
                        >
                            Send
                        </Button>
                    </Box>
                }
                sx={{
                    color: "white",
                    minWidth: 300,
                    fontWeight,
                    fontStyle: italic ? 'italic' : 'initial',
                    backgroundColor: "#000",
                }}
            />

            <h1 style={{color: "white", marginLeft: "10px", fontSize: "16px"}}>All Comments</h1>
            {commentsArray && commentsArray.length > 0 && (
                commentsArray.map((comment) => (
                    <Box
                        key={comment._id}
                        sx={{
                            marginLeft: '10px',
                            border: '1px solid black',
                            padding: '5px',
                            boxShadow: '3px 3px 5px rgba(1, 1, 1, 1)',
                            marginBottom: '10px',
                        }}
                    >
                        <Typography sx={{color: 'white'}}>{comment.user.username}</Typography>
                        <Typography sx={{color: 'white'}}>{comment.content}</Typography>
                        <Typography sx={{color: 'white'}}>{comment.uploadTime}</Typography>
                    </Box>
                ))
            )}
        </FormControl>
    );
}