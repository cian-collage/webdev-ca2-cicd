import { ShapeCard } from './shapecard.js';

class MemoryGame extends HTMLElement {
    constructor() {
        super();
        // added state
        this._flipped = [];
        this._lock = false;
        this._matched = 0;
        this._clicks = 0; // track number of successful flips
    }

    connectedCallback() {
        
        const size = this.getAttribute('size');

        // parse size attribute
        const parts = size.split('x');
        const rows = parseInt(parts[0]);
        const cols = parseInt(parts[1]);

        // calculate number of cards needed
        const totalCards = rows * cols;
        const uniqueCards = totalCards / 2;

        // generate cards
        const cardsHTML = ShapeCard.getUniqueRandomCardsAsHTML(uniqueCards, true);

        // set up grid
        this.innerHTML = `
            <style>
                .game-grid {
                    display: grid;
                    grid-template-columns: repeat(${cols}, 100px);
                    grid-template-rows: repeat(${rows}, 100px);
                    gap: 10px;
                }
                shape-card { cursor: pointer; }
                shape-card.matched { outline: 3px solid limegreen; }
            </style>
            <div class="game-grid">
                ${cardsHTML}
            </div>
        `;

        // add event listener for card clicks
        const grid = this.querySelector('.game-grid');
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('shape-card');
            if (!card) return;
            this.onCardClick(card);
        });
    }

    // handle card click
    onCardClick(card) {
        if (this._lock) return;
        if (card.classList.contains('matched')) return; // ignore matched cards
        if (card.isFaceUp && card.isFaceUp()) return;

        this._clicks += 1; // increment click count
        card.flip && card.flip();
        this._flipped.push(card);

        // if two cards are flipped, check for match
        if (this._flipped.length === 2) {
            const [a, b] = this._flipped; // a = first card b = second card
            const match = a.getAttribute('type') === b.getAttribute('type') &&
                          a.getAttribute('colour') === b.getAttribute('colour'); 

            // if match, mark as matched
            if (match) { 
                a.classList.add('matched');
                b.classList.add('matched');
                this._matched += 2;
                this._flipped = [];
                // check for game completion
                if (this._matched === this.querySelectorAll('shape-card').length) {
                    this.dispatchEvent(new CustomEvent('game-complete', { 
                        bubbles: true,
                        detail: { clicks: this._clicks } // send clicks to listener
                    })); // send game-complete event
                }

            // if not a match, flip back after delay
            } else {
                this._lock = true; // prevent further clicks
                setTimeout(() => {
                    a.flip && a.flip();
                    b.flip && b.flip();
                    this._flipped = [];
                    this._lock = false; 
                }, 800); 
            }
        }
    }
}

customElements.define('memory-game', MemoryGame);