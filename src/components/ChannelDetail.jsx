import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import Vidoes from './Videos'
import ChannelCard from './ChannelCard'
import { fetchFromAPI } from '../utils/fetchFromAPI'
const ChannelDetail = () => {
  console.log('hi')
  const{id}=useParams();
  const [channelDetail,setChannelDetail]=useState(null)
  const [videos,setVideos]=useState([])
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data)=> setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data)=> setVideos(data?.items))
  },[id])
  return (
    <Box
    minHeight="95vh"
    >
      <Box>
        <div
        style={{background: "linear-gradient(90deg, rgba(191,5,168,1) 0%, rgba(0,212,255,1) 100%)",
                zIndex:10,
                height:'300px'
      }}
        />
        <ChannelCard ChannelDetail={channelDetail} marginTop="-93px"/>
      </Box>

        <Box
        display="flex"
        p="2"
        >
          <Box sx={{mr:{sm:'100px'}}}/>

          <Vidoes videos={videos} />
         
        </Box>

    </Box>
  )
}

export default ChannelDetail