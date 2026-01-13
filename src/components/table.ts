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
            
            background-color: #232428;
            border: 1px solid #2c2e33;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            box-sizing: border-box;
            
            overflow: hidden;
        }

        .scroll-wrapper {
            width: 100%;
            height: 100%;
            overflow: auto;
            
            scrollbar-width: thin;
            scrollbar-color: #3f4148 #232428;
        }

        .scroll-wrapper::-webkit-scrollbar { width: 10px; height: 10px; }
        .scroll-wrapper::-webkit-scrollbar-track { background: #232428; }
        .scroll-wrapper::-webkit-scrollbar-corner { background: #232428; }
        .scroll-wrapper::-webkit-scrollbar-thumb {
            background-color: #3f4148;
            border-radius: 6px;
            border: 2px solid #232428;
        }
        .scroll-wrapper::-webkit-scrollbar-thumb:hover { background-color: #fa5252; }

        .table-container {
            display: table;
            width: auto; 
            min-width: 100%;
            border-collapse: collapse;
            table-layout: auto;
        }
    `;

    render() {
        return html`
            <div class="scroll-wrapper">
                <div class="table-container">
                    <slot></slot>
                </div>
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
            transition: background-color 0.2s ease;
        }

        :host(:not([header]):hover) {
            background-color: #34353c;
        }

        :host([header]) {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: #232428;
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
            padding: 16px 24px;
            
            border-bottom: 1px solid #2c2e33;
            border-right: none;
            
            vertical-align: middle;
            text-align: left;
            
            color: #c1c2c5;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 0.95rem;

            max-width: 1px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        :host(:last-child) {
            border-right: none;
        }

        :host-context(onyks-row[header]) {
            color: #fa5252;
            font-weight: 700;
            font-size: 0.85rem;
            text-transform: uppercase;
            border-bottom: 2px solid #fa5252;
            background-color: #2d2e33;
            max-width: none; 
            width: auto;
            white-space: nowrap; 
            overflow: visible;
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