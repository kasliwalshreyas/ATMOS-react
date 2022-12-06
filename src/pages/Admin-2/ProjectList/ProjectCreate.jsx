import React from "react";
import { Create, SimpleForm, TextInput, DateInput,
    ArrayInput,
    NumberInput,
    SelectInput,
    SimpleFormIterator,
    required,
    minLength,
    maxLength,
} from "react-admin";

const validateProjectName = [required('Field is required'), minLength(3), maxLength(20)];
const validateProjectStatement = [required('Field is required'), minLength(3), maxLength(50)];
const validateProjectMission = [required('Field is required'), minLength(3), maxLength(50)];
const validateProjectDescription = [required('Field is required'), minLength(3), maxLength(50)];
const validateProjectGuidlines = [required('Field is required'), minLength(3), maxLength(50)];
const validateRequire = [required('Field is required')];


const ProjectCreate = (props) => {
    return (
        <Create title="Create a Project" {...props}>
            <SimpleForm>
                <TextInput source="projectName" validate={validateProjectName} />
                <SelectInput source="type" choices={[
                    { id: 'Personal', name: 'Personal' },
                    { id: 'Education', name: 'Education' },
                    { id: 'Business', name: 'Business' },
                ]} validate={validateRequire} />
                <TextInput source="projectStatement" validate={validateProjectStatement} />
                <TextInput source="projectMission" validate={validateProjectMission} />
                <TextInput source="projectDescription" validate={validateProjectDescription} />
                <TextInput source="projectGuidlines" validate={validateProjectGuidlines} />
                <NumberInput source="userId" validate={validateRequire} max={100} min={1}  />
                <ArrayInput source="sectionIDList" label="Section ID List" validate={validateRequire}>
                    <SimpleFormIterator getItemLabel={index => `#${index + 1}`} fullWidth>
                        <NumberInput label="Section ID" max={100} min={1} />
                    </SimpleFormIterator>
                </ArrayInput>
                <DateInput source="lastUsed" validate={validateRequire} />
            </SimpleForm>
        </Create>
    );
}

export default ProjectCreate;