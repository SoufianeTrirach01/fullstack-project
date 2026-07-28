package com.test.backend.Controller;

import com.test.backend.Dto.request.OrderRequest;
import com.test.backend.Service.OrderService;
import com.test.backend.entities.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @PostMapping
    public ResponseEntity<Order> checkout(@RequestBody OrderRequest request){
        Order savedOrder= orderService.CreateOrder(request);
       return ResponseEntity.ok(savedOrder);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        // On récupère toutes les commandes triées de la plus récente à la plus ancienne
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
}
