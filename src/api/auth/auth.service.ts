import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UserService } from '../user/user.service';
import { GoogleUserDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';

/* 이 함수에 관한 설명 
  GetGoogleAccessToken은 permissionCode를 이용하여 Google Access token을 획득하는 함수이다.
  permissionCode는 
*/
const GetGoogleAccessToken = async (
  permissionCode: string,
): Promise<[boolean, string]> => {
  try {
    const response = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code: permissionCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const googleAccessToken = response.data.access_token;
    return [true, googleAccessToken];
  } catch (error) {
    console.error('Error getting Google access token:', error);
    return [false, ''];
  }
};

const GetGoogleUserData = async (
  googleAccessToken: string,
): Promise<[boolean, GoogleUserDto | null]> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      },
    );

    const googleUserDataString = JSON.stringify(response.data);
    const googleUserDataObject = JSON.parse(googleUserDataString);
    const googleUserDto = Object.assign(
      new GoogleUserDto(),
      googleUserDataObject,
    );
    return [true, googleUserDto];
  } catch (error) {
    console.error('Error getting Google user data:', error);
    return [false, null];
  }
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async googleLogin(permissionCode: string): Promise<[string, User]> {
    let ok: boolean;
    let google_access_token: string;
    let google_user_data: GoogleUserDto | null;
    let access_token: string;

    try {
      // Google Access token 획득
      [ok, google_access_token] = await GetGoogleAccessToken(permissionCode);
      if (!ok) {
        throw new HttpException(
          'GetGoogleAccessToken',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Google User 정보 획득
      [ok, google_user_data] = await GetGoogleUserData(google_access_token);
      if (!ok || google_user_data == null) {
        throw new HttpException(
          'GetGoogleUserData() fail',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user_dto: CreateUserDto = {
        google_id: google_user_data.id,
        email: google_user_data.email,
        picture_url: google_user_data.picture,
      };

      // 기존 유저인지 확인
      let user: User | null = await this.userService.SelectOneByEmail(
        user_dto.email,
      );

      if (user == null) user = await this.userService.Create(user_dto);

      // Server API Access token 획득
      access_token = this.jwtService.sign(
        { user_dto },
        { secret: process.env.JWT_SECRET_KEY },
      );

      const result: [string, User] = [access_token, user];

      return result;
    } catch (err) {
      console.error(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
