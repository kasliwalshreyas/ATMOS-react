import React from "react";
import { Create, SimpleForm, TextInput,
 PasswordInput,
ArrayInput,
NumberInput,
SimpleFormIterator,
required,
    minLength,
    maxLength,
    regex,
    email
} from "react-admin";

const validateUserName = [required('Field is required'), minLength(3), maxLength(20)];
const validateEmailId = [required('Field is required'), email()];
const validatePassword = [required('Field is required'), regex(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/, 'Password should be atleast 8 characters long and should contain atleast one lowercase letter')];

const UserCreate = (props) => {
    return (
        <Create title="Create a User" {...props}>
            <SimpleForm>
                <TextInput source="userName" validate={validateUserName} />
                <TextInput source="emailId" validate={validateEmailId} />
                <PasswordInput source="password" validate={validatePassword} />
                <ArrayInput source="projectIDList" label="Project ID List">
                    <SimpleFormIterator getItemLabel={index => `#${index + 1}`} fullWidth>
                        <NumberInput label="Project ID" max={100} min={1} />
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="favouriteProjectList" label="Favourite Project List">
                    <SimpleFormIterator getItemLabel={index => `#${index + 1}`} fullWidth>
                        <NumberInput label="Project ID" max={100} min={1} />
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
}

export default UserCreate;