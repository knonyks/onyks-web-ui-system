import {LitElement, css} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-theme-switch')
export class Onyks_Theme_Switch extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    href = ""

    render() 
    {

    }

    static styles = css`

    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-theme-switch': Onyks_Theme_Switch
    }
}