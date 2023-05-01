import Address from "../value-object/address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;   
        this.validate();     
    }

    validate() { 
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
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