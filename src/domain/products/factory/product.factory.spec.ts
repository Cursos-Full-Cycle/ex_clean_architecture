import ProductFactory from "./product.factory";

describe("ProductFactory unit test", () => {

    it("should create a product a", () => {
        const product = ProductFactory.create("A", "Product A", 10);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(10);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product b", () => {
        const product = ProductFactory.create("B", "Product B", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw an error when product type is not supported", () => {
        expect(() => {
            ProductFactory.create("C", "Product C", 1);
        }).toThrowError("Product Type not supported");
    });

});