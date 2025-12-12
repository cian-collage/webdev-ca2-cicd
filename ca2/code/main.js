import { ShapeCard } from './shapecard.js';
import './memory-game.js';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

// Create a status bar container
const status = document.createElement('div');
status.id = 'status-bar';
status.style.margin = '16px';
status.style.fontFamily = 'sans-serif';
document.body.prepend(status); // add to top of body

// listen for game-complete event to show completion message and save click count and timestamp to Firestore
document.addEventListener('game-complete', async (e) => {
    const clicks = e.detail?.clicks ?? 0;

    // Save completion to Firestore
    try {
        await addDoc(collection(db, 'gameResults'), {
            clicks,
            timestamp: serverTimestamp()
        });
    } catch (err) {
        console.error('Error saving result:', err);
    }

    // Show completion screen
    status.innerHTML = `
        <div>
            <strong>You completed the game in ${clicks} clicks!</strong>
            <button id="play-again" style="margin-left:12px">Play Again</button>
            <button id="show-avg" style="margin-left:8px">Show Average</button>
        </div>
    `;

    // Add event listener to play again button
    const btn = document.getElementById('play-again');
    btn.addEventListener('click', () => {
        // Recreate the game element to reset state
        const oldGame = document.querySelector('memory-game');
        const size = oldGame?.getAttribute('size') || '3x4';
        const newGame = document.createElement('memory-game');
        newGame.setAttribute('size', size);
        oldGame.replaceWith(newGame);
        status.textContent = ''; // clear message
    });

    // Show Average button
    const avgBtn = document.getElementById('show-avg');

    // Add event listener to show average button
    avgBtn.addEventListener('click', async () => {
        try {
            // extract all game results from firestore and save as snapshot
            const snapshot = await getDocs(collection(db, 'gameResults'));

            // add up all clicks into a list
            const clicksList = snapshot.docs.map(d => d.data().clicks).filter(n => typeof n === 'number');

            // if no games recorded yet
            if (!clicksList.length) {
                status.innerHTML += `<p>No games recorded</p>`;
                return;
            }
            // calculate average and display
            const avg = (clicksList.reduce((a, b) => a + b, 0) / clicksList.length).toFixed(2);
            status.innerHTML += `<p>Average clicks: ${avg} (from ${clicksList.length} games)</p>`;
        } catch (err) {
            console.error('Error fetching average:', err);
        }
    });
});

//  Web app Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIN_owdmPEqc8ac5bysm_UepEnNp1Wpsk",
    authDomain: "c22793219-rwat-ca2.firebaseapp.com",
    projectId: "c22793219-rwat-ca2",
    storageBucket: "c22793219-rwat-ca2.firebasestorage.app",
    messagingSenderId: "881684239250",
    appId: "1:881684239250:web:5612f68431630e2bf8e74b",
    measurementId: "G-7ZF7XM911V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


