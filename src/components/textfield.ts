import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import "@fontsource/poppins/400.css";

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
            font-family: 'Poppins', sans-serif;
            border: 0.1px solid black;
            border-radius: 5px;
            padding: 0.5rem 1rem;
            outline: none;
            display: block;
            max-width: 200px;
        }

        .blue
        {
            background-color: #405affff;
            color: white;
        }

        .green
        {
            background-color: #40ff76ff;
            color: black;
        }

        .red
        {
            background-color: #ff4040ff;
            color: white;
        }

        .s
        {
            font-size: 14px;
        }

        .m
        {
            font-size: 16px;
        }

        .l
        {
            font-size: 18px;
        }

        .xl
        {
            font-size:  20px;
        }

        :host
        {
            width: 100%;
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