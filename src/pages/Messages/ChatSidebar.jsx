import React, { useState, useEffect } from "react"
import { Text } from '@mantine/core';
import { Group, Avatar, Accordion } from '@mantine/core';
import { List, ThemeIcon, Badge } from '@mantine/core';
const ChatSidebar= ({projects})=>{
    // console.log("sidebar",projects)
    const collaborators = []
    projects.projectHighAccessMembers.map(collaborator =>{
        collaborators.push(collaborator.userName)
    })
    projects.projectMediumAccessMembers.map(collaborator =>{
        collaborators.push(collaborator.userName)
    })
    projects.projectLowAccessMembers.map(collaborator =>{
        collaborators.push(collaborator.userName)
    })
    console.log(collaborators)
    return (
        <>
            <List>
                {collaborators && collaborators.map((collaborator,index) =>{
                    // console.log(collaborator)
                    return(
                        <List.Item 
                        key={index}
                        icon={
                            <ThemeIcon color="teal" size={24} radius="xl">
                                <Avatar src="avatar.png" alt="it's me" />
                            </ThemeIcon>
                        }>
                          {collaborator}
                        </List.Item>
                    )
                })}
            </List>
        </>
    )
}


export default ChatSidebar;