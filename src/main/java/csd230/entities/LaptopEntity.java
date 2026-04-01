// src/main/java/csd230/entities/LaptopEntity.java
package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("LAPTOP")
public class LaptopEntity extends ElectronicsEntity {

    private String processor;  // Unique attribute for laptops

    public LaptopEntity() {}

    @JsonIgnore
    public LaptopEntity(String brand, double price, int quantity, String processor) {
        super(brand, price, quantity);
        this.processor = processor;
    }

    public String getProcessor() {
        return processor;
    }

    public void setProcessor(String processor) {
        this.processor = processor;
    }

    @Override
    public String toString() {
        return "LaptopEntity{brand='" + brand + "', price=" + price + ", processor='" + processor + "'}";
    }
}