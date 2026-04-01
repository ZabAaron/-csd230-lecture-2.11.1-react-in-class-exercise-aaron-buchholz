package csd230.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public abstract class ClothingItemEntity extends ProductEntity {

    protected String size;

    @Column(name = "clothing_price")
    protected double price;

    protected int copies;

    public ClothingItemEntity() {}

    public ClothingItemEntity(String size, double price, int copies) {
        this.size = size;
        this.price = price;
        this.copies = copies;
    }

    @Override
    public void sellItem() {
        if (copies > 0) {
            copies--;
        }
    }

    @Override
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getCopies() {
        return copies;
    }

    public void setCopies(int copies) {
        this.copies = copies;
    }

    @Override
    public String toString() {
        return "ClothingItemEntity{size='" + size + "', price=" + price + ", copies=" + copies + "}";
    }
}
