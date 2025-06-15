package com.holidaycalculator.back_end.controllers;

import com.holidaycalculator.back_end.models.Trip;
import com.holidaycalculator.back_end.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/trips")
public class TripController {
    @Autowired
    TripRepository tripRepository;

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }
}