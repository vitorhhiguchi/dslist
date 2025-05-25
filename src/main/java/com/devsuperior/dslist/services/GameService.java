package com.devsuperior.dslist.services;

//Esse arquivo services, ele é responsavel por realizar as regras de negocios

import com.devsuperior.dslist.dto.GameMinDTO;
import com.devsuperior.dslist.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.devsuperior.dslist.entities.Game;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<GameMinDTO> findAll(){
        List<Game> result = gameRepository.findAll();
        List<GameMinDTO> dto = result.stream().map(x -> new GameMinDTO(x)).toList();
        return dto;

        // Outra alternativa para fazermos o return seria direto, dessa maneira:
        // return = result.stream().map(x -> new GameMinDTO(x)).toList();
    }
}
