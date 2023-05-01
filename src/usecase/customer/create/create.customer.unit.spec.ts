import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: 'John Doe',
    address: {
        street: 'Main Street',
        number: 123,
        zip: '12345',
        city: 'New York'
    }
}

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit Test Create Customer Use Case', () => {
    it("should create a customer", async () => {
        const customerRespository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRespository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        });
    });

    it("should throw an error when name is missing", async () => {
        const customerRespository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRespository);
        input.name = "";
        
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("should throw an error when street is missing", async () => {
        const customerRespository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRespository);
        input.address.street = "";
        
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Street is required");
    });
});