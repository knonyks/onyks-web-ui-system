import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-button-group')
export class Onyks_Button_Group extends LitElement 
{
    @property({type: Boolean})
    vertical = false

    render() 
    {
        return html`<slot></slot>`
    }

    static styles = css`
        :host
        {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
        
        }

        :host([vertical])
        {
            width: 200px;
            heigth: fit-content;
            display: flex;
            gap: 0.5rem;
            flex-direction: column;
        }

        :host([vertical]) ::slotted(onyks-button) 
        {
            width: 100%;
        }

        :host([vertical]) ::slotted(button)
        {
            width: 100%;
        }
    `
}




declare global 
{
  interface HTMLElementTagNameMap 
  {
    'onyks-button-group': Onyks_Button_Group
  }
}