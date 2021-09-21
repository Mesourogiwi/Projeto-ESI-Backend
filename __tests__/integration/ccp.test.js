const request = require('supertest')

const app = require('../../src/server');

describe('Authentication', () => {
    it('should create a new CCP user', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .post('/ccp')
        .send({
            name: 'Lucas Quintas Honorato',
            email: 'lucasquintasCCP@hotmail.com',
            password: '123456'
        })
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(200);
    })
    it('should get an error when no info is provided', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })
        const response = await request(app)
        .post('/ccp')
        .send()
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(400)
    })
    it('should get an error when create an cpp user with same email', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })
        const response = await request(app)
        .post('/ccp')
        .send({
            name: 'Lucas Quintas Honorato',
            email: 'lucasquintasCCP@hotmail.com',
            password: '123456'
        })
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(500)
    })
    it('should get all ccp users', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })
        const response = await request(app)
        .get('/ccp')
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(200)
    })
    it('should get only one ccp user', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .get('/ccp/1')
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(200)

    })
})