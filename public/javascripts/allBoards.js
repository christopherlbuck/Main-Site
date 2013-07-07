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
	var specialPieces ="111111000000000000000000"; 
	
    // begin private variables
	
	//Normal white pawns move 1 upward in row respect
	//Upon rotating the board multiple variable by -1
	var amIInCheck=false;
	var whitePawnsMove = 1;
	var singleMoveLockOut=false;
	var thisMoveState="";
	var gameState;
    var turn;
	var op;
    var board = [];
    var boardBG = [];
    var rows = 8;
    var cols = 8;
    var tileWidth = 69;
    var tileHeight = 69;
    var preMovePosition;
    var draggableInitialized = false;
    var selectors = {
        blank: '.blank',
        op: 'white',
        white: '.white',
        black: '.black',
        movablePieces: function () {
			return '.' + classes.white + ', .' + classes.black;
		},
        trans: '.trans',
        // the turn variable stores who's turn it is
		getOpPieces: function () {
			return '.pawn.' + op + ', .rook.' + op + ', .knight.' + op + ', .bishop.' + op+ ', .queen.' + op+ ', .king.' + op;
		},
		getOpKing: function () {
			return '.king.' + op;
		},
		getMyKing: function () {
			return '.king.' + turn;
		},
		getAllPieces: function () {
			return '.pawn.' + classes.white + ', .rook.' + classes.white + ', .knight.' + classes.white + ', .bishop.' + classes.white+ ', .queen.' + classes.white+ ', .king.' + classes.white + ',.pawn.' + classes.black + ', .rook.' + classes.black + ', .knight.' + classes.black + ', .bishop.' + classes.black+ ', .queen.' + classes.black+ ', .king.' + classes.black;
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
	
	//Encrypt position
	var ePosition = function(thisObject){ 
		//debugger;
		var sourceState =  {
            col: thisObject.data(dataKeys.col),
            row: thisObject.data(dataKeys.row)
        };
		a=sourceState.row;
		b=sourceState.col;
		if(whitePawnsMove==-1){
			a=cols - a - 1;
			b=rows - b - 1;
		}
		debugger;
		return String.fromCharCode(a*cols+b+61);
	}
	
	//Decrypt position
	var dPosition = function(location){ 
		var positionOfCurrentPiece = location.charCodeAt(0) - 60 - 1 ;
		return positionOfCurrentPiece%cols, Math.floor(positionOfCurrentPiece/cols);
	}
	
	var deltaMovement = function(){
		//alert(specialPieces);
		var switched =false;
		if(whitePawnsMove==-1){
			switched=true;
			//TODO flipboard
		}
		
		
		if(thisMoveState.length==32 || true){
			for(var i=0; i<thisMoveState.length; i++){
				if(thisMoveState[i]!=originalState[i] && thisMoveState[i]!="<"){
				//alert(i);
					switch(i){
						//KK(K'sR)(Q'sR)(K'sR)(Q'sR)(boolean)(lastMovedPieceLocation)
						//White King
						case 0:
							specialPieces=setCharAt(specialPieces,0,"0");
							break;
						//Black King
						case 16:
							specialPieces=setCharAt(specialPieces,1,"0");
							break;
						//White King's Rook
						case 6:
							specialPieces=setCharAt(specialPieces,2,"0");
							break;
						//White Queen's Rook
						case 7:
							specialPieces=setCharAt(specialPieces,3,"0");
							break;
						//Black Queen's Rook
						case 23:
							specialPieces=setCharAt(specialPieces,4,"0");
							break;
						//Black King's Rook
						case 22:
							specialPieces=setCharAt(specialPieces,5,"0");
							break;
					}
					//if there is only one movement, record it in the lastMovePosition of specialPieces
					specialPieces=setCharAt(specialPieces,23,thisMoveState[i]);
				}
				
			}
		}
		else{
			//TODO watch out for that queen! The jump from a pawn another piece.
			//Hasn't been written yet
			alert('I am lazy');
			if(switched);//TODO flipboard
			return;
		}
		
		if(switched);//TODO flipboard
		
		//alert(specialPieces);
	};
	
   var buildBackgroundBoard = function (boardElement) {
        for (var colNum = 0; colNum < cols; colNum++) {
            boardBG[colNum] = [];
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
                boardBG[colNum][rowNum] = boardBG[colNum][rowNum] || thisItem;
            }
        }

        for (rowNum = 0; rowNum < rows; rowNum++) {
            for (colNum = 0; colNum < cols; colNum++) {
                var currentTile = boardBG[colNum][rowNum];

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

		placePiecesOnBoard(initialDocument.gameState);

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
		
		// Submit Move
        $('<input>')
            .attr('type', 'button')
            .attr('value', 'Submit move')
            .attr('id', 'moveSubmit')
            .css({
                position: 'absolute',
                left: cols * tileWidth,
                top: 0
            })
            .click(submitThisMove)
            .appendTo(boardElement);
			
		// Flip board
        $('<input>')
            .attr('type', 'button')
            .attr('value', 'flipBoard')
            .attr('id', 'flipThisBoard')
            .css({
                position: 'absolute',
                left: cols * tileWidth,
                top: 1 * tileHeight
            })
            .click(flipBoard)
            .appendTo(boardElement);
    };
	var submitThisMove = function(){
		//deltaMovement();
		//alert(originalState + '\n' + thisMoveState);
		$.ajax({ 
           url: '/game/ajax/chess',
           type: 'POST',
           cache: false, 
           data: { id:initialDocument.id, chessGameState: thisMoveState, specialPieces: specialPieces, originalGameState: originalState }, 
           success: function(data){
              //alert('Success!')
           }
           , error: function(jqXHR, textStatus, err){
               alert('text status '+textStatus+', err '+err)
           }
        })
	};
	
	var flipBoard = function(){
		//alert('Sucka, I have not written this yet!');
		//multiply board rotation value by -1
		whitePawnsMove*=-1;
		
		for(var i=0; (i<cols/2) ; i++){
			// alert(i);
			// debugger;
			for(var j=0; ((i+j)/2 <= ((rows + cols)/2)) && (j< rows); j++){
				//alert('i:'+i+' j:'+j);
				//find origin div
				var currentPosition = {
					col: i,
					row: j,
				};
				
				var originTile = $('div').filter(function () {
					return filterFunctions.atPosition($(this), currentPosition);
				});
				
				var currentPosition = {
					col: (cols - i - 1),
					row: (rows - j - 1),
				};
				
				var destinationTile = $('div').filter(function () {
					return filterFunctions.atPosition($(this), currentPosition);
				});
				//debugger;
				movePieceToFrom(originTile,destinationTile);
			}
		}
	};
	
    var placePiecesOnBoard = function (strState) {
		if(strState==''){
			 var pieces = [];
		}
		else if(strState.length == 32){
			var pieces = [];
			for(var i=0; i < 32; i++){
				var positionOfCurrentPiece = strState.charCodeAt(i) - 60 - 1 ;
				var team = classes.white;
				if(i>15)team = classes.black;
					if(positionOfCurrentPiece != -1 ){
						switch(i%16){
							//White King
							case 0: 
								pieces.push({classes: [classes.king, team].join(' '), col:positionOfCurrentPiece%cols ,row: Math.floor(positionOfCurrentPiece/cols) });
								break;
							//White Queen
							case 1:
								pieces.push({classes: [classes.queen, team].join(' '), col:positionOfCurrentPiece%cols ,row: Math.floor(positionOfCurrentPiece/cols) });
								break;
							//White Bishop One - Two
							case 2:case 3:
								pieces.push({classes: [classes.bishop, team].join(' '), col:positionOfCurrentPiece%cols ,row: Math.floor(positionOfCurrentPiece/cols) });
								break;
							//White Knight One - Two
							case 4:case 5:
								pieces.push({classes: [classes.knight, team].join(' '), col:positionOfCurrentPiece%cols ,row: Math.floor(positionOfCurrentPiece/cols) });
								break;
							//White King's rook + White Queen's rook
							case 6:case 7:
								pieces.push({classes: [classes.rook, team].join(' '), col:positionOfCurrentPiece%cols ,row: Math.floor(positionOfCurrentPiece/cols) });
								break;
							//White Pawns
							case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
								pieces.push({classes: [classes.pawn, team].join(' '), col:positionOfCurrentPiece%cols ,row: Math.floor(positionOfCurrentPiece/cols) });
								break;
						}
					}
			}
		}
		else{
			alert('Admins we have problem');
			//alert(
		}
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
            $(selectors.white).draggable({
                helper: 'clone'
            });
			$(selectors.black).draggable({
                helper: 'clone'
            });
            draggableInitialized = true;
        }
		
        if (turn === classes.white) {
            // remove the previous players draggable
            $('.ui-draggable.' + classes.black).draggable('disable');
            $('.ui-draggable.' + classes.white).draggable('enable');
        } 
		else if(turn === classes.black){
            // remove the previous players draggable
            $('.ui-draggable.' + classes.white).draggable('disable');
            $('.ui-draggable.' + classes.black).draggable('enable');
        }
    };
	var setCharAt = function (str,index,chr) {
		if(index > str.length-1) return str;
		return str.substr(0,index) + chr + str.substr(index+1);
	}
	var between = function (fX,fY,tX,tY, NNeESeSSwWnw, checkForInThreat){
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
			//debugger;
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
		//debugger;
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
						//debugger;
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
					
					//If checking for threatened spaces
					if(checkForInThreat){
						alert('Check this in between function');
					}
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
					//debugger;
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
		
		//Op
		var opPiece = fromPiece.hasClass(classes.black) ? classes.white : classes.black;
		
		var doublePawn=false;
		
		//from X & Y position
		//debugger;
		// var fX=Math.floor(fromPiece.scrollleft/tileWidth);
		// var fY=Math.floor(fromPiece.scrolltop/tileHeight);
		
		var fX=Math.floor(fromPiece.position().left/tileWidth);
		var fY=Math.floor(fromPiece.position().top/tileHeight);
		
		//to X & Y position
		var tX=Math.floor(toPiece.position().left/tileWidth);
		var tY=Math.floor(toPiece.position().top/tileHeight);
		// var tX=Math.floor(toPiece.scrollleft/tileWidth);
		// var tY=Math.floor(toPiece.scrolltop/tileHeight);
		//debugger;
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
			var blackPiece = fromPiece.hasClass(classes.black) ? -1 : 1;
			//NNeESeSSwWnw value depends on board rotation. Default 5, south. Either-wise 1, north. 
			var NNeESeSSwWnw = whitePawnsMove===1 ? 5 : 1;
			if(blackPiece < 0) NNeESeSSwWnw = whitePawnsMove===1 ? 1 : 5;
		
			//Allow the movement to be only one straight forward
			if((fX==tX) && (tY==fY+(1*whitePawnsMove)*blackPiece) && !toPiece.hasClass(classes.white)) {moveOn= true;}
			//Allow the movement to take pieces 1 forward & diagonal
			else if(toPiece.hasClass(opPiece)){
				if( (fX==tX+1) && (tY==fY+(1*whitePawnsMove)*blackPiece )) {moveOn= true;}
				else if( (fX==tX-1) && (tY==fY+(1*whitePawnsMove)*blackPiece)) {moveOn= true;}
				else{return false;}
			}
			//First move two moves
			else if(between(fX,fY,tX,tY,NNeESeSSwWnw) && ((NNeESeSSwWnw==5 && fY==1) || (NNeESeSSwWnw==1 && fY==6)) && abs(tY - fY) == 2 ){
				doublePawn=true; 
				moveOn= true;
			}
			else if(toPiece.hasClass(classes.trans) && specialPieces[22]=="1"){
				if( (fX==tX+1) && (tY==fY+(1*whitePawnsMove)*blackPiece )) {
					if(false){
						moveOn= true;
					}
				}
				else if( (fX==tX-1) && (tY==fY+(1*whitePawnsMove)*blackPiece)) {moveOn= true;}
				else{return false;}
			}
			//debugger;
			//TODO en passant (w/ else if)
			//TODO get pawn to the other side (w/ else if)
			
		}
		else if(fromPiece.hasClass(classes.rook)){
			//Move to a empty spot
			if(toPiece.hasClass(classes.trans) || toPiece.hasClass(opPiece)){
				if(between(fX,fY,tX,tY,1357)){
					//Quick fix TODO fix this
					moveOn=true;
				}
			}
			//return moveOn;
		}
		else if(fromPiece.hasClass(classes.bishop)){
			//Move to a empty spot
			//debugger;
			if(toPiece.hasClass(classes.trans) || toPiece.hasClass(opPiece)){
				if(between(fX,fY,tX,tY,2468)){moveOn= true;}
			}
		}
		else if(fromPiece.hasClass(classes.queen)){
			//Move to a empty spot
			debugger;
			//alert(classes.black);
			// alert(opPiece);
			// alert(toPiece.hasClass(opPiece));
			if(toPiece.hasClass(classes.trans) || toPiece.hasClass(opPiece) ){
				debugger;
				if(between(fX,fY,tX,tY,12345678)){moveOn= true;}
			}
		}
		else if(fromPiece.hasClass(classes.king)){
			//Require to check whether the rook next to it has moved
			//#####
		
			//Move to a empty spot or take a piece
			if(toPiece.hasClass(classes.trans)  || toPiece.hasClass(opPiece) ){
				if(between(fX,fY,tX,tY,12345678)){
					if(abs(fX-tX) < 2 && abs(fY-tY) < 2){moveOn=true;}
					else if(dY==0 && ((fromPiece.hasClass(classes.white) && specialPieces.charAt(0)=="1") || (fromPiece.hasClass(classes.black) && specialPieces.charAt(1)=="1" && !amIInCheck) )){
						//Done in a nested if fashion for readability
						//KK(K'sR)(Q'sR)(K'sR)(Q'sR)PPPPPPPPPPPPPPPP(boolean)(lastMovedPieceLocation)
						debugger;
						if(!between(fX,fY,tX,tY,12345678,true)){
							return false;
						}
						//alert(ePosition(toPiece));
						//king's side castle //Bvu W>=
						if( (ePosition(toPiece) == 'v' && specialPieces[4]=='1') || (ePosition(toPiece)=='>' && specialPieces[2]=='1')){
							//alert('King side castling');

							moveOn=2;
						}
						
						//Queen's side castle //B{| WCD
						if( (ePosition(toPiece) == '{' && specialPieces[4]=='1') || (ePosition(toPiece)=='C' && specialPieces[2]=='1')){
							//alert('Queen side castling');
							moveOn=2;
						}
					}
				}
				else{moveOn=false;}
			}
			
			
		}
		else if(fromPiece.hasClass(classes.knight)){
			//Move to a empty spot
			//debugger;
			if(toPiece.hasClass(classes.trans) || toPiece.hasClass(opPiece)){
				if( (abs(fX-tX)==1) && (abs(fY-tY) == 2) ){moveOn=true;}
				else if( (abs(fX-tX)==2) && (abs(fY-tY) == 1) ){moveOn= true;}
			}
		}
		
		if(doublePawn && moveOn){
			//specialPieces[22]=1;
			specialPieces=setCharAt(specialPieces,22,"1");
		}
		else if(moveOn){
			//specialPieces[22]=0;
			specialPieces=setCharAt(specialPieces,22,"0");
		}
		
		
		//debugger;
		//alert(ePosition(fromPiece));
        return moveOn;
    };
	var movePieceToFrom = function(fromPiece, toPiece){
		var sourceState = {
            col: toPiece.data(dataKeys.col),
            row: toPiece.data(dataKeys.row)
        };
        var destinationState = {
            col: fromPiece.data(dataKeys.col),
            row: fromPiece.data(dataKeys.row)
        };

        var sourcePosition = fromPiece.position();
        var destinationPosition = toPiece.position();
	
		// DOM: move the piece from the original position to the new square
		fromPiece.css({
			left: Math.floor(destinationPosition.left),
			top: Math.floor(destinationPosition.top)
		});

		// DOM: move the blank from the original position to the old square
		toPiece.css({
			left: Math.floor(sourcePosition.left),
			top: Math.floor(sourcePosition.top)
		});

		// board state: set the blank's position to the source square
		toPiece.data({
			col: Math.floor(destinationState.col),
			row: Math.floor(destinationState.row),
			// oldcol:sourceState.col,
			// oldrow: sourceState.row,
		});

		// board state: set the dragged piece's position to the destination square
		fromPiece.data({
			col: Math.floor(sourceState.col),
			row: Math.floor(sourceState.row),
		});
	};
	var escapeTheseCharacters = function(stringThis){
		return stringThis.replace(/[\\\[\|\?]/g, function (match) {
			return '\\' + match;
		});
	};
	
    var dropHandler = function (event, ui) {
		var draggedTo = $(this);
        var draggedPiece = ui.draggable;
		var howManyToMove=0;
        // check that the move is valid
        if (!(howManyToMove = validMove(draggedPiece, draggedTo)) || singleMoveLockOut) {
            alert('Invalid move.');
            return;
        }
		
		//TODO create lock-out and return movement
		singleMoveLockOut=true;
		
		//if blank square
		if(draggedTo.hasClass(classes.trans)){
			//debugger;
			
			//Modify thisMoveState to reflect only one piece changing
			thisTransPosition=ePosition(draggedTo);
			draggedPiecePosition= ePosition(draggedPiece);
			debugger;
			thisTransPosition=escapeTheseCharacters(thisTransPosition);
			draggedPiecePosition= escapeTheseCharacters(draggedPiecePosition);
			// thisTransPosition=escapeTheseCharacters(ePosition(draggedTo));
			// draggedPiecePosition= escapeTheseCharacters(ePosition(draggedPiece));
			// draggedPiecePosition= draggedPiecePosition === "|" ? "\\|"  : draggedPiecePosition;
			// thisTransPosition= thisTransPosition === "|" ? "\\|"  : thisTransPosition;
			// draggedPiecePosition= draggedPiecePosition === "\\" ? "\\\\"  : draggedPiecePosition;
			// thisTransPosition= thisTransPosition === "\\" ? "\\\\"  : thisTransPosition;
			//=== "|" ? "\\" + ePosition(draggedPiece) : ePosition(draggedPiece);
			//alert(draggedPiecePosition);
			debugger;
			toReplace=new RegExp(draggedPiecePosition,"g");
			//alert(thisMoveState);
			//alert(draggedPiecePosition);
			thisMoveState=thisMoveState.replace(toReplace, function (match) {
				return thisTransPosition;
			});
			//alert(thisMoveState);
			
			
			movePieceToFrom(draggedPiece,draggedTo);
			
			if(howManyToMove==2){
				alert('Need to move the rook');
			}
		}
		//Player has taken a piece
		else{
			//Modify thisMoveState to reflect both pieces changing
			
			
			// thisTakenPosition=ePosition(draggedTo);
			// draggedPiecePosition=ePosition(draggedPiece);
			thisTakenPosition=ePosition(draggedTo);
			draggedPiecePosition= ePosition(draggedPiece);
			debugger;
			thisTakenPosition=escapeTheseCharacters(thisTakenPosition);
			draggedPiecePosition= escapeTheseCharacters(draggedPiecePosition);
			// draggedPiecePosition= draggedPiecePosition === "|" ? "\\" + draggedPiecePosition : draggedPiecePosition;
			// thisTakenPosition= thisTakenPosition === "|" ? "\\" + thisTakenPosition : thisTakenPosition;
			
			//Second replace
			toReplace=new RegExp(thisTakenPosition,"g");
			thisMoveState=thisMoveState.replace(toReplace, function (match) {
				return String.fromCharCode(60);
			});
			
			//First replace
			toReplace=new RegExp(draggedPiecePosition,"g");
			thisMoveState=thisMoveState.replace(toReplace, function (match) {
				return thisTakenPosition;
			});
			
			
			
			movePieceToFrom(draggedPiece,draggedTo);
			
			//TODO create logic to be able to take back a move prior to submitting a move
			draggedTo._removeClass();
			draggedTo._addClass(classes.trans);
		}
		
		//alert(originalState + '\n' + thisMoveState);
		//Check to see if my move has put me in check
		amIInCheck = false;
		checkIfInCheck();
		if(amIInCheck){
			alert('write redraw');
		}
		debugger;
    };

    var initDroppable = function () {
		//debugger;
        $(selectors.trans).droppable({
            drop: dropHandler
        });
		//debugger;
		$(selectors.getOpPieces()).droppable({
            drop: dropHandler
        });
    };
	
	var switchTurns = function(){
		turn = initialDocument.moveNumber % 2 === 0 ? classes.white : classes.black;
		selectors.movablePieces = turn === classes.white ? selectors.white : selectors.black;
		op = turn === classes.black ? classes.white : classes.black;
		classes.op = turn === classes.black ? classes.white : classes.black;
		if(turn==classes.white)flipBoard();
	};
	
	var checkIfInCheck = function(){
		var myKing=$(selectors.getMyKing());
		
		$(selectors.getOpPieces()).each(function(index){
			//debugger;
			if(validMove($(this),myKing) && !amIInCheck){
				alert('You are in check');
				amIInCheck= true;
			}
			
			//alert(index);
			
		});
		//return false;
	}
    // end private functions

    // begin public functions
    var initialize = function (boardElement) {
		//Draw background board
		buildBackgroundBoard(boardElement)
		
		//Check for JSON document in page load or send AJAX request.
		originalState=initialDocument.gameState;
		//alert(originalState);
		thisMoveState=originalState;
		specialPieces=initialDocument.specialPieces;
		
		//Populate board
        buildBoard(boardElement);
		
		
		//Decide who's turn it is
        switchTurns();
		
		//After the turn is decided, see if you're in check.
		checkIfInCheck();
		//if(amIInCheck){}
		
		//Initialize moveable pieces
		initDraggable();
        initDroppable();
		
		//Start timer for stateChanges
		
    };
    // end public functions

    return {
        initialize: initialize
    };
})(jQuery);