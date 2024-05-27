export class Game {
    public players: string[] = ['Hans', 'Max', 'Junus', 'Hans', 'Max'];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currenPlayer: number = 0;


    constructor() {
        this.generateStack();
    }


    /**
     * generate Stack of alle cards
     */
    generateStack() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('spades_' + i);
        }
        this.shuffle(this.stack);
    }


    /**
     * shuffle all cards to a random list
     * @param array of each stack
     */
    shuffle(array: string[]) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
}