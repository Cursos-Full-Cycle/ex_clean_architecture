import CustomerRepositoryInterface from "../../../domain/customers/repository/customer.repository.interface";
import Address from "../../../domain/customers/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private CustomerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.CustomerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto) : Promise<OutputUpdateCustomerDto> {
        const customer = await this.CustomerRepository.findById(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new Address(input.address.street, input.address.number, input.address.city, input.address.zip));
        await this.CustomerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
            }
        }
    }
}