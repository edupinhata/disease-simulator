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

    // Make sure the person will be within the canvas limits
    constrain_person() {
        this.position[X] = constrain(this.position[X], 0, WIDTH);
        this.position[Y] = constrain(this.position[X], 0, HEIGHT);
    }

    // If person gets in the limit of the canvas, it bounces, 
    // inverting the speed that made it hit the edge.
    wall_bounce() {
        if (this.position[X] + this.speed[X] >= WIDTH ||
            this.position[X] + this.speed[X] <= 0)
            this.speed[X] *= -1;
         if (this.position[Y] + this.speed[Y] >= HEIGHT ||
             this.position[Y] + this.speed[Y] <= 0)
            this.speed[Y] *= -1;
    }

    // Person move depending on it current position and
    // speed.
    move() {
        this.wall_bounce()

        this.position = this.position.map(
            (pos, idx) =>  pos + this.speed[idx]);
    }

    // Verify if this person is near to other person.
    // The distance depends on the CONTAGIOUS DISTANCE.
    // This parameter may be used to determine how easy 
    // the disease will be transmited.
    // @param person Person object that want to verify if it's 
    //               near
    // @return true if it's in the CONTAGIOUS_DISTANCE radius
    //         false otherwise.
    is_near(person) {
        var x_distance = Math.abs(this.position[X] - person.position[X]);
        var y_distance = Math.abs(this.position[Y] - person.position[Y]);
        if (x_distance < CONTAGIOUS_DISTANCE &&
            y_distance < CONTAGIOUS_DISTANCE) {
            return true;        
        }
        return false;
    }

    // Person got sick
    // 
    // @return 1 if it was HEALTHY
    //         0 if it was already sick
    get_sick() {
        if (this.health == HEALTHY) {
            this.health = SICK;
            this.time_to_recover = RECOVER_TIME;
            return 1;
        }
        return 0;
    }

    // Verify if this person is sick
    //
    // @return true if is sick, false otherelse
    is_sick() {
        if (this.health == SICK) {
            return true;
        }
        return false;
    }

    // Will reduce the time to person get recovered
    // 
    // @return 1 if person is not sick anymore
    //         0 if person is still sick
    heal() {
        if ( this.is_sick() ) {
            if (this.time_to_recover == 0) {
                this.recover();
                return 1;
            }
            else {
                this.time_to_recover -= 1;
            }
        }
        return 0;
    }

    // Change person status to RECOVERED
    recover() {
        this.health = RECOVERED
    }

    display(sketch) {
        sketch.fill(HealthStatus.get_color(this.health))
        sketch.circle(this.position[X], this.position[Y], 7);
    }

    static get_random_speed() {
        return SimulationCommon.get_random_tuple(
            -MAX_SPEED, MAX_SPEED,-MAX_SPEED, MAX_SPEED);
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

