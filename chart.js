
/*
 * This type of chart will be able to represent groups in a 
 * fixed set. It's fixed in the sense that it's elements number
 * will never change. They can change state, but it will still
 * be in the total.
 * The example is the number of people in a society that may
 * or may not have a disease. Either it is healthy, either 
 * sick or recovered. We consider that no other element will 
 * enter in the group, so we can normalize the number of people.
 */
class TotalChart {

    //
    //
    // @param group_num: number of groups in the whole
    // @param group_name: list with a string that identifies 
    //              each group.
    // @param gorup_norm: how the group num should be normalized.
    //              this will be usefull to plot in a chart.
    constructor(group_num, group_name=[], group_norm=100) {
        this.group_num = group_num;
        this.history = []
        for (var el=0; el<group_num; el++) {
            this.history.push([]);
        }
        this.group_name = group_name;
        this.group_norm = group_norm;
    }

    // A record will be added in the history.
    // @param record_list Is a list with the quantity of 
    //        each element in the group. The elements should
    //        always be passed in the same order.
    add_event(record_list) {
        if ( record_list.length == this.group_num ) {
            var record_list_norm = this.normalize_entry(record_list);
            record_list_norm.map(
                (record, idx) => this.history[idx].push(record));
        }
        else {
            console.log("List don't have the right number of groups");
        }
    }

    // Take a list of records and normalize with 
    // the group_norm value. E.g. if there are 
    // 400 people in the following groups number: 
    // [50 100 50 200]  and the group_norm = 100,
    // this list should become [12.5 25 12.5 200]
    normalize_entry (record_list) {
        var elements_total = record_list.reduce(
            ((total, num) => total + num), 0);    
        return record_list.map(ele => (ele/elements_total)*this.group_norm);
    }


}

const graph = ( sketch ) => {

    var WIDTH = 400;
    var HEIGHT = 200;
    var bar_size = 2; // how many intervals the chart 
                     // will support
    var group_norm = HEIGHT; 
    var total_chart;

    sketch.setup = function(){
        sketch.createCanvas(WIDTH,HEIGHT);
        sketch.background(200);
        group_name = [ 'Recovered', 'Healthy', 'Sick'];
        total_chart = new TotalChart(3, group_name, HEIGHT);
        
        // Set colors
        HEALTHY_COLOR = sketch.color('white');
        SICK_COLOR = sketch.color('pink');
        RECOVERED_COLOR = sketch.color('blue');
        UNKNOWN_STATUS_COLOR = sketch.color('green');

        GROUP_COLOR = [RECOVERED_COLOR, HEALTHY_COLOR, SICK_COLOR,
                       UNKNOWN_STATUS_COLOR];
    }

    sketch.draw = function(){
        if (START_SIMULATION == 1){
            if ( sketch.frameCount % (SECONDS_PER_DAY * FRAME_RATE ) == 0 ){
                sketch.background(200);
                total_chart.add_event( get_current_data() );
                draw_chart(total_chart);
            }
        }
        if (START_SIMULATION == 0){
            sketch.setup();
        }
    }

    // Function that will create the rectangles that will fill the chart.
    // @param total_chart  instance of TotalChart with the history of 
    //                     values
    draw_chart = function(total_chart) {
        var last;
        for (var idx=0; idx<total_chart.history[0].length; idx++){
            last = 0; 
            for (var group=0; group<total_chart.group_num; group++) {
                sketch.fill(GROUP_COLOR[group]);
                sketch.noStroke()
                sketch.rect(idx * bar_size, last, bar_size, total_chart.history[group][idx]);
                last += total_chart.history[group][idx];
            }
        }
    }

    // function that retrieve information from
    // webpage
    get_current_data = function() {
        sick_num = document.getElementById("sick_num").innerHTML;
        healthy_num = document.getElementById("health_num").innerHTML;
        recovered_num = document.getElementById("recovered_num").innerHTML;

        return [ parseInt(recovered_num), 
                 parseInt(healthy_num), 
                 parseInt(sick_num) ]; 
    }

};


let myp5_graph = new p5(graph, 'graphSketch')
