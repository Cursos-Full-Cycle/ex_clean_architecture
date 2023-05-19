export type NotificationError = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationError[] = [];

    addError(error: NotificationError) {
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
}