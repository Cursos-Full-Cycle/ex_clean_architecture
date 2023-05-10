import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 12345,
                    zip: "12345"
                },
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("123 Main St");
        expect(response.body.address.city).toBe("Anytown");
        expect(response.body.address.number).toBe(12345);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer with invalid data", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 12345,
                    zip: "12345"
                },
            });            
        expect(response.status).toBe(500);        
    });

    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 12345,
                    zip: "12345"
                },
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Eu mesmo",
                address: {
                    street: "1234 Main St",
                    city: "Anytown",
                    number: 123456,
                    zip: "123456"
                },
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/customer")
            .send();
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("John Doe");
        expect(customer.address.street).toBe("123 Main St");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Eu mesmo");
        expect(customer2.address.street).toBe("1234 Main St");

    });

    it("should update a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St",
                    city: "Anytown",
                    number: 12345,
                    zip: "12345"
                },
            });
        expect(response.status).toBe(200);
        console.log(response.body.id);        
        const id = response.body.id;
        const customerUpdated = await request(app)
            .put(`/customer/${id}`)
            .send({
                name: "John Doe Updated",
                address: {
                    street: "123 Main St Updated",
                    city: "Anytown Updated",
                    number: 12345,
                    zip: "12345"
                },
            });        
        expect(customerUpdated.status).toBe(200);
        expect(customerUpdated.body.name).toBe("John Doe Updated");
        expect(customerUpdated.body.address.street).toBe("123 Main St Updated");
        expect(customerUpdated.body.address.city).toBe("Anytown Updated");
        expect(customerUpdated.body.address.number).toBe(12345);
        expect(customerUpdated.body.address.zip).toBe("12345");

    });
});