// src/main/java/csd230/entities/PhoneEntity.java
package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PHONE")
public class PhoneEntity extends ElectronicsEntity {

    private Integer storageGB;  // Unique attribute for phones

    public PhoneEntity() {}

    @JsonIgnore
    public PhoneEntity(String brand, double price, int quantity, Integer storageGB) {
        super(brand, price, quantity);
        this.storageGB = storageGB;
    }

    public Integer getStorageGB() {
        return storageGB;
    }

    public void setStorageGB(Integer storageGB) {
        this.storageGB = storageGB;
    }

    @Override
    public String toString() {
        return "PhoneEntity{brand='" + brand + "', price=" + price + ", storageGB=" + storageGB + "'}";
    }
}