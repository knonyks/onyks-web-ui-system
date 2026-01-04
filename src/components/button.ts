import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import "@fontsource/poppins/400.css";

@customElement('onyks-button')
export class Onyks_Button extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    background = "red"

    @property({type: String, reflect: true})
    href = ""

    render() 
    {
        if(this.href == "")
        {
            return html`<button class="${this.background} ${this.size}"><slot></slot></button>`
        }
        else
        {
            return html`<a class="${this.background} ${this.size}" href="${this.href}"><slot></slot></a>`
        }
    }

    static styles = css`
        button, a
        {
            font-family: 'Poppins', sans-serif;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            width: inherit;
            border: 0;
            cursor: pointer;
            margin: 0;
            display: block;
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
            width: fit-content;
        }
    `
}


declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-button': Onyks_Button
    }
}