function cut_tree(x,y,cor_x,cor_y){
	for (var i = 0; i < this_map.children.length; i++) {
		if(this_map.children[i].key=='tree' || this_map.children[i].key=='tree2'){
			if(this_map.children[i].x==x && this_map.children[i].y==y){
				this_map.children[i].destroy();
				inventory.log++;
				inventory.logText.text = inventory.log;
				break;
			}
		}
	}
}