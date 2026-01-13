import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import logo_path from '../assets/logo.png';

@customElement('onyks-logo')
export class Onyks_Logo extends LitElement 
{
    render()
    {
        return html`<img src="${logo_path}" alt="ONYKS Logo" class="inverted">`;
    }

    static styles = css`
        img
        {
            display: block;
            width: 100%;
            height: 100%;
        }

        .inverted
        {
            filter: var(--logo-invert);
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
        'onyks-logo': Onyks_Logo
    }
}