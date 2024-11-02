import React, { useState } from "react";
import { useRequest } from "ahooks";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchCharacters } from "../api/charactersApi.jsx";

const Heroes = () => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const navigate = useNavigate();

  const { data, error, loading } = useRequest(() => fetchCharacters(page), {
    onSuccess: (result) => {
      setTotalRows(result.info.count);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching characters: {error.message}</p>;

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        "& .MuiDataGrid-row": { cursor: "pointer" },
      }}
    >
      <DataGrid
        rows={data.results || []}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          { field: "name", headerName: "Name", width: 250 },
          { field: "status", headerName: "Status", width: 130 },
        ]}
        pageSize={20}
        rowCount={totalRows}
        pagination
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage + 1)}
        loading={loading}
        onRowClick={(params) => navigate(`/heroes/${params.id}`)}
      />
    </Box>
  );
};

export default Heroes;
