import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  display: flex;
  align-items: center;
  height: 50px; /* Ajuste de altura */
  padding: 30px;

  img {
    width: 150px; /* Tamaño de la imagen */
    height: auto;
    transition: transform 0.2s ease;
  }

  &:hover img {
    transform: rotate(15deg);
  }
`

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <Image 
          src="/images/logomiranda.png" 
          alt="Logo" 
          width={150} 
          height={100} 
          priority 
        />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily='M PLUS Rounded 1c, sans-serif'
          fontWeight="bold"
          ml={3}
          fontSize="lg"
        >
          E.Miranda
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
