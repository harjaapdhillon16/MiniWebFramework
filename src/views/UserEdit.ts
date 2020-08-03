import { UserShow } from './UserShow';
import { UserForm } from './UserForm';
import { User, UserProps } from './../models/User';
import { View } from './View';

export class UserEdit extends View<User, UserProps>{
    regionsMap(): { [key: string]: string } {
        return {
            userShow: ".user-show",
            userForm: ".user-edit"
        }
    }
    onRender() {
        new UserShow(this.regions.userShow, this.model).render();
        new UserForm(this.regions.userForm, this.model).render()
    }
    template() {
        return `
        <div>
            <div class="user-show"></div>
            <div class="user-edit"></div>
        </div>
        `
    }
}