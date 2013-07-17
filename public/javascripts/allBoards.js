
	var ePosition = function(thisObject, rows, cols, whitePawnsMove){ 
		//debugger;
		var sourceState =  {
            col: thisObject.data('col'),
            row: thisObject.data('row')
        };
		a=sourceState.row;
		b=sourceState.col;
		if(whitePawnsMove==-1){
			a=cols - a - 1;
			b=rows - b - 1;
		}
		//debugger;
		return String.fromCharCode(a*cols+b+61);
	}
	
	//Decrypt position
	var dPosition = function(location){ 
		var positionOfCurrentPiece = location.charCodeAt(0) - 60 - 1 ;
		return positionOfCurrentPiece%cols, Math.floor(positionOfCurrentPiece/cols);
	}
	