import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Alert,
  CircularProgress,
} from "@mui/material";
import { CheckCircleOutlined as CheckCircleOutlineIcon } from "@mui/icons-material";

import MenuPanel from "./MenuPanel";
import RegisterPanel from "./RegisterPanel";

type AuthView =
  | "menu"
  | "login"
  | "register"
  | "recover-request"
  | "recover-feedback";

const colors = {
  primary: "#0D2D5E",
  textMain: "#1A1A1A",
  blackText: "#000000",
  border: "#E0E0E0",
  greyButton: "#F0F0F0",
};

interface LoginPageProps {
  onLoginSuccess?: (data: {
    token?: string;
    access_token?: string;
    refresh_token?: string;
    user: any;
  }) => void;
}

const estiloCard = {
  padding: 6,
  borderRadius: 3,
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const estiloTitulo = {
  color: colors.primary,
  fontWeight: "bold",
  textAlign: "center",
  mb: 3,
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

interface TelaLoginProps {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  erroLogin: string | null;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onToggleShowPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  onBack: () => void;
}

const TelaLogin: React.FC<TelaLoginProps> = ({
  email,
  password,
  showPassword,
  loading,
  erroLogin,
  onEmailChange,
  onPasswordChange,
  onToggleShowPassword,
  onSubmit,
  onForgotPassword,
  onBack,
}) => (
  <Paper sx={estiloCard} elevation={0}>
    <Typography variant="h4" component="h1" sx={estiloTitulo}>
      Acesse sua conta
    </Typography>
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
    >
      {erroLogin && (
        <Alert severity="error" sx={{ fontSize: "1.1rem" }}>
          {erroLogin}
        </Alert>
      )}
      <TextField
        label="E-mail ou CPF"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        sx={estiloCampoTexo}
      />
      <FormControl variant="outlined" fullWidth required sx={estiloCampoTexo}>
        <InputLabel htmlFor="campo-senha">Senha</InputLabel>
        <OutlinedInput
          id="campo-senha"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          label="Senha"
          endAdornment={
            <InputAdornment position="end">
              <Button
                onClick={onToggleShowPassword}
                size="small"
                type="button"
                sx={{
                  color: colors.blackText,
                  textTransform: "none",
                  fontWeight: "bold",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 1,
                  px: 1.5,
                }}
              >
                {showPassword ? "Esconder" : "Mostrar"}
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
      <Link
        component="button"
        type="button"
        onClick={onForgotPassword}
        sx={{ ...estiloLink, alignSelf: "flex-start" }}
      >
        Esqueci minha senha
      </Link>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        sx={estiloBotaoPrimario}
      >
        {loading ? <CircularProgress size={28} color="inherit" /> : "Entrar"}
      </Button>
      <Link component="button" type="button" onClick={onBack} sx={estiloLink}>
        Voltar ao início
      </Link>
    </Box>
  </Paper>
);

const TelaSolicitarRecuperacao = ({
  recoverEmail,
  onRecoverEmailChange,
  onSubmit,
  onBack,
}: any) => (
  <Paper sx={estiloCard} elevation={0}>
    <Typography variant="h4" component="h1" sx={estiloTitulo}>
      Recuperar senha
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: colors.blackText,
        textAlign: "center",
        mb: 4,
        fontSize: "1.2rem",
        lineHeight: 1.6,
      }}
    >
      Digite seu e-mail ou CPF abaixo. Vamos enviar as instruções no seu e-mail
      para criar uma nova senha.
    </Typography>
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}
    >
      <TextField
        label="E-mail ou CPF"
        variant="outlined"
        fullWidth
        required
        value={recoverEmail}
        onChange={(e) => onRecoverEmailChange(e.target.value)}
        sx={estiloCampoTexo}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={estiloBotaoPrimario}
      >
        Enviar instruções
      </Button>
      <Link component="button" type="button" onClick={onBack} sx={estiloLink}>
        Voltar para o Login
      </Link>
    </Box>
  </Paper>
);

const TelaFeedbackRecuperacao = ({ recoverEmail, onBack }: any) => (
  <Paper sx={estiloCard} elevation={0}>
    <CheckCircleOutlineIcon
      sx={{ fontSize: "5rem", color: colors.primary, mb: 3 }}
    />
    <Typography variant="h4" component="h1" sx={estiloTitulo}>
      Instruções enviadas
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: colors.blackText,
        textAlign: "center",
        mb: 4,
        fontSize: "1.2rem",
        lineHeight: 1.6,
      }}
    >
      Verifique sua caixa de entrada. Se não encontrar, confira a pasta de spam.
    </Typography>
    <Box
      component="form"
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}
    >
      <TextField
        label="E-mail ou CPF*"
        variant="outlined"
        fullWidth
        disabled
        value={recoverEmail}
        sx={{
          ...estiloCampoTexo,
          "& .MuiInputBase-input.Mui-disabled": { color: colors.primary },
        }}
      />
      <Button
        variant="outlined"
        fullWidth
        size="large"
        sx={{
          color: colors.primary,
          borderColor: colors.border,
          backgroundColor: colors.greyButton,
          borderRadius: 2,
          fontSize: "1.3rem",
          fontWeight: "bold",
          textTransform: "none",
          py: 1.5,
          "&:hover": { borderColor: "#CCC", backgroundColor: "#EAEAEA" },
        }}
      >
        Reenviar instruções
      </Button>
      <Link component="button" type="button" onClick={onBack} sx={estiloLink}>
        Voltar para o Login
      </Link>
    </Box>
  </Paper>
);

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [currentView, setCurrentView] = useState<AuthView>("menu");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroLogin, setErroLogin] = useState<string | null>(null);

  const navegarPara = (view: AuthView) => {
    setCurrentView(view);
    setErroLogin(null);
  };

  const lidarComLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErroLogin(null);
    try {
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const dados = await resposta.json();
      if (!resposta.ok)
        throw new Error(dados.message || "E-mail ou senha incorretos.");

      onLoginSuccess?.(dados);
    } catch (erro: any) {
      setErroLogin(erro.message);
    } finally {
      setLoading(false);
    }
  };

  const lidarComRecuperacao = (e: React.FormEvent) => {
    e.preventDefault();
    navegarPara("recover-feedback");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      {currentView === "menu" && (
        <MenuPanel
          onGoToLogin={() => navegarPara("login")}
          onGoToRegister={() => navegarPara("register")}
        />
      )}

      {currentView === "register" && (
        <RegisterPanel
          onBack={() => navegarPara("menu")}
          onRegisterSuccess={(data) => {
            onLoginSuccess?.(data);
            navegarPara("login");
          }}
        />
      )}

      {currentView === "login" && (
        <TelaLogin
          email={email}
          password={password}
          showPassword={showPassword}
          loading={loading}
          erroLogin={erroLogin}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onToggleShowPassword={() => setShowPassword(!showPassword)}
          onSubmit={lidarComLogin}
          onForgotPassword={() => navegarPara("recover-request")}
          onBack={() => navegarPara("menu")}
        />
      )}

      {currentView === "recover-request" && (
        <TelaSolicitarRecuperacao
          recoverEmail={recoverEmail}
          onRecoverEmailChange={setRecoverEmail}
          onSubmit={lidarComRecuperacao}
          onBack={() => navegarPara("login")}
        />
      )}

      {currentView === "recover-feedback" && (
        <TelaFeedbackRecuperacao
          recoverEmail={recoverEmail}
          onBack={() => navegarPara("login")}
        />
      )}
    </Container>
  );
}
