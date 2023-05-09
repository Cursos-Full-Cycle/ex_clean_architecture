import Product from "../../../domain/products/entity/product";
import ProductRepositoryInterface from "../../../domain/products/repository/product.repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private ProductRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.ProductRepository = productRepository;
    }

    async execute(input: InputListProductDto) : Promise<OutputListProductDto> {
        const products = await this.ProductRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(products: Product[]) : OutputListProductDto {
        return  {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }
            })
        }
    }
}