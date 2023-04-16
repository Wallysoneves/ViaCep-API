package com.br.ViaCep.service;

import com.br.ViaCep.entity.Endereco;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;


@Repository
public class ViaCepService {

    public Endereco consultarCep(String cep) {
        Endereco endereco = null;
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("https://viacep.com.br/ws/%s/json/",cep);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        HttpEntity<String> entity = new HttpEntity<>("", headers);
        ResponseEntity<Endereco> response = restTemplate.exchange(url, HttpMethod.GET, entity, Endereco.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            endereco = response.getBody();
            if (endereco != null && endereco.getCep() != null) {
                return endereco;
            }
        }
        return null;
    }
}
