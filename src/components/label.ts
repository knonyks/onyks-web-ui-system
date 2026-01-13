import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-label')
export class Onyks_Label extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    for = ""

    render() 
    {
        return html`
            <label for="${this.for}"><slot></slot></label>
        `
    }

    static styles = css`
        label
        {
            box-sizing: border-box;
            border: 1px solid transparent;
            padding: var(--spacing-sm) var(--spacing-md);
            text-decoration: none;
            display: block;
            height: 100%;
            width: 100%;
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

        *
        {
            font-family: var(--font);
        }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-label': Onyks_Label
    }
}