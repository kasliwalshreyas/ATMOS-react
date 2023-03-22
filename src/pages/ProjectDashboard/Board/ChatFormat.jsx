import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
    },

    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));


const ChatFormat = ({ postedAt, body, author }) => {

    const { classes } = useStyles();

    return (
        <>
            <Paper withBorder radius="md" className={classes.comment} m={5}>
                <Group>
                    <Avatar src={author.image} alt={author.name} radius="xl" />
                    <div>
                        <Text fz="sm">{author.name}</Text>
                        <Text fz="xs" c="dimmed">
                            {postedAt}
                        </Text>
                    </div>
                </Group>
                <TypographyStylesProvider className={classes.body}>
                    <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
                </TypographyStylesProvider>
            </Paper>
        </>
    );
}

export default ChatFormat;