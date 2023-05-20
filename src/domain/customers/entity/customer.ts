import Entity from "../../shared/entity/entity.abstract";
import NotificationError from "../../shared/notification/notification.error";
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
        
        if (this.notification.hasErrors()) {
            console.log('possui errors');
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() { 
        if (this.id.length === 0) {
            this.notification.addError({
                message: "Id is required",
                context: "customer"
            });            
        }
        if (this._name.length === 0) {
            this.notification.addError({
                message: "Name is required",
                context: "customer"
            });            
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