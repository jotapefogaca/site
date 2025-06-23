export type Mail = {
    id: string,
    name: string,
    email: string,
    phone: string,
    message: string,
    subject: string,
    status: {
        read: boolean,
        received: Date
    }
}