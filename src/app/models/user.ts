interface IUser {
    email: string;
    password: string;
    is_guest: boolean;
}

export class User implements IUser {
    email: string;
    password: string;
    public is_guest = false;
    constructor(email: string) {
        this.email = email;
    }

    public toJson(): string {
        return JSON.stringify({"email": this.email});
    }

    public static fromJson(params: string): User {
        const user_data = JSON.parse(params);
        return new User(user_data.email);
    }
}

export class Guest extends User {
    public is_guest = true;
    constructor() {
        super('Anonymous');
    }
}
