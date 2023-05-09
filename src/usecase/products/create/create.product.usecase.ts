import Product from "../../../domain/products/entity/product";
import ProductRepositoryInterface from "../../../domain/products/repository/product.repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { v4 as uuid} from 'uuid';

export default class CreateProductUseCase {
    private ProductRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.ProductRepository = productRepository;
    }
    async execute(input: InputCreateProductDto) : Promise<OutputCreateProductDto> {        
        const productId = uuid();
        const product = new Product(productId, input.name, input.price)
        await this.ProductRepository.create(product);
                
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}