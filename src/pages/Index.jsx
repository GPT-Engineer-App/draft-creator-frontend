import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt, FaPlus } from "react-icons/fa";

const API_BASE_URL = "https://backengine-5k4b.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [flowTitle, setFlowTitle] = useState("");
  const [flowDescription, setFlowDescription] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    setAccessToken("");
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCreateDraft = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/flows/draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ flowTitle, flowDescription }),
      });

      if (response.ok) {
        setFlowTitle("");
        setFlowDescription("");
        toast({
          title: "Draft Created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Draft Creation Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Draft creation error:", error);
      toast({
        title: "Draft Creation Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={8}>Flow Draft Creator</Heading>
      {!isLoggedIn ? (
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      ) : (
        <Stack spacing={4}>
          <Text>Welcome! You are logged in.</Text>
          <FormControl>
            <FormLabel>Flow Title</FormLabel>
            <Input type="text" value={flowTitle} onChange={(e) => setFlowTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Flow Description</FormLabel>
            <Input type="text" value={flowDescription} onChange={(e) => setFlowDescription(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaPlus />} onClick={handleCreateDraft}>
            Create Draft
          </Button>
          <Button leftIcon={<FaSignOutAlt />} onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Index;
