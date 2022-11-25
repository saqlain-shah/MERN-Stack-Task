import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {
  addVehicle,
  deleteVehicle,
  listVehicles,
  updateVehicle,
} from "../methods/vehicle";
import { StyledEngineProvider } from "@mui/material";
import { forwardRef } from 'react';

function DataTable() {
  const [data, setData] = useState([]);

  const userData = window.localStorage.getItem("userData");

  useEffect(() => {
    getVehicleData();
  }, []);

  const getVehicleData = () => {
    fetch("http://localhost:8800/api/cars/list")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  };
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const columns = [
    {
      title: "Company",
      field: "company",
      validate: (rowData) =>
        rowData.company === undefined || rowData.company === ""
          ? "Required"
          : true,
    },
    {
      title: "Category",
      field: "category",
      validate: (rowData) =>
        rowData.category === undefined || rowData.category === ""
          ? "Required"
          : true,
    },
    {
      title: "Model",
      field: "model",
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "Required" : true,
    },
    {
      title: "Color",
      field: "color",
      validate: (rowData) =>
        rowData.color === undefined || rowData.color === "" ? "Required" : true,
    },
    {
      title: "Make",
      field: "make",
      validate: (rowData) =>
        rowData.make === undefined || rowData.make === "" ? "Required" : true,
    },
    {
      title: "Registration No.",
      field: "registrationNo",
      validate: (rowData) =>
        rowData.registrationNo === undefined || rowData.registrationNo === ""
          ? "Required"
          : true,
    },
  ];
  return (
    <div className="App">
      <h4 align="center">
        CRUD operation for Vehicles (with Validation) in Material Table
      </h4>
      <MaterialTable
        title="Vehicle Details"
        icons={tableIcons}
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              //Backend call
              addVehicle(JSON.parse(userData), newData).then((resp) => {
                getVehicleData();
                resolve();
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
              updateVehicle(JSON.parse(userData), newData).then((resp) => {
                getVehicleData();
                resolve();
              });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
              deleteVehicle(JSON.parse(userData), oldData).then((resp) => {
                getVehicleData();
                resolve();
              });
            }),
        }}
      />
    </div>
  );
}

export default DataTable;
