import React from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { Box, Typography, CircularProgress } from "@mui/material";
import { fetchCharacterById } from "../api/charactersApi.jsx";

const HeroDetail = () => {
  const { id } = useParams();

  const { data, error, loading } = useRequest(() => fetchCharacterById(id));

  if (loading) return <CircularProgress />;
  if (error) return <p>Error fetching character details: {error.message}</p>;

  return (
    <Box>
      <img src={data.image} alt={data.name} />
      <Typography variant="h4">{data.name}</Typography>
      <Typography>Status: {data.status}</Typography>
    </Box>
  );
};

export default HeroDetail;
