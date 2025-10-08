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
    isAudioOpen,
    audioSnapPoints = ["40%"],
    audioContent,
    closeAudioSheet,
  } = useBottomSheetStore();

  const ref = useRef<BottomSheetModal>(null);
  const audioRef = useRef<BottomSheetModal>(null);

  const [modalKey, setModalKey] = useState(0);
  const [audioModalKey, setAudioModalKey] = useState(0);
  const [shouldOpen, setShouldOpen] = useState(false);
  const [shouldOpenAudio, setShouldOpenAudio] = useState(false);

  // Handle normal sheet
  useEffect(() => {
    if (isOpen) {
      setModalKey((prev) => prev + 1);
      setShouldOpen(true);
    } else if (ref.current) {
      ref.current.dismiss();
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldOpen) {
      InteractionManager.runAfterInteractions(() => {
        ref.current?.present();
        setShouldOpen(false);
      });
    }
  }, [modalKey, shouldOpen]);

  // Handle audio sheet
  useEffect(() => {
    if (isAudioOpen) {
      setAudioModalKey((prev) => prev + 1);
      setShouldOpenAudio(true);
    } else if (audioRef.current) {
      audioRef.current.dismiss();
    }
  }, [isAudioOpen]);

  useEffect(() => {
    if (shouldOpenAudio) {
      InteractionManager.runAfterInteractions(() => {
        audioRef.current?.present();
        setShouldOpenAudio(false);
      });
    }
  }, [audioModalKey, shouldOpenAudio]);

  return (
    <>
      {/* Main sheet */}
      <BottomSheetModal
        key={`main-${modalKey}`}
        ref={ref}
        index={0}
        enableDynamicSizing={false}
        snapPoints={snapPoints}
        onDismiss={closeSheet}
        backgroundStyle={{ backgroundColor: "white" }}
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

      {/* Audio sheet */}
      <BottomSheetModal
        key={`audio-${modalKey}`}
        ref={audioRef}
        index={0}
        enableDynamicSizing={false}
        snapPoints={audioSnapPoints}
        onDismiss={closeAudioSheet}
        backgroundStyle={{ backgroundColor: "white" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
          />
        )}
      >
        {audioContent}
      </BottomSheetModal>
    </>
  );
};
