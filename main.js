var available_width = (window.innerWidth)-320;
// var available_height = (window.innerHeight)-140;
var available_height=500;
if(available_width<600){
    available_width=600;
}
var draw = SVG('drawing').size(available_width,available_height);
var group = draw.group();

// automatic changable variables
var input_node_count=4;
var output_node_count=2;


// screen variable
var top_space=130;
var left_space=160;


// manually changable variables
var hidden_node_count=[5,5,5];
var hidden_layers = hidden_node_count.length;
var total_layers=hidden_layers+2;
var height_offset=45;
var width_offset=Math.floor(available_width/total_layers);

// Non changable variables
var start_x=30;
var start_y=50;
var color = ['pink','#890','purple','orange','red','yellow','#630','#f8f','#f48','brown'];
var current_hidden_button_ids=[]


function draw_graph(){
    var i,j,k,l;

    // drawing input feature square
    var input_offset=0;
    
    for(i=0;i<input_node_count;i++){
        temp=group.rect(35,35).move(start_x,start_y+input_offset);
        var gradient = draw.gradient('linear', function(stop) {
            stop.at(0, '#09f')
            stop.at(0.5, color[i])
            stop.at(1.0, '#000')
            
          }).from(0, 0).to(1, 1);
        temp.attr({
            fill:gradient,'fill-opacity':0.6,stroke:"#000",'stroke-width':2
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
            fill:gradient,'fill-opacity':0.4,stroke:"#000",'stroke-width':2
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
            fill:gradient,'fill-opacity':0.6,stroke:"#000",'stroke-width':2
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

    // output layers lines
    offset1=0;
    offset2=0;
    var output_layer_start=start_x+available_width-100;
    var last_hidden_layer_end = start_x+35+offset3
    for(i=0;i<hidden_node_count[hidden_layers-1];i++){
        offset2=0;
        for(j=0;j<output_node_count;j++){
            var line=group.line(last_hidden_layer_end,start_y+17.5+offset1,output_layer_start,start_y+17.5+offset2);
            line.stroke({ color: color[i], width: 2, linecap: 'round' });
            line.attr({'opacity':0.4});
            offset2 = offset2+height_offset;
        }
        offset1 = offset1+height_offset
    }

    // left line for input layer mark
    var line=group.line(10,start_y,10,start_y+350)
    line.stroke({ color: 'black', width: 2, linecap: 'round' });
    line.attr({'opacity':0.4});

    // right line for output layer mark
    var line=group.line(available_width-10,start_y,available_width-10,start_y+350)
    line.stroke({ color: 'black', width: 2, linecap: 'round' });
    line.attr({'opacity':0.4});

    // bottom line for hidden layer addition button
    var line=group.line(start_x+width_offset,start_y+380,last_hidden_layer_end,start_y+380)
    line.stroke({ color: 'black', width: 2, linecap: 'round' });
    line.attr({'opacity':0.4});


}
draw_graph();


function draw_static_buttons(){

    // input add buttons
    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+184+'px;top:'+150+'px;');
    btn.setAttribute('id','input_add_button');
    btn.innerHTML="+";
    btn.addEventListener("click",function(){
        if(input_node_count<8){
            input_node_count = input_node_count+1;
            redraw_graph();
        }
    });
    document.getElementById('main').appendChild(btn);

    //input remove button
    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+212+'px;top:'+150+'px;');
    btn.setAttribute('id','input_remove_button');
    btn.innerHTML="-";
    btn.addEventListener("click",function(e){
        if(input_node_count>1){
            input_node_count-=1;
            redraw_graph();
        }
    });
    document.getElementById('main').appendChild(btn);

    // output add button
    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+(184+available_width-105)+'px;top:'+150+'px;');
    btn.setAttribute('id','output_add_button');
    btn.innerHTML="+";
    btn.addEventListener("click",function(){
        if(output_node_count<8){
            output_node_count = output_node_count+1;
            redraw_graph();
        }
    });
    document.getElementById('main').appendChild(btn);

    // output remove button
    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+(212+available_width-105)+'px;top:'+150+'px;');
    btn.setAttribute('id','output_remove_button');
    btn.innerHTML="-";
    btn.addEventListener("click",function(){
        if(output_node_count>1){
            output_node_count = output_node_count-1;
            redraw_graph();
        }
    });
    document.getElementById('main').appendChild(btn);

    // hidden layer add button
    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+(160+420)+'px;top:'+(130+450)+'px;');
    btn.setAttribute('id','output_add_button');
    btn.innerHTML="+";
    btn.addEventListener("click",function(){
        if(hidden_layers<6){
            hidden_layers +=1;
            total_layers +=1;
            hidden_node_count.push(1);
            width_offset=Math.floor(available_width/total_layers);
            redraw_graph();
        }
    });
    document.getElementById('main').appendChild(btn);

    // hidden layer remove button
    btn=document.createElement("BUTTON");
    btn.className='button';
    btn.setAttribute('style','position:absolute;left:'+(160+450)+'px;top:'+(130+450)+'px;');
    btn.setAttribute('id','output_add_button');
    btn.innerHTML="-";
    btn.addEventListener("click",function(){
        if(hidden_layers>1){
            hidden_layers -=1;
            total_layers -=1;
            hidden_node_count.pop();
            width_offset=Math.floor(available_width/total_layers);
            redraw_graph();
        }
    });
    document.getElementById('main').appendChild(btn);

}
function draw_dynamic_buttons(){

    for(i=0;i<current_hidden_button_ids.length;i++){
        console.log(current_hidden_button_ids[i])
        var elem=document.getElementById(current_hidden_button_ids[i]);
        document.getElementById("main").removeChild(elem);
    }
    current_hidden_button_ids=[]
    // hidden layer node add and remove button
    var temp_width_offset=width_offset;
    for(i=0;i<hidden_layers;i++){
        btn=document.createElement("BUTTON");
        btn.className='button';
        btn.setAttribute('style','position:absolute;left:'+(184+temp_width_offset)+'px;top:'+150+'px;');
        btn.setAttribute('id','hidden'+i+'_add_button');
        current_hidden_button_ids.push('hidden'+i+'_add_button');
        btn.innerHTML="+";
        function add_listener(i){
            btn.addEventListener("click",function(){
                if(hidden_node_count[i]<8){
                    hidden_node_count[i] = hidden_node_count[i]+1;
                    redraw_graph();
                }
            });
        }
        add_listener(i);
        document.getElementById('main').appendChild(btn);

        btn=document.createElement("BUTTON");
        btn.className='button';
        btn.setAttribute('style','position:absolute;left:'+(212+temp_width_offset)+'px;top:'+150+'px;');
        btn.setAttribute('id','hidden'+i+'_remove_button');
        current_hidden_button_ids.push('hidden'+i+'_remove_button');
        btn.innerHTML="-";
        function remove_listener(i){
            btn.addEventListener("click",function(){
                console.log(i);
                if(hidden_node_count[i]>1){
                    hidden_node_count[i] = hidden_node_count[i]-1;
                    redraw_graph();
                }
            });
        }
        remove_listener(i);
        document.getElementById('main').appendChild(btn);

        temp_width_offset+=width_offset;
    }
}

