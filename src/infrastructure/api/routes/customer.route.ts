import express, {Request, Response} from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customers/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import UpdateCustomerUseCase from '../../../usecase/customer/update/update.customer.usecase';
import { InputUpdateCustomerDto } from '../../../usecase/customer/update/update.customer.dto';
import FindCustomerUseCase from '../../../usecase/customer/find/find.customer.usecase';
import { InputFindCustomerDto } from '../../../usecase/customer/find/find.customer.dto';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        }

        const output = await usecase.execute(customerDto);

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }    
});

customerRoute.put('/:id', async (req: Request, res: Response) => {
    const usecase = new UpdateCustomerUseCase(new CustomerRepository());    
    
    try {
        const input: InputUpdateCustomerDto = {
            id: req.params.id,
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        }
        const output = await usecase.execute(input);
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get('/:id', async (req: Request, res: Response) => {
    const usecase = new FindCustomerUseCase(new CustomerRepository());    

    try {
        const input: InputFindCustomerDto = {
            id: req.params.id            
        }
        const output = await usecase.execute(input);
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});