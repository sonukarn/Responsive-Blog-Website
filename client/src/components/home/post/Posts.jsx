import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../../service/api";
import { Box, Grid, styled } from "@mui/material";
import Post from "./Post";
const Details = styled(Link)`
  text-decoration: none;
  color: #333;
`;
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getAllPost({ category: category || "" });
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Grid item lg={3} sm={4} xs={12}>
              <Details to={`details/${post._id}`}>
                <Post post={post} />
              </Details>
            </Grid>
          );
        })
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontsize: 18 }}>
          No Posts Avilable to show
        </Box>
      )}
    </>
  );
};

export default Posts;
