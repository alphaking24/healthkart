import { Box, Grid } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function index() {

  const [data, setData] = useState([1, 2, 3, 4, 5, 6])


  return (
    <Box>
      <Grid gap='4' gridTemplateColumns={'repeat(3,1fr)'}>
        {
          data.map((num) => {
            return <Link href={`./events/${num}`}>
              <Box bgColor='gray.300' height='100px' width='full'>{num}</Box>
            </Link>
          })
        }
      </Grid>
    </Box>
  )
}

export default index