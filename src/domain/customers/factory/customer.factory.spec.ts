import Address from "../value-object/address";
import CustomerFactory from "./customer-factory";

describe("CustomerFactory unit test", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("Customer A");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address("Address A", 270, "City A", "88802-100");
        let customer = CustomerFactory.createWithAddress("Customer A", address);
        
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.address).toBe(address);
    });
});
