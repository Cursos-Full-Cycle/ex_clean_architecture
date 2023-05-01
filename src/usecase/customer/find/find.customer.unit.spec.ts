import Customer from "../../../domain/customers/entity/customer";
import Address from "../../../domain/customers/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("1", "Customer 1");
const address = new Address("Street 1", 1, "City", "88802-100");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test find customer use case", () => {

    it("should find a customer", async () => {
        
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        
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

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.findById.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);
        
        const input = { id: "1" };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    });
});