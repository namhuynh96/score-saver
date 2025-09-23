import { Button, FloatButton, Input, Modal, Radio } from "antd";
import { useState } from "react";
import { AddPlayerModal } from "./AddPlayerModal";

const PLAYERS_KEY = "players";
const PLAYERS: Player[] = JSON.parse(localStorage.getItem(PLAYERS_KEY) || "[]");

interface Player {
  name: string;
  score: number;
  isPlaying: boolean;
}

export default function ScoreSaver() {
  const [players, setPlayers] = useState<Player[]>(PLAYERS);
  const [openModal, setOpenModal] = useState(false);

  const playersPlaying = players.filter((player) => player.isPlaying);

  const handleClickAddScore = (player: Player) => {
    const updatedPlayers = players.map((p) =>
      p.name === player.name ? { ...p, score: p.score + 10 } : p
    );
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(updatedPlayers));
    setPlayers(updatedPlayers);
  };

  const handleClickSubtractScore = (player: Player) => {
    const updatedPlayers = players.map((p) =>
      p.name === player.name ? { ...p, score: p.score - 10 } : p
    );
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(updatedPlayers));
    setPlayers(updatedPlayers);
  };

  const handleSetPlayers = (value: Player[]) => {
    setPlayers(value);
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏆 Score Saver
          </h1>
          <FloatButton
            description="Add"
            shape="square"
            onClick={() => setOpenModal(true)}
            type="primary"
            className="w-24"
          />
        </div>

        {playersPlaying.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playersPlaying.map((player) => (
              <div
                key={player.name}
                className="player-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {player.name}
                  </h3>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2 score-update">
                      {player.score}
                    </div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>

                  <div className="flex justify-center space-x-3">
                    <Button
                      type="primary"
                      shape="circle"
                      size="large"
                      onClick={() => handleClickSubtractScore(player)}
                      className="bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 flex items-center justify-center"
                    >
                      <span className="text-xl font-bold">-</span>
                    </Button>
                    <Button
                      type="primary"
                      shape="circle"
                      size="large"
                      onClick={() => handleClickAddScore(player)}
                      className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 flex items-center justify-center"
                    >
                      <span className="text-xl font-bold">+</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No players added yet
            </h3>
            <p className="text-gray-500 mb-6">Click "Add" to get started!</p>
          </div>
        )}

        <AddPlayerModal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          players={players}
          onSetPlayers={(value) => {
            const transform = value.map((p) => ({
              ...p,
              score: players.find((pl) => p.name === pl.name)?.score || 0,
            }));
            handleSetPlayers(transform);
          }}
        />
      </div>
    </div>
  );
}
