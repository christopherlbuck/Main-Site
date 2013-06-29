$(document).ready(function () {
    Chess.initialize($('#board'));
});

var Chess = (function ($) {
	//It needs to be decided how and what special pieces will hold.
	//This place-holder should hold non-moved pieces K, Rs, all Ps, booleanWasLastMovedPieceDoublePawn, & lastMovedPieceLocation
	//White should be first, as the game rules go. Pawns will be addressed in terms of state of the game.
	//KK(K'sR)(Q'sR)(K'sR)(Q'sR)PPPPPPPPPPPPPPPP(boolean)(lastMovedPieceLocation)
	//12 3     4     5     6    7890123456789012 3        4
	//32 1     0     9     8    7654321098765432 1        0
	//New games initialize at   
	var specialPieces ="111111111111111111111100";
	
    // begin private variables
	
	//Normal white pawns move 1 upward in row respect
	//Upon rotating the board multiple variable by -1
	var whitePawnsMove = -1;
	
	var gameState;
    var turn;
	var op;
    var board = [];
    var rows = 8;
    var cols = 8;
    var tileWidth = 69;
    var tileHeight = 69;
    var preMovePosition;
    var draggableInitialized = false;
    var selectors = {
        blank: '.blank',
        op: 'white',
        movablePieces: '.black',
        trans: '.trans',
        // the turn variable stores who's turn it is
		getOpPieces: function () {
			return '.pawn.' + op + ', .rook.' + op + ', .knight.' + op + ', .bishop.' + op+ ', .queen.' + op+ ', .king.' + op;
		}
    };
    var classes = {
        blanks: {
			white:'whitetile',
			black:'blacktile'},
        trans: 'trans',
        op: 'white',
        white: 'white',
        black: 'black',
        pawn: 'pawn',
		rook : 'rook',
		bishop :'bishop',
		knight:'knight',
		queen:'queen',
		king:'king'
    };
    var dataKeys = {
        col: 'col',
        row: 'row'
    };
    var positions = {
        topLeft: { col: 0, row: 0 },
        topRight: { col: cols - 1, row: 0 },
        bottomLeft: { col: 0, row: rows - 1 },
        bottomRight: { col: cols - 1, row: rows - 1 }
    };
    var filterFunctions = {
        blankTile: function () {
            return $(this).hasClass(classes.blank);
        },
        atPosition: function (element, position) {
            return element.data(dataKeys.col) === position.col &&
                element.data(dataKeys.row) === position.row;
        }
    };
    // end private variables

    // begin private functions
   var buildBackgroundBoard = function (boardElement) {
        for (var colNum = 0; colNum < cols; colNum++) {
            board[colNum] = [];
        }

        for (var rowNum = 0; rowNum < rows; rowNum++) {
            for (colNum = 0; colNum < cols; colNum++) {
				var thisItem={
					classes: classes.blanks.black,
					position: {
						col: colNum * tileWidth+1,
						row: rowNum * tileHeight+1
					}
				};
				if((colNum+rowNum)%2==0){
					thisItem={
						classes: classes.blanks.white,
						position: {
							col: colNum * tileWidth+1,
							row: rowNum * tileHeight+1
						}
					}
				}
                // only paint a blank if there is no tile here yet
                board[colNum][rowNum] = board[colNum][rowNum] || thisItem;
            }
        }

        for (rowNum = 0; rowNum < rows; rowNum++) {
            for (colNum = 0; colNum < cols; colNum++) {
                var currentTile = board[colNum][rowNum];

                $('<div>')
                    .addClass(currentTile.classes)
                    .data({
                        col: colNum,
                        row: rowNum
                    })
                    .css({
                        position: 'absolute',
                        left: currentTile.position.col,
                        top: currentTile.position.row
                    })
                    .appendTo(boardElement);
            }
        }
    };
    var buildBoard = function (boardElement) {
        for (var colNum = 0; colNum < cols; colNum++) {
            board[colNum] = [];
        }

        placePiecesOnBoard();

        for (var rowNum = 0; rowNum < rows; rowNum++) {
            for (colNum = 0; colNum < cols; colNum++) {
                // only paint a trans if there is no tile here yet
                board[colNum][rowNum] = board[colNum][rowNum] || {
                    classes: classes.trans,
                    position: {
                        col: colNum * tileWidth,
                        row: rowNum * tileHeight
                    }
                };
            }
        }

        for (rowNum = 0; rowNum < rows; rowNum++) {
            for (colNum = 0; colNum < cols; colNum++) {
                var currentTile = board[colNum][rowNum];

                $('<div>')
                    .addClass(currentTile.classes)
                    .data({
                        col: colNum,
                        row: rowNum
                    })
                    .css({
                        position: 'absolute',
                        left: currentTile.position.col,
                        top: currentTile.position.row
                    })
                    .appendTo(boardElement);
            }
        }
    };
    var placePiecesOnBoard = function () {
         var pieces = [
				{ classes: [classes.rook, classes.black].join(' '), col: 0, row: 0 },
				{ classes: [classes.knight, classes.black].join(' '), col: 1, row: 0 },
				{ classes: [classes.bishop, classes.black].join(' '), col: 2, row: 0 },
				{ classes: [classes.queen, classes.black].join(' '), col: 3, row: 0 },
				{ classes: [classes.king, classes.black].join(' '), col: 4, row: 0 },
				{ classes: [classes.bishop, classes.black].join(' '), col: 5, row: 0 },
				{ classes: [classes.knight, classes.black].join(' '), col: 6, row: 0 },
				{ classes: [classes.rook, classes.black].join(' '), col: 7, row: 0 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 0, row: 1 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 1, row: 1 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 2, row: 1 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 3, row: 1 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 4, row: 1 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 5, row: 1 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 6, row: 1 },
				{ classes: [classes.pawn, classes.black].join(' '), col: 7, row: 1 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 0, row: 6 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 1, row: 6 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 2, row: 6 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 3, row: 6 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 4, row: 6 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 5, row: 6 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 6, row: 6 },
				{ classes: [classes.pawn, classes.white].join(' '), col: 7, row: 6 },
				{ classes: [classes.rook, classes.white].join(' '), col: 0, row: 7 },
				{ classes: [classes.knight, classes.white].join(' '), col: 1, row: 7 },
				{ classes: [classes.bishop, classes.white].join(' '), col: 2, row: 7 },
				{ classes: [classes.queen, classes.white].join(' '), col: 3, row: 7 },
				{ classes: [classes.king, classes.white].join(' '), col: 4, row: 7 },
				{ classes: [classes.bishop, classes.white].join(' '), col: 5, row: 7 },
				{ classes: [classes.knight, classes.white].join(' '), col: 6, row: 7 },
				{ classes: [classes.rook, classes.white].join(' '), col: 7, row: 7 }
                // { classes: [classes.sphinx, classes.red, classes.south].join(' '), col: 0, row: 0 },
                // { classes: [classes.sphinx, classes.blue, classes.north].join(' '), col: cols - 1, row: rows - 1 },
                // { classes: [classes.obelisk, classes.blue, classes.north].join(' '), col: 5, row: 7 }
         ];

        var currentPiece;
        for (var i = 0; i < pieces.length; i++) {
            currentPiece = pieces[i];

            board[currentPiece.col][currentPiece.row] = {
                classes: currentPiece.classes,
                position: {
                    col: currentPiece.col * tileHeight,
                    row: currentPiece.row * tileWidth
                }
            };
        }
    };
	var abs = function(someInt){
		if(someInt<0){return someInt*-1;}
		return someInt;
	}
	
    var initDraggable = function () {
        if (!draggableInitialized) {
            $(selectors.movablePieces).draggable({
                helper: 'clone'
            });
            draggableInitialized = true;
        }
        // if (turn === classes.red) {
            // // remove the previous players draggable
            // $('.ui-draggable.' + classes.blue).draggable('disable');
            // $('.ui-draggable.' + classes.red).draggable('enable');
        // } else {
            // // remove the previous players draggable
            // $('.ui-draggable.' + classes.red).draggable('disable');
            // $('.ui-draggable.' + classes.blue).draggable('enable');
        // }
		// if(true){
			// $('.ui-draggable.' + classes.white).draggable('
		// }
    };
	var setCharAt = function (str,index,chr) {
		if(index > str.length-1) return str;
		return str.substr(0,index) + chr + str.substr(index+1);
	}
	var between = function (fX,fY,tX,tY, NNeESeSSwWnw){
		//This function validates straight diagonals, horizontal, and vertical movements. ~ (0,x), (x,0), & (x,x)
		//This function verifies that there are no pieces in between the fromPosition & toPosition
	
		//NNeESeSSwWnw~12345678
		
		//differenceX
		dX=tX-fX;
		//differenceY
		dY=tY-fY;
		
		//Initialize return
		var returnValue = false;
	
		while(NNeESeSSwWnw>0){
			debugger;
			switch(NNeESeSSwWnw%10){
					//North
				case 1:
					if( (dX==0) && (dY!=0) && (fY > tY) ) returnValue = true;
					break;
					//South
				case 5:
					if( (dX==0) && (dY!=0) && (fY < tY) ) returnValue = true;
					break;
					//West
				case 3:
					//East
				case 7:
					if( (dX!=0) && (dY==0) ) returnValue = true;
					break;
					//NorthEast
				case 2:
					//NorthWest
				case 8:
					//SouthEast
				case 4:
					//SouthWest
				case 6:
					if( (dX!=0) && (dY!=0) && (abs(dX)==abs(dY)) ) returnValue = true;
					break;
			}
			//if(NNeESeSSwWnw<10){NNeESeSSwWnw=0;}
			NNeESeSSwWnw = Math.floor(NNeESeSSwWnw/10);
			
		}
		debugger;
		if(returnValue){
			//If one of the locations in between from & to has a piece return false;
			//debugger;
			//X & Y
			if(dX!=0 && dY!=0){
				for(var iX=1; iX<abs(dX); ){
					for(var iY=1; iY<abs(dY); ){
						//Current X
						var cX = fX + (iX * ( dX/abs(dX) ));
						//Current Y
						var cY = fY + (iY * ( dY/abs(dY) ));
						
						//
						var currentPosition = {
							col: cX,
							row: cY,
						};
						
						var currentTile = $('div').filter(function () {
							return filterFunctions.atPosition($(this), currentPosition);
						});
						debugger;
						if(!currentTile.hasClass(classes.trans)){returnValue = false;}
						//Increment for diagonal
						iY++;iX++;
					}
				}
			}
			//Y
			else if(dY!=0){
				for(var iY=1; iY<abs(dY); iY++){
					//Current X
					var cX = fX;
					//Current Y
					var cY = fY + (iY * ( dY/abs(dY) ));
					
					//
					var currentPosition = {
						col: cX,
						row: cY,
					};
					
					var currentTile = $('div').filter(function () {
						return filterFunctions.atPosition($(this), currentPosition);
					});
					debugger;
					if(!currentTile.hasClass(classes.trans)){returnValue = false;}
				}
			}
			//X
			else if(dX!=0){
				for(var iX=1; iX<abs(dX); iX++){
					//Current X
					var cX = fX + (iX * ( dX/abs(dX) ));
					//Current Y
					var cY = fY;
					
					//
					var currentPosition = {
						col: cX,
						row: cY,
					};
					
					var currentTile = $('div').filter(function () {
						return filterFunctions.atPosition($(this), currentPosition);
					});
					debugger;
					if(!currentTile.hasClass(classes.trans)){returnValue = false;}
				}
			}
			
		}
		return returnValue;
	}
	
	var validMove = function (fromPiece, toPiece) {
        //TODO
		//Pawn Movement en passant
		//Castling movement
		
		//from X & Y position
		var fX=fromPiece.position().left/tileWidth
		var fY=fromPiece.position().top/tileHeight
		
		//to X & Y position
		var tX=toPiece.position().left/tileWidth
		var tY=toPiece.position().top/tileHeight
		
		if(false){
			alert('fX:'+fX + ' fY:' +fY);
			//alert(fY);
			alert('tX:'+tX + ' tY:' +tY);
			//alert(tY);
		}
		
		//Some variables require to modify values in the database
		//In order to proceed with certain piece this variable is required
		var moveOn=false;
		
		//Pawn movement
		if(fromPiece.hasClass(classes.pawn)){
			
			if(fromPiece.hasClass(classes.black)){
				//NNeESeSSwWnw value depends on board rotation. Default 5, south. Either-wise 1, north. 
				var NNeESeSSwWnw = 5;
				if(whitePawnsMove==1){NNeESeSSwWnw = 1;}
			
				//Allow the movement to be only one straight forward
				if((fX==tX) && (tY==fY-whitePawnsMove) && !toPiece.hasClass(classes.white)) {return true;}
				//Allow the movement to take pieces 1 forward & diagonal
				else if(toPiece.hasClass(classes.white)){
					if( (fX==tX+1) && (tY==fY-whitePawnsMove)) {return true;}
					else if( (fX==tX-1) && (tY==fY-whitePawnsMove) ) {return true;}
					else{return false;}
				}
				//First move two moves
				else if(between(fX,fY,tX,tY,NNeESeSSwWnw) && ((NNeESeSSwWnw==5 && fY==1) || (NNeESeSSwWnw==1 && fY==7)) ){return true;}
				//TODO en passant (w/ else if)
				//TODO get pawn to the other side (w/ else if)
				
				//Modify specialPieces to show movement
			}
			else{
				//NNeESeSSwWnw value depends on board rotation. Default 1, north. Either-wise 5, south. 
				var NNeESeSSwWnw = 1;
				if(whitePawnsMove==1){NNeESeSSwWnw = 5;}
			
				if((fX==tX) && (tY==fY+whitePawnsMove) && !fromPiece.hasClass(classes.black)) {return true;}
				else if(toPiece.hasClass(classes.black)){
					if( (fX==tX+1) && (tY==fY+whitePawnsMove)) {return true;}
					else if( (fX==tX-1) && (tY==fY+whitePawnsMove) ) {return true;}
				}
				//First move two moves
				else if(between(fX,fY,tX,tY,NNeESeSSwWnw) && ((NNeESeSSwWnw==5 && fY==1) || (NNeESeSSwWnw==1 && fY==7)) ){return true;}
				//TODO en passant (w/ else if)
				//TODO get pawn to the other side (w/ else if)
				
				//Modify specialPieces to show movement
			}
		}
		else if(fromPiece.hasClass(classes.rook)){
			//Move to a empty spot
			if(toPiece.hasClass(classes.trans)){
				moveOn=true;
			}
			//Take a piece
			else if(toPiece.hasClass(classes.op)){moveOn=true;}
			if(moveOn){
				if(between(fX,fY,tX,tY,1357)){
					//Modify specialPieces to show movement
					if(fromPiece.hasClass(classes.white)){
						if(specialPieces.charAt(0)=="1"){
							//This assumes that if the king has been moved then both rook flags are were set to 0.
							var currentPosition = {
								col: cX,
								row: fY,
							};
							
							var currentTile = $('div').filter(function () {
								return filterFunctions.atPosition($(this), currentPosition);
							});
						}
					}
					else{
						
					}
				}
			}
			return moveOn;
		}
		else if(fromPiece.hasClass(classes.bishop)){
			//Move to a empty spot
			debugger;
			if(toPiece.hasClass(classes.trans) || toPiece.hasClass(classes.trans)){
				if(between(fX,fY,tX,tY,2468)){return true;}
			}
		}
		else if(fromPiece.hasClass(classes.queen)){
			//Move to a empty spot
			debugger;
			if(toPiece.hasClass(classes.trans) || toPiece.hasClass(classes.op)){
				if(between(fX,fY,tX,tY,12345678)){return true;}
			}
		}
		else if(fromPiece.hasClass(classes.king)){
			//Require to check whether the rook next to it has moved
			//#####
		
			//Move to a empty spot or take a piece
			if(toPiece.hasClass(classes.trans)  || toPiece.hasClass(classes.op)){
				if(between(fX,fY,tX,tY,12345678)){
					if(abs(fX-tX) < 2 && abs(fY-tY) < 2){moveOn=true;}
					else if(dY==0 && fromPiece.hasClass(classes.white) && specialPieces.charAt(0)=="1"){
						//if the white king has not been moved, proceed
					}
					else if(dY==0 && fromPiece.hasClass(classes.black) && specialPieces.charAt(1)=="1"){
						//if the black king has not been moved, proceed
					}
					else{moveOn=false;}
				}
				else{moveOn=false;}
			}
			if(moveOn){
				//Modify specialPieces to show movement
				if(fromPiece.hasClass(classes.white)){
					//Modifying specialPieces index 0,2,3
					specialPieces=setCharAt(specialPieces,0,"0");
					specialPieces=setCharAt(specialPieces,3,"0");
					specialPieces=setCharAt(specialPieces,2,"0");
				}
				else{
					//Modifying specialPieces index 1,4,5
					specialPieces=setCharAt(specialPieces,1,"0");
					specialPieces=setCharAt(specialPieces,4,"0");
					specialPieces=setCharAt(specialPieces,5,"0");
				}
				
			}
			debugger;
			return moveOn;
		}
		else if(fromPiece.hasClass(classes.knight)){
			//Move to a empty spot
			debugger;
			if(toPiece.hasClass(classes.trans) || toPiece.hasClass(classes.op)){
				if( (abs(fX-tX)==1) && (abs(fY-tY) == 2) ){return true;}
				else if( (abs(fX-tX)==2) && (abs(fY-tY) == 1) ){return true;}
			}
		}
		
        return false;
    };
    var dropHandler = function (event, ui) {
        // here we can assume the blank square is the drop target since only blanks are droppable
		//debugger;
        var blankSquare = $(this);
		var draggedTo = $(this);
        var draggedPiece = ui.draggable;

        var sourceState = {
            col: blankSquare.data(dataKeys.col),
            row: blankSquare.data(dataKeys.row)
        };
        var destinationState = {
            col: draggedPiece.data(dataKeys.col),
            row: draggedPiece.data(dataKeys.row)
        };
        // check that the move is valid
        if (!validMove(draggedPiece, draggedTo)) {
            alert('Invalid move.');
            return;
        }

        var sourcePosition = draggedPiece.position();
        var destinationPosition = blankSquare.position();
		//if blank square
		if(draggedTo.hasClass(classes.trans)){
			debugger;
			// DOM: move the piece from the original position to the new square
			draggedPiece.css({
				left: destinationPosition.left,
				top: destinationPosition.top
			});

			// DOM: move the blank from the original position to the old square
			blankSquare.css({
				left: sourcePosition.left,
				top: sourcePosition.top
			});

			// board state: set the blank's position to the source square
			blankSquare.data({
				col: destinationState.col,
				row: destinationState.row,
			});

			// board state: set the dragged piece's position to the destination square
			draggedPiece.data({
				col: sourceState.col,
				row: sourceState.row,
			});
		}
		//Player has taken a piece
		else{
			debugger;
			//DOM: move the piece from the original position to the new square
			draggedPiece.css({
				left: destinationPosition.left,
				top: destinationPosition.top
			});

			// board state: set the dragged piece's position to the destination square
			draggedPiece.data({
				col: sourceState.col,
				row: sourceState.row,
			});

			// board state: set the blank's position to the source square
			blankSquare.data({
				col: destinationState.col,
				row: destinationState.row,
				
			});
			
			// DOM: move the blank from the original position to the old square
			blankSquare.css({
				classes: classes.trans,
				left: sourcePosition.left,
				top: sourcePosition.top
			});
			blankSquare._removeClass();
			blankSquare._addClass(classes.trans);
		}
    };

    var initDroppable = function () {
		//debugger;
        $(selectors.trans).droppable({
            drop: dropHandler
        });
		debugger;
		$(selectors.getOpPieces()).droppable({
            drop: dropHandler
        });
    };
	
	var switchTurns = function(){
		turn = turn === classes.black ? classes.white : classes.black;
		op = turn === classes.black ? classes.white : classes.black;
		// turn++;
		// classes.op='white';
		// selectors.op='white';
		// if(turn%2==0){
			// classes.op='black';
			// selectors.op='black';
		// }
	}
    // end private functions

    // begin public functions
    var initialize = function (boardElement) {
		buildBackgroundBoard(boardElement)
		//Check for JSON document in page load or send AJAX request.
        buildBoard(boardElement);
        switchTurns();
		initDraggable();
        initDroppable();
		//Start timer for stateChanges
    };
    // end public functions

    return {
        initialize: initialize
    };
})(jQuery);