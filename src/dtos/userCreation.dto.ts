import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsNumber,
  IsEmpty,
} from 'class-validator';
export class CreateUserDto {
  /**
User name
@example John Doe
*/
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
A valid email
@example example@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
A password with at least one upper and one lower case characters, one special character, one number and between 8 and 15 length
@example Aa12345$
   */
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password has to contain at least one lower and upper case character, one number, one of the next special characters: !@#$%^&* and a length between 8 and 15 characters',
    },
  )
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  /**
Password confirmation
@example Aa12345$
   */
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  /**
Adress here
@example 123 New Ave, 0000
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
Phone here
@example 123456789
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
Your residence country with full name
@example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
Your residence city with full name
@example Bogota
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;

  /**
This field contain the type of role user may have, it has to be empty. 1 - User. 2 - Admin. 3 - Superadmin
@example
   */
  @ApiHideProperty()
  @IsEmpty()
  role?: number;
}
