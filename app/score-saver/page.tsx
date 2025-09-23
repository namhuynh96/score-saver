"use client";

import { Button, FloatButton, Input, Modal, Radio } from "antd";
import { useState } from "react";

const PLAYERS_KEY = "players";

interface Player {
  name: string;
  score: number;
  isPlaying: boolean;
}

function ScoreSaver() {
  const PLAYERS: Player[] = JSON.parse(
    localStorage.getItem(PLAYERS_KEY) || "[]"
  );
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
            description="ADD"
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
            <p className="text-gray-500 mb-6">
              Click "Add Players" to get started!
            </p>
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

interface AddPlayerModalProps {
  open: boolean;
  onCancel: () => void;
  players: { name: string; isPlaying: boolean }[];
  onSetPlayers: (value: { name: string; isPlaying: boolean }[]) => void;
}

function AddPlayerModal({
  open,
  onCancel,
  onSetPlayers,
  players: initialPlayers,
}: AddPlayerModalProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(
    initialPlayers
      .filter((player) => player.isPlaying)
      .map((player) => player.name)
  );
  const [players, setPlayers] = useState(initialPlayers);
  const [playerInput, setPlayerInput] = useState("");

  const handleSelectPlayer = (player: string) => {
    const updatedList = selectedPlayers.includes(player)
      ? selectedPlayers.filter((p) => p !== player)
      : [...selectedPlayers, player];
    setSelectedPlayers(updatedList);
  };

  const handleAddPlayer = () => {
    if (playerInput.trim() === "") return;
    const newPlayer = { name: playerInput, isPlaying: false };
    setPlayers([...players, newPlayer]);
    setPlayerInput("");
    // localStorage.setItem(
    //   PLAYERS_KEY,
    //   JSON.stringify([...initialPlayers, newPlayer])
    // );
  };

  const handleAddPlayersToTheGame = () => {
    const updatedPlayers = players.map((p) => ({
      ...p,
      isPlaying: selectedPlayers.includes(p.name),
    }));
    // localStorage.setItem(PLAYERS_KEY, JSON.stringify(updatedPlayers));
    onSetPlayers(updatedPlayers);
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={"Select players to add to the game"}
      footer={null}
    >
      <div className="space-y-6">
        <div>
          <div className="grid grid-cols-2 gap-3">
            {players.map((player) => (
              <div
                key={player.name}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPlayers.includes(player.name)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleSelectPlayer(player.name)}
              >
                <Radio
                  checked={selectedPlayers.includes(player.name)}
                  className="w-full"
                >
                  <span className="ml-2 font-medium">{player.name}</span>
                </Radio>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Custom Player
          </label>
          <div className="flex gap-2 items-stretch">
            <Input
              placeholder="Enter player name"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
            />
            <Button onClick={handleAddPlayer}>Add</Button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button onClick={onCancel} size="large" className="px-6">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleAddPlayersToTheGame}
            size="large"
            className="px-6 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
            disabled={selectedPlayers.length === 0}
          >
            Add{" "}
            {selectedPlayers.length > 0
              ? `${selectedPlayers.length} Player${
                  selectedPlayers.length !== 1 ? "s" : ""
                }`
              : "Players"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ScoreSaver;
