import "../App.css";
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import DeleteBtnRenderer from "./DeleteBtnRenderer";

function Todolist() {
  interface Todo {
    description: string | null;
    date: Date | null;
    priority: string | null;
  }
  const gridRef = useRef<any>();
  const [todo, setTodo] = useState<Todo>({
    description: "",
    date: null,
    priority: "",
  });
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({
      description: "",
      date: null,
      priority: "",
    });
  };
  const deleteTodo = () => {
    const selectedRows = gridRef.current.getSelectedRows();
    if (selectedRows.length > 0) {
      const selectedTodo = selectedRows[0];
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo !== selectedTodo)
      );
    } else {
      alert("Select row first");
    }
  };

  const changeDate = (date: any): void => {
    setTodo({ ...todo, date });
  };

  const columns: ColDef[] = [
    {
      field: "description",
      sortable: true,
    },
    {
      field: "date",
      sortable: true,
      cellRenderer: (params: { value: any }) => {
        const formattedDate = params.value
          ? params.value.format("DD-MM-YYYY")
          : "";
        return formattedDate;
      },
    },
    {
      field: "priority",
      sortable: true,
      cellStyle: (params: any) =>
        params.value === "High" || params.value === "high"
          ? { color: "red" }
          : { color: "black" },
    },
    {
      width: 160,
      sortable: false,
      filter: false,
      headerName: "",
      field: "_links.self.href",
      cellRenderer: DeleteBtnRenderer,
      cellRendererParams: {
        onClick: () => deleteTodo(),
      },
    },
  ];

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Description"
            name="description"
            value={todo.description}
          />

          <DatePicker
            label="Date"
            value={todo.date}
            onChange={(date) => changeDate(date)}
          />
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Priority"
            name="priority"
            value={todo.priority}
          />
          <Button onClick={addTodo} variant="contained">
            Add
          </Button>
        </Stack>
      </LocalizationProvider>
      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "800px", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          animateRows={true}
          columnDefs={columns}
          rowData={todos}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Todolist;
