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
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
    Icon123,
    IconBook2,
    IconArrowLeft,
    IconStarFilled
} from '@tabler/icons-react';

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

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
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
    isProfileClicked,
    setIsProfileClicked,
    projectInfo,
    setProjectInfo,
    userInfo,
    activeTab,
    setActiveTab,
}) => {

    const navigate = useNavigate();

    const { classes, theme } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

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
                        <Menu
                            width={260}
                            position="bottom-end"
                            transition="pop-top-right"
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    className={classes.user}
                                >
                                    <Group spacing={7}>
                                        <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}>
                                    Liked posts
                                </Menu.Item>
                                <Menu.Item icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
                                    Saved posts
                                </Menu.Item>
                                <Menu.Item icon={<IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />}>
                                    Your comments
                                </Menu.Item>

                                <Menu.Label>Settings</Menu.Label>
                                <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
                                <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                                    Change account
                                </Menu.Item>
                                <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>

                                <Menu.Divider />

                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                                    Pause subscription
                                </Menu.Item>
                                <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                                    Delete account
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
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
                        onTabChange={(tab) => setActiveTab(tab)}
                    >
                        <Tabs.List>{items}</Tabs.List>
                    </Tabs>
                </Container>
            </div>
        </>
    );
}

export default ProjectInfo_v2;