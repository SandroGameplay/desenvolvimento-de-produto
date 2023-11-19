import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import { z } from "zod";

// Definição do Schema para as validações de inputs.
const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
 });

export async function POST(req: Request) {
 try {
    const body = await req.json()
    const {email, username, password} = FormSchema.parse(body)

    // Verifica se o e-mail já existe.
    const emailExistByUser = await db.user.findUnique({
      where: {email: email}
    })

    if (emailExistByUser) {
      return NextResponse.json({ user: null, message: 'E-mail já existe.'}, {status: 409})
    }
    // Verifica se o usuário já existe.
    const userExistByUser = await db.user.findUnique({
      where: {username: username}
    })

    if (userExistByUser) {
      return NextResponse.json({ user: null, message: 'Usuário já existe.'}, {status: 409})
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    const { password: newUserPassword, ...rest} = newUser

    return NextResponse.json({user: rest, message: 'Usuário criado com sucesso!'}, {status: 201})
 } catch (error) {
    return NextResponse.json({ message: 'Algo deu errado durante o cadastro!.'}, {status: 500})
 }
}