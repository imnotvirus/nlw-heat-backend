import prismaClient from "../prisma";

class ProfileUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
    });
    if (user) {
      return { id: user.id, name: user.name, picture: user.avatar_url };
    } else {
      const newUser = await prismaClient.newUser.findFirst({
        where: { id: user_id },
      });
      return newUser;
    }
  }
}

export { ProfileUserService };

