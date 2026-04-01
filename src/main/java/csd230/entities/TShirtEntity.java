package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("TSHIRT")
public class TShirtEntity extends ClothingItemEntity {

    private String sleeveLength;

    public TShirtEntity() {}

    @JsonIgnore
    public TShirtEntity(String size, double price, int copies, String sleeveLength) {
        super(size, price, copies);
        this.sleeveLength = sleeveLength;
    }

    public String getSleeveLength() {
        return sleeveLength;
    }

    public void setSleeveLength(String sleeveLength) {
        this.sleeveLength = sleeveLength;
    }

    @Override
    public String toString() {
        return "TShirtEntity{size='" + size + "', price=" + price + ", sleeveLength='" + sleeveLength + "'}";
    }
}
