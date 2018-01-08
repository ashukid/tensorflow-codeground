var available_width = (window.innerWidth)-320;
var available_height = (window.innerHeight)-140;
if(available_width>800){
    var draw = SVG('drawing').size(available_width,available_height);
}
else{
    var draw = SVG('drawing').size(1000,available_height);
    available_width=1000;
}
var group = draw.group();
var group_button = draw.group();

// automatic changable variables
var input_node_count=10;
var output_node_count=10;


// screen variable
var top_space=130;
var left_space=160;


// manually changable variables
var hidden_node_count=[10,10,10,10,10,10];
var hidden_layers = hidden_node_count.length;
var total_layers=hidden_layers+2;
var height_offset=45;
console.log(window.innerHeight)
var width_offset=Math.floor(available_width/total_layers);

// Non changable variables
var start_x=30;
var start_y=40;
var color = ['pink','#890','purple','orange','red','#630','#f8f','yellow','#f48','brown'];


function draw_graph(){
    var i,j,k,l;

    // drawing input feature square
    var input_offset=0;
    
    for(i=0;i<input_node_count;i++){
        temp=group.rect(35,35).move(start_x,start_y+input_offset);
        var gradient = draw.gradient('linear', function(stop) {
            stop.at(0, '#09f')
            stop.at(0.7, color[i])
            
          }).from(0, 0).to(1, 1);
        temp.attr({
            fill:gradient,'fill-opacity':0.2,stroke:"#000",'stroke-width':2
        });
        temp.radius(10);
        input_offset+=height_offset;
    }

    // drawing hidden layer circles
    var hidden_height_offset=0;
    var hidden_width_offset=0;
    for(i=0;i<hidden_layers;i++){
        var total_nodes=hidden_node_count[i];
        hidden_height_offset=0;
        hidden_width_offset+=width_offset;
        for(j=0;j<total_nodes;j++){
            var gradient = draw.gradient('linear', function(stop) {
                stop.at(0, '#09f')
                stop.at(0.7, color[j])
                
              }).from(0, 0).to(1, 1);
            temp=group.circle(35).move(start_x+hidden_width_offset,start_y+hidden_height_offset);
            temp.attr({
            fill:gradient,'fill-opacity':0.2,stroke:"#000",'stroke-width':2
            });
            hidden_height_offset+=height_offset;
        }
    }

    // drawing output layer squares
    var output_offset=0;
    for(i=0;i<output_node_count;i++){
        temp=group.rect(35,35).move(start_x+available_width-100,start_y+output_offset);
        var gradient = draw.gradient('linear', function(stop) {
            stop.at(0, '#09f')
            stop.at(0.7, color[i])
            
          }).from(0, 0).to(1, 1);
        temp.attr({
            fill:gradient,'fill-opacity':0.4,stroke:"#000",'stroke-width':2
        });
        output_offset+=height_offset;
    }


    // input to first hidden layer lines
    var offset1=0,offset2=0;
    for(i=0;i<input_node_count;i++){
        offset2=0;
        for(j=0;j<hidden_node_count[0];j++){
            var line=group.line(start_x+35,start_y+17.5+offset1,start_x+width_offset,start_y+17.5+offset2);
            line.stroke({ color: color[i], width: 2, linecap: 'round' })
            line.attr({'opacity':0.4})
            offset2 = offset2+height_offset;
        }
        offset1 = offset1+height_offset
    }

    // hidden layers lines
    offset1=0,offset2=0;
    var offset3 = width_offset;
    for(i=0;i<hidden_layers-1;i++){
        layer1_count=hidden_node_count[i];
        layer2_count=hidden_node_count[i+1];
        offset1=0;
        for(k=0;k<layer1_count;k++){
            offset2=0;
            for(l=0;l<layer2_count;l++){	
                    var line = group.line(start_x+35+offset3,start_y+17.5+offset1,start_x+width_offset+offset3,start_y+17.5+offset2);
                    line.stroke({ color: color[l], width: 2, linecap: 'round' });
                    line.attr({'opacity':0.26});
                    offset2 = offset2+height_offset;
                }
            offset1 = offset1+height_offset;
        }
        offset3+=width_offset;
    }

    offset1=0;
    offset2=0;
    var output_layer_start=start_x+available_width-100;
    var last_hidden_layer_end = start_x+35+offset3
    for(i=0;i<input_node_count;i++){
        offset2=0;
        for(j=0;j<hidden_node_count[0];j++){
            var line=group.line(last_hidden_layer_end,start_y+17.5+offset1,output_layer_start,start_y+17.5+offset2);
            line.stroke({ color: color[i], width: 2, linecap: 'round' });
            line.attr({'opacity':0.4});
            offset2 = offset2+height_offset;
        }
        offset1 = offset1+height_offset
    }

    // output layers lines


}
draw_graph();


function draw_buttons(){

    // input add buttons
    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+188+'px;top:'+140+'px;');
    btn.setAttribute('id','input_add_button')
    btn.innerHTML="+"
    document.getElementById('main').appendChild(btn);

    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+214+'px;top:'+140+'px;');
    btn.innerHTML="-"
    document.getElementById('main').appendChild(btn);
}

draw_buttons();