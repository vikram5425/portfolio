package com.vikram.portfolio.controller;

import com.vikram.portfolio.model.Profile;
import com.vikram.portfolio.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    // READ - Get profile (returns first/only profile)
    @GetMapping
    public ResponseEntity<Profile> getProfile() {
        List<Profile> profiles = profileRepository.findAll();
        if (profiles.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profiles.get(0));
    }

    // UPDATE - Update profile
    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @RequestBody Profile details) {
        return profileRepository.findById(id)
                .map(profile -> {
                    profile.setName(details.getName());
                    profile.setTitle(details.getTitle());
                    profile.setBio(details.getBio());
                    profile.setImageUrl(details.getImageUrl());
                    profile.setEmail(details.getEmail());
                    profile.setPhone(details.getPhone());
                    profile.setGithub(details.getGithub());
                    profile.setLinkedin(details.getLinkedin());
                    profile.setResumeUrl(details.getResumeUrl());
                    return ResponseEntity.ok(profileRepository.save(profile));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
