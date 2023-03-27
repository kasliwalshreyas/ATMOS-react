import io from "socket.io-client";
import React, { useState, useEffect } from "react"
import ChatSidebar from "./ChatSidebar"
import Navbar_v2 from "../../UI/Navbar_v2";
import { Container, Flex, ScrollArea } from '@mantine/core';
// import GetMessages from "./chats"
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { Box } from '@mantine/core';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { Group, Avatar, Accordion } from '@mantine/core';
import { Badge } from '@mantine/core';
import { Tabs } from '@mantine/core';
import GetMessages from "./chats";
// import ChatEditor from "../ProjectDashboard/Board/ChatEditor";
import ChatWriter from "./ChatWriter";

// import "./styles.css"
// const socket = io.connect("http://localhost:4001/message");
const socket = io.connect("http://localhost:4000");

const Chats = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [projects, setProjects] = useState(null);
  // const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("http://localhost:4000/user/getUserInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    }
    getUser();
  }, []);

    useEffect(() => {
      async function getAllUsers() {
      const res = await fetch("http://localhost:4000/user/getUserList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setAllUsers(data.userList);
      }
    }
    getAllUsers();
  }, []);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // socket && console.log(socket)
  // user && console.log(user)
  const projectChat = (project)=>{
    console.log(project)
    setProjects(project)
    // loadChats(project)
    socket.emit("load_project", project._id)

  }
  const loadChats = (project)=>{
    socket.emit("load_project", project._id)
  }

  return (
    <>
    <Container fluid={true} p={0} m={0} h={'93vh'}>
    {user && <Navbar_v2 activeLink={'/message'} user={user} />}
    {
        <Flex h={'90vh'}>
          <Flex>
          <Navbar p={0} m={0} hiddenBreakpoint="sm" hidden={!opened} width={'20%'} grow component={ScrollArea}>
            <Tabs defaultValue="gallery" m={0} p={0}>
              <Tabs.List>
                <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}> Projects</Tabs.Tab>
                <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>Direct Messages</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery">
                <Accordion defaultValue="customization"
                 chevron >
                  {user && user.projectIdList.map((project,index) => {
                    // console.log(project)
                    return(
                          <Accordion.Item value={project._id} onClick={()=>{projectChat(project)}}
                          key={index}
                          >
                          <Accordion.Control>{project.projectName}<br />
                            <Badge>{project.projectType}</Badge>
                          </Accordion.Control>
                        </Accordion.Item>
                        )
                  })}
                </Accordion>
              </Tabs.Panel>

              <Tabs.Panel value="messages">
                <Accordion defaultValue="customization" chevron>
                  {allUsers && allUsers.map((allUser,index)=>{
                    // console.log(allUser)
                    return(
                  <Accordion.Item value="customization" key={index}>
                    <Accordion.Control>
                      <Group noWrap>
                        <Avatar src="avatar.png" radius="xl" size="lg" alt="it's me" />
                        <div>
                          <Text>{allUser.userName}</Text>
                        </div>
                      </Group>
                    </Accordion.Control>
                  </Accordion.Item>
                    )
                  })}       
                </Accordion>
              </Tabs.Panel>
            </Tabs>
          </Navbar>
          </Flex>
          <Flex direction={'column'} justify={'flex-end'}  w={'60%'} pb={15} >
            
          {projects &&  <GetMessages socket= {socket} user={user} projectid= {projects._id} />}
          {projects && <ChatWriter socket= {socket} user={user} projectid= {projects._id} />}

          </Flex>
          <Flex sx={{borderLeft: '5px'}} mr={0} w={'20%'}> 

          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
           <Aside hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            {projects && <ChatSidebar projects = {projects} />}
             </Aside>
         </MediaQuery>
          </Flex>
        </Flex>

    }
    </Container>
    </>
  );
};

export default Chats;

      // <AppShell
      // navbarOffsetBreakpoint="sm"
      // asideOffsetBreakpoint="sm"
      // // padding= "1"
      // navbar={
      //   <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} grow component={ScrollArea}>
      //       <Tabs defaultValue="gallery">
      //         <Tabs.List>
      //           <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}> Projects</Tabs.Tab>
      //           <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>Direct Messages</Tabs.Tab>
      //         </Tabs.List>

      //         <Tabs.Panel value="gallery" pt="xs">
      //           <Accordion defaultValue="customization"
      //            chevron >
      //             {user && user.projectIdList.map((project,index) => {
      //               // console.log(project)
      //               return(
      //                     <Accordion.Item value={project._id} onClick={()=>{projectChat(project)}}
      //                     key={index}
      //                     >
      //                     <Accordion.Control>{project.projectName}<br />
      //                       <Badge>{project.projectType}</Badge>
      //                     </Accordion.Control>
      //                   </Accordion.Item>
      //                   )
      //             })}
      //           </Accordion>
      //         </Tabs.Panel>

      //         <Tabs.Panel value="messages" pt="xs">
      //           <Accordion defaultValue="customization" chevron>
      //             {allUsers && allUsers.map((allUser,index)=>{
      //               // console.log(allUser)
      //               return(
      //             <Accordion.Item value="customization" key={index}>
      //               <Accordion.Control>
      //                 <Group noWrap>
      //                   <Avatar src="avatar.png" radius="xl" size="lg" alt="it's me" />
      //                   <div>
      //                     <Text>{allUser.userName}</Text>
      //                   </div>
      //                 </Group>
      //               </Accordion.Control>
      //             </Accordion.Item>
      //               )
      //             })}       
      //           </Accordion>
      //         </Tabs.Panel>
      //       </Tabs>
      //     </Navbar>
      //   }
      //   aside={
      //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       {projects && <ChatSidebar projects = {projects} />}
      //       </Aside>
      //     </MediaQuery>
      //   }
      //   header={
      //     <Header height={{ base: 50, md: 56 }} p="md">
      //       <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      //         <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      //           <Burger
      //             opened={opened}
      //             onClick={() => setOpened((o) => !o)}
      //             size="sm"
      //             color={theme.colors.gray[6]}
      //             mr="xl"
      //           />
      //         </MediaQuery>
      //       {user && 
      //         <Navbar_v2 activeLink={'/message'} user={user} />}
      //       </div>
      //     </Header>
      //   }

      //   sx={{
      //     main: {
      //       paddingLeft: 0,
      //       display: 'flex',
      //       flexDirection: 'column',
      //       justifyContent: 'flex-end',
      //       padding: 0,
      //     },

      //   }}
      // >
        
       
      // {projects &&  <GetMessages project={projects} />}
      // {projects && <ChatWriter />}
       
      // </AppShell>