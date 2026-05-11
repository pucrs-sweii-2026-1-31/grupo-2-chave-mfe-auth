import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage";

const handleAuthSuccess = (data: {
  access_token?: string;
  refresh_token?: string;
  token?: string;
  user: any;
}) => {
  console.log("Autenticação realizada com sucesso!", data);

  const accessToken = data.access_token || data.token;
  const refreshToken = data.refresh_token;

  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }

  if (data.user?.name) {
    alert(`Bem-vindo(a), ${data.user.name}!`);
  } else if (data.user?.email) {
    alert(`Bem-vindo(a), ${data.user.email}!`);
  }
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoginPage onLoginSuccess={handleAuthSuccess} />
  </React.StrictMode>,
);
