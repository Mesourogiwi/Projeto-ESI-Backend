const request = require('supertest')
const app = require('../../src/server')

describe('Authentication', () => {
    it('should autenthicate', async () => {
        // const admin = await Admin.create({
        //     name: 'Lucas',
        //     email: 'lucasquintas@hotmail.com',
        //     password: '123456'
        // })

        const createdAdmin = await request(app)
        .post('/admin')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        expect(response.status).toBe(200);
    })
    it('should not autenthicate when no password is provided', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com'
        })

        expect(response.status).toBe(400);
    })
    it('should not autenthicate when no email is provided', async () => {
        const response = await request(app)
        .post('/login')
        .send()

        expect(response.status).toBe(400);
    })
    it('should not autenthicate when password is different', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            email: 'luskansado@hotmail.com',
            password: '12345678'
        })

        expect(response.status).toBe(500);
    })
})