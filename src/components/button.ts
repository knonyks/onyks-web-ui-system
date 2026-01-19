import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';

@customElement('onyks-button')
export class Onyks_Button extends LitElement 
{
    @property({type: String, reflect: true})
    accessor size: 's' | 'm' | 'l' | 'xl' = 'm';

    @property({type: String, reflect: true})
    background: "red" | "green" | "blue" = 'red';

    @property({type: String, reflect: true})
    href = ""

    @property({ type: String })
    type: 'button' | 'submit' | 'reset' = 'button';

    @property({ type: Boolean, reflect: true})
    disabled = false;




    render() 
    {
        const classes = {
            ['btn']: true,
            [`size-${this.size}`]: true,
            [`bg-${this.background}`]: true
        }

        if (this.href) {
            return html`
                <a 
                    class=${classMap(classes)} 
                    href="${this.href}"
                    aria-disabled="${this.disabled ? 'true' : 'false'}"  tabindex="${this.disabled ? '-1' : '0'}"
                >
                    <slot></slot>
                </a>`;
        }

        return html`
            <button 
                class=${classMap(classes)} 
                type="${this.type}" 
                ?disabled="${this.disabled}" >
                <slot></slot>
            </button>`;

    }

    static styles = css`
        :host
        {
            display: inline-block;
            vertical-align: middle;
        }

        .btn
        {
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: var(--spacing-sm) var(--spacing-md);
            border: 1px solid transparent;
            cursor: pointer;
            font-family: var(--font);
            text-decoration: none;
            text-align: center;
            border-radius: var(--radius-sm, 4px);
            transition: background-color 0.2s, opacity 0.2s;
            line-height: 1.5;
        }

        .bg-blue
        {
            background-color: var(--color-blue);
            color: white;
        }

        .bg-green
        {
            background-color: var(--color-green);
            color: black;
        }

        .bg-red
        {
            background-color: var(--color-red);
            color: white;
        }

        .size-s
        {
            font-size: var(--size-sm);
        }

        .size-m
        {
            font-size: var(--size-md);
        }

        .size-l
        {
            font-size: var(--size-lg);
        }

        .size-xl
        {
            font-size: var(--size-xl);
        }

        .btn:focus-visible 
        {
            outline: 2px solid var(--color-focus, blue);
            outline-offset: 2px;
        }

        button:disabled, a[aria-disabled="true"]
        {
            opacity: 0.6;
            pointer-events: none;
            cursor: not-allowed;
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
        'onyks-button': Onyks_Button
    }
}