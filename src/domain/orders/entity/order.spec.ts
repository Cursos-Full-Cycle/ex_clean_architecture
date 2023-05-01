import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit testes", () => {


    it("should throw error when id is empty", () => {
        expect(() => {
           let order = new Order("", "1", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
           let order = new Order("1", "", []);
        }).toThrowError("Customer id is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
           let order = new Order("1", "1", []);
        }).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("i1", "Name1", 100, "pq", 1);
        const item2 = new OrderItem("i1", "Name1", 200, "p2", 1 );
        const order = new Order("i1", "Name1", [item1]);

        let total = order.total();
        expect(total).toBe(100);

        const order2 = new Order("i1", "Name1", [item1, item2]);
        total = order2.total();
        expect(total).toBe(300);
    });

    it("should throw error if the item qtde is less or equal 0", () => {        
        expect(() => {
            const item1 = new OrderItem("i1", "Name1", 100, "pq", 0);
            const order = new Order("i1", "Name1", [item1]);
        }).toThrowError("Quantity must be greater than zero");

    });
})