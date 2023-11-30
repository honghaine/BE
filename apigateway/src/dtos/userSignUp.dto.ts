import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  @Length(5,10)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(5,10)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(5,10)
  readonly repassword: string;
}
