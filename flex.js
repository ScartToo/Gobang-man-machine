 var me =true;
 var cb =[];
 var wins=[]; //定义赢法数组
 var over =false;
 //赢法的统计数组
 var myWin =[];
 var ComputerWin =[];
for (var i = 0; i < 15; i++) {
	cb[i]=[];
	for (var j = 0; j < 15; j++) {
		cb[i][j]=0;
	}
}
//初始化赢法数组
for (var i = 0; i < 15; i++) {
	wins[i]=[];
	for (var j = 0; j< 15; j++) {
		wins[i][j]=[];
	}
}
 var count= 0;
 //横线
 for (var i = 0; i < 15; i++) {
 	for (var j = 0; j <11; j++) {
 		for (var k = 0; k < 5; k++) {
 			wins[i][j+k][count]=true;
 		}
 		count++;
 	}
 }
 //竖线
 for (var i = 0; i < 15; i++) {
 	for (var j = 0;j <11; j++) {
 		for (var k = 0; k < 5; k++) {
 			wins[j+k][i][count]=true;
 		}
 		count++;
 	}
 }
 //反斜线
 for (var i = 0; i < 11; i++) {
 	for (var j = 14; j >3; j--) {
 		for (var k = 0; k < 5; k++) {
 			wins[i+k][j-k][count]=true;
 		}
 		count++;
 	}
 }
 //斜线
 for (var i = 0; i < 11; i++) {
 	for (var j = 0; j <11; j++) {
 		for (var k = 0; k < 5; k++) {
 			wins[i+k][j+k][count]=true;
 		}
 		count++;
 	}
 }
 console.log(count);
 for (var i = 0; i < count; i++) {
 	myWin[i]=0;
 	ComputerWin[i]=0;
 }
 var chess = document.getElementById('chess');
 var context = chess.getContext('2d');

 context.strokeStyle='#BFBFBF';

 var logo = new Image();
 logo.src='2.jpg';
 logo.onload = function(){
 context.drawImage(logo,0,0,450,450);
 drawChessBoard();
}
 /*画棋盘 */
 var drawChessBoard = function(){
	 for (var i = 0; i < 15; i++) {
	 	context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
	 	context.stroke();
	 	context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
	 	context.stroke();
	 }
}
/*画棋子*/
var oneStep = function(i,j,me){
	 context.beginPath();
	 context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	 context.closePath();
	 var gr = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	 if (me) {
	 	gr.addColorStop(0,'#0A0A0A');
	 	gr.addColorStop(1,'#636766');
	 }else{
	 	gr.addColorStop(0,'#D1D1D1');
	 	gr.addColorStop(1,'#F9F9F9');
	 }
	 context.fillStyle=gr;
	 context.fill();
}

chess.onclick = function(e){
	if (over) {
		return;
	}
	if (!me) {
		return;
	}
	var x =e.offsetX;
	var y =e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if (cb[i][j]==0) {
		oneStep(i, j, me);
		cb[i][j]=1;
		for (var k = 0; k < count; k++) {
			if (wins[i][j][k]) {
				myWin[k]++;
				ComputerWin[k]=6;
				if (myWin[k]==5) {
					alert('玩家赢！');
					over =true;
				}
			}
		}
		if (!over) {
			me=!me;
			computerAI();
		}
	}
	
}
var computerAI = function(){
	var myScore =[];
	var comr =[];
	var max=0;
	var u =0,v=0;
	for (var i = 0; i <15; i++) {
		myScore[i]=[];
		comr[i]=[];
		for (var j = 0; j < 15; j++) {
			myScore[i][j]=0;
			comr[i][j]=0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (cb[i][j]==0) {
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						if (myWin[k]==1) {
							myScore[i][j] +=200;
						}else if (myWin[k]==2) {
							myScore[i][j] +=400;
						}else if (myWin[k]==3) {
							myScore[i][j] +=2000;
						}else if (myWin[k]==4) {
							myScore[i][j] +=10000;
						}					 
						if (ComputerWin[k]==1) {
							comr[i][j] +=220;
						}else if (ComputerWin[k]==2) {
							comr[i][j] +=420;
						}else if (ComputerWin[k]==3) {
							comr[i][j] +=2100;
						}else if (ComputerWin[k]==4) {
							comr[i][j] +=20000;
						}
					}
				}
				if (myScore[i][j]>max) {
					max=myScore[i][j];
					u=i;v=j;
				}else if(myScore[i][j]==max){
					if (comr[i][j]>comr[u][v]) {
						u=i;v=j;
					}
				}
				if (comr[i][j]>max) {
					max=comr[i][j];
					u=i;v=j;
				}else if(comr[i][j]==max){
					if (myScore[i][j]>myScore[u][v]) {
						u=i;v=j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	cb[u][v]=2;
	for (var k = 0; k < count; k++) {
			if (wins[u][v][k]) {
				ComputerWin[k]++;
				myWin[k]=6;
				if (ComputerWin[k]==5) {
					alert('计算机赢！');
					over =true;
				}
			}
		}
	if (!over) {
		me=!me;
	}
}