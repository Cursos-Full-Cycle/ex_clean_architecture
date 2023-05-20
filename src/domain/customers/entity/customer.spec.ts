import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit testes", () => {


    it("should throw error when id is empty", () => {
        expect(() => new Customer("", "John"))
            .toThrowError("customer: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => new Customer("1", ""))
            .toThrowError("customer: Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("1", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "John");
        const address = new Address("street", 123, "city", "12345123");
        customer.changeAddress(address);

        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        
        expect(() => {
            const customer = new Customer("1", "John");        
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");        
    });


    it("should deactivated customer", () => {
        const customer = new Customer("1", "John");
                
        customer.deactivate
        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "John");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);

        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(200);
    });

    it("should throw error when name and id is empty", () => {
        expect(() => new Customer("", ""))
            .toThrowError("customer: Id is required,customer: Name is required");
    });

    
})