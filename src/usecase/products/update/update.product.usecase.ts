import ProductRepositoryInterface from "../../../domain/products/repository/product.repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private ProductRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.ProductRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto) : Promise<OutputUpdateProductDto> {
        const product = await this.ProductRepository.findById(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.ProductRepository.update(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}