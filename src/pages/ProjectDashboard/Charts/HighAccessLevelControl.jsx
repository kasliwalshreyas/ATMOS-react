import { Container, createStyles } from "@mantine/core";
import ChartContainer from "./ChartContainer";
import StatsChart from "./StatsChart";

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


const HighAccessChartControl = ({ projectInfo, userInfo }) => {

    console.log(userInfo, 'userInfo from HighAccessChartControl');

    const { classes, } = useStyles();

    const projectTaskCountForUser = {
        'Assigned Tasks': 0,
        'Completed Tasks': 0,
    }

    const projectTaskCountByPriorityForUser = {
        'High': 0,
        'Medium': 0,
        'Low': 0,
        'Choose Priority': 0,
    };

    const projectTaskCountByStatusForUser = {
        'In Progress': 0,
        'Stuck': 0,
        'Backlog': 0,
        'Done': 0,
        'Choose Status': 0,
    };

    const projectTaskCountByPriorityAndStatusForUser = {
        'High': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
        'Medium': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
        'Low': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
        'Choose Priority': {
            'In Progress': 0,
            'Stuck': 0,
            'Backlog': 0,
            'Done': 0,
            'Choose Status': 0,
        },
    };

    const projectTaskCountByStatusAndPriorityForUser = {
        'In Progress': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Stuck': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Backlog': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Done': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
        'Choose Status': {
            'High': 0,
            'Medium': 0,
            'Low': 0,
            'Choose Priority': 0,
        },
    };

    const projectTaskListByPriorityForUser = {
        'High': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
        'Medium': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
        'Low': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
        'Choose Priority': {
            'completed': 0,
            'incomplete': 0,
            'total': 0,
        },
    };


    const fillTheData = () => {


    }








    return (
        <>
            <Container fluid={true} mt={'30px'} sx={classes.statsContainer} >
                {/* <StatsChart basicData={projectTaskCount} /> */}
            </Container>
            <Container fluid={true} mt={'30px'} sx={classes.container}>

            </Container>
        </>
    );
}

export default HighAccessChartControl;