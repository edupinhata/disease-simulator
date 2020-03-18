// CONSTANTS

// Person
const X = 0;
const Y = 1;
const MAX_SPEED = 0.7;
const RECOVER_TIME = 7;

// Simulation
const WIDTH = 600;
const HEIGHT = 600;
const POPULATION_SIZE = 200;
const CONTAGIOUS_DISTANCE = 10;
const FRAME_RATE = 30
const SECONDS_PER_DAY = 1 

// Person status
const HEALTHY = 0;
const SICK = 1;
const RECOVERED = 2;

// GLOBAL VARIABLES
var population
var HEALTHY_COLOR, SICK_COLOR, RECOVERED_COLOR, UNKNOWN_STATUS_COLOR;

function get_random_tuple(min_x, max_x, min_y, max_y){
    var rand_x = (Math.random() * (max_x - min_x)) + min_x;
    var rand_y = (Math.random() * (max_y - min_y)) + min_y;
    print(rand_x + ' | ' + rand_y)
    return [rand_x, rand_y];
}

function get_random_point() {
   return get_random_tuple(0, WIDTH, 0, HEIGHT); 
}

function get_random_speed() {
    return get_random_tuple(-MAX_SPEED, MAX_SPEED, 
                            -MAX_SPEED, MAX_SPEED);
}

// P5 FUNCTIONS
//
function setup() {
    createCanvas(HEIGHT,WIDTH);
    population = new Population(POPULATION_SIZE)

    // Set colors
    HEALTHY_COLOR = color('white');
    SICK_COLOR = color('pink');
    RECOVERED_COLOR = color('blue');
    UNKNOWN_STATUS_COLOR = color('green');
}

function draw() {
    background(70);
    frameRate(FRAME_RATE);
    population.move()
    population.check_contact()
    population.draw()

    if (frameCount % (SECONDS_PER_DAY * FRAME_RATE) == 0)
        population.next_day()
}


// OUR CODE
class Population{
    
    constructor(size) {
        this.people = []
        this.size = size

        for (var p=0; p<this.size; p++) {
            this.people.push(
                new Person(get_random_point(), 
                           get_random_speed()))
        }

        this.people[0].get_sick();
   }

    move() {
        this.people.forEach(person => person.move())
    }

    draw() {
        this.people.forEach(person => person.draw()) 
    }

    check_contact() {
        for (var person=0; person<this.size-1; person++) {
            for (var other=person+1; other<this.size; other++) {
                var p1 = this.people[person]
                var p2 = this.people[other]
                if (p1.is_sick() || p2.is_sick()) {
                    if (p1.is_near(p2)){
                        p1.get_sick();
                        p2.get_sick();
                    }}}}
    }

    next_day() {
        this.people.forEach(person => person.heal())
    }
}


class Person {
    constructor(position, speed, is_sick=false) {
        this.position = position; // [x, y]
        this.speed = speed;  // [x, y]
        this.health = HEALTHY;
        this.time_to_recover = 0;

        if (is_sick) {
            this.get_sick();
        }
    }

    constrain_person() {
        this.position[X] = constrain(this.position[X], 0, WIDTH);
        this.position[Y] = constrain(this.position[X], 0, HEIGHT);
    }

    wall_bounce() {
        if (this.position[X] + this.speed[X] >= WIDTH ||
            this.position[X] + this.speed[X] <= 0)
            this.speed[X] *= -1;
         if (this.position[Y] + this.speed[Y] >= HEIGHT ||
             this.position[Y] + this.speed[Y] <= 0)
            this.speed[Y] *= -1;
    }

    move() {
        this.wall_bounce()

        this.position = this.position.map(
            (pos, idx) =>  pos + this.speed[idx]);
    }

    is_near(person) {
        var x_distance = abs(this.position[X] - person.position[X]);
        var y_distance = abs(this.position[Y] - person.position[Y]);
        if (x_distance < CONTAGIOUS_DISTANCE &&
            y_distance < CONTAGIOUS_DISTANCE) {
            return true;        
        }
        return false;
    }

    get_sick() {
        if (this.health == HEALTHY) {
            this.health = SICK;
            this.time_to_recover = RECOVER_TIME;
        }
    }

    is_sick() {
        if (this.health == SICK) {
            return true;
        }
        return false;
    }

    heal() {
        if ( this.is_sick() ) {
            if (this.time_to_recover == 0)
                this.recover();
            else
                this.time_to_recover -= 1;
        }
    }

    recover() {
        this.health = RECOVERED
    }

    draw() {
        fill(HealthStatus.get_color(this.health))
        circle(this.position[X], this.position[Y], 10);
    }
}

class HealthStatus {

    static get_color(health) {
        switch (health) {
            case HEALTHY:
                return HEALTHY_COLOR;
            case SICK:
                return SICK_COLOR;
            case RECOVERED:
                return RECOVERED_COLOR;
            default:
                console.log("Unknown status!");
                return UNKNOWN_STATUS_COLOR;
        }
   }
}
