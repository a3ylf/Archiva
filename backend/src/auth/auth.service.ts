import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto/auth.dto';
import * as jwt from 'jsonwebtoken' 
import { config } from 'src/config';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }
    async signup(signupDto: SignupDto) {
        const { username, password } = signupDto;

        // Verificar se o usuário já existe
        const userExists = await this.prisma.user.findUnique({
            where: { username },
        });
        if (userExists) {
            throw new Error('Username already exists');
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar o novo usuário no banco de dados
        const newUser = await this.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return {
            message: 'User created successfully',
            userId: newUser.id,
        };
    }
    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error('Usuário não encontrado!');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Senha incorreta!');
        }

        const payload = { sub: user.id, username: user.username };
         const token = jwt.sign(payload, config.jwt_token || '1234', { expiresIn: '1h' }); 
        return { id: user.id,access_token: token };
    }
    async getAllUsers() {
    return this.prisma.user.findMany();
  }
}

