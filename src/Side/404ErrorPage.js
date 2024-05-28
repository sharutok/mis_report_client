import { Container, createStyles, Group, Title } from '@mantine/core';
const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },
    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 30,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[6],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 100,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export default function ErrorPage() {
    const { classes } = useStyles();
    return (
        <Container className={classes.root}>
            <Title className={classes.title}>Page Not Found😓</Title>
            <div className={classes.label}>
                <p>
                    Unfortunately, this is a 404 page.
                    <br />
                    Use the link as provided in the mail to access the MIS dashboard
                </p>
            </div>
            <Group position="center">
            </Group>
        </Container>
    );
}
