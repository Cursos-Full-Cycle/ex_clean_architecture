import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "A",
    name: "Product 1",
    price: 10,
}

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        input.name = "";
        input.price = 10;
        
        await expect(usecase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("should throw an error when price not greater than zero", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        input.price = -1;
        input.name = "Product 1";
        
        await expect(usecase.execute(input)).rejects.toThrowError("Price must be greater than zero");
    });
});