import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Box, Typography, Collapse, Button } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import SneakpeekContent from './SneakpeekContent'
import serverUrl from '../../config'
export default function SneekpeekContainer(){
    const [peekOpen, setPeekOpen] = useState(false);
    const [peekData,setPeekData] = useState({});
    const togglePeek = () => {
        setPeekOpen(!peekOpen)
    }
    useEffect(() =>{
        const getData = async()=>{
            const res1 = await axios.get(`${serverUrl}/api/v1/user/sneekpeek`,{withCredentials: true});
            setPeekData(res1.data);
        }
        getData()
    },[])
    return (
        <Box>
            <Box sx={{ display: 'flex', borderRadius:'3px', justifyContent: 'center', alignItems:'center',height:'2rem', backgroundColor: '#eeeeee', fontSize: '300' }}>
                <Typography align='center'>Your Finances at a Glance  </Typography>
                <ArrowDropDownCircleIcon onClick={togglePeek}/>
            </Box>

            <Collapse in={peekOpen} easing={ {enter: '10', exit: '10' }}>
                <SneakpeekContent peekData={peekData}/>
            </Collapse>
        </Box>
    )
}