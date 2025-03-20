import { useEffect, useState } from "react";
import {
  Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton,
  useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, Input, FormControl, FormLabel, ModalFooter, Select, Box, Flex,
  Card, CardBody
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import Layout from "../components/layouts/article";

const AdminPanel = () => {
  const [administradores, setAdministradores] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", rol: "moderador", password: "" });
  const toast = useToast();

  useEffect(() => {
    fetchAdministradores();
  }, []);

  const fetchAdministradores = async () => {
    try {
      const response = await axios.get("https://web-production-96b2.up.railway.app/administradores");
      console.log("Datos recibidos:", response.data); // Verifica la estructura de la API
      setAdministradores(Array.isArray(response.data.administradores) ? response.data.administradores : []);
    } catch (error) {
      toast({ title: "Error", description: "No se pudieron cargar los administradores", status: "error" });
      setAdministradores([]); // Asegura que no quede undefined
    }
  };
  

  const handleOpen = (admin = null) => {
    setSelectedAdmin(admin);
    setFormData(admin || { nombre: "", email: "", telefono: "", rol: "moderador", password: "" });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedAdmin(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (selectedAdmin) {
        await axios.put(`https://web-production-96b2.up.railway.app/administradores/${selectedAdmin.id}`, formData);
        toast({ title: "Administrador actualizado", status: "success" });
      } else {
        await axios.post("https://web-production-96b2.up.railway.app/administradores", formData);
        toast({ title: "Administrador agregado", status: "success" });
      }
      fetchAdministradores();
      handleClose();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo guardar", status: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://web-production-96b2.up.railway.app/administradores/${id}`);
      toast({ title: "Administrador eliminado", status: "success" });
      fetchAdministradores();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo eliminar", status: "error" });
    }
  };

  return (
    <Layout title="Administración">
      <Container maxW="full" px={4} py={6}>
        <Heading as="h3" fontSize="2xl" mb={6} textAlign="center">
          Administradores
        </Heading>

        <Flex justify="end" mb={4}>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => handleOpen()}>
            Agregar Administrador
          </Button>
        </Flex>

        <Card w="full" overflowX="auto" boxShadow="lg" borderRadius="lg" minWidth="100%">
          <CardBody>
            <Box overflowX="auto">
              <Table variant="striped" colorScheme="gray">
                <Thead bg="gray.200">
                  <Tr>
                    <Th>Nombre</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Teléfono</Th>
                    <Th>Rol</Th>
                    <Th display={{ base: "none", md: "table-cell" }}>Fecha Creación</Th>
                    <Th textAlign="center">Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Array.isArray(administradores) &&
                    administradores.map((admin) => (
                      <Tr key={admin.id}>
                        <Td>{admin.nombre}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{admin.telefono}</Td>
                        <Td>{admin.rol}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{admin.fecha_creacion}</Td>
                        <Td>
                          <Flex gap={2} justify="center" wrap="wrap">
                            <IconButton
                              icon={<EditIcon />}
                              colorScheme="yellow"
                              size="sm"
                              onClick={() => handleOpen(admin)}
                            />
                            <IconButton
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete(admin.id)}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>

        {/* Modal para agregar/editar administrador */}
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="md" boxShadow="2xl">
            <ModalHeader>{selectedAdmin ? "Editar Administrador" : "Nuevo Administrador"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Nombre</FormLabel>
                <Input name="nombre" value={formData.nombre} onChange={handleChange} width="100%" />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Email</FormLabel>
                <Input name="email" value={formData.email} onChange={handleChange} width="100%" />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Teléfono</FormLabel>
                <Input name="telefono" value={formData.telefono} onChange={handleChange} width="100%" />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Rol</FormLabel>
                <Select name="rol" value={formData.rol} onChange={handleChange} width="100%">
                  <option value="superadmin">Superadmin</option>
                  <option value="editor">Editor</option>
                  <option value="moderador">Moderador</option>
                </Select>
              </FormControl>
              {!selectedAdmin && (
                <FormControl mb={3}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" name="password" value={formData.password} onChange={handleChange} width="100%" />
                </FormControl>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit}>Guardar</Button>
              <Button variant="ghost" ml={3} onClick={handleClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Layout>
  );
};

export default AdminPanel;
