import { useDisclosure } from '@mantine/hooks';
import { Container, createStyles, Modal, MultiSelect, NativeSelect, Paper, Select, Table, Text, TextInput, useMantineTheme } from '@mantine/core';
import { IconCalendarDue, IconChecks, IconCircleLetterP, IconCircleLetterS, IconTextSize, IconUrgent, IconUser, IconUsers } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import ExtraTaskComponent from './ExtraTaskComponent';


const useStyles = createStyles((theme) => ({
    containerWithRightSideBorder: {





    }

}));

const TaskModal_v2 = ({ taskInfo, sectionInfo, show, closeModal, rerender, setRerender, projectInfo, AssigneeList, userInfo }) => {
    // const [opened, { open, close }] = useDisclosure(show);

    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dateFormater = (date) => {
        let newDate = new Date(date);
        // console.log(newDate, "newDate");
        // const offset = newDate.getTimezoneOffset()
        // newDate = new Date(newDate.getTime() - (offset * 60 * 1000))
        // return newDate.toISOString().split('T')[0]
        return newDate
    }


    const [taskName, setTaskName] = useState(taskInfo.taskName);
    const [taskCompletion, setTaskCompletion] = useState(taskInfo.taskCompletion);
    const [taskAssignee, setTaskAssignee] = useState(taskInfo.taskAssigneeList);
    const [taskPriority, setTaskPriority] = useState(taskInfo.taskPriority);
    const [taskStatus, setTaskStatus] = useState(taskInfo.taskStatus);
    const [taskDeadline, setTaskDeadline] = useState(dateFormater(taskInfo.taskDeadline));
    // const [value, setvalue] = useState(null);

    // console.log(value, "value");
    console.log(taskDeadline);


    console.log(taskName, taskCompletion, taskAssignee, taskPriority, taskStatus, "taskInfo");

    return (
        <>
            <Modal
                opened={show}
                onClose={closeModal}
                title={projectInfo.projectName + '/' + sectionInfo.sectionName}
                overlayProps={{
                    color: theme.colors.dark[9],
                    opacity: 0.55,
                    blur: 3,
                }}
                size="80%"
            >
                <Container p={0} m={0} display={'flex'} fluid={true}>
                    <Paper w={'60%'} >
                        <ExtraTaskComponent />

                    </Paper>
                    <Paper size={'sm'} mr={0} w={'40%'} p={20} pl={30}>
                        <Table>
                            <tbody>
                                <tr>
                                    <td style={{ display: 'flex' }}>
                                        <IconTextSize />
                                        <Text size={'lg'} ml={5}>Task Name</Text>
                                    </td>
                                    <td>
                                        <TextInput
                                            value={taskName}
                                            onChange={(e) => setTaskName(e.target.value)}
                                            placeholder='Enter task name'
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconChecks />
                                        <Text size={'lg'} ml={5}>Completed</Text>
                                    </td>
                                    <td>
                                        <Select
                                            placeholder="Task Completed"
                                            value={taskCompletion}
                                            data={[
                                                { value: true, label: 'Yes' },
                                                { value: false, label: 'No' },
                                            ]}
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconUsers />
                                        <Text size={'lg'} ml={5}>Assignee</Text>
                                    </td>
                                    <td>
                                        <MultiSelect
                                            placeholder='Select assignee'
                                            value={taskAssignee}
                                            onChange={(e) => { setTaskAssignee(e.target.value) }}
                                            data={[
                                                { value: 'react', label: 'React' },
                                                { value: 'ng', label: 'Angular' },
                                                { value: 'svelte', label: 'Svelte' },
                                                { value: 'vue', label: 'Vue' },
                                                { value: 'riot', label: 'Riot' },
                                                { value: 'next', label: 'Next.js' },
                                                { value: 'blitz', label: 'Blitz.js' },
                                            ]}
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconCircleLetterP />
                                        <Text size={'lg'} ml={5}>Priority</Text>
                                    </td>
                                    <td>
                                        <Select
                                            placeholder="Select Priority"
                                            value={taskPriority}
                                            onChange={(e) => { setTaskPriority(e.target.value) }}
                                            data={[
                                                { value: 'High', label: 'High' },
                                                { value: 'Medium', label: 'Medium' },
                                                { value: 'Low', label: 'Low' },
                                            ]}
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconCircleLetterS />
                                        <Text size={'lg'} ml={5}>Status</Text>
                                    </td>
                                    <td>
                                        <Select
                                            placeholder="Select Status"
                                            value={taskStatus}
                                            onChange={(e) => { setTaskStatus(e.target.value) }}
                                            data={[
                                                { value: 'In Progress', label: 'In Progress' },
                                                { value: 'Stuck', label: 'Stuck' },
                                                { value: 'Backlog', label: 'Backlog' },
                                                { value: 'Done', label: 'Done' },
                                            ]}
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconCalendarDue />
                                        <Text size={'lg'} ml={5}>Deadline</Text>
                                    </td>
                                    <td>
                                        <DatePickerInput
                                            placeholder='Select date'
                                            // value={taskDeadline}
                                            // onChange={(e) => setTaskDeadline(dateFormater(e.target.value))}
                                            value={taskDeadline}
                                            onChange={setTaskDeadline}
                                        />

                                    </td>
                                </tr>
                            </tbody>
                        </Table>


                    </Paper>


                </Container>
            </Modal>
        </>
    );
}

export default TaskModal_v2;

