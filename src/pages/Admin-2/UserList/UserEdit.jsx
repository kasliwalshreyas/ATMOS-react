import React from "react";
import { Edit, SimpleForm, TextInput,
    EmailInput, PasswordInput
    } from "react-admin";
    
    const UserEdit = (props) => {
        return (
            <Edit title="Edit User" {...props}>
                <SimpleForm>
                    <TextInput disabled source="id" />
                    <TextInput source="userName" />
                    <TextInput source="emailId" />
                    <PasswordInput source="password" />
                </SimpleForm>
            </Edit>
        );
    }
    
    export default UserEdit;