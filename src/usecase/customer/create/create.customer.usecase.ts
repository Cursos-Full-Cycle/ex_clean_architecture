import CustomerFactory from "../../../domain/customers/factory/customer-factory";
import CustomerRepositoryInterface from "../../../domain/customers/repository/customer.repository.interface";
import Address from "../../../domain/customers/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid} from 'uuid';

export default class CreateCustomerUseCase {
    private CustomerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.CustomerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto) : Promise<OutputCreateCustomerDto> {        
        const customer = CustomerFactory.createWithAddress(
            input.name, 
            new Address(
                input.address.street, 
                input.address.number, 
                input.address.city, 
                input.address.zip
           )
        );

        await this.CustomerRepository.create(customer);

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