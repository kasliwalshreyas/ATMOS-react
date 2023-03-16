import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    Title,
    Header,
    // rem
} from '@mantine/core';
import {
    IconStar,
    IconArrowLeft,
    IconBook2,
    IconStarFilled
} from '@tabler/icons-react';
import ProfileMenu from "../../../UI/ProfileMenu";

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `$16px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
            }`,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: '38*16px',
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },

        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
    },

}));


const ProjectInfo_v2 = ({
    projectInfo,
    setProjectInfo,
    userInfo,
    activeTab,
    setActiveTab,
}) => {

    const navigate = useNavigate();

    const { classes, theme } = useStyles();
    // const [userMenuOpened, setUserMenuOpened] = useState(false);

    const [isStarred, setIsStarred] = useState(false);

    const [user, setUser] = useState({
        "name": "Jane Spoonfighter",
        "email": "janspoon@fighter.dev",
        "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
    });

    const backToProjects = () => {
        navigate('/projects');
    }



    const items = ['Overview', 'Board', 'Charts', 'Timeline'].map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {tab}
        </Tabs.Tab>
    ));

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        switch (tab) {
            case 'Overview':
                navigate(`/projects/${projectInfo._id}/overview`);
                break;
            case 'Board':
                navigate(`/projects/${projectInfo._id}/board`);
                break;
            case 'Charts':
                navigate(`/projects/${projectInfo._id}/charts`);
                break;
            case 'Timeline':
                navigate(`/projects/${projectInfo._id}/timeline`);
                break;
            default:
                break;
        }
    }



    return (
        <>
            <div className={classes.header}>
                <Container className={classes.mainSection} fluid={true} mb={'0px'}>
                    <Group position="apart">
                        <Group>
                            <IconArrowLeft size={30} onClick={backToProjects} />
                            <Group>
                                <IconBook2 size={70} />
                                <Title order={3}>
                                    {projectInfo.projectName}
                                </Title>
                                {isStarred && <IconStarFilled size={20} onClick={() => { setIsStarred(!isStarred) }} />}
                                {!isStarred && <IconStar size={20} onClick={() => { setIsStarred(!isStarred) }} />}
                            </Group>
                        </Group>
                        <ProfileMenu userInfo={user} />
                    </Group>
                </Container>
                <Container fluid={true}>
                    <Tabs
                        defaultValue="Home"
                        variant="outline"
                        classNames={{
                            root: classes.tabs,
                            tabsList: classes.tabsList,
                            tab: classes.tab,
                        }}
                        value={activeTab}
                        onTabChange={(tab) => { handleTabChange(tab) }}
                    >
                        <Tabs.List>{items}</Tabs.List>
                    </Tabs>
                </Container>
            </div>
        </>
    );
}

export default ProjectInfo_v2;