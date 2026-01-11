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
            return html`<a class="${this.background} ${this.size}" href="${this.href}"><slot></slot></a>`
        }
    }

    static styles = css`
        button, a
        {
            box-sizing: border-box;
            border: 1px solid transparent;
            border-radius: var(--radius-sm);
            padding: var(--spacing-sm) var(--spacing-md);
            text-decoration: none;
            cursor: pointer;
            display: block;
            height: fit-content;
            width: fit-content;
        }

        .blue
        {
            background-color: var(--color-blue);
            color: white;
        }

        .green
        {
            background-color: var(--color-green);
            color: black;
        }

        .red
        {
            background-color: var(--color-red);
            color: white;
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
            font-size: var(--font-xl);
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
        'onyks-button': Onyks_Button
    }
}