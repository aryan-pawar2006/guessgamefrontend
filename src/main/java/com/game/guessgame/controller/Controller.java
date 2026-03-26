package com.game.guessgame.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/game")
public class Controller {

    private Map<String, Integer> gameData = new HashMap<>();
    private Random random = new Random();

    // Start Game API
    @GetMapping("/start")
    public String startGame() {
        String gameId = String.valueOf(System.currentTimeMillis());
        int number = random.nextInt(100) + 1;

        gameData.put(gameId, number);

        return gameId;
    }

    // Guess API
    @GetMapping("/guess")
    public String guess(@RequestParam String gameId, @RequestParam int guess) {

        if (!gameData.containsKey(gameId)) {
            return "Invalid Game ID";
        }

        int number = gameData.get(gameId);

        if (guess > number) return "Too High";
        if (guess < number) return "Too Low";

        return "Correct 🎉";
    }
}