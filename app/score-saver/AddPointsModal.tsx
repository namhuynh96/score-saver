import { Avatar, Button, InputNumber, Modal } from "antd";
import { useState } from "react";
import { Player } from "./ScoreSaver";
import { mapAvatar } from "./utils/mapAvatar";

interface AddPointsModalProps {
  open: boolean;
  onCancel: () => void;
  players: Player[];
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
  const [displayFinalPoints, setDisplayFinalPoints] = useState(false);

  const updatedTotalPoints = Object.values(points).reduce(
    (sum, val) => sum + (val || 0),
    totalPoints
  );

  const namPlayer = players.find((player) => player.name === "Nam");
  const lynkPlayer = players.find((player) => player.name === "Lynk");

  const handlePointsChange = (player: string, value: number | null) => {
    setPoints((prev) => ({
      ...prev,
      [player]: value || 0,
    }));
  };

  const handleSubmit = () => {
    const playerPoints = players.map((player) => ({
      name: player.name,
      point: points[player.name] || 0,
    }));
    onSetPoints(playerPoints);
  };

  const handleCancel = () => {
    setPoints({});
    setDisplayFinalPoints(false);
    onCancel();
  };

  const handleClickAddPoints = () => {
    handleSubmit();
    setDisplayFinalPoints(true);
  };

  const finalPointsComponent = (
    <div className="space-y-4">
      <div className="space-y-3">
        {players
          .sort((a, b) => b.score - a.score)
          .map((player) => (
            <div
              key={player.name}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                {mapAvatar(player.name) ? (
                  <div>
                    <Avatar src={mapAvatar(player.name)} size={50} />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-medium text-gray-800 text-lg">
                  {player.name}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {player.score}
                </div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center pt-4 border-t border-gray-200">
        <div className="inline-flex items-center px-6 py-3 bg-green-50 rounded-lg border border-green-200">
          <span className="text-green-700 font-semibold">
            {lynkPlayer && lynkPlayer?.score < 0
              ? `🤑 Lynk needs to pay ${Math.abs(lynkPlayer?.score)}.000₫!`
              : namPlayer && namPlayer?.score > 0
              ? `🎉 Congratulations Nam! You win ${namPlayer?.score}.000₫!`
              : "🎉 Happy ending!"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title={
        <div className="text-center">
          <div className="text-2xl mb-2">🎯</div>
          <span className="text-xl font-semibold">Add Points</span>
        </div>
      }
      footer={null}
      width={500}
    >
      <div>
        {displayFinalPoints ? (
          finalPointsComponent
        ) : (
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
                  key={player.name}
                  className="flex items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 "
                >
                  <span className="font-medium text-gray-800">
                    {player.name}
                  </span>
                  <InputNumber
                    placeholder="0"
                    value={points[player.name] || undefined}
                    onChange={(value) => handlePointsChange(player.name, value)}
                    className="w-24"
                    controls={false}
                    style={{ textAlign: "center" }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                key="cancel"
                onClick={handleCancel}
                size="large"
                className="px-6"
              >
                Cancel
              </Button>

              <Button
                key="add"
                type="primary"
                onClick={handleClickAddPoints}
                size="large"
                className="px-6 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
              >
                Add Points
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
