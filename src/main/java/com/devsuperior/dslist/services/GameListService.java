package com.devsuperior.dslist.services;

//Esse arquivo services, ele é responsavel por realizar as regras de negocios

import com.devsuperior.dslist.dto.GameListDTO;
import com.devsuperior.dslist.entities.GameList;
import com.devsuperior.dslist.projections.GameMinProjection;
import com.devsuperior.dslist.repositories.GameListRepository;
import com.devsuperior.dslist.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GameListService {

    @Autowired
    private GameListRepository gameListRepository;

    @Autowired
    private GameRepository gameRepository;

    @Transactional(readOnly = true)
    public List<GameListDTO> findAll(){
        List<GameList> result = gameListRepository.findAll();
        return result.stream().map(x -> new GameListDTO(x)).toList();
    }

    @Transactional
    public void move(Long listId, int sourceIndex, int destinationIndex) {
        // Primeiro buscamos nossa lista
        List<GameMinProjection> list = gameRepository.searchByList(listId);

        // Depois com as proprias funções integradas do list
        // Removemos nosso objeto e adicionamos ele depois na posição que queremos
        GameMinProjection obj = list.remove(sourceIndex);
        list.add(destinationIndex, obj);

        // Aqui descobrimos nossos valores dos indices, tanto o min quanto o max
        int min = sourceIndex < destinationIndex ? sourceIndex : destinationIndex;
        int max = sourceIndex < destinationIndex ? destinationIndex : sourceIndex;

        // Aq nesse loop chamamos agora a função do repository e mudamos os indices la no banco
        for(int i = min; i <= max; i++) {
           gameListRepository.updateBelongingPosition(listId, list.get(i).getId(), i);
        }
    }
}
