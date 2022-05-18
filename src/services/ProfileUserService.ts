import prismaClient from "../prisma";

class ProfileUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
    });
    if (user) {
      return user;
    } else {
      const newUser = await prismaClient.newUser.findFirst({
        where: { id: user_id },
      });
      return newUser;
    }
  }
}

export { ProfileUserService };

