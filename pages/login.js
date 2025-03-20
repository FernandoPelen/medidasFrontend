import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Box, Button, Input, FormControl, FormLabel, Heading, useToast, Text } from "@chakra-ui/react";
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
        
        login(admin); // Usar el contexto global de autenticación

        toast({ title: "Inicio de sesión exitoso", status: "success" });

        router.push("/"); // Redirigir a la página principal
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Credenciales incorrectas");
      toast({ title: "Error", description: "Credenciales incorrectas", status: "error" });
    }
  };

  return (
    <Box w="400px" p={6} boxShadow="lg" borderRadius="lg" bg="white" mx="auto" mt={10}>
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
  );
};

export default Login;
