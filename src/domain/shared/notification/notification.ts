export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string) {
        return this.errors
            .filter(error => error.context === context || !context)
            .map(error => `${error.context}: ${error.message},`)
            .join("");
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    getErrors(): NotificationErrorProps[] {
        console.log(this.errors.length);
        console.log(this.errors);
        return this.errors;
    }
}