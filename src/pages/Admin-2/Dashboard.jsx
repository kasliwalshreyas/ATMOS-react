import React from "react";
import {Admin, Resource} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import UserList from './UserList/UserList';
import UserCreate from './UserList/UserCreate';
import UserEdit from "./UserList/UserEdit";
import UserShow from "./UserList/UserShow";
import UserIcon from '@mui/icons-material/Group';
import ProjectList from './ProjectList/ProjectList';
import ProjectCreate from './ProjectList/ProjectCreate';
import ProjectEdit from "./ProjectList/ProjectEdit";
import ProjectShow from "./ProjectList/ProjectShow";
import authProvider  from "./AuthProvider";
import ProjectIcon from '@mui/icons-material/LibraryBooks';
import DashboardAdmin from "./Dashboard/DashboardAdmin";

const Dashboard = () => (
    <Admin dashboard={DashboardAdmin} title="ATMOS Admin" basename="/admin-portal" authProvider={authProvider} dataProvider={simpleRestProvider('http://localhost:8000')}>
        <Resource name="userList" icon={UserIcon} options={{label: 'Users'}} list={UserList} create={UserCreate} edit={UserEdit} show={UserShow} />
        <Resource name="projectList" icon={ProjectIcon} options={{label:'Projects'}} list={ProjectList} create={ProjectCreate} edit={ProjectEdit} show={ProjectShow} />
    </Admin>
);

export default Dashboard;



