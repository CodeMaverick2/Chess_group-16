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
        if (targetCol >= 'a' && targetCol <= 'h' && targetRow >= 1 && targetRow <= 8) {
            const targetPiece = this.board.getPieceAt(targetPosition);
            if (!targetPiece || targetPiece.color !== this.color) {
                return true;
            }
        }
    }
    return false;
};

King.prototype.isSafePosition = function(targetPosition) {
    const opponentPieces = this.board.getPiecesByColor(this.color === 'white' ? 'black' : 'white');
    for (let piece of opponentPieces) {
        if (piece.isValidPosition(targetPosition)) {
            return false;
        }
    }
    return true;
};

King.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition) && this.color === this.board.currentPlayer) {
        if (this.isSafePosition(targetPosition)) {
            this.position = targetPosition.col + targetPosition.row;
            this.render();
            this.board.switchPlayer();
        } else {
            console.warn("Move not allowed: Target position is unsafe for the king");
        }
    } else {
        console.warn("Move not allowed");
    }
};
