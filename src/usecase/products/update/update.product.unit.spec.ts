import Product from "../../../domain/products/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const productId = "1";
const createProduct = () => {
    return new Product(productId, "Product", 10);
}

const input = {
    id: productId,
    name: "Product alterado",
    price: 20,
}

const Repository  = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = Repository ();
        productRepository.findById = jest.fn().mockReturnValue(Promise.resolve(createProduct()))
        const usecase = new UpdateProductUseCase(productRepository);

        const productUpdated = await usecase.execute(input);
        expect(productUpdated).toEqual(input);
    });

    it("should throw an error when product not found", async () => {
        const productRepository = Repository ();
        productRepository.findById.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const usecase = new UpdateProductUseCase(productRepository);

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = Repository ();
        productRepository.findById = jest.fn().mockReturnValue(Promise.resolve(createProduct()))
        const usecase = new UpdateProductUseCase(productRepository);
        input.name = "";
        input.price = 10;
        
        await expect(usecase.execute(input)).rejects.toThrow("product: Name is required");        
    });

    it("should throw an error when price not greater than zero", async () => {
        const productRepository = Repository ();
        productRepository.findById = jest.fn().mockReturnValue(Promise.resolve(createProduct()))
        const usecase = new UpdateProductUseCase(productRepository);
        input.price = -1;
        input.name = "Product price less zero";
                
        await expect(usecase.execute(input)).rejects.toThrow("product: Price must be greater than zero");
    });
});