import React from "react";
import {List, Datagrid, TextField, EmailField, EditButton, DeleteButton, ShowButton} from 'react-admin';

const UserList = (props) => {
    return (
        <List {...props}>
            <Datagrid size="medium" sx={{
                '& .RaDatagrid-thead > tr > th': {
                    backgroundColor: '#d8d9d9',
                }
            }}>
                <TextField source="id" />
                <TextField source="userName" />
                <EmailField source="email" />
                <EditButton basePath="/userList" />
                <DeleteButton basePath="/userList" />
                <ShowButton basePath="/userList" />
            </Datagrid>
        </List>
    )
}

export default UserList;