import Entity from "../../shared/entity/entity.abstract";
import NotificationError from "../../shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {

    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;   
        this.validate();          
    }

    validate() { 
        CustomerValidatorFactory.create().validate(this);
        if (this.notification.hasErrors()) {            
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }


    changeName(name: string) {

        this._name = name;
        this.validate();
    }

    activate() {        
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    isActive() {
        return this._active;
    }

    deactivate() {  
        if (!this._active) return;    
        this._active = false;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

}