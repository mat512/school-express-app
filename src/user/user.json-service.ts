import { User } from './user';
import { UserService } from './user.service';

import * as fs from 'fs';

export class UserJSONService implements UserService {
    private filePath: string;
    private users: User[];

    constructor() {
        this.filePath = './db/users.json';
        this.users = this.loadUsers();
    }

    add(username: string): User {
        const newUser: User = {
            id: this.users.length,
            username,
        };

        this.users.push(newUser);
        this.saveUsers();

        return newUser;
    }

    getById(id: number): User | null {
        const user = this.users.find((user) => user.id === id);

        return user || null;
    }

    private loadUsers(): User[] {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');

            return JSON.parse(data) as User[];
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    private saveUsers(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2));
    }
}
