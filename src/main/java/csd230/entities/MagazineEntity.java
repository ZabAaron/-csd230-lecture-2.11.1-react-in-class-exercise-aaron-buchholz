package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("MAGAZINE")
public class MagazineEntity extends PublicationEntity {
    private Integer orderQty;
    private LocalDateTime currentIssue;

    public MagazineEntity() {}

    // For Jackson - use empty constructor and setters
    @JsonIgnore
    public MagazineEntity(String t, Double p, Integer c, Integer o, LocalDateTime d) {
        super(t, p, c);
        this.orderQty = o != null ? o : 0;
        this.currentIssue = d;
    }

    public Integer getOrderQty() {
        return orderQty != null ? orderQty : 0;
    }

    public void setOrderQty(Integer o) {
        this.orderQty = o != null ? o : 0;
    }

    public void setCurrentIssue(LocalDateTime d) {
        this.currentIssue = d;
    }

    public LocalDateTime getCurrentIssue() {
        return currentIssue;
    }

    @Override
    public String toString() {
        return "Mag{issue=" + currentIssue + ", " + super.toString() + "}";
    }
}