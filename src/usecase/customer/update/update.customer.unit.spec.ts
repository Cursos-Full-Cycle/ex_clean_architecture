import CustomerFactory from "../../../domain/customers/factory/customer-factory";
import Address from "../../../domain/customers/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    'John Doe',
    new Address("Street", 123, "Zip", "City")
)

const input = {
    id: customer.id,
    name: 'John Updated',
    address: {
        street: 'street updated',
        number: 1234,
        zip: '12345',
        city: 'New York'
    }
}

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test Update Customer Use Case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        
        const output = await customerUpdateUseCase.execute(input);
        
        expect(output).toEqual(input);
    });
});
