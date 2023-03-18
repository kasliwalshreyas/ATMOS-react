import styles from './Charts_v2.module.css';
import { Container, createStyles, Flex, Paper, Title } from "@mantine/core";
import StatsChart from "./StatsChart";
import Chart1 from "./BarChart";
import ChartContainer from './ChartContainer';

const useStyles = createStyles((themes) => ({
    statsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '100%',
        minHeight: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '100%',
        minHeight: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartOuterContainer: {
        padding: '20px',
        margin: '20px',
        width: 'fit-content',
        height: 'fit-content',
        display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // border: '1px solid black',
    },
    chartInnerContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        width: '100%',
        height: '100%',
    },
}));



const Charts_v2 = ({ projectId, projectInfo, setProjectInfo, userInfo }) => {

    const { classes, } = useStyles();

    // console.log(userInfo, 'userInfo from charts_v2');
    console.log(projectInfo, 'projectInfo from charts_v2');



    const projectTaskCountByPriority = {
        'high': 0,
        'medium': 0,
        'low': 0,
    };

    const projectTaskCountByStatus = {
        'on-track': 0,
        'off-track': 0,
        'at-risk': 0,
    };

    const projectCompletionCount = {
        'Completed': 0,
        'Not Completed': 0,
    };

    const projectTaskCount = {
        'Total Tasks': 0,
        'Total Sections': 0,
        'Total Members': 0,
    };

    const projectTaskCountBySection = {

    };

    const projectTaskCountByUser = {

    };

    const projectTaskListByPriority = {
        'high': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
        'medium': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
        'low': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
        'Choose Priority': {
            'completed': 0,
            'not-completed': 0,
            'total': 0,
        },
    };

    // const projectTaskListByStatus = {
    //     'on-track': {
    //         'completed': 0,
    //         'not-completed': 0,
    //         'total': 0,
    //     },
    //     'off-track': {
    //         'completed': 0,
    //         'not-completed': 0,
    //         'total': 0,
    //     },
    //     'at-risk': {
    //         'completed': 0,
    //         'not-completed': 0,
    //         'total': 0,
    //     },
    // };


    const fillTheData = () => {
        projectInfo.projectHighAccessMembers.forEach((member) => {
            projectTaskCount['Total Members'] += 1;
            projectTaskCountByUser[member.memberName] = 0;
        }
        );
        projectInfo.projectMediumAccessMembers.forEach((member) => {
            projectTaskCount['Total Members'] += 1;
            projectTaskCountByUser[member.memberName] = 0;
        });
        projectInfo.projectLowAccessMembers.forEach((member) => {
            projectTaskCount['Total Members'] += 1;
            projectTaskCountByUser[member.memberName] = 0;
        });

        projectInfo.projectSectionIdList.forEach((section) => {
            projectTaskCount['Total Sections'] += 1;
            projectTaskCountBySection[section.sectionName] = 0;
            section.taskIdList.forEach((task) => {
                projectTaskCount['Total Tasks'] += 1;
                projectTaskCountByPriority[task.taskPriority] += 1;
                projectTaskListByPriority[task.taskPriority]['total'] += 1;
                projectTaskListByPriority[task.taskPriority][task.taskCompletion ? 'completed' : 'not-completed'] += 1;
                projectTaskCountByStatus[task.taskStatus] += 1;
                projectTaskCountBySection[section.sectionName] += 1;
                // projectTaskCountByUser[task.assignedTo] += 1;
                if (task.taskCompletion) {
                    projectCompletionCount['Completed'] += 1;
                } else {
                    projectCompletionCount['Not Completed'] += 1;
                }
            });
        });


    };

    fillTheData();

    // console.log(projectTaskCountByPriority, 'projectTaskCountByPriority');
    // console.log(projectTaskCountByStatus, 'projectTaskCountByStatus');
    // console.log(projectCompletionCount, 'projectCompletionCount');
    // console.log(projectTaskCount, 'projectTaskCount');
    // console.log(projectTaskCountBySection, 'projectTaskCountBySection');
    // console.log(projectTaskCountByUser, 'projectTaskCountByUser');
    console.log(projectTaskListByPriority, 'projectTaskListByPriority');

    return (
        <>
            <Flex p={'20px'} direction={'column'}>
                <Container fluid={true} mt={'30px'} sx={classes.statsContainer} >
                    <StatsChart basicData={projectTaskCount} />
                </Container>
                <Container fluid={true} mt={'30px'} sx={classes.container}>
                    <ChartContainer
                        title='Task Priority Chart'
                        userInfo={userInfo}
                        basicData={projectTaskCountByPriority}
                    />
                    <ChartContainer
                        title='Task Status Chart'
                        userInfo={userInfo}
                        basicData={projectTaskCountByStatus}
                        bgColorPalette={[
                            'rgb(32, 201, 151)',
                            'rgb(252, 196, 25)',
                            'rgb(255, 107, 107)',
                        ]}
                    />
                    <ChartContainer
                        title='Task Completion Chart'
                        userInfo={userInfo}
                        basicData={projectCompletionCount}
                        bgColorPalette={[
                            'rgb(32, 201, 151)',
                            'rgb(255, 107, 107)',
                        ]}
                        chartType='pie'
                    />
                    <ChartContainer
                        title={'Section Chart'}
                        userInfo={userInfo}
                        basicData={projectTaskCountBySection}
                        bgColorPalette={[
                            'rgb(65, 129, 217)'
                        ]}
                    />
                    <ChartContainer
                        title={'Priority Chart'}
                        userInfo={userInfo}
                        dataArray={[projectTaskListByPriority['high'], projectTaskListByPriority['medium'], projectTaskListByPriority['low']]}
                        chartType='combined'
                        bgColorPalette={[
                            'rgb(255, 107, 107)',
                            'rgb(252, 196, 25)',
                            'rgb(32, 201, 151)',
                            'rgb(32, 201, 151)',
                            'rgb(252, 196, 25)',
                            'rgb(255, 107, 107)',
                        ]}
                    />

                </Container>
            </Flex>
        </>
    );

}

export default Charts_v2;