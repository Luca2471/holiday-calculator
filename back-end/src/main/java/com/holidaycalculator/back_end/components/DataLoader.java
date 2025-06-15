package com.holidaycalculator.back_end.components;

import com.holidaycalculator.back_end.models.Trip;
import com.holidaycalculator.back_end.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader  implements ApplicationRunner {

    @Autowired
    TripRepository tripRepository;

    public DataLoader() {}

    public void run(ApplicationArguments args) {
        Trip trip1 = new Trip(2, "B20", "D", "Trip 1");
        Trip trip2 = new Trip(1, "B30", "D", "Trip 2");
        Trip trip3 = new Trip(2, "A20", "D", "Trip 3");
        Trip trip4 = new Trip(2, "C30", "A", "Trip 4");
        Trip trip5 = new Trip(2, "B10", "C", "Trip 5");
        Trip trip6 = new Trip(5, "B10", "C",  "Trip 6");
        Trip trip7 = new Trip(1, "D25", "B",  "Trip 7");
        Trip trip8 = new Trip(4, "D40", "A", "Trip 8");
        Trip trip9 = new Trip(2, "B5", "D", "Trip 9");
        Trip trip10 = new Trip(9, "B30", "D", "Trip 10");
        tripRepository.save(trip1);
        tripRepository.save(trip2);
        tripRepository.save(trip3);
        tripRepository.save(trip4);
        tripRepository.save(trip5);
        tripRepository.save(trip6);
        tripRepository.save(trip7);
        tripRepository.save(trip8);
        tripRepository.save(trip9);
        tripRepository.save(trip10);
    }
}
