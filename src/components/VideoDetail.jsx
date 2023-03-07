import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography,Box,Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import Videos from './Videos'
const VideoDetail = () => {
 
  const [videoDetail,SetVideoDetail]=useState(null)
  const [videos,setVideos]=useState([])
  const {id}=useParams()


  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data)=> SetVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data)=>setVideos(data.items))
  },[id])

    if(!videoDetail?.snippet)
    return "loading...."

  const {snippet:{title ,channelId,channelTitle},
  statistics:{viewCount,likeCount}}=videoDetail

  return (
    <Box minHeight='95vh'>
      <Stack
      direction={{xs:'column',md:'row'}}
      >
        <Box flex={1}>
          <Box
          sx={{width:'100%',position:"sticky",top:'86px'}}
          
          >
           <ReactPlayer className="react-player" controls url={`https://www.youtube.com/watch?v=${id}`}/>
           <Typography
           color="#fff"
           variant='h5'
           fontWeight='bold'
           p="2px"
           >
            {title}
           </Typography>
           <Stack
           direction="row"
           justifyContent='space-between'
           sx={{color:'#fff'}}
           py="1px"
           px="2px"
           >
            <Link to={`/channel/${channelId}`}>
              <Typography
              variant={{sm:'subtitle1',md:'h6'}}
              color="white"
              >
                {channelTitle}
                <CheckCircle sx={{ fontSize:'12px',color:'gray',ml:'5px'}}/>
              </Typography>
            </Link>

            <Stack direction="row"  gap="20px" alignItems="center">
              <Typography
              variant='body1'
              sx={{opacity:'0.7'}}
              >
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography
              variant='body1'
              sx={{opacity:'0.7'}}
              >
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
            
           </Stack>

         

          </Box>

        </Box>
        <Box px="10px"
          py={{md:"1px",xs:"5px"}}
          justifyContent='center'
          alignItems="center"
          >
            <Videos videos={videos} direction="column"/>
          </Box>
      </Stack>
      
    </Box>
  )
}

export default VideoDetail