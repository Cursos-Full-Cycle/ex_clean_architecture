import Customer from "../../../domain/customers/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customers/repository/customer.repository.interface";
import { InputListCustomerDto, OutpurListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private CustomerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.CustomerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto) : Promise<OutpurListCustomerDto> {    
        const customers = await this.CustomerRepository.findAll();
        console.log(customers.length);
        console.log(customers[0].id);
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]) : OutpurListCustomerDto {
        return  {
            customers: customer.map(customer => {
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
            })
        }
    }
}