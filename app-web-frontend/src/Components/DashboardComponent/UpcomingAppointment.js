import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Chip } from "@mui/material";


const columns = [
  { field: "id", headerName: <b>Appointment Number</b>, width: 200 },
  { field: "name", headerName: <b>Patient Name</b>, width: 200, renderCell: (params) => (
    <span style={{ color: 'blue' }}>{params.value}</span>) },
  { field: "age", headerName: <b>Patient Age</b>, width: 150, renderCell: (params) => (
    <span style={{ color: 'blue' }}>{params.value}</span>) },
  { field: "status",
  headerName: <b>Status</b>,
  width: 150,
  renderCell: (params) => {
    const status = statuses.find((status) => status.label === params.value);
    return (
      <Chip
        label={status.label}
        variant="filled"
        color={status.color}
      />
    );
  },
 },
  {
    field: "actions",
    headerName: <b>Actions</b>,
    width: 200,
    renderCell: (params) => (
      <strong>
        <IconButton variant="contained" color="primary" size="small"  aria-label="view">
        <VisibilityIcon />
        </IconButton>
        <IconButton variant="contained" color="primary" size="small" style={{ marginLeft: 16 }} aria-label="edit">
        <EditIcon />
        </IconButton>
        <IconButton variant="contained" color="error" size="small" style={{ marginLeft: 16 }} aria-label="delete">
        <DeleteIcon />
        </IconButton>
      </strong>
    ),
  },
];

const statuses = [
    { label: "Attending", color: "primary" },
    { label: "Attended", color: "success" },
    { label: "No Info", color: "warning" },
    { label: "Canceled", color: "error" },
    { label: "Confirmed", color: "success" },
  ];

// const rows = [
//   { id: "ML23456", name: "John Appleseed", age: 25, status:statuses },
// ];


const DataTable = ({rows}) => {
  return (
    <div style={{ height: 300, width: '60%'}}>
      <h1 style={{color: "red", display: 'flex', justifyContent: 'center'}}>Upcoming Appoinments</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        //checkboxSelection
      />

    </div>
  );
}

export default DataTable;