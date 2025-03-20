import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import AuthContext from "../components/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("https://web-production-96b2.up.railway.app/login", { email, password });

      if (response.status === 200 && response.data.admin) {
        const { admin } = response.data;
        
        login(admin);
        toast({ title: "Inicio de sesión exitoso", status: "success" });
        router.push("/");
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Credenciales incorrectas");
      toast({ title: "Error", description: "Credenciales incorrectas", status: "error" });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
      _dark={{ bg: "gray.800" }}
    >
      <Box w="400px" p={6} boxShadow="lg" borderRadius="lg" bg="white" _dark={{ bg: "gray.700" }} textAlign="center">
        {/* Logo agregado arriba del formulario */}
        <Image src="/images/logomiranda.png" alt="Logo Miranda" mx="auto" mb={4} boxSize="100px" />
        
        <Heading textAlign="center" mb={4}>Iniciar Sesión</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={3}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Ingresar</Button>
        </form>
        {error && <Text color="red.500" mt={4}>{error}</Text>}
      </Box>
    </Box>
  );
};

export default Login;
