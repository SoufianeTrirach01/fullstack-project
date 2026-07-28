package com.test.backend.Service;

import com.test.backend.Dto.request.OrderItemRequest;
import com.test.backend.Dto.request.OrderRequest;
import com.test.backend.Repositories.OrderRepository;
import com.test.backend.Repositories.ProductRepository;
import com.test.backend.entities.Order;
import com.test.backend.entities.OrderItem;
import com.test.backend.entities.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }
    // @Transactional : Si une étape plante (ex: plus de stock), TOUTE la transaction s'annule en BDD !
    @Transactional
    public Order CreateOrder(OrderRequest request){
        Order order=new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        for(OrderItemRequest itemReq:request.getItems()){
            // 1. On récupère le produit en BDD
            Product product=productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé : " + itemReq.getProductId()));
            // 2. Vérification du stock
            if (product.getStockQuantity() < itemReq.getQuantity()) {
                throw new RuntimeException("Stock insuffisant pour le produit : " + product.getName());
            }
            // 3. Mise à jour du stock
            product.setStockQuantity(product.getStockQuantity() - itemReq.getQuantity());
            productRepository.save(product);
            // 4. Calcul du montant de la ligne
            BigDecimal linePrice = product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            totalAmount = totalAmount.add(linePrice);

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);

        }
        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
