import { prisma } from "../db";

// Create new user and store token
async function storeUserLoginModal(data: {
  name: string;
  email: string;
  password: string;
  token?: string;
}) {
  const storeLogin = await prisma.login.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      token: data.token,
    },
  });

  return storeLogin;
}

// Check user credentials
async function checkUserbyEmail(email: string, password: string) {
  const data = await prisma.login.findMany({
    where: { email, password },
  });
  return data;
}

// Get user by email
async function checkinUserLogin(email: string) {
  const data = await prisma.login.findFirst({
    where: { email },
  });
  return data;
}

// Update or clear user token
async function updateUserToken(email: string, token: string | null) {
  const updatedUser = await prisma.login.update({
    where: { email },
    data: { token },
  });
  return updatedUser;
}

export {
  storeUserLoginModal,
  checkUserbyEmail,
  checkinUserLogin,
  updateUserToken,
};
