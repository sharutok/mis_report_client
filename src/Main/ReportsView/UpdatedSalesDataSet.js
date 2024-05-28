import { createStyles, Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons';
import React from 'react';
import '../../Styles/UpdatedSalesData.css';

const useStyles = createStyles((theme) => ({
    root: {
        padding: theme.spacing.xl * 1.5,
    },

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

export default function UpdatedSalesDataSet() {

    const { classes } = useStyles();

    return (
        <div className='action'>
            <Paper withBorder p="md" radius="md" key="title">
                <Group position="apart">
                    <div>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xl"
                            className={classes.label}
                        >
                            November
                        </Text>
                        <Text

                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            className={classes.label}
                        >
                            FY 21-22
                        </Text>
                        <Text weight={700} size="xl">
                            37
                        </Text>
                    </div>
                    <div>
                        <Text
                            style={{ marginTop: "2rem" }}
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            className={classes.label}
                        >
                            FY 22-23
                        </Text>
                        <Text weight={700} size="xl">
                            50
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        sx={(theme) => ({ color: 100 > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
                        size={38}
                        radius="md"
                    >
                        <IconArrowUpRight size={28} stroke={1.5} />
                    </ThemeIcon>
                </Group>
                <Text color="dimmed" size="sm" mt="md">
                    <Text component="span" color={100 > 0 ? 'teal' : 'red'} weight={700}>
                        {37}%
                    </Text>{' '}
                    {100 > 0 ? 'increase' : 'decrease'} of growth
                </Text>
            </Paper>
            <Paper withBorder p="md" radius="md" key="title">
                <Group position="apart">
                    <div>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xl"
                            className={classes.label}
                        >
                            QTD
                        </Text>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            className={classes.label}
                        >
                            FY 21-22
                        </Text>
                        <Text weight={700} size="xl">
                            37
                        </Text>
                    </div>
                    <div>
                        <Text
                            style={{ marginTop: "2rem" }}
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            className={classes.label}
                        >
                            FY 22-23
                        </Text>
                        <Text weight={700} size="xl">
                            50
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        sx={(theme) => ({ color: 100 > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
                        size={38}
                        radius="md"
                    >
                        <IconArrowUpRight size={28} stroke={1.5} />
                    </ThemeIcon>
                </Group>
                <Text color="dimmed" size="sm" mt="md">
                    <Text component="span" color={100 > 0 ? 'teal' : 'red'} weight={700}>
                        {37}%
                    </Text>{' '}
                    {100 > 0 ? 'increase' : 'decrease'} of growth
                </Text>
            </Paper>
            <Paper withBorder p="md" radius="md" key="title">
                <Group position="apart">
                    <div>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xl"
                            className={classes.label}
                        >
                            YTD
                        </Text>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            className={classes.label}
                        >
                            FY 21-22
                        </Text>
                        <Text weight={700} size="xl">
                            326
                        </Text>
                    </div>
                    <div>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            style={{ marginTop: "2rem" }}
                            className={classes.label}
                        >
                            FY 22-23
                        </Text>
                        <Text weight={700} size="xl">
                            353
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        sx={(theme) => ({ color: 100 > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
                        size={38}
                        radius="md"
                    >
                        <IconArrowUpRight size={28} stroke={1.5} />
                    </ThemeIcon>
                </Group>
                <Text color="dimmed" size="sm" mt="md">
                    <Text component="span" color={100 > 0 ? 'teal' : 'red'} weight={700}>
                        {37}%
                    </Text>{' '}
                    {100 > 0 ? 'increase' : 'decrease'} of growth
                </Text>
            </Paper>
            <Paper withBorder p="md" radius="md" key="title">
                <Group position="apart">
                    <div>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xl"
                            className={classes.label}
                        >
                            Avg. Monthly
                        </Text>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            className={classes.label}
                        >
                            FY 21-22
                        </Text>
                        <Text weight={700} size="xl">
                            37
                        </Text>
                    </div>
                    <div>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            style={{ marginTop: "2rem" }}
                            size="xs"
                            className={classes.label}
                        >
                            FY 22-23
                        </Text>
                        <Text weight={700} size="xl">
                            50
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        sx={(theme) => ({ color: 100 > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
                        size={38}
                        radius="md"
                    >
                        <IconArrowUpRight size={28} stroke={1.5} />
                    </ThemeIcon>
                </Group>
                <Text color="dimmed" size="sm" mt="md">
                    <Text component="span" color={100 > 0 ? 'teal' : 'red'} weight={700}>
                        {37}%
                    </Text>{' '}
                    {100 > 0 ? 'increase' : 'decrease'} of growth
                </Text>
            </Paper>

        </div>
    );
}
