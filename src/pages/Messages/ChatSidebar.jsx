import React, { useState, useEffect } from "react"
import { createStyles, Flex, Paper, Text } from '@mantine/core';
import { Group, Avatar, Accordion } from '@mantine/core';
import { List, ThemeIcon, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: theme.spacing.md,
        height: '50px',

        // border: '1px solid rgba(206, 201, 201, 0.7)',
        // borderRadius: '5px',
        // margin: '5px 0 5px 0',

        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));








const ChatSidebar = ({chat, currentUserId}) => {
    // console.log("sidebar",projects)

    const { classes } = useStyles();
    console.log(chat)
    // const collaborators = []
    // projects.projectHighAccessMembers.map(collaborator => {
    //     collaborators.push(collaborator.userName)
    // })
    // projects.projectMediumAccessMembers.map(collaborator => {
    //     collaborators.push(collaborator.userName)
    // })
    // projects.projectLowAccessMembers.map(collaborator => {
    //     collaborators.push(collaborator.userName)
    // })
    // console.log(collaborators)
    return (
        <>
            <div style={{paddingLeft: '20px' }}>
                                <Text size="sm" weight={500}>
                                    Project Description:
                                </Text>
                            </div>
                            <div style={{paddingLeft: '20px', marginTop:'10px' }}>
                                <Text size="sm" weight={500}>
                                    Collaborators: 
                                </Text>
                            </div>
            {/* {collaborators && collaborators.map((collaborator, index) => {
                if(user && collaborator && collaborator != user.userName){
                return (
                    <Paper
                        sx={classes.user}
                        key={index}
                    >
                        
                
                        
                        <Flex align={'center'} justify={'center'} sx={classes.membercard}>
                            <div style={{ display: 'flex' }}>
                                <ThemeIcon color="teal" size={24} radius="xl">
                                    <Avatar src="avatar.png" alt="it's me" />
                                </ThemeIcon>
                            </div>
                            <div style={{ flex: 1, paddingLeft: '20px' }}>
                                <Text size="sm" weight={500}>
                                    {collaborator}
                                </Text>
                            </div>
                        </Flex>
                    </Paper>
                )
                }
            })} */}
            {/* </Flex> */}
        </>
    )
}


export default ChatSidebar;