import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    Header
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
    Icon123
} from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({

    header: {
        paddingLeft: theme.spacing.lg,
        paddingRight: theme.spacing.xl,
    },

    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        '&, &:hover': {
            display: 'block',
            lineHeight: 1,
            padding: '8px 12px',
            borderRadius: theme.radius.sm,
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

const user = {
    "name": "Jane Spoonfighter",
    "email": "janspoon@fighter.dev",
    "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
}

// const tabs = ["Home", "Projects", "Message", "Notes"];

const links = [
    {
        "link": "/home",
        "label": "Home"
    },
    {
        "link": "/projects",
        "label": "Projects"
    },
    {
        "link": "/message",
        "label": "Message"
    },
    {
        "link": "/notes",
        "label": "Notes"
    }
]

const Navbar_v2 = ({ activeLink }) => {
    const { classes, theme } = useStyles();
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(activeLink);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = links.map((link) => (
        <div className={active === link.link ? classes.linkActive : classes.link} onClick={(event) => {
            event.preventDefault();
            setActive(link.link);
            close();
        }}>
            <Link to={link.link} key={link.label} >
                {link.label}
            </Link>
        </div>

    ));
    // <a
    //     key={link.label}
    //     href={link.link}
    //     className={active === link.link ? classes.linkActive : classes.link}
    //     onClick={(event) => {
    //         event.preventDefault();
    //         setActive(link.link);
    //         close();
    //     }}
    // >
    //     {link.label}
    // </a>

    return (
        <Header height={56} className={`${classes.header}`} >
            <div className={classes.inner}>

                <Title>ATMOS</Title>

                <Group>
                    {items}
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
            </div>
        </Header >
    );
}


export default Navbar_v2;