import bcrypt from "bcrypt";
import prismaClient from "../prisma";
interface IAcessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  async execute(email: string, password: string, name: string) {
    // const url = "https://github.com/login/oauth/access_token";

    // const { data: accessTokenResponse } = await axios.post<IAcessTokenResponse>(
    //   url,
    //   null,
    //   {
    //     params: {
    //       client_id: process.env.GITHUB_CLIENT_ID,
    //       client_secret: process.env.GITHUB_CLIENT_SECRET,
    //       code,
    //     },
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   }
    // );

    // const response = await axios.get<IUserResponse>(
    //   "https://api.github.com/user",
    //   {
    //     headers: {
    //       authorization: `Bearer ${accessTokenResponse.access_token}`,
    //     },
    //   }
    // );

    // const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.newUser.findFirst({ where: { email } });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      user = await prismaClient.newUser.create({
        data: {
          email,
          password: newPassword,
          name,
        },
      });
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { CreateUserService };

