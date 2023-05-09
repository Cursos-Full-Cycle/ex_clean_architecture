import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/products/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/products/repository/sequelize/product.repository";
import Product from "../../../domain/products/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import FindProductUseCase from "../find/find.product.usecase";

describe("Integration Test update product use case", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);        
        const useCaseFindProduct = new FindProductUseCase(productRepository);        
        const productA = new Product("1", "Product 1", 10);        
        await productRepository.create(productA);

        productA.changeName("Product 1 Updated");
        productA.changePrice(20);

        const input = { id: "1" };

        await productRepository.update(productA);

        const productFounded = await useCaseFindProduct.execute(input);
        expect(productFounded.name).toBe(productA.name)
        expect(productFounded.price).toBe(productA.price)
        
    });
});