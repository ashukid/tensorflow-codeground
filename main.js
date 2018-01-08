var available_width = (window.innerWidth)-320;
var available_height = (window.innerHeight)-140;
var draw = SVG('drawing').size(available_width,available_height);
var group = draw.group();
var group_button = draw.group();

// automatic changable variables
var input_node_count=10;
var output_node_count=10;


// screen variable
var top_space=130;
var left_space=160;


// manually changable variables
var hidden_node_count=[8,8,8,8,8,8];
var hidden_layers = hidden_node_count.length;
var total_layers=hidden_layers+2;
var height_offset=45;
console.log(window.innerHeight)
var width_offset=Math.floor(available_width/total_layers);

// Non changable variables
var start_x=30;
var start_y=50;
var color = ['pink','blue','lightgreen','purple','orange','red','green','lightblue','yellow'];


function draw_graph(){
    var i,j,k,l;

    // drawing input feature square
    var input_offset=0;
    for(i=0;i<input_node_count;i++){
        temp=group.rect(35,35).move(start_x,start_y+input_offset);
        temp.attr({
            fill:color[i],'fill-opacity':0.2,stroke:"#000",'stroke-width':2
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
            temp=group.circle(35).move(start_x+hidden_width_offset,start_y+45+hidden_height_offset);
            temp.attr({
            fill:color[j],'fill-opacity':0.2,stroke:"#000",'stroke-width':2
            });
            hidden_height_offset+=height_offset;
        }
    }

    var output_offset=0;
    hidden_width_offset+=width_offset;
    for(i=0;i<output_node_count;i++){
        temp=group.rect(35,35).move(start_x+hidden_width_offset,start_y+output_offset);
        temp.attr({
            fill:color[i],'fill-opacity':0.5,stroke:"#000",'stroke-width':2
        });
        output_offset+=height_offset;
    }
}

draw_graph();