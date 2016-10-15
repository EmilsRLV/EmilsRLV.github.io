function cut_tree(x,y,cor_x,cor_y){
	for (var i = 0; i < this_map.children.length; i++) {
		if(this_map.children[i].key=='tree'){
			if(this_map.children[i].x==x && this_map.children[i].y==y){
				this_map.children[i].destroy();
				inventory.log+=rnd(0,3);
				inventory.logText.text = inventory.log;
				break;
			}
		}else if(this_map.children[i].key=='tree3'){
			if(this_map.children[i].x==x && this_map.children[i].y==y){
				this_map.children[i].destroy();
				inventory.log+=0.5;
				inventory.logText.text = inventory.log;
				break;
			}
		}else if(this_map.children[i].key=='tree2'){
			if(this_map.children[i].x==x && this_map.children[i].y==y){
				this_map.children[i].destroy();
				inventory.apple+=rnd(0,3);
				inventory.appleText.text = inventory.apple;
				break;
			}
		}
	}
}

function rnd(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
