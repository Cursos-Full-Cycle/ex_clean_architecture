import Address from "./domain/customers/value-object/address";
import Customer from "./domain/customers/entity/customer";
import Order from "./domain/orders/entity/order";
import OrderItem from "./domain/orders/entity/order_item";

let customer = new Customer("123", "Fabio de Stefani");
const address = new Address("Rua 1", 123, "Criciuma", "88802100")
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 1);
let order = new Order("1", "123", [item1, item2]);