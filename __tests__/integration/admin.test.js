const request = require('supertest')

const app = require('../../src/server');

describe('Authentication', () => {
    it('should create a new administrator', async () => {
        const response = await request(app)
        .post('/admin')
        .send({
            name: 'Lucas Quintas Honorato',
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        expect(response.status).toBe(200);
    })
    it('should get an error when no info is provided', async () => {
        const response = await request(app)
        .post('/admin')
        .send()

        expect(response.status).toBe(400)
    })
    it('should get an error when create an admin with same email', async () => {
        const response = await request(app)
        .post('/admin')
        .send({
            name: 'Lucas Quintas Honorato',
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        expect(response.status).toBe(500)
    })
    it('should get all administrators', async () => {
        const createdAdmin = await request(app)
        .post('/admin')
        .send({
            name: 'Gustavo Oliveira',
            email: 'gsushi@gmail.com',
            password: '123456'
        })

        const response = await request(app)
        .get('/admin')
        .set('Authorization', `Bearer ${createdAdmin.body.token}`)

        expect(response.status).toBe(200)
    })
    it('should get only one administrator', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .get('/admin/1')
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(200)

    })
})