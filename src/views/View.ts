import { UserProps } from './../models/User';
import { Model } from './../models/Model';


export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};
    regionsMap(): { [key: string]: string } {
        return {};
    }
    constructor(public parent: Element, public model: T) {
        this.model.on("change", () => {
            this.render()
        })
    }
    eventsMap(): { [key: string]: () => void } {
        return {}
    }
    template(): string {
        return ""
    }
    mapRegion(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();
        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.regions[key] = element;
            }
        }
    }
    bindEvents(fragment: DocumentFragment) {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey])
            })
        }
    }
    onRender():void{

    }
    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.parent.innerHTML = ""
        this.bindEvents(templateElement.content)
        this.mapRegion(templateElement.content)
        this.onRender()
        this.parent.append(templateElement.content);
    }
}