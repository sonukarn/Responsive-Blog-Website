import { Box, styled, Typography } from "@mui/material";
import { MdDeleteSweep } from "react-icons/md";
import React, { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;
const Container = styled(Box)`
  display: flex;
  margin-bottom: 7px;
`;
const UserName = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;
const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 15px;
`;
const DelIcon = styled(MdDeleteSweep)`
  margin-left: auto;
`;
const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const removeComment = async () => {
    let resp = await API.deleteComment(comment._id);
    if (resp.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };
  return (
    <Component>
      <Container>
        <UserName>{comment.name}</UserName>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.username && (
          <DelIcon size={28} onClick={() => removeComment()} />
        )}
      </Container>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
