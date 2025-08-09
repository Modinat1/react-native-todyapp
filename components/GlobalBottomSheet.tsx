import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { InteractionManager } from "react-native";

export const GlobalBottomSheet = () => {
  const {
    isOpen,
    content,
    snapPoints = ["40%", "90%"],
    closeSheet,
  } = useBottomSheetStore();

  const ref = useRef<BottomSheetModal>(null);
  const [modalKey, setModalKey] = useState(0);
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Force re-mount
      setModalKey((prev) => prev + 1);
      setShouldOpen(true);
    } else {
      if (ref.current) {
        ref.current.dismiss();
      }
    }
  }, [isOpen]);

  // Call present after remount is done
  useEffect(() => {
    if (shouldOpen) {
      InteractionManager.runAfterInteractions(() => {
        if (ref.current) {
          ref.current.present();
          setShouldOpen(false);
        }
      });
    }
  }, [modalKey, shouldOpen]);

  return (
    <BottomSheetModal
      key={modalKey}
      ref={ref}
      index={0}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      onDismiss={closeSheet}
      backgroundStyle={{
        backgroundColor: "white",
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
        />
      )}
    >
      {content}
    </BottomSheetModal>
  );
};
