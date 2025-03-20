import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelTernoLoader from '../voxel-terno-loader'

const LazyVoxelTerno = dynamic(() => import('../voxel'), {
  ssr: false,
  loading: () => <VoxelTernoLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="E. miranda" />
        <meta name="author" content="E. miranda" />
        <meta name="author" content="E. miranda" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
     
        <meta name="twitter:title" content="E. miranda" />
       
        <meta property="og:site_name" content="E. miranda" />
        <meta name="og:title" content="E. miranda" />
        <meta property="og:type" content="website" />
       
        <title>E. miranda - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <LazyVoxelTerno />

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
