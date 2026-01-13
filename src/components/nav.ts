import { LitElement, html, css, type PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';


@customElement('onyks-nav')
export class Onyks_Nav extends LitElement 
{
  @property({ type: Boolean }) 
  rounded = false;

  @property({ type: String, reflect: true }) 
  size = 'm';

  @state() private is_mobile_menu_open = false;

  static styles = css`
    *
    {
        font-family: var(--font);
    }
        
    :host 
    {
      display: block;
      width: 100%;
      --nav-bg: #111;
      --nav-text: #fff;
      --nav-height: 64px;
      --nav-padding: 0 24px;
      --nav-radius: 16px;
      --accent-color: #4CAF50;
      font-size: var(--font-m);
      position: relative;
      z-index: 1000;
    }

    :host([size="s"]) 
    { 
      font-size: var(--font-sm); --nav-height: 50px; 
    }
    
    :host([size="m"])  
    { 
      font-size: var(--font-md); 
      --nav-height: 64px;
    }
    
    :host([size="l"])  
    { 
      font-size: var(--font-lg); 
      --nav-height: 72px; 
    }
    
    :host([size="xl"]) 
    { 
      font-size: var(--font-xl); 
      --nav-height: 80px;
    }

    nav 
    {
      background-color: var(--background-secondary);
      align-items: center;
      color: var(--nav-text);
      height: var(--nav-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--nav-padding);
      box-sizing: border-box;
      position: relative; 
      transition: border-radius 0.2s ease-in-out;
    }

    .rounded 
    {
      border-radius: var(--radius-md);
    }

    .rounded.menu-open 
    {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      transition-delay: 0s;
    }
  `;

  constructor() 
  {
    super();
    this.addEventListener('mobile-menu-toggle', this._handleMenuToggle as EventListener);
  }

  private _handleMenuToggle(e: CustomEvent) 
  {
    this.is_mobile_menu_open = e.detail.isOpen;
    this.requestUpdate();
  }

  render() 
  {
    const classes = 
    {
      rounded: this.rounded,
      'menu-open': this.is_mobile_menu_open
    };
    return html`
      <nav class="${classMap(classes)}">
        <slot></slot>
      </nav>
    `;
  }
}

@customElement('onyks-nav-content')
export class Onyks_Nav_Content extends LitElement 
{
  @property({ type: Number }) mobilebreakpoint = 900;
  @property({ type: Number }) maxviewitems = 3;

  @state() private is_mobile = false;
  @state() private is_menu_open = false;
  @state() private currentPage = 0;

  static styles = css`
    :host 
    {
      position: static; 
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      justify-content: center;
    }

    /* ZMIANA: Gdy host ma atrybut mobile-mode (nadawany w JS), wyrównujemy do prawej (end) */
    :host([mobile-mode]) {
      justify-content: flex-end;
    }

    .desktop-wrapper 
    {
      display: flex;
      height: 100%;
    }

    .next-btn 
    {
      background: red;
      border: none;
      color: inherit;
      height: 100%;
      width: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-wrapper 
    {
      position: static;
    }

    .hamburger 
    {
      background: transparent;
      border: none;
      color: inherit;
      padding: 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
      
    .line 
    {
      display: block;
      width: 24px;
      height: 2px;
      background-color: currentColor;
      transition: 0.3s;
    }

    .hamburger.active .line:nth-child(1) 
    { 
      transform: translateY(8px) rotate(45deg); 
    }

    .hamburger.active .line:nth-child(2) 
    { 
      opacity: 0; 
    }

    .hamburger.active .line:nth-child(3) 
    { 
      transform: translateY(-8px) rotate(-45deg); 
    }

    .mobile-dropdown-wrapper 
    {
      position: absolute;
      top: 100%; 
      left: 0;
      width: 100%; 
      
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease-out;
      
      background-color: var(--nav-bg); 
      z-index: 999;
      
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }
    
    .mobile-dropdown-wrapper.open {
      grid-template-rows: 1fr;
      border-top: 1px solid rgba(255,255,255,0.1); 
    }

    :host-context(onyks-nav[rounded]) .mobile-dropdown-wrapper.open {
      border-bottom-left-radius: var(--nav-radius);
      border-bottom-right-radius: var(--nav-radius);
    }

    .dropdown-inner {
      overflow: hidden;
    }
    
    .dropdown-content-scroll {
      max-height: 60vh;
      overflow-y: auto;
      padding-bottom: 10px;
    }

    ::slotted(*) { display: flex; }
  `;

  constructor() {
    super();
    this._handleResize = this._handleResize.bind(this);
    this._handleOptionClick = this._handleOptionClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._checkMobile();
    window.addEventListener('resize', this._handleResize);
    this.addEventListener('click', this._handleOptionClick);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleResize);
    this.removeEventListener('click', this._handleOptionClick);
    super.disconnectedCallback();
  }

  protected updated(_changedProperties: PropertyValueMap<any>): void {
    if (_changedProperties.has('maxviewitems') || _changedProperties.has('currentPage') || _changedProperties.has('is_mobile')) {
      this._updateVisibility();
    }
  }

  private _handleResize() {
    this._checkMobile();
  }

  private _checkMobile() {
    const wasMobile = this.is_mobile;
    this.is_mobile = window.innerWidth <= this.mobilebreakpoint;

    // ZMIANA: Ręczne nadawanie atrybutu hostowi, aby CSS mógł zmienić justify-content
    if (this.is_mobile) {
      this.setAttribute('mobile-mode', '');
    } else {
      this.removeAttribute('mobile-mode');
    }

    if (wasMobile !== this.is_mobile) {
      this.toggleMenu(false);
      this.currentPage = 0;
      this.requestUpdate(); 
    }
  }

  private toggleMenu(forceState?: boolean) 
  {
    const newState = forceState !== undefined ? forceState : !this.is_menu_open;
    this.is_menu_open = newState;
    this.dispatchEvent(new CustomEvent('mobile-menu-toggle', 
    {
        detail: 
        { 
          isOpen: this.is_menu_open 
        },
        bubbles: true,
        composed: true
    }));
  }

  private _handleSlotChange()
  {
    this._updateVisibility();
    this.requestUpdate();
  }

  private get _slottedElements(): HTMLElement[] 
  {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return (slot.assignedElements({ flatten: true }) as HTMLElement[]);
  }

  private _updateVisibility() 
  {
    const elements = this._slottedElements;
    const limit = Number(this.maxviewitems);

    elements.forEach((el, index) => 
    {
      if (this.is_mobile) 
      {
        el.style.display = 'flex';
        el.style.width = '100%';
        el.style.height = '50px'; 
        el.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        el.style.padding = '0'; 
      } else {
        el.style.width = '';
        el.style.height = '100%';
        el.style.borderBottom = '';
        const start = this.currentPage * limit;
        const end = start + limit;
        el.style.display = (index >= start && index < end) ? '' : 'none';
      }
    });
  }

  private _nextPage = (e: Event) => {
    e.stopPropagation();
    const elements = this._slottedElements;
    const limit = Number(this.maxviewitems);
    if (!elements.length) return;
    const totalPages = Math.ceil(elements.length / limit);
    this.currentPage = (this.currentPage + 1) % totalPages;
  };

  private _handleOptionClick(e: Event) {
    const target = e.target as HTMLElement;
    const option = target.closest('onyks-nav-option');
    if (option && option instanceof Onyks_Nav_Option) {
      this._slottedElements.forEach(el => {
        if (el instanceof Onyks_Nav_Option) el.selected = false;
      });
      option.selected = true;
      if (this.is_mobile) this.toggleMenu(false);
    }
  }

  render() {
    const elements = this._slottedElements;
    const limit = Number(this.maxviewitems);
    const showNextBtn = !this.is_mobile && elements.length > limit;

    if (this.is_mobile) {
      return html`
        <div class="mobile-wrapper">
           <button class="hamburger ${classMap({ active: this.is_menu_open })}" @click="${() => this.toggleMenu()}">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
           </button>
           
           <div class="mobile-dropdown-wrapper ${classMap({ open: this.is_menu_open })}">
             <div class="dropdown-inner">
                <div class="dropdown-content-scroll">
                   <slot @slotchange="${this._handleSlotChange}"></slot>
                </div>
             </div>
           </div>
        </div>
      `;
    }

    return html`
      <div class="desktop-wrapper">
        <slot @slotchange="${this._handleSlotChange}"></slot>
        ${showNextBtn ? html`<div class="next-btn" @click="${this._nextPage}">&#10140;</div>` : ''}
      </div>
    `;
  }
}


@customElement('onyks-nav-option')
export class Onyks_Nav_Option extends LitElement {
  @property({ type: String }) href = '';
  @property({ type: Boolean, reflect: true }) selected = false;

  static styles = css`
    :host { display: block; cursor: pointer; }
    
    :host([selected]) .nav-item {
      color: var(--accent-color, #4CAF50);
      background-color: rgba(255,255,255,0.05);
      font-weight: 600;
    }
    
    @media (max-width: 900px) {
       :host([selected]) .nav-item { border-left: 3px solid var(--accent-color, #4CAF50); }
    }
    @media (min-width: 901px) {
       :host([selected]) .nav-item { border-bottom: 2px solid var(--accent-color, #4CAF50); }
    }

    .nav-item {
      padding: 0 20px;
      height: 100%;
      display: flex;
      align-items: center;
      white-space: nowrap;
      color: inherit;
      text-decoration: none;
      box-sizing: border-box;
      transition: background 0.2s;
      width: 100%;
      font-size: inherit;
    }
    .nav-item:hover { background-color: rgba(255,255,255,0.1); }
  `;

  render() {
    return this.href 
      ? html`<a class="nav-item" href="${this.href}"><slot></slot></a>`
      : html`<div class="nav-item"><slot></slot></div>`;
  }
}
declare global 
{
    interface HTMLElementTagNameMap 
    {
      'onyks-nav': Onyks_Nav,
      'onyks-nav-content': Onyks_Nav_Content,
      "onyks-nav-option":Onyks_Nav_Option
    }
}