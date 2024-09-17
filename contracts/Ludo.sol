// // SPDX-License-Identifier: SEE LICENSE IN LICENSE
// pragma solidity ^0.8.17;

// contract Ludo {
//     struct Ludoboard {
//         uint noOfPlayers;
//         uint noOfPlayersJoined;
//         uint noOfPlayersFinished;
//         uint8 currentPlayerTurn;
//         bool gameStarted;
        
//     };

//     uint boardCount;
//     uint gameNonce;

//     struct Player {
//         uint color;
//         uint position;
//         bool isCurrentPlayer;
//         bool isWinner;
//     }

//     mapping(address => Player) public players;
//     mapping(uint => Ludoboard) public boards;


//     function createGame() public {
//         uint boardId = boardCount++;
//         boards[boardId] = Ludoboard(4, 0, 0, 0, false);
//     }

//     function startGame() public {
//         Ludoboard storage board = boards[boardId];
//         require(board.noOfPlayersJoined == board.noOfPlayers, "Need more players to start");
//         board.gameStarted = true;
        
//     }


//     function joinGame(uint boardId) public {
//         Ludoboard storage board = boards[boardId];
//         board.noOfPlayersJoined++;
//     }

//     function rollDice(uint boardId) public {
//         uint randomNumber = uint256(keccak256(abi.encodePacked(
//             msg.sender,
//             gameNonce, 
//             boardId
//         )));
        
//         uint diceNumber =  uint8((randomNumber % 6) + 1);
//         gameNonce++;
        
//     }

//     function movePlayer(unit boardId, uint DiceNumber) public {


//     }


// }