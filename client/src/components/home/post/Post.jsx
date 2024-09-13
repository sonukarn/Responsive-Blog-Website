import { Box, styled, Typography } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";
const Container = styled(Box)`
  height: 350px;
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;
const Image = styled("img")({
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px 10px 0 0",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
});
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;
const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;
const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;
const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  return (
    <Container>
      <Image src={url} alt="blogPic" />
      <Text variant="subtitle1">{post.category}</Text>
      <Heading variant="h6">{addElipsis(post.title, 20)}</Heading>
      <Text>{post.username}</Text>
      <Details variant="body1">{addElipsis(post.description, 100)}</Details>
      <Typography variant="caption">{post.createdDate}</Typography>
    </Container>
  );
};

export default Post;
