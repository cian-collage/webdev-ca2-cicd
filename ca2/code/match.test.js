import './shapecard.js';
import './memory-game.js';

// Minimal ShapeCard template to exist
document.body.innerHTML = `
    <template id="shape-card-template">
        <div class="card card-face-down"></div>
    </template>
`;

// Test that two identical cards are matched correctly
test('MemoryGame correctly matches two identical cards', () => {

    // Create a 1 row x 2 columns game
    document.body.innerHTML += `<memory-game size="1x2"></memory-game>`;
    const game = document.querySelector('memory-game');

    // Cards generated automatically
    const cards = game.querySelectorAll('shape-card');
    expect(cards.length).toBe(2);

    const cardA = cards[0];
    const cardB = cards[1];

    // Set both cards to be identical
    cardA.setAttribute('type', 'circle');
    cardA.setAttribute('colour', 'red');

    cardB.setAttribute('type', 'circle');
    cardB.setAttribute('colour', 'red');

    // Before clicking
    expect(game._matched).toBe(0);
    expect(game._clicks).toBe(0);

    // Click first card
    game.onCardClick(cardA);
    expect(game._clicks).toBe(1);

    // Click second card
    game.onCardClick(cardB);
    expect(game._clicks).toBe(2);

    // Both cards should be marked as matched
    expect(cardA.classList.contains('matched')).toBe(true);
    expect(cardB.classList.contains('matched')).toBe(true);

    // The matched count should be 2
    expect(game._matched).toBe(2);
});
