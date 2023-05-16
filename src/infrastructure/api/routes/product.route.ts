import express, {Request, Response} from 'express';
import ProductRepository from '../../products/repository/sequelize/product.repository';
import CreateProductUseCase from '../../../usecase/products/create/create.product.usecase';
import ListProductUseCase from '../../../usecase/products/list/list.product.usecase';
import UpdateProductUseCase from '../../../usecase/products/update/update.product.usecase';
import { InputUpdateProductDto } from '../../../usecase/products/update/update.product.dto';
import { InputFindProductDto } from '../../../usecase/products/find/find.product.dto';
import FindProductUseCase from '../../../usecase/products/find/find.product.usecase';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
        }

        const output = await usecase.execute(productDto);

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.put('/:id', async (req: Request, res: Response) => {
    const usecase = new UpdateProductUseCase(new ProductRepository());    
    
    try {
        const input: InputUpdateProductDto = {
            id: req.params.id,
            name: req.body.name,
            price: req.body.price,
        }
        const output = await usecase.execute(input);
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get('/:id', async (req: Request, res: Response) => {
    const usecase = new FindProductUseCase(new ProductRepository());    

    try {
        const input: InputFindProductDto = {
            id: req.params.id            
        }
        const output = await usecase.execute(input);
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }    
});