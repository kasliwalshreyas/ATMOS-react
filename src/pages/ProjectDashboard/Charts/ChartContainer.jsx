import { createStyles, Flex, Paper, Title } from "@mantine/core";
import BarChart from "./BarChart";
import CombineBarChart from "./CombineBarChart";
import PieChart from "./PieChart";

const useStyles = createStyles((themes) => ({
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
}));


const ChartContainer = ({ title, userInfo, basicData, bgColorPalette = [
    'rgb(255, 107, 107)',
    'rgb(252, 196, 25)',
    'rgb(32, 201, 151)',
], chartType = 'bar', dataArray = [] }) => {

    // console.log(title, 'title from ChartContainer');


    const { classes } = useStyles();

    console.log(dataArray, 'dataArray from ChartContainer');
    return (
        <>
            <Paper mt={'30px'} sx={classes.chartOuterContainer} shadow="md" radius="lg" withBorder>
                <Flex direction={'column'}>
                    <Title order={3}>{title}</Title>
                    {chartType == 'bar' && <BarChart userInfo={userInfo} basicData={basicData} bgColorPalette={bgColorPalette} />}
                    {chartType == 'pie' && <PieChart userInfo={userInfo} basicData={basicData} bgColorPalette={bgColorPalette} />}
                    {chartType == 'combined' && <CombineBarChart userInfo={userInfo} dataArray={dataArray} bgColorPalette={bgColorPalette} />}
                </Flex>
            </Paper>
        </>
    );
}

export default ChartContainer;