import Product from "../../../domain/products/entity/product";
import ProductFactory from "../../../domain/products/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

// const product = new Product("1", "Product 1", 10);
const product = ProductFactory.create("A", "Product 1", 10);

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = { id: product.id };
        const output = {
            id: product.id,
            name: "Product 1",
            price: 10,
        }

        const productFounded = await usecase.execute(input);
        expect(productFounded).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.findById.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const usecase = new FindProductUseCase(productRepository);

        const input = { id: "1" };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});