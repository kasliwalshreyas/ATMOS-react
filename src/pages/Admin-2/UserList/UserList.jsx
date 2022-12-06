import React from "react";
import {List, Datagrid, TextField, EmailField, EditButton, DeleteButton, ShowButton} from 'react-admin';

const UserList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
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
