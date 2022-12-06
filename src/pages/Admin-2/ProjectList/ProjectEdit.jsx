import React from "react";
import { Edit, SimpleForm, TextInput, DateInput,
    ArrayInput,
    NumberInput,
    SelectInput,
    SimpleFormIterator,
    required,
    minLength,
    maxLength
} from "react-admin";

const validateProjectName = [required('Field is required'), minLength(3), maxLength(20)];
const validateProjectStatement = [required('Field is required'), minLength(3), maxLength(50)];
const validateProjectMission = [required('Field is required'), minLength(3), maxLength(50)];
const validateProjectDescription = [required('Field is required'), minLength(3), maxLength(50)];
const validateProjectGuidlines = [required('Field is required'), minLength(3), maxLength(50)];
const validateRequire = [required('Field is required')];

    
const ProjectEdit = (props) => {
        return (
            <Edit title="Edit Project Details" {...props}>
                <SimpleForm sx={{ backgroundColor: '#fefefe' }}>
                    <h2 className="fw-bold" style={{ color: '#04315e' }}>Edit Project Info</h2>
                    <TextInput disabled source="id" className="w-100" />
                    <TextInput source="projectName" validate={validateProjectName} className="w-100" />
                <SelectInput source="type" choices={[
                    { id: 'Personal', name: 'Personal' },
                    { id: 'Education', name: 'Education' },
                    { id: 'Business', name: 'Business' },
                ]} validate={validateRequire} className="w-100" />
                <TextInput source="projectStatement" validate={validateProjectStatement} className="w-100" />
                <TextInput source="projectMission" validate={validateProjectMission} className="w-100" />
                <TextInput source="projectDescription" validate={validateProjectDescription} className="w-100" />
                <TextInput source="projectGuidlines" validate={validateProjectGuidlines} className="w-100" />
                <NumberInput source="userId" validate={validateRequire} max={100} min={1}  className="w-100" />
                <ArrayInput source="sectionIDList" label="Section ID List" validate={validateRequire} className="w-100">
                    <SimpleFormIterator getItemLabel={index => `#${index + 1}`} fullWidth>
                        <NumberInput label="Section ID" max={100} min={1} />
                    </SimpleFormIterator>
                </ArrayInput>
                    <DateInput disabled source="lastUsed" className="w-100" />
                </SimpleForm>
            </Edit>
        );
}
    
    export default ProjectEdit;