var Knight = function(config) {
    this.type = 'knight';
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.moveTo = function(newPosition) {
    if (this.isValidPosition(newPosition) && (this.color === this.board.currentPlayer || this.board.currentPlayer=='')) {
        this.position = newPosition.col + newPosition.row;
        this.render();
        if(this.board.currentPlayer==''){
            this.board.currentPlayer = this.color;
        }
        this.board.switchPlayer();
    } else {
        throw new Error("Invalid Knight move");
    }
};

Knight.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to integer column and row values
    let currentCol = this.position.charAt(0).charCodeAt(0) - 64;
    let currentRow = parseInt(this.position.charAt(1));

    // Convert target position to integer column and row values
    let targetCol = targetPosition.col.charCodeAt(0) - 64;
    let targetRow = parseInt(targetPosition.row);

    // Calculate the differences in columns and rows
    let colDiff = Math.abs(targetCol - currentCol);
    let rowDiff = Math.abs(targetRow - currentRow);

    // Knight moves in an "L" shape: (2, 1) or (1, 2)
    if ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)) {
        // Check if there's any piece in the target position
        let piece = this.board.getPieceAt(targetPosition);
        
        // If a piece is found, ensure it can be captured (if applicable)
        if (piece && piece.color === this.color) {
            throw new Error("Invalid move: Target position occupied by friendly piece");
        }

        // If valid move
        return true;
    }

    // If the move is not in an "L" shape, it's invalid for a knight
    return false;
};
