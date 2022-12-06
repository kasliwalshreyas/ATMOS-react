import React from "react";
import { Edit, SimpleForm, TextInput, DateInput} from "react-admin";
    
const ProjectEdit = (props) => {
        return (
            <Edit title="Edit Project Details" {...props}>
                <SimpleForm>
                    <TextInput disabled source="id" />
                    <TextInput source="projectName" />
                    <TextInput source="type" />
                    <TextInput source="projectStatement" />
                    <TextInput source="userId" />
                    <DateInput disabled source="lastUsed" />
                </SimpleForm>
            </Edit>
        );
}
    
    export default ProjectEdit;