import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const Item = styled(Paper)(({ theme }) => ({
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));

export default function SneakpeekContent({peekData}) {
    const {cash, net_worth, monthly_change} = peekData;
    return (
        <Box margin={1}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Item>
                        <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Cash</Typography>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center', color: 'green'
                        }}><Typography>${cash}</Typography><ArrowDropUpIcon /></Box>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Net Worth</Typography>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center', color: 'green'
                        }}><Typography>${net_worth}</Typography><ArrowDropUpIcon /></Box>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Monthly Change</Typography>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center', color: 'green'
                        }}><Typography>+{monthly_change}%</Typography><ArrowDropUpIcon /></Box>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}