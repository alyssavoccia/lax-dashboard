import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';

function PlayerDataTable({ rows }) {
  const [editRowsModel, setEditRowsModel] = useState({});
  const [editRowData, setEditRowData] = useState({});
  const currentUser = useSelector((state) => state.user.user);

  const columns = [
    { field: 'displayName', headerName: 'Name', width: 150, editable: true },
    { field: 'id', headerName: 'ID', width: 75, type: 'number', editable: true },
    { field: 'grad', headerName: 'Grad Yr', width: 80, editable: true },
    { field: 'position', headerName: 'Position', width: 80, editable: true },
    { field: 'wb', headerName: "50's Wall Ball", type: 'number', width: 120, editable: true },
    { field: 'three', headerName: "300's", type: 'number', width: 60, editable: true },
    { field: 'broad', headerName: 'Broad Jump', type: 'number', width: 110, editable: true },
    { field: 'agility', headerName: '5-10-5', type: 'number', width: 75, editable: true },
  ];

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);

      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        // Get updated values
        const updatedData = {
          displayName: editRowData.displayName.value,
          id: editRowData.id.value,
          grad: editRowData.grad.value,
          position: editRowData.position.value,
          wb: editRowData.wb.value,
          three: editRowData.three.value,
          broad: editRowData.broad.value,
          agility: editRowData.agility.value,
        }

        // Update on firebase
        const docRef = doc(db, currentUser.team, editRowData.id.value, "data", editRowData.id.value);
        setDoc(docRef, updatedData);
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
    },
    [editRowData, currentUser.team],
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport sx={{color: '#06b6d4'}} />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="bg-white flex flex-col h-[500px] shadow-md rounded-lg">
      <DataGrid
        exportButton={true}
        rows={rows}
        columns={columns}
        editMode="row"
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        components={{ Toolbar: CustomToolbar }}
      />
    </div>
  )
}

export default PlayerDataTable;