import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
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
class AuthenticateNewUserService {
  async execute(email: string, password: string) {
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

    let user = await prismaClient.newUser.findFirst({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = sign(
      {
        user: { name: user.name, email: user.email, id: user.id },
      },
      process.env.JWT_SECRET,
      { subject: user.id, expiresIn: "1d" }
    );
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateNewUserService };

