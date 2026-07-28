package com.test.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Applique le CORS à toutes les routes commençant par /api
                        .allowedOrigins("http://localhost:4200") // Autorise ton application Angular
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autorise ces méthodes HTTP
                        .allowedHeaders("*") // Autorise tous les headers
                        .allowCredentials(true); // Indispensable pour la future gestion des sessions/cookies/tokens
            }
        };
    }
}