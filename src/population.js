// OUR CODE
class Population{
    
    constructor(size) {
        this.people = []
        this.size = size
        this.health_num = this.size;
        this.sick_num = 0;
        this.recovered_num = 0;

        for (var p=0; p<this.size; p++) {
            this.people.push(
                new Person(SimulationCommon.get_canvas_point(), 
                           Person.get_random_speed()))
        }

        this.people[0].get_sick();
        this.sick_num += 1;
        this.health_num -= 1;

   }

    print_statistics() {
        document.getElementById("health_num").innerHTML = this.health_num;
        document.getElementById("sick_num").innerHTML = this.sick_num;
        document.getElementById("recovered_num").innerHTML = this.recovered_num;

        console.log('health: ' + this.health_num + 
            ' | sick: ' + this.sick_num + 
            ' | recovered: ' + this.recovered_num)
    }

    move() {
        this.people.forEach(person => person.move())
    }

    display(sketch) {
        this.people.forEach(person => person.display(sketch)) 
    }

    check_contact() {
        for (var person=0; person<this.size-1; person++) {
            for (var other=person+1; other<this.size; other++) {
                var p1 = this.people[person]
                var p2 = this.people[other]
                if (p1.is_sick() || p2.is_sick()) {
                    if (p1.is_near(p2)){
                        var got_sick = p1.get_sick() + p2.get_sick();
                        this.add_sick(got_sick);
                    }}}}
    }

    next_day() {
        for (var person of this.people) {
            this.add_recovered(person.heal())
        }
    }

    add_sick(num_got_sick) {
        this.sick_num += num_got_sick;
        this.health_num -= num_got_sick;
    }

    add_recovered(num_recovered) {
        this.recovered_num += num_recovered;
        this.sick_num -= num_recovered;
    }
}
