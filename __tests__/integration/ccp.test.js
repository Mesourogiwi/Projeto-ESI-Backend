const request = require('supertest')

const app = require('../../src/server');

describe('CCP', () => {
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
    it('should be able to edit one ccp user', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .put('/ccp')
        .send({
            id: '1',
            name: 'ccp_editado',
            email: 'ccp_editado@teste.com',
            password: '654321'
        })
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(200)
    })
    it('should not find a ccp user to edit', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .put('/ccp')
        .send({
            id: '400',
            name: 'admin_editado',
            email: 'admin_editado@teste.com',
            password: '654321'
        })
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(404)
    })
    it('should not be able to edit a ccp user', async () => {
        const response = await request(app)
        .put('/ccp')
        .send({
            id: '1',
            name: 'admin_editado',
            email: 'admin_editado@teste.com',
            password: '654321'
        })
        .set('Authorization', `Bearer 123123`)

        expect(response.status).toBe(401)
    })
    it('should be able to delete a ccp user', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .delete('/ccp/1')
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(200)
    })
    it('should not find a ccp user to delete', async () => {
        const loginAdmin = await request(app)
        .post('/login')
        .send({
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        const response = await request(app)
        .delete('/ccp/200')
        .set('Authorization', `Bearer ${loginAdmin.body.token}`)

        expect(response.status).toBe(404)
    })
    it('should not be able to delete a ccp user', async () => {
        const response = await request(app)
        .delete('/ccp/1')
        .set('Authorization', `Bearer 123123`)

        expect(response.status).toBe(401)
    })
})