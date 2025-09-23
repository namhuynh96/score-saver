import { Modal, Radio, Input, Button } from "antd";
import { useState } from "react";

interface AddPlayerModalProps {
  open: boolean;
  onCancel: () => void;
  players: { name: string; isPlaying: boolean }[];
  onSetPlayers: (value: { name: string; isPlaying: boolean }[]) => void;
}

export function AddPlayerModal({
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
  const [error, setError] = useState("");

  const handleSelectPlayer = (player: string) => {
    const updatedList = selectedPlayers.includes(player)
      ? selectedPlayers.filter((p) => p !== player)
      : [...selectedPlayers, player];
    setSelectedPlayers(updatedList);
  };

  const handleAddPlayer = () => {
    const playerName = playerInput.trim();
    if (playerName === "") return;
    if (players.some((p) => p.name === playerName)) {
      setError("Player already exists");
      return;
    }
    const newPlayer = { name: playerName, isPlaying: false };
    setPlayers([...players, newPlayer]);
    setPlayerInput("");
    setError("");
  };

  const handleAddPlayersToTheGame = () => {
    const updatedPlayers = players.map((p) => ({
      ...p,
      isPlaying: selectedPlayers.includes(p.name),
    }));
    onSetPlayers(updatedPlayers);
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={"Select players to add to the game"}
      footer={[
        <Button onClick={onCancel} size="large" className="px-6">
          Cancel
        </Button>,
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
        </Button>,
      ]}
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
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </Modal>
  );
}
