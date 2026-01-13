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
            outline: none;
            border: 1px solid transparent;
            width: 100%;
            height: 100%;
            margin: 0; 
            padding: var(--spacing-sm) var(--spacing-md);
            display: inline-flex;
            border-radius: var(--radius-sm);
            font-family: var(--font);
            text-decoration: none;
            text-align: center;
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
            box-sizing: border-box;
        }

        *
        {
            font-family: var(--font);
            line-height: 1.5;
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