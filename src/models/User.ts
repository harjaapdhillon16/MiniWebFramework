import { Collection } from './Collection';
import { Eventing } from './eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Atrributes';
import { Model } from './Model'

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}
type CallBack = () => void;

const url = 'http://localhost:3000/users'


export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(url)
        )
    }
    static buildCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(url,
            (json: UserProps) => User.buildUser(json));
    }
    setRandomAge() {
        const age = Math.round(Math.random() * 100);
        this.set({ age: age })
    }
}

