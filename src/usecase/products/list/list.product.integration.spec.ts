import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/products/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/products/repository/sequelize/product.repository";
import Product from "../../../domain/products/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Integration Test list product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },            
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);        
        const productA = new Product("1", "Product 1", 10);
        const productB = new Product("2", "Product 2", 20);
        await productRepository.create(productA);
        await productRepository.create(productB);        

        const products = await useCase.execute({});
        expect(products.products.length).toEqual(2);
        expect(products.products[0].name).toBe(productA.name)
        expect(products.products[0].price).toBe(productA.price)

        expect(products.products[1].name).toBe(productB.name)
        expect(products.products[1].price).toBe(productB.price)
        
    });
});