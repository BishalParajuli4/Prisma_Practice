import { prisma } from "../db";

export const Sign_in_Model = async (u_name: string, u_password: string) => {
  const checkUser = await prisma.user.findMany({
    where: {
      name: u_name,
      password: u_password,
    },
    select: { name: true, password: true },
  });
  return checkUser;
};
