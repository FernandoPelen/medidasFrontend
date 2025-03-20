import { useState } from "react";
import axios from "axios";
import { Container, Heading, Box, Input, Button, Text, Image } from "@chakra-ui/react";
import Layout from "../components/layouts/article";

const Home = () => {
  const [file, setFile] = useState(null);
  const [altura, setAltura] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [measurements, setMeasurements] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => setFile(event.target.files[0]);
  const handleAlturaChange = (event) => setAltura(event.target.value);
  const handleNombreChange = (event) => setNombre(event.target.value);
  const handleTelefonoChange = (event) => setTelefono(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !altura || !nombre || !telefono) {
      setError("Debes subir una imagen y completar todos los campos.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("altura", altura);
    formData.append("nombre", nombre);
    formData.append("telefono", telefono);

    try {
      const response = await axios.post("https://web-production-96b2.up.railway.app/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMeasurements(response.data.measurements);
      setProcessedImage(`https://web-production-96b2.up.railway.app${response.data.processed_image}`);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error en el procesamiento.");
    }
  };

  return (
    <Layout>
      <Container>
        <Box borderRadius="lg" mb={10} p={3} textAlign="center">
          E. Miranda
        </Box>

        <Heading as="h2" variant="page-title" mb={4}>
          Sube una imagen para medir
        </Heading>

        <form onSubmit={handleSubmit}>
          <Input type="file" onChange={handleFileChange} accept="image/*" mb={3} />
          <Input type="text" placeholder="Nombre" value={nombre} onChange={handleNombreChange} mb={3} />
          <Input type="tel" placeholder="Teléfono" value={telefono} onChange={handleTelefonoChange} mb={3} />
          <Input type="number" placeholder="Altura en metros" value={altura} onChange={handleAlturaChange} step="0.01" mb={3} />
          <Button type="submit" colorScheme="blue" width="full">Medir</Button>
        </form>

        {error && <Text color="red.500" mt={3}>{error}</Text>}

        {measurements && (
          <Box mt={5} p={4} bg="gray.100" borderRadius="lg">
            <Heading as="h3" size="md" mb={3}>Medidas obtenidas:</Heading>
            {Object.entries(measurements).map(([key, value]) => (
              <Text key={key}>{key}: <strong>{value.toFixed(2)} m</strong></Text>
            ))}
          </Box>
        )}

        {processedImage && (
          <Box mt={5} textAlign="center">
            <Heading as="h3" size="md" mb={3}>Imagen procesada:</Heading>
            <Image src={processedImage} alt="Procesado" borderRadius="lg" />
          </Box>
        )}
      </Container>
    </Layout>
  );
};


export default Home;
export { getServerSideProps } from "../components/chakra";
