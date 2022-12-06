import React from "react";
import {List, Datagrid, TextField, EmailField, EditButton, DeleteButton, ShowButton} from 'react-admin';

const UserList = (props) => {
    return (
        <List {...props}>
            <Datagrid size="medium" sx={{
                '& .RaDatagrid-row': {
                    backgroundColor: '#54a6f7',
                    color: '#032649',
                },
                '& .RaDatagrid-row:hover': {
                    backgroundColor: '#032649',
                    color: '#54a6f7',
                },
                '& .RaDatagrid-row:active': {
                    backgroundColor: '#032649',
                    color: '#54a6f7',
                },
                '& .RaDatagrid-thead > tr > th': {
                    backgroundColor: '#032649',
                    color: '#54a6f7',
                }
            }}>
                <TextField source="id" />
                <TextField source="userName" />
                <EmailField source="emailId" />
                <EditButton basePath="/userList" />
                <DeleteButton basePath="/userList" />
                <ShowButton basePath="/userList" />
            </Datagrid>
        </List>
    )
}

export default UserList;
