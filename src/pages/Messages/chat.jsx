import io from "socket.io-client";
import React, { useState, useEffect } from "react"
import Nav from "./Components/Nav.jsx"
import Navbar_v2 from "../../UI/Navbar_v2";
import { ScrollArea } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
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

// import "./styles.css"
// const socket = io.connect("http://localhost:4001/message");
const socket = io.connect("http://localhost:4000");

const Chats = () => {
  const [user, setUser] = useState(null);
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

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  socket && console.log(socket)
  return (
    <>


      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} grow component={ScrollArea}>
            <Tabs defaultValue="gallery">
              <Tabs.List>
                <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}> Projects</Tabs.Tab>
                <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>Direct Messages</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery" pt="xs">
                <Accordion defaultValue="customization"
                  chevron >
                  <Accordion.Item value="customization">
                    <Accordion.Control>Project 1<br />
                      <Badge>On-Track</Badge>
                      <Badge color="red">Priority</Badge>
                    </Accordion.Control>

                  </Accordion.Item>

                  <Accordion.Item value="flexibility">
                    <Accordion.Control>Project 2<br />
                      <Badge>On-Track</Badge>
                      <Badge color="red">Priority</Badge></Accordion.Control>

                  </Accordion.Item>

                  <Accordion.Item value="focus-ring">
                    <Accordion.Control>Project 3<br />
                      <Badge>On-Track</Badge>
                      <Badge color="red">Priority</Badge></Accordion.Control>

                  </Accordion.Item>
                </Accordion>
              </Tabs.Panel>

              <Tabs.Panel value="messages" pt="xs">
                <Accordion defaultValue="customization" chevron>
                  <Accordion.Item value="customization">
                    <Accordion.Control>
                      <Group noWrap>
                        <Avatar src="avatar.png" radius="xl" size="lg" alt="it's me" />
                        <div>
                          <Text>Person 1</Text>
                          <Badge color="red">Priority</Badge>
                        </div>
                      </Group>
                    </Accordion.Control>
                  </Accordion.Item>

                  <Accordion.Item value="flexibility">
                    <Accordion.Control> <Group noWrap>
                      <Avatar src="avatar.png" radius="xl" size="lg" alt="it's me" />
                      <div>
                        <Text>Person 2</Text>
                        <Badge color="red">Priority</Badge>
                      </div>
                    </Group>    </Accordion.Control>
                  </Accordion.Item>

                  <Accordion.Item value="focus-ring">
                    <Accordion.Control> <Group noWrap>
                      <Avatar src="avatar.png" radius="xl" size="lg" alt="it's me" />
                      <div>
                        <Text>Person 3</Text>
                        <Badge color="red">Priority</Badge>
                      </div>
                    </Group>    </Accordion.Control>
                  </Accordion.Item>


                </Accordion>
              </Tabs.Panel>
            </Tabs>

          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 56 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Navbar_v2 activeLink={'/message'} />
            </div>
          </Header>
        }
      >
        <Text>Resize app to see responsive navbar in action</Text>
      </AppShell>
    </>
  );
};

export default Chats;
