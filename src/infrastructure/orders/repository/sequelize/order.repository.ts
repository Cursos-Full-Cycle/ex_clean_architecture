import Order from "../../../../domain/orders/entity/order";
import OrderItem from "../../../../domain/orders/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/orders/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        }, {
            include: [{model: OrderItemModel}],
        });        
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        },
        {
            where: {id: entity.id}            
        });               
    }

    async findById(id: string): Promise<Order> {
        let orderModel 
        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id
                },
                include:  ["items"],
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Order not found");
        }
        const items = this.mapOrderItems(orderModel);
        const order = new Order(orderModel.id, orderModel.customer_id, items);
        return order;

    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });

        const orders = orderModels.map(orderModel => {
            const items = this.mapOrderItems(orderModel);
            const order = new Order(orderModel.id, orderModel.customer_id, items);
            return order;
        });
        return orders;
        
    }

    mapOrderItems(orderModel: OrderModel) {
        return orderModel.items.map(orderItem => {
            let item = new OrderItem(
                orderItem.id,
                orderItem.name,
                orderItem.price,
                orderItem.product_id,
                orderItem.quantity
            );
            return item;
        });
    }
}