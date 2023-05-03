import ProductRepositoryInterface from "../../../domain/products/repository/product.repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.products.dto";

export default class FindProductUseCase {
    private ProductRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.ProductRepository = productRepository;
    }

    async execute(input: InputFindProductDto) : Promise<OutputFindProductDto> {
        const product = await this.ProductRepository.findById(input.id);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}