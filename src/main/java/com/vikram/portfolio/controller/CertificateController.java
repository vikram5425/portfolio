package com.vikram.portfolio.controller;

import com.vikram.portfolio.model.Certificate;
import com.vikram.portfolio.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    @PostMapping
    public Certificate createCertificate(@RequestBody Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certificate> getCertificateById(@PathVariable Long id) {
        return certificateRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certificate> updateCertificate(@PathVariable Long id, @RequestBody Certificate details) {
        return certificateRepository.findById(id)
                .map(cert -> {
                    cert.setTitle(details.getTitle());
                    cert.setIssuer(details.getIssuer());
                    cert.setDate(details.getDate());
                    cert.setCredentialUrl(details.getCredentialUrl());
                    cert.setImageUrl(details.getImageUrl());
                    return ResponseEntity.ok(certificateRepository.save(cert));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        return certificateRepository.findById(id)
                .map(cert -> {
                    certificateRepository.delete(cert);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
