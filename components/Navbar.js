import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineGift } from 'react-icons/hi'
import { FaTags } from 'react-icons/fa'
import { PiMedalDuotone } from 'react-icons/pi'
import { BiSolidDiscount, BiAlignLeft, BiCopyAlt } from 'react-icons/bi'
import { BsChatDotsFill } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'

function Navbar() {
    return (
        <Box>
            <Box alignItems={'center'} mx='auto' maxW='1000px' mt='2'>
                <Flex alignItems={'center'} gap='5' my='3' mx='auto' textColor={'gray.500'} >
                    <Menu>
                        <MenuButton display='flex' alignItems={'center'} marginLeft={'5'} width={'71'} height={'8'} fontSize='sm' color='gray.500' border='1px' bg='white' borderColor='gray.500' p={'5'}>
                        <Flex alignItems={'center'}>
                        <BiAlignLeft />&nbsp;Shop by category
                        </Flex>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Protien</MenuItem>
                            <MenuItem>Preworkout</MenuItem>
                            <MenuItem>Sports & Health drinks</MenuItem>
                            <MenuItem>Massgainer</MenuItem>
                            <MenuItem>Fitness</MenuItem>
                            <MenuItem>Wellness</MenuItem>
                        </MenuList>
                    </Menu>

                    <Flex alignItems={'center'}>
                        <FaTags color='#00b5b7' />&nbsp;<Text _hover={{ color: '#00b5b7' }} >Best Seller</Text>
                    </Flex>

                    <Flex alignItems={'center'}>
                        <PiMedalDuotone />&nbsp;<Text _hover={{ color: '#00b5b7' }}>Brands</Text>
                    </Flex>

                    <Flex alignItems={'center'}>
                        <BiSolidDiscount />&nbsp; <Text _hover={{ color: '#00b5b7' }}>Offer Zone</Text>
                    </Flex>

                    <Flex alignItems={'center'}>
                        <BiCopyAlt /> <Text _hover={{ color: '#00b5b7' }}>Blogs</Text>
                    </Flex>

                    <Flex alignItems={'center'} >
                        <HiOutlineGift />&nbsp;<Text _hover={{ color: '#00b5b7' }}>Gift Card</Text>
                    </Flex>

                    <Flex alignItems={'center'}>
                        <BsChatDotsFill />&nbsp;<Text _hover={{ color: '#00b5b7' }}>Customer Support</Text>
                    </Flex>

                    <Flex alignItems={'center'}>
                        <GrLocation />&nbsp;<Text _hover={{ color: '#00b5b7' }}>Store Locator</Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}

export default Navbar