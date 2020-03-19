class SimulationCommon {
    
    static get_random_tuple(min_x, max_x, min_y, max_y) {
        var rand_x = (Math.random() * (max_x - min_x)) + min_x;
        var rand_y = (Math.random() * (max_y - min_y)) + min_y;
        return [rand_x, rand_y];
    }

    static get_canvas_point() {
       return SimulationCommon.get_random_tuple(0, WIDTH, 0, HEIGHT); 
    }

}

const simulation = ( sketch ) => {
    // CONSTANTS
    // P5 FUNCTIONS
    //
    sketch.setup = function() {
        setup_variables();
        sketch.createCanvas(HEIGHT,WIDTH);
        sketch.background(70);
        population = new Population(POPULATION_SIZE)
        sketch.frameRate(FRAME_RATE);

        // Set colors
        HEALTHY_COLOR = sketch.color('white');
        SICK_COLOR = sketch.color('pink');
        RECOVERED_COLOR = sketch.color('blue');
        UNKNOWN_STATUS_COLOR = sketch.color('green');
    };

    sketch.draw = function() {
        if (START_SIMULATION){
            if( population.sick_num > 0 ) {
                sketch.background(70);
                population.move()
                population.check_contact();
                population.display(sketch);

                if (sketch.frameCount % (SECONDS_PER_DAY * FRAME_RATE) == 0) {
                    population.next_day();
                    population.print_statistics();

                }
            }
        }
        if (START_SIMULATION == 0) {
            START_SIMULATION = 0;
            sketch.setup()
        }
    };

    setup_variables = function() {
        MAX_SPEED = parseFloat(document.getElementById("speed_slider").value);
        RECOVER_TIME = parseInt(document.getElementById("recover_slider").value);
        POPULATION_SIZE = parseInt(document.getElementById("population_slider").value);
    };
};

let myp5 = new p5(simulation, 'simuSketch')
