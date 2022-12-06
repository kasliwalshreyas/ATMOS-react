import React from "react";
import {List, Datagrid, TextField, DateField, ChipField, EditButton, DeleteButton, ShowButton} from 'react-admin';

const ProjectList = (props) => {
    return (
        <List {...props}>
            <Datagrid size="medium" sx={{
                '& .RaDatagrid-thead > tr > th': {
                    backgroundColor: '#d8d9d9',
                }
            }}>
                <TextField source="id" />
                <TextField source="projectName" />
                <TextField source="userId" emptyText="-"/>
                <ChipField source="type" emptyText="-"/>
                <TextField source="projectStatement" emptyText="-"/>
                <DateField source="lastUsed" />
                <EditButton basePath="/projectList" />
                <DeleteButton basePath="/projectList" />
                <ShowButton basePath="/projectList" />
            </Datagrid>
        </List>
    )
}

export default ProjectList;