draw_static_buttons();
draw_dynamic_buttons();

function redraw_graph(){
    group.clear();
    draw_graph();
    draw_dynamic_buttons();
}


function generate_code(){
    document.getElementById("code").style.display="block";
    document.getElementById("footer").style.display="block";
    document.getElementById("class_count").innerHTML = output_node_count;
    document.getElementById("feature_count").innerHTML = input_node_count;
    document.getElementById("hidden_count").innerHTML = hidden_layers;

    document.getElementById("node_count").innerHTML="";
    for(i=0;i<hidden_layers;i++){
        var node = document.createElement('span');
        node.textContent = "hidden_layer" + (i+1) + "_node_count = "+ hidden_node_count[i] ;
        node.setAttribute("style","display:inherit;font-family:inherit;white-space:inherit;margin:0px;padding:0px");
        var element = document.getElementById("node_count");
        element.appendChild(node);
    }
    document.getElementById("hidden_params").innerHTML="";
    for(i=0;i<(hidden_layers-1);i++){
        var node1 = document.createElement('span');
        node1.textContent = "    hidden_layer"+(i+1)+"_parameters = {'weights':tf.Variable(tf.random_normal([hidden_layer"+(i+1)+"_node_count, hidden_layer"+(i+2)+"_node_count])),"
        node1.setAttribute("style","display:inherit;font-family:inherit;white-space:inherit;margin:0px;padding:0px");
        var node2 = document.createElement('span');
        node2.textContent = "                  'biases':tf.Variable(tf.random_normal([hidden_layer"+(i+2)+"_node_count]))}"
        node2.setAttribute("style","display:inherit;font-family:inherit;white-space:inherit;margin:0px;padding:0px");
        var element = document.getElementById("hidden_params");
        element.appendChild(node1);
        element.appendChild(node2);
        document.getElementById("last_hidden_layer").innerHTML = "hidden_layer"+(i+2)+"_node_count";
    }
    document.getElementById("hidden_layers").innerHTML="";
    for(i=0;i<hidden_layers;i++){
        var node1 = document.createElement('span');
        node1.textContent = "    hidden_layer"+(i+1)+" = tf.add(tf.matmul(data,hidden_params"+(i+1)+"['weights']), hidden_params"+(i+1)+"['biases'])";
        node1.setAttribute("style","display:inherit;font-family:inherit;white-space:inherit;margin:0px;padding:0px");
        var node2 = document.createElement('span');
        node2.textContent = "    hidden_layer"+(i+1)+" = tf.nn.relu(hidden_layer"+(i+1)+")";
        node2.setAttribute("style","display:inherit;font-family:inherit;white-space:inherit;margin:0px;padding:0px");
        var element = document.getElementById("hidden_layers");
        element.appendChild(node1);
        element.appendChild(node2);
        document.getElementById("last_layer").innerHTML = "hidden_layer"+(i+1);
    }

}
