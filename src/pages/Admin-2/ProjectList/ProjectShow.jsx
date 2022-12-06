import {Show, SimpleShowLayout, TextField, RichTextField, DateField, ChipField} from 'react-admin';

const ProjectShow = (props) => {
    return (
        <Show title="Project Details" {...props} sx={{width: '100%',
        height: '100%',
        fontSize: '1.3rem',
        fontWeight: 'bold',
        '& .RaShow-card': {
            backgroundColor: '#54a6f7',
            color: '#032649',
            borderRadius: '10px',
            margin: '10px 0px 20px 20px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
            padding: '20px',
        },
        }} >
            <SimpleShowLayout>
                <TextField source="id" label="ID" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <TextField source="projectName" label="Username" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <ChipField source="type" label="Type" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <TextField source="projectStatement" label="Project Statement" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <TextField source="projectMission" label="Project Mission" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <TextField source="projectGuidelines" label="Project Guidelines" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <RichTextField source="projectDescription" label="Project Description" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <TextField source="userId" label="User ID" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <DateField source="lastUsed" label="Last Used" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />   
            </SimpleShowLayout>
        </Show>
    );
}

export default ProjectShow;