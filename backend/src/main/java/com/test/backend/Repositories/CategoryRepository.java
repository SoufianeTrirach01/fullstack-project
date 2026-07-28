package com.test.backend.Repositories;

import com.test.backend.entities.Category;
import com.test.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository  extends JpaRepository<Category,Long> {
// Spring va générer automatiquement toutes les méthodes CRUD (save, findById, findAll, delete)

}

