package com.test.backend.config;

import com.test.backend.Repositories.CategoryRepository;
import com.test.backend.Repositories.ProductRepository;
import com.test.backend.entities.Category;
import com.test.backend.entities.Product;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component // Dit à Spring de lire cette classe au démarrage
public class DataInitializer implements CommandLineRunner {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    public DataInitializer(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    @Override
    public void run(String... args) throws Exception {
        // On vérifie si la base est déjà remplie pour ne pas dupliquer les données
        if (categoryRepository.count() == 0) {
            // 1. Création des Catégories
            Category electro = new Category(null, "Électronique", "Téléphones, Ordinateurs et gadgets", null);
            Category mode = new Category(null, "Mode", "Vêtements et accessoires tendances", null);
            categoryRepository.saveAll(Arrays.asList(electro, mode));
            // 2. Création des Produits reliés aux catégories
            Product p1 = new Product(
                    null,
                    "iPhone 15 Pro",
                    "Le dernier smartphone Apple avec châssis en titane.",
                    new BigDecimal("1299.99"),
                    50,
                    "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
                    electro
            );

            Product p2 = new Product(
                    null,
                    "MacBook Air M3",
                    "Ordinateur portable ultra-fin et puissant.",
                    new BigDecimal("1449.00"),
                    30,
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
                    electro
            );

            Product p3 = new Product(
                    null,
                    "Veste en Jean",
                    "Veste en jean classique et confortable.",
                    new BigDecimal("59.99"),
                    100,
                    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
                    mode
            );
            productRepository.saveAll(Arrays.asList(p1, p2, p3));

            System.out.println(">> Base de données initialisée avec succès grâce à Docker et Spring Boot !");
        }
    }}
