package com.br.ViaCep.controller;

import com.br.ViaCep.entity.Endereco;
import com.br.ViaCep.service.ViaCepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/viaCep")
public class ViaCepController {

    @Autowired
    ViaCepService viaCepRepository;

    @GetMapping("/{cep}/json")
    public ResponseEntity<Endereco> consultarCep(@PathVariable String cep) {
        return ResponseEntity.ok(viaCepRepository.consultarCep(cep));
    }
}
