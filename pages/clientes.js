import { useEffect, useState } from 'react';
import { 
  Container, Heading, SimpleGrid, Image, Box, Text, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
  ModalCloseButton, Button, useDisclosure, VStack, HStack 
} from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Section from '../components/section';
import axios from 'axios';

const Works = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isImageOpen,
    onOpen: openImage,
    onClose: closeImage
  } = useDisclosure();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://web-production-96b2.up.railway.app/usuarios');
        setUsuarios(response.data);
      } catch (err) {
        setError("Error al obtener los usuarios.");
      }
    };

    fetchUsuarios();
  }, []);

  const openModal = (usuario) => {
    setSelectedUsuario(usuario);
    onOpen();
  };

  return (
    <Layout title="Usuarios">
      <Container maxW="container.md">
        <Heading as="h3" fontSize={24} mb={6} textAlign="center">
          Usuarios Registrados
        </Heading>

        {error && <Text color="red.500" textAlign="center">{error}</Text>}

        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          {usuarios.map((usuario) => (
            <Section key={usuario.id}>
              <Box 
                p={4} 
                borderWidth="1px" 
                borderRadius="lg" 
                boxShadow="lg"
                textAlign="center" 
                cursor="pointer"
                _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                onClick={() => openModal(usuario)}
              >
                <Image 
                  src={`https://web-production-96b2.up.railway.app${usuario.imagen_procesada}`} 
                  alt={usuario.nombre} 
                  borderRadius="full"
                  boxSize="100px"
                  mx="auto"
                  mb={3}
                />
                <Text fontSize="xl" fontWeight="bold">{usuario.nombre}</Text>
                <Text fontSize="md" color="gray.500">{usuario.telefono}</Text>
              </Box>
            </Section>
          ))}
        </SimpleGrid>

        {/* MODAL MEJORADO */}
        {selectedUsuario && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="lg" overflow="hidden" boxShadow="2xl">
              <ModalHeader bg="blue.600" color="white" textAlign="center">
                Detalles del Usuario
              </ModalHeader>
              <ModalCloseButton color="white" />
              <ModalBody p={6} textAlign="center" bg="gray.50">
                <Image 
                  src={`https://web-production-96b2.up.railway.app${selectedUsuario.imagen_procesada}`} 
                  alt={selectedUsuario.nombre} 
                  borderRadius="full"
                  boxSize="120px"
                  mx="auto"
                  mb={4}
                  border="4px solid white"
                  boxShadow="md"
                  cursor="pointer"
                  onClick={openImage} 
                />

                <Text fontSize="2xl" fontWeight="bold">{selectedUsuario.nombre}</Text>
                <Text fontSize="md" color="gray.600" mb={3}>
                  📞 Teléfono: {selectedUsuario.telefono}
                </Text>

                <Box p={4} borderRadius="lg" bg="gray.600" boxShadow="md">
                  <VStack spacing={2} align="stretch">
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">📏 Pecho:</Text>
                      <Text>{selectedUsuario.pecho} cm</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">📏 Cintura:</Text>
                      <Text>{selectedUsuario.cintura} cm</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">📏 Largo de Mangas:</Text>
                      <Text>{selectedUsuario.largo_mangas} cm</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">📏 Piernas:</Text>
                      <Text>{selectedUsuario.piernas} cm</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">📅 Fecha de Registro:</Text>
                      <Text>{selectedUsuario.fecha_registro}</Text>
                    </HStack>
                  </VStack>
                </Box>

                <Button mt={5} colorScheme="blue" w="full" onClick={onClose}>
                  Cerrar
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {/* MODAL PARA AMPLIAR IMAGEN */}
        {selectedUsuario && (
          <Modal isOpen={isImageOpen} onClose={closeImage} isCentered>
            <ModalOverlay />
            <ModalContent maxW="90vw" maxH="90vh" bg="transparent" boxShadow="none">
              <ModalCloseButton color="white" size="lg" />
              <ModalBody display="flex" justifyContent="center">
                <Image 
                  src={`https://web-production-96b2.up.railway.app${selectedUsuario.imagen_procesada}`} 
                  alt={selectedUsuario.nombre} 
                  maxH="80vh"
                  borderRadius="md"
                  boxShadow="2xl"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </Layout>
  );
};

export default Works;
