import { Box, Button, styled, TextareaAutosize } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CommentImg from "../../../assets/comment.png";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;
const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  objectFit: "cover",
});
const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;
const initialValues = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};
const Comments = ({ post }) => {
  const [comment, setComment] = useState(initialValues);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { account } = useContext(DataContext);
  useEffect(() => {
    const getData = async () => {
      let res = await API.getAllComments(post._id);
      if (res.isSuccess) {
        setComments(res.data);
      }
    };
    if (post._id) {
      getData();
    }
  }, [toggle, post]);
  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };
  const addComment = async (e) => {
    await API.newComment(comment);
    setComment(initialValues);
    setToggle((prev) => !prev);
  };
  return (
    <Box>
      <Container>
        <Image src={CommentImg} alt="commentImg" />
        <StyledTextArea
          minRows={5}
          placeholder="Whats on your ming?"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setToggle={setToggle}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
