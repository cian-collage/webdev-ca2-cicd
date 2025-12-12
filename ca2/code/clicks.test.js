import './shapecard.js';
import './memory-game.js';

// Minimal ShapeCard template to exist
document.body.innerHTML = `
    <template id="shape-card-template">
        <div class="card card-face-down"></div>
    </template>
`;

// Test that clicking cards increments the click counter
test('MemoryGame increments click counter correctly', () => {
    // Create a 1 row x 2 columns game
    document.body.innerHTML += `<memory-game size="1x2"></memory-game>`;
    const game = document.querySelector('memory-game');

    // Cards generated automatically
    const cards = game.querySelectorAll('shape-card');
    expect(cards.length).toBe(2);

    // Before clicking
    expect(game._clicks).toBe(0);

    // First click (clicks = 1)
    game.onCardClick(cards[0]);
    expect(game._clicks).toBe(1);

    // Second click (clicks = 2)
    game.onCardClick(cards[1]);
    expect(game._clicks).toBe(2);
});