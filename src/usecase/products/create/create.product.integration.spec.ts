import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/products/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/products/repository/sequelize/product.repostiry";
import Product from "../../../domain/products/entity/product";
import FindProductUseCase from "../find/find.product.usecase";

describe("Integration Test find product use case", () => {
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
        const useCase = new FindProductUseCase(productRepository);    
        const product = new Product("1", "Product 1", 10);    
        await productRepository.create(product);
        const input = { id: "1" };

        const productFounded = await useCase.execute(input);
        expect(productFounded).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
});