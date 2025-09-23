import { Button, InputNumber, Modal } from "antd";
import { useState } from "react";

interface AddPointsModalProps {
  open: boolean;
  onCancel: () => void;
  players: string[];
  onSetPoints: (players: { name: string; point: number }[]) => void;
  totalPoints: number;
}

export function AddPointsModal({
  open,
  onCancel,
  players,
  onSetPoints,
  totalPoints,
}: AddPointsModalProps) {
  const [points, setPoints] = useState<Record<string, number>>({});

  const handlePointsChange = (player: string, value: number | null) => {
    setPoints((prev) => ({
      ...prev,
      [player]: value || 0,
    }));
  };

  const handleSubmit = () => {
    const playerPoints = players.map((player) => ({
      name: player,
      point: points[player] || 0,
    }));
    onSetPoints(playerPoints);
    setPoints({});
    onCancel();
  };

  const updatedTotalPoints = Object.values(points).reduce(
    (sum, val) => sum + (val || 0),
    totalPoints
  );

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <div className="text-center">
          <div className="text-2xl mb-2">🎯</div>
          <span className="text-xl font-semibold">Add Points</span>
        </div>
      }
      footer={[
        <Button onClick={onCancel} size="large" className="px-6">
          Cancel
        </Button>,
        <Button
          type="primary"
          onClick={handleSubmit}
          size="large"
          className="px-6 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
        >
          Add Points
        </Button>,
      ]}
      width={500}
    >
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Enter points for each player</p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-blue-700 font-medium">
              Total: {updatedTotalPoints} points
            </span>
          </div>
        </div>

        <div className="space-y-4 grid grid-cols-2 gap-4">
          {players.map((player) => (
            <div
              key={player}
              className="flex items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 "
            >
              <span className="font-medium text-gray-800">{player}</span>
              <InputNumber
                placeholder="0"
                value={points[player] || undefined}
                onChange={(value) => handlePointsChange(player, value)}
                className="w-24"
                controls={false}
                style={{ textAlign: "center" }}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
