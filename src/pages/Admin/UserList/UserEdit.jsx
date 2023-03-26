import React from "react";
import { Edit, SimpleForm, TextInput, PasswordInput} from "react-admin";
    
    const UserEdit = (props) => {
        return (
            <Edit title="Edit User" {...props}>
                <SimpleForm sx={{ backgroundColor: '#fefefe' }}>
                    <h2 className="fw-bold" style={{ color: '#04315e' }}>Edit User Info</h2>
                    <TextInput disabled source="id" className="w-100" />
                    <TextInput source="userName" className="w-100" />
                    <TextInput source="emailId" className="w-100" />
                    <PasswordInput source="password" className="w-100" />
                </SimpleForm>
            </Edit>
        );
    }
    
    export default UserEdit;