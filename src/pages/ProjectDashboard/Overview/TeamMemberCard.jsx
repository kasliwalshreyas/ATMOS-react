import React from 'react';
import styles from './TeamMemberCard.module.css';
import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
    Container,
    Flex
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: theme.spacing.md,

        // border: '1px solid rgba(206, 201, 201, 0.7)',
        // borderRadius: '5px',
        // margin: '5px 0 5px 0',

        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },

    membercard: {
        minWidth: '100%',
        padding: '0px',
        maxWidth: '100%',
    }

}));

const TeamMemberCard = ({ name, email, role, rightSectionIcon = false }) => {
    const { classes } = useStyles();

    return (
        <UnstyledButton className={classes.user} >
            <Flex align={'center'} justify={'center'} sx={classes.membercard}>

                <div style={{ display: 'flex' }}>
                    <Avatar src='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80' radius="xl" />
                </div>

                <div style={{ flex: 1, paddingLeft: '10px' }}>
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {rightSectionIcon && (<div style={{ display: 'flex' }}>
                    {<IconChevronRight size={14} stroke={1.5} />}
                </div>)}

            </Flex>
        </UnstyledButton >
    );
}

export default TeamMemberCard;