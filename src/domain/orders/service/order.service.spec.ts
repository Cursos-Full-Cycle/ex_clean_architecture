import Customer from "../../customers/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {
    it("should get total of all orders", () => {
        const orderItem1 = new OrderItem("1", "Order Item 1", 100, "p1", 1);
        const orderItem2 = new OrderItem("2", "Order Item 2", 200, "p2", 2);
        const order1 = new Order("1", "c1", [orderItem1]);
        const order2 = new Order("1", "c1", [orderItem2]);
        
        
        const total = OrderService.total([order1, order2]);
        
        expect(total).toBe(500);
    });

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("1", "Order Item 1", 10, "p1", 1);
        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
});