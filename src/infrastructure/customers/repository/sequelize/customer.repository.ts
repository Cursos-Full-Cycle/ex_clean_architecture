import Customer from "../../../../domain/customers/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customers/repository/customer.repository.interface";
import Address from "../../../../domain/customers/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            city: entity.address.city,
            zipcode: entity.address.zip,
            active: entity.isActive(),
            rewardsPoints: entity.rewardPoints,

        });        
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            city: entity.address.city,
            zipcode: entity.address.zip,
            active: entity.isActive(),
            rewardsPoints: entity.rewardPoints,
        }, 
        {
            where: { id: entity.id }
        });        
    }

    async findById(id: string): Promise<Customer> {
        let customerModel 
        try {
            customerModel = await CustomerModel.findOne({
                where: 
                 {
                    id
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found");
        }
        const customer = new Customer (id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipcode);
        customer.changeAddress(address);
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        const customers = customerModels.map(customerModel => {
            let customer = new Customer (customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardsPoints);
            const address = new Address(
                customerModel.street, 
                customerModel.number,                 
                customerModel.city,
                customerModel.zipcode);
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });        
        return customers;
        
    }
}