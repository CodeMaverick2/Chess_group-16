var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});
Queen.prototype.moveTo = function(newPosition){
    if(this.isValidPosition(newPosition) && this.color === this.board.currentPlayer){
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    }else{
        throw new Error("Invalid Queen move");
    }
};

Queen.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charCodeAt(0) - 64;
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col.charCodeAt(0) - 64;
    let targetRow = parseInt(targetPosition.row);

    if (currentCol === targetCol || currentRow === targetRow || Math.abs(targetCol - currentCol) === Math.abs(targetRow - currentRow)) {
        let colStep = currentCol === targetCol ? 0 : (targetCol > currentCol ? 1 : -1);
        let rowStep = currentRow === targetRow ? 0 : (targetRow > currentRow ? 1 : -1);
        let nextCol = currentCol + colStep;
        let nextRow = currentRow + rowStep;

        while (nextCol !== targetCol || nextRow !== targetRow) {
            let position = {
                row: nextRow.toString(),
                col: String.fromCharCode(nextCol + 64)
            };
            let piece = this.board.getPieceAt(position);
            if (piece) {
                throw new Error("Invalid move: Path is blocked");
            }
            nextCol += colStep;
            nextRow += rowStep;
        }
        return true;
    }
    return false;
};
