import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

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
            return html`<a class="${this.background} ${this.size}" href="${this.href}"><slot></slot></button>`
        }
    }

    static styles = css`
        button, a
        {
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
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
            font-size: 12px;
        }

        .m
        {
            font-size: 14px;
        }

        .l
        {
            font-size: 16px;
        }

        .xl
        {
            font-size: 18px;
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