import type { FastifyInstance } from "fastify";
import z from "zod"
import { FastifyTypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface User {
    id: string
    name: string
    email: string
    password: string
}

interface Register {
    id: string
    name: string
    email: string
    cpf: string
    telefone: string
    registro: string
    especialidade: string
}


const users: User[] = []
const registers: Register[] = []

export async function routes(app: FastifyTypedInstance) {
    app.get('/users', {
        schema: {
            tags: ['users'],
            description: 'List users',
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                    password: z.string()
                }))
            }
        }
    }, () => {
        return users
    })

    app.post('/users', {
        schema: {
            tags: ['users'],
            description: 'Create a new user',
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string()
            }),
            response: {
                201: z.null().describe('User created'),
            },
        }
    }, async (request, reply) => {
        const { name, email, password } = request.body

        users.push({
            id: randomUUID(),
            name,
            email,
            password
        })

        return reply.status(201).send()
    })


        app.get('/registers', {
            schema: {
                tags: ['registers'],
                description: 'List registers',
                response: {
                    200: z.array(z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string(),
                        cpf: z.string(),
                        telefone: z.string(),
                        registro: z.string(),
                        especialidade: z.string(),
                    }))
                }
            }
        }, () => {
            return registers
        })

        app.post('/registers', {
            schema: {
                tags: ['registers'],
                description: 'Create a new register',
                body: z.object({
                    name: z.string(),
                    email: z.string().email(),
                    cpf: z.string(),
                    telefone: z.string(),
                    registro: z.string(),
                    especialidade: z.string()
                }),
                response: {
                    201: z.null().describe('Register created'),
                },
            }
        }, async (request, reply) => {
            const { name, email, cpf, telefone, registro, especialidade } = request.body

            registers.push({
                id: randomUUID(),
                name,
                email,
                cpf,
                telefone,
                registro,
                especialidade
            })

            return reply.status(201).send()
        })
    }