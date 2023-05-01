import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customers/value-object/address";
import Customer from "../../../../domain/customers/entity/customer";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },            
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository= new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "City", "88802-100");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            city: address.city,
            zipcode: address.zip,
            active: customer.isActive(),
            rewardsPoints: customer.rewardPoints,            
        });
    });

    it("should update a customer", async () => {
        const customerRepository= new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "City", "88802-100");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        
        const customerModel = await CustomerModel.findOne({where: {id: "1"}});
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            city: address.city,
            zipcode: address.zip,
            active: customer.isActive(),
            rewardsPoints: customer.rewardPoints,            
        });

    });

    it("should find a customer ", async () => {
        const customerRepository= new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "City", "88802-100");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerFounded = await customerRepository.findById(customer.id);        
        expect(customer).toStrictEqual(customerFounded);

    });

    it("should throw an error when customer is not found ", async () => {
        const customerRepository= new CustomerRepository();
        expect(async () => {
            await customerRepository.findById("11222");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers ", async () => {
        const customerRepository= new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "City", "88802-100");
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();
        await customerRepository.create(customer);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 1", 2, "City", "88802-100");
        customer2.changeAddress(address2);
        customer2.addRewardPoints(10);
        customer2.activate();
        await customerRepository.create(customer2);

        const costumers = await customerRepository.findAll();

        expect(costumers).toHaveLength(2);
        expect(costumers).toContainEqual(customer);
        expect(costumers).toContainEqual(customer2);
    });

});