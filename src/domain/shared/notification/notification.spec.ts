import Notification from "./notification";

describe("Unit tests for notification", () => {
    it("should create errors", () => {
        const notification = new Notification();
        let error = {
            message: "Error message",
            context: "customer",            
        }
        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: Error message,");

        error = {
            message: "Error message 2",
            context: "customer",            
        }

        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: Error message,customer: Error message 2,");

        error = {
            message: "Error message 3",
            context: "order",            
        }

        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: Error message,customer: Error message 2,");
        
        expect(notification.messages()).toBe("customer: Error message,customer: Error message 2,order: Error message 3,");

        expect(notification.messages("")).toBe("customer: Error message,customer: Error message 2,order: Error message 3,");
        

    });

    it("should check if notification has at least one error", () => {
        const notification = new Notification();
        expect(notification.hasErrors()).toBeFalsy();
        
        let error = {
            message: "Error message",
            context: "customer",            
        }
        notification.addError(error);
        expect(notification.hasErrors()).toBeTruthy();
    });

    it("should get all errors props", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "customer",            
        }
        notification.addError(error);
        expect(notification.getErrors()).toEqual([error]);
    });
});