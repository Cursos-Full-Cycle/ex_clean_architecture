import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customers/entity/customer";
import Address from "../../../../domain/customers/value-object/address";
import Order from "../../../../domain/orders/entity/order";
import OrderItem from "../../../../domain/orders/entity/order_item";
import Product from "../../../../domain/products/entity/product";
import CustomerModel from "../../../customers/repository/sequelize/customer.model";
import CustomerRepository from "../../../customers/repository/sequelize/customer.repository";
import ProductModel from "../../../products/repository/sequelize/product.model";
import ProductRepository from "../../../products/repository/sequelize/product.repostiry";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },            
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customer = await createCustomer("1", "Customer 1");
        const product = await createProduct("1", "Product 1", 10);
        const orderItem = createOrderItem("1", 2, product);
        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
            ], 
        });   

    });

    it("should update a order", async () => {        
        const customer = await createCustomer("1", "Customer 1");
        const product = await createProduct("1", "Product 1", 10);
        const orderItem = createOrderItem("1", 2, product);        
        const order = new Order("1", customer.id, [orderItem]);
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
          });
      
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
            ], 
        });  
        const customer2 = await createCustomer("2", "Customer 2");

        order.changeCustomer(customer2.id);        
        await orderRepository.update(order);        

        const updateOrderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });        
        
        expect(updateOrderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer2.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
            ], 
        });   
         
    });

    it("should find a order ", async () => {        
        const customer = await createCustomer("1", "Customer 1");
        const product = await createProduct("1", "Product 1", 10);
        const orderItem = createOrderItem("1", 2, product);
        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const oderFound = await orderRepository.findById(order.id);
        expect(order).toStrictEqual(oderFound);        

    });

    it("should throw an error when order is not found ", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.findById("11222");
        }).rejects.toThrowError("Order not found");
    });

    it("should find all orders ", async () => {        
        const customer = await createCustomer("1", "Customer 1");
        const product = await createProduct("1", "Product 1", 10);
        const orderItem = createOrderItem("1", 2, product);        
        const order = new Order("1", customer.id, [orderItem]);
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderItem2 = createOrderItem("2", 3, product);        
        const order2 = new Order("2", customer.id, [orderItem2]);
        
        await orderRepository.create(order2);

        const ordersFound = await orderRepository.findAll();
        
        expect(ordersFound).toHaveLength(2);
        expect(ordersFound).toContainEqual(order);
        expect(ordersFound).toContainEqual(order2);
    });

    async function createCustomer(id: string, name: string) {
        const customerRepository = new CustomerRepository();
        const customer = new Customer(id, name);
        const address = new Address("Street 1", 1, "City", "88802-100");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        return customer;
    }

    async function createProduct(id: string, name: string, price: number) {
        const productRepository = new ProductRepository();
        const product = new Product(id, name, price);
        await productRepository.create(product);
        return product;
    }

    function createOrderItem(id: string, quantity: number, product: Product) {
        return new OrderItem(
            id,
            product.name,
            product.price,
            product.id,
            quantity
        );
    }

});

