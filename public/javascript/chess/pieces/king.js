var King = function(config) {
    this.type = 'king';
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDiff = Math.abs(targetRow - currentRow);

    if (colDiff <= 1 && rowDiff <= 1) {
        return true;
    }

    console.warn("Invalid move for king");
    return false;
};

King.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition) && this.color === this.board.currentPlayer) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        console.warn("Move not allowed");
    }
};
