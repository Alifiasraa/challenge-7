import { io } from "socket.io-client";

const api = () => {
  const BASE_URL = "http://localhost:5000";
  const socket = io(BASE_URL);
  console.log(socket);
  socket.on("connect", () => {
    console.log("Connected to server");
  });

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    // Emit event ke server melalui Socket.IO jika pendaftaran berhasil
    socket.emit("create-account-notification", {
      recipientId: user.id,
      message: `Akun baru berhasil dibuat untuk ${user.name}`,
    });

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function forgotPassword({ password }) {
    const response = await fetch(`${BASE_URL}/api/v1/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    return { status, message };
  }

  async function resetPassword({ token, newPassword }) {
    const response = await fetch(`${BASE_URL}/api/v1/reset-password/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    // Emit event notifikasi reset password berhasil
    socket.emit("reset-password-notification", {
      recipientId: responseJson.data.userId,
      message: "Password Anda berhasil direset",
    });

    return { status, message };
  }

  return {
    register,
    login,
    forgotPassword,
    resetPassword,
  };
};

export default api;
