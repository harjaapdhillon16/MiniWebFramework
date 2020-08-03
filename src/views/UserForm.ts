import { User, UserProps } from './../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.change-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick
        }
    }
    onSaveClick = () => {
        this.model.save()
    }
    onSetAgeClick = () => {
        this.model.setRandomAge()
    }
    onSetNameClick = () => {
        const input = this.parent.querySelector('input') as HTMLInputElement;
        const newName = input.value;
        this.model.set({ name: newName })
    }
    template(): string {
        return `
        <div>
        <input placeholder="${this.model.get('name')}"/>
        <button class="change-name">Change Name</button>
        <button class="set-age">Set Random age</button>
        <button class="save-model">Save</button>
        </div>
        `
    }



}
