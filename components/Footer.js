import { Box, Button, Flex, Grid, GridItem, Image, Input, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

function Footer() {

  const getLink = () => {
    alert ('Button Click')
  }
  return (
    <Box bgColor='#0d2122' max-width='full' padding='2' mt='8'>
    <Box maxW='1200px' mx='auto'>
      <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/hklogo.png' alt=''  mt='8' width='200px' />
      </Box>
      <Box>
        <Grid gridTemplateColumns='repeat(6, 1fr)' maxW='1200px' gap='12' mt='8' mx='auto' justifyContent='space-between' padding='4'>

          <GridItem colSpan={{base:6,sm:3,md:2,lg:1}}> <Text fontWeight='bold' color='white'>HealthKart</Text>
            <Box color='gray.400' gap='2'>
              <Text mt='2'>About Us</Text>
              <Text>Contact Us</Text>
              <Text>Refer & Earn</Text>
              <Text>Loyalty Program</Text>
              <Text>Blogs, Videos & More</Text>
              <Text>Brands</Text>
              <Text>Brand Directory</Text>
              <Text>Authenticity Guaranteed</Text>
              <Text>Careers</Text>
            </Box>
          </GridItem>

          <GridItem colSpan={{base:6,sm:3,md:2,lg:1}}>
            <Text fontWeight='bold' color='white'>Brands</Text>
            <Box color='gray.400' gap='2'>
              <Text mt='2'>MuscleBlaze</Text>
              <Text>Fit Foods</Text>
              <Link href='hkvitals'><Text onClick={getLink}> HK Vitals</Text></Link>
              <Text>TrueBasics</Text>
              <Text><Link href='gritzo'> Gritzo </Link></Text>
              <Text>bGREEN</Text>
            </Box>
          </GridItem>

          <GridItem colSpan={{base:6,sm:3,md:2,lg:1}}>
            <Text fontWeight='bold' color='white'>Health & Fitness</Text>
            <Box color='gray.400' gap='2'>
              <Text mt='2'>Hair & Skin Care</Text>
              <Text>Sports Nutrition</Text> 
              <Text>Vitamins & Supplements</Text>
              <Text>Ayurveda & Herbs</Text>
              <Text>Health Food & Drinks</Text>
              <Text>Fitness</Text>
              <Text>Wellness</Text>
            </Box>
          </GridItem>

          <GridItem colSpan={{base:6,sm:3,md:2,lg:1}}>
            <Text fontWeight='bold' color='white'>Quick Links</Text>
            <Box color='gray.400' gap='2'>
              <Text mt='2'> My Account</Text>
              <Text>Track Your Order</Text>
              <Text>Store Locator</Text>
              <Text>HK Cash</Text>
              <Text>HK Coupons</Text>
              <Text>FAQs</Text>
              <Text>Sell On HealthKart</Text>
            </Box>
          </GridItem>


          <GridItem colSpan={{base:6,sm:3,md:2,lg:1}}>
            <Text fontWeight='bold' color='white'>Contact Us</Text>
            <Box color='gray.400' gap='2'>
              <Text mt='2'>care@healthkart.com</Text>
              <Text>0124-4616444</Text>
              <Text>The Presidency Tower,</Text>
              <Text> Tower-B, 2nd Floor,</Text>
              <Text> 46/4, Mehrauli Rd opp. government girls college,</Text>
              <Text>Anamika Enclave, Sector 14,</Text>
              <Text> Gurugram, Haryana</Text>
            </Box>
          </GridItem>



          <GridItem colSpan={{base:6,sm:3,md:2,lg:1}} bgColor='gray.50' rounded='md' width='300px' height='400px'  padding='4'>
            <Text fontWeight='bold'>Subscribe</Text>
            <Flex alignItems='center'>
              <Input placeholder='Enter your Email' name='email' width='200px' bgColor='white' mt='2' padding='2' />
              <Button color='white' bgColor='#00b5b7'>Go</Button>
            </Flex>
            <Text fontSize='sm'>* Get newsletters and exclusive offers</Text>
            <Flex gap='2' padding='2' mt='2'>
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/Return.png' alt='' height='72px' width='80px' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/authenticity.png' alt='' height='72px' width='80px' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/secure.png' alt='' height='72px' width='80px' />
            </Flex>

            <Text mt='2'>Follow us on</Text>
            <Flex justify='space-between' padding='1' >
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/facebook-new.svg' alt='' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/Instagram-new.svg' alt='' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/LinkedIn-new.svg' alt='' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/Youtube-new.svg' alt='' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/twitter-new.svg' alt='' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/pinterest-icon.svg' alt='' />
            </Flex>

            <Text mt='7'>Download Our App</Text>
            <Flex justify='space-between' padding='1'>
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/google-badge.svg' alt='' />
              <Image src='https://static1.hkrtcdn.com/hknext/static/media/common/footer/app-store-new.svg' alt='' />
            </Flex>

          </GridItem>
        </Grid>
      </Box>












    </Box>
  )
}

export default Footer