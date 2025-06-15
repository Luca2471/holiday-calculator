package com.holidaycalculator.back_end.models;


import jakarta.persistence.*;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "passengers")
    private int passengers;

    @Column(name = "home")
    private String home;

    @Column(name = "destination")
    private String destination;

    @Column(name = "name")
    private String name;

    public Trip(int passengers, String home, String destination, String name) {
        this.passengers = passengers;
        this.home = home;
        this.destination = destination;
        this.name = name;
    }

    public Trip() {

    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public int getPassengers() { return passengers; }

    public void setPassengers(int passengers) { this.passengers = passengers; }

    public String getHome() { return home; }

    public void setHome(String home) { this.home = home; }

    public String getDestination() { return destination; }

    public void setDestination(String destination) { this.destination = destination; }
}
