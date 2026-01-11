import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import '@fontsource/inter/400.css';

@customElement('onyks-textfield')
export class Onyks_Textfield extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    placeholder = ""

    @property({type: String, reflect: true})
    type = "text"

    @property({type: String, reflect: true})
    label = ""

    @property({type: String, reflect: true})
    id = ""

    @property({type: String, reflect: true})
    value = ""

    render() 
    {
        return html`
            <input class="${this.size}" 
            placeholder="${this.placeholder}"
            type="${this.type}"
            label="${this.label}"
            id="${this.id}"
            value="${this.value}"
            />
        `
    }

    static styles = css`
        input
        {
            box-sizing: border-box;
            font-family: 'Inter';
            border: 1px solid black;
            border-radius: var(--radius-sm);
            padding: var(--spacing-sm) var(--spacing-md);
            text-decoration: none;
            cursor: pointer;
            display: block;
            height: fit-content;
            width: fit-content;
            outline: none;
        }

        .s
        {
            font-size: var(--font-sm);
        }

        .m
        {
            font-size: var(--font-md);
        }

        .l
        {
            font-size: var(--font-lg);
        }

        .xl
        {
            font-size:  var(--font-xl);
        }

        :host
        {
            height: fit-content;
            display: block;
            width: fit-content;
        }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-textfield': Onyks_Textfield
    }
}