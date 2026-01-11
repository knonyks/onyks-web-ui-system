import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-table')
export class Onyks_Table extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: fit-content;
            max-width: 100%;
            margin: 0 auto;
            
            height: 200px;
            overflow-y: auto;
            border: 1px solid var(--color-background, #ccc);
            border-radius: 8px;
            box-sizing: border-box;
        }

        .table-container {
            display: table;
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;
        }
    `;

    render() {
        return html`
            <div class="table-container">
                <slot></slot>
            </div>
        `;
    }
}

@customElement('onyks-row')
export class Onyks_Row extends LitElement {
    @property({ type: Boolean, reflect: true }) header = false;

    static styles = css`
        :host {
            display: table-row;
        }

        :host([header]) {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: #f4f4f4; 
            font-weight: bold;
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

@customElement('onyks-col')
export class Onyks_Col extends LitElement {
    static styles = css`
        :host {
            display: table-cell;
            padding: 12px;
            border-bottom: 1px solid #eee;
            border-right: 1px solid #eee;
            vertical-align: middle;
            text-align: left;

            max-width: 0; 
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        :host(:last-child) {
            border-right: none;
        }

        :host-context(onyks-row[header]) {
            border-bottom: 2px solid #ccc;
            background-color: #f4f4f4;
            
            width: auto; 
            max-width: none; 
            overflow: visible; 
            text-overflow: clip;
        }
    `;

    render() {
        return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
    }
    
    handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        const text = nodes.map(n => n.textContent).join('').trim();
        this.title = text;
    }
}