package com.devsuperior.dslist.repositories;

import com.devsuperior.dslist.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;

// Esse arquivo apenas controla as consultas no banco

// Dentro dos <> é usado como primeiro parametro nossa entidade e depois o tipo do ID
public interface GameRepository extends JpaRepository<Game, Long> {

}
