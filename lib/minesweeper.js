
function Minesweeper(container_id,lin,col){
	
	this.board = [];
	for(var i=0 ; i<lin ; i++){
		var line = []
		this.board.push(line)
		for(var j=0 ; j<col ; j++){
			line.push(false)
		}
		
	}
	this.cellNumber = lin*col;
	this.opened = 0;
	this.blown = false;
	this.mines = 0;

	this.draw_board(container_id, lin, col);
	
}


Minesweeper.prototype = {
	install_mine: function(lin, col){
		if(!this.board[lin][col]){
			this.mines++;	
			this.board[lin][col] = true;
		}
	},
	
	open: function(lin,col){
		this.opened++;
		if (this.board[lin][col]) {
			this.blown = true;
		}
	},
	
	hasExploded: function() {
		return this.blown;
	},
	
	win: function() {
		return this.opened == this.cellNumber - this.mines 
				&& ! this.hasExploded();
	},
	
	draw_board: function(container_id, lin, col) {
		container = $('#' + container_id);

		var table = $('<table></table>');
		container.append(table);

		for(var i=0 ; i<lin ; i++){

			var tr = $("<tr></tr>");
			table.append(tr);

			for(var j=0 ; j<col ; j++){
				var td = $('<td></td>').data('cell', {line: i, column: j});
				tr.append(td);
			}
		}
		
		_this = this;
		container.find('td').click(function(){
			var cell= $(this).data('cell');
			_this.open(cell.line, cell.column);
		});
	},
}