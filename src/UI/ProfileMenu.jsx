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

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },



}));



const ProfileMenu = ({ userInfo }) => {
    const { classes, theme } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [user, setUser] = useState(userInfo);


    return (<>
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
    </>);
}

export default ProfileMenu;