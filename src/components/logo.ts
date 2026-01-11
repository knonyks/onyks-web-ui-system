import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import '@fontsource/inter/400.css';

@customElement('onyks-logo')
export class Onyks_Logo extends LitElement 
{
    @property({type: String, reflect: true})
    width = "200px"

    render() 
    {
        return html`<img src="src/assets/logo.png" alt="ONYKS Logo" width="${this.width}" class="inverted">`;
    }

    static styles = css`
        img
        {
            display: block;
        }

        .inverted
        {
            filter: var(--logo-invert);
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