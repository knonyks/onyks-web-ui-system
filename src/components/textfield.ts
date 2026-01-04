import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-textfield')
export class Onyks_Textfield extends LitElement 
{
    render() 
    {
        return html`<input type="text">`
    }

    static styles = css`
        input[type="text"]
        {
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            border: 1px solid #000000;
            width: calc(100% - 2rem);
            box-sizing: border-box;
            outline: none;
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