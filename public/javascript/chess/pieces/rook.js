var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};



Rook.prototype = new Piece({});
Rook.prototype.moveTo = function(newPosition){
    if(this.isValid(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
    }else{
        throw new Error("The path is invalid");
    }
}

Rook.prototype.isValid = function(targetPosition) {
    // Convert current position to integer column and row values
    let currentCol = this.position.charAt(0).charCodeAt(0) - 64;
    let currentRow = parseInt(this.position.charAt(1));

    // Convert target position to integer column and row values
    let targetCol = targetPosition.col.charCodeAt(0) - 64;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is horizontal or vertical
    if (currentCol === targetCol || currentRow === targetRow) {
        // Determine the direction of movement (horizontal or vertical)
        let colStep = currentCol === targetCol ? 0 : (currentCol > targetCol ? -1 : 1);
        let rowStep = currentRow === targetRow ? 0 : (currentRow > targetRow ? -1 : 1);

        // Move step-by-step towards the target, checking each position
        currentCol += colStep;
        currentRow += rowStep;

        while (currentCol !== targetCol || currentRow !== targetRow) {
            // Create position object for the current step in the path
            let position = {
                row: currentRow.toString(),
                col: String.fromCharCode(currentCol + 64)
            };

            // Check if there's any piece in the current position
            let piece = this.board.getPieceAt(position);

            // If a piece is found, the move is blocked and thus invalid
            if (piece) {
                throw new Error("Invalid move: Path is blocked");
            }

            // Continue moving in the same direction
            currentCol += colStep;
            currentRow += rowStep;
        }

        return true;
    }

    // If the move is neither horizontal nor vertical, it's invalid for a rook
    return false;
};

