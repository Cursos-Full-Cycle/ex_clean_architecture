import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customers/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customers/repository/sequelize/customer.repository";
import Customer from "../../../domain/customers/entity/customer";
import Address from "../../../domain/customers/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
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

    it("should find a customer", async () => {
        
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "City", "88802-100");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = { id: "1" };
        const output = {
            id: "1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City",
                zip: "88802-100",
            },
        }

        const customerFounded = await usecase.execute(input);
        expect(customerFounded).toEqual(output);
    });
});