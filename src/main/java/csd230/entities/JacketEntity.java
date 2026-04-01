package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("JACKET")
public class JacketEntity extends ClothingItemEntity {

    private Boolean insulated;

    public JacketEntity() {}

    @JsonIgnore
    public JacketEntity(String size, double price, int copies, Boolean insulated) {
        super(size, price, copies);
        this.insulated = insulated;
    }

    public Boolean getInsulated() {
        return insulated;
    }

    public void setInsulated(Boolean insulated) {
        this.insulated = insulated;
    }

    @Override
    public String toString() {
        return "JacketEntity{size='" + size + "', price=" + price + ", insulated=" + insulated + "'}";
    }
}
