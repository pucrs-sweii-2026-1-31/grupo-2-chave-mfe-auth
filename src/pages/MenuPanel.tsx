import { Box, Paper, Typography, Button } from "@mui/material";

const colors = {
  primary: "#0D2D5E",
  textMain: "#1A1A1A",
  blackText: "#000000",
  border: "#E0E0E0",
};

const estiloCard = {
  padding: 6,
  borderRadius: 3,
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
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
const estiloBotaoSecundario = {
  color: colors.primary,
  backgroundColor: "transparent",
  border: `1px solid ${colors.primary}`,
  borderRadius: 2,
  fontSize: "1.3rem",
  fontWeight: "bold",
  textTransform: "none",
  py: 1.5,
  "&:hover": { backgroundColor: "rgba(13, 45, 94, 0.04)" },
};

interface MenuPanelProps {
  onGoToLogin: () => void;
  onGoToRegister: () => void;
}

export default function MenuPanel({
  onGoToLogin,
  onGoToRegister,
}: MenuPanelProps) {
  return (
    <Paper sx={estiloCard} elevation={0}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: colors.primary, fontWeight: "bold", mb: 1 }}
      >
        Guia de Desenvolvimento
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: colors.textMain, textAlign: "center", mb: 6 }}
      >
        Bem-vindo ao Sistema de Avaliação
      </Typography>

      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onGoToLogin}
          sx={estiloBotaoPrimario}
        >
          Já tenho uma conta
        </Button>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={onGoToRegister}
          sx={estiloBotaoSecundario}
        >
          Ainda não possuo conta
        </Button>
      </Box>
    </Paper>
  );
}
