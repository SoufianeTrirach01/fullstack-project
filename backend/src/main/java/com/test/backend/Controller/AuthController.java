package com.test.backend.Controller;



import com.test.backend.Dto.AuthResponse;
import com.test.backend.Dto.LoginRequest;
import com.test.backend.Dto.RegisterRequest;
import com.test.backend.Repositories.UserRepository;
import com.test.backend.Security.JwtUtil;
import com.test.backend.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // Pour autoriser Angular
public class AuthController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Cet email est déjà utilisé !");
        }

        User user = new User();
        user.setEmail(request.email());
        // Sécurité : On hache le mot de passe avant de le sauvegarder
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setName(request.name());

        userRepository.save(user);
        return ResponseEntity.ok("Utilisateur créé avec succès !");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.email());

        if (userOpt.isEmpty() || !passwordEncoder.matches(request.password(), userOpt.get().getPassword())) {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect.");
        }

        User user = userOpt.get();
        // Identifiants corrects -> On génère le précieux sésame (JWT)
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, user.getName(), user.getEmail()));
    }
}
