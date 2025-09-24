import { Button, Modal } from "antd";

interface ResetPointsModalProps {
  open: boolean;
  onCancel: () => void;
  onResetPoints: () => void;
}

export function ResetPointsModal({
  open,
  onCancel,
  onResetPoints,
}: ResetPointsModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <div className="text-center">
          <div className="text-2xl mb-2">🔄</div>
          <span className="text-xl font-semibold">Reset Points</span>
        </div>
      }
      footer={[
        <Button key="cancel" onClick={onCancel} size="large" className="px-8">
          Cancel
        </Button>,
        <Button
          key="reset"
          onClick={() => {
            onResetPoints();
            onCancel();
          }}
          type="primary"
          danger
          size="large"
          className="px-8 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600"
        >
          Reset All Points
        </Button>,
      ]}
      width={400}
      className="reset-points-modal"
    >
      <div className="space-y-6 mb-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-3xl">⚠️</div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Are you sure?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            This will reset the points of <strong>all players</strong> to 0.
            <br />
            This action cannot be undone.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span className="text-sm">All scores will be reset to</span>
            <div className="px-3 py-1 bg-white rounded-md border border-gray-300 font-mono font-semibold text-gray-800">
              0
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
