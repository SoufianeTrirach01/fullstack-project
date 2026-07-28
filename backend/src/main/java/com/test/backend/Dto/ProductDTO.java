package com.test.backend.Dto;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class ProductDTO {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private Integer stockQuantity;
        private String imageUrl;
        private Long categoryId; // On envoie juste l'ID de la catégorie, pas tout l'objet lourd !
        private String categoryName; // Pratique pour l'afficher directement sur Angular !

}
