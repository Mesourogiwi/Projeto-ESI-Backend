const request = require('supertest')

const app = require('../../src/server');
const truncate = require('../utils/truncate');
const Admin = require('../../src/models/Admin')

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate()
    })
    it('should create a new administrator', async () => {
        // const admin = await Admin.create({
        //     name: 'Lucas',
        //     email: 'lucasquintas@hotmail.com',
        //     password: '123456'
        // })

        const response = await request(app)
        .post('admin')
        .send({
            name: 'Lucas Quintas Honorato',
            email: 'lucasquintas@hotmail.com',
            password: '123456'
        })

        expect(response.status).toBe(200);
    })
})