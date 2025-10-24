import { Modal } from "react-native";
import TimePicker from "./TimePicker";

interface TimeModalProps {
  openTimeModal: boolean;
  setOpenTimeModal: (openTimeModal: boolean) => void;
  dueTime?: Date;
  setDueTime?: (dueTime: Date) => void;
}

const TimeModal = ({
  openTimeModal,
  setOpenTimeModal,
  dueTime,
  setDueTime,
}: TimeModalProps) => {
  return (
    <Modal
      visible={openTimeModal}
      transparent
      animationType="fade"
      onRequestClose={() => setOpenTimeModal(false)}
    >
      <TimePicker
        openTimeModal={openTimeModal}
        setOpenTimeModal={setOpenTimeModal}
        dueTime={dueTime}
        setDueTime={setDueTime}
      />
    </Modal>
  );
};

export default TimeModal;
