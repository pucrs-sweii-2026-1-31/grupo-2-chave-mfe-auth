import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

const colors = { primary: "#0D2D5E", blackText: "#000000", border: "#E0E0E0" };

const estiloCard = {
  padding: 6,
  borderRadius: 3,
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};
const estiloCampoTexo = {
  "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "1.2rem" },
  "& .MuiInputLabel-root": { fontSize: "1.1rem" },
};
const estiloBotaoPrimario = {
  backgroundColor: colors.primary,
  color: "#fff",
  borderRadius: 2,
  fontSize: "1.3rem",
  fontWeight: "bold",
  textTransform: "none",
  py: 1.5,
  "&:hover": { backgroundColor: "#0A224A" },
};
const estiloLink = {
  color: colors.blackText,
  textAlign: "center",
  mt: 1,
  fontSize: "1.1rem",
  fontWeight: 500,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": { color: colors.primary },
};

interface RegisterPanelProps {
  onBack: () => void;
  onRegisterSuccess: (data: any) => void;
}

export default function RegisterPanel({
  onBack,
  onRegisterSuccess,
}: RegisterPanelProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("aluno");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const lidarComCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas digitadas não são iguais.");
      return;
    }

    setLoading(true);
    try {
      const resposta = await fetch(`${import.meta.env.VITE_MS_AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: nome,
          email,
          password: senha,
          role: perfil,
        }),
      });

      const dados = await resposta.json();
      if (!resposta.ok)
        throw new Error(dados.message || "Erro ao realizar o cadastro.");

      onRegisterSuccess(dados);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={estiloCard} elevation={0}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: colors.primary,
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
        }}
      >
        Criar minha conta
      </Typography>

      <Box
        component="form"
        onSubmit={lidarComCadastro}
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
      >
        {erro && (
          <Alert severity="error" sx={{ fontSize: "1.1rem" }}>
            {erro}
          </Alert>
        )}

        <TextField
          label="Nome completo"
          variant="outlined"
          fullWidth
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={estiloCampoTexo}
        />
        <TextField
          label="E-mail ou CPF"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={estiloCampoTexo}
        />

        <FormControl fullWidth required sx={estiloCampoTexo}>
          <InputLabel>Eu sou...</InputLabel>
          <Select
            value={perfil}
            label="Eu sou..."
            onChange={(e) => setPerfil(e.target.value as string)}
          >
            <MenuItem value="aluno">Aluno</MenuItem>
            <MenuItem value="professor">Professor</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth required sx={estiloCampoTexo}>
          <InputLabel htmlFor="campo-senha">Crie uma senha</InputLabel>
          <OutlinedInput
            id="campo-senha"
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            label="Crie uma senha"
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  size="small"
                  sx={{
                    color: colors.blackText,
                    textTransform: "none",
                    fontWeight: "bold",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 1,
                    px: 1,
                  }}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth required sx={estiloCampoTexo}>
          <InputLabel htmlFor="campo-confirmar">Confirme a senha</InputLabel>
          <OutlinedInput
            id="campo-confirmar"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            label="Confirme a senha"
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  size="small"
                  sx={{
                    color: colors.blackText,
                    textTransform: "none",
                    fontWeight: "bold",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 1,
                    px: 1,
                  }}
                >
                  {showConfirmPassword ? "Ocultar" : "Mostrar"}
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={estiloBotaoPrimario}
        >
          {loading ? (
            <CircularProgress size={28} color="inherit" />
          ) : (
            "Concluir Cadastro"
          )}
        </Button>

        <Link component="button" type="button" onClick={onBack} sx={estiloLink}>
          Voltar
        </Link>
      </Box>
    </Paper>
  );
}
