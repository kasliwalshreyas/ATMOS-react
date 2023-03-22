import { Tabs } from "@mantine/core";
import { IconMessageCircle, IconSettings, IconTextCaption } from "@tabler/icons-react";
import TaskModalDescription from "./TaskModalDescription"
import TaskModalDiscussion from "./TaskModalDiscussion"

const ExtraTaskComponent = () => {
    return (
        <>
            <Tabs defaultValue="description">
                <Tabs.List>
                    <Tabs.Tab value="description" icon={<IconTextCaption size="0.8rem" />}>Description</Tabs.Tab>
                    <Tabs.Tab value="comments" icon={<IconMessageCircle size="0.8rem" />}>Discussion</Tabs.Tab>
                    <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>Settings</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="description" pt="xs">
                    <TaskModalDescription />
                </Tabs.Panel>

                <Tabs.Panel value="messages" pt="xs">
                    <TaskModalDiscussion />
                </Tabs.Panel>

                <Tabs.Panel value="settings" pt="xs">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
        </>
    );
}
export default ExtraTaskComponent;