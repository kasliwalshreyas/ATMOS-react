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
import ProfileMenu from './ProfileMenu';


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

    return (
        <Header height={56} className={`${classes.header}`} >
            <div className={classes.inner}>

                <Title>ATMOS</Title>

                <Group>
                    {items}
                    <ProfileMenu userInfo={user} />
                </Group>
            </div>
        </Header >
    );
}


export default Navbar_v2;