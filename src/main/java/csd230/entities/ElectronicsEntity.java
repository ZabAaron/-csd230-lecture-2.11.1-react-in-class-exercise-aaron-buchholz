
package csd230.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public abstract class ElectronicsEntity extends ProductEntity {

    protected String brand;  // Shared parent attribute

    @Column(name = "electronics_price")
    protected double price;

    protected int quantity;

    public ElectronicsEntity() {}

    public ElectronicsEntity(String brand, double price, int quantity) {
        this.brand = brand;
        this.price = price;
        this.quantity = quantity;
    }

    @Override
    public void sellItem() {
        if (quantity > 0) {
            quantity--;
        }
    }

    @Override
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "ElectronicsEntity{brand='" + brand + "', price=" + price + ", quantity=" + quantity + "}";
    }
}