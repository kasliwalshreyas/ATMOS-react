import {Show, SimpleShowLayout, TextField, EmailField, ArrayField, ChipField} from 'react-admin';

const UserShow = (props) => {
    return (
        <Show title="User Details" {...props} sx={{width: '100%',
        height: '100%',
        fontSize: '1.3rem',
        fontWeight: 'bold',
        '& .RaShow-card': {
            backgroundColor: '#54a6f7',
            color: '#032649',
            borderRadius: '10px',
            margin: '20px 0px 0px 20px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
            padding: '20px',
        }
        }} >
            <SimpleShowLayout>
                <TextField source="id" label="ID" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <TextField source="userName" label="Username" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <EmailField source="emailId" label="Email" sx={{fontSize: '1.1rem', fontWeight: 'bold', color: '#032649'}} />
                <ArrayField source="projectIDList" label="Projects" sx={{fontSize: '1.3rem', fontWeight: 'bold', color: '#032649'}} >
                    <ChipField source="projectIDList" />
                </ArrayField>
                <ArrayField source="favouriteProjectList" label="Favourite Projects" sx={{fontSize: '1.3rem', fontWeight: 'bold', color: '#032649'}} >
                    <ChipField source="favouriteProjectList" />
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
}

export default UserShow;