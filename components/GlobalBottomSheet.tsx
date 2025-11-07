import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { InteractionManager } from "react-native";

export const GlobalBottomSheet = () => {
  const {
    // general sheet
    isOpen,
    content,
    snapPoints = ["40%", "90%"],
    closeSheet,

    // audio sheet
    isAudioOpen,
    audioSnapPoints = ["40%"],
    audioContent,
    closeAudioSheet,

    //calender sheet
    isCalenderOpen,
    calenderSnapPoints = ["40%"],
    calenderContent,
    closeCalenderSheet,

    //time sheet
    isTimeOpen,
    timeSnapPoints = ["40%"],
    timeContent,
    closeTimeSheet,

    //comment sheet
    isCommentOpen,
    commentSnapPoints = ["40%"],
    commentContent,
    closeCommentSheet,
  } = useBottomSheetStore();

  const ref = useRef<BottomSheetModal>(null);
  const audioRef = useRef<BottomSheetModal>(null);
  const calenderRef = useRef<BottomSheetModal>(null);
  const timeRef = useRef<BottomSheetModal>(null);
  const commentRef = useRef<BottomSheetModal>(null);

  const [modalKey, setModalKey] = useState(0);
  const [audioModalKey, setAudioModalKey] = useState(0);
  const [calenderModalKey, setCalenderModalKey] = useState(0);
  const [timeModalKey, setTimeModalKey] = useState(0);
  const [commentModalKey, setCommentModalKey] = useState(0);

  const [shouldOpen, setShouldOpen] = useState(false);
  const [shouldOpenAudio, setShouldOpenAudio] = useState(false);
  const [shouldOpenCalender, setShouldOpenCalender] = useState(false);
  const [shouldOpenTime, setShouldOpenTime] = useState(false);
  const [shouldOpenComment, setShouldOpenComment] = useState(false);

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

  // Handle calender sheet
  useEffect(() => {
    if (isCalenderOpen) {
      setCalenderModalKey((prev) => prev + 1);
      setShouldOpenCalender(true);
    } else if (calenderRef.current) {
      calenderRef.current.dismiss();
    }
  }, [isCalenderOpen]);

  useEffect(() => {
    if (shouldOpenCalender) {
      InteractionManager.runAfterInteractions(() => {
        calenderRef.current?.present();
        setShouldOpenCalender(false);
      });
    }
  }, [calenderModalKey, shouldOpenCalender]);

  // Handle time sheet
  useEffect(() => {
    if (isTimeOpen) {
      setTimeModalKey((prev) => prev + 1);
      setShouldOpenTime(true);
    } else if (timeRef.current) {
      timeRef.current.dismiss();
    }
  }, [isTimeOpen]);

  useEffect(() => {
    if (shouldOpenTime) {
      InteractionManager.runAfterInteractions(() => {
        timeRef.current?.present();
        setShouldOpenTime(false);
      });
    }
  }, [timeModalKey, shouldOpenTime]);

  // Handle comment sheet
  useEffect(() => {
    if (isCommentOpen) {
      setCommentModalKey((prev) => prev + 1);
      setShouldOpenComment(true);
    } else if (commentRef.current) {
      commentRef.current.dismiss();
    }
  }, [isCommentOpen]);

  useEffect(() => {
    if (shouldOpenComment) {
      InteractionManager.runAfterInteractions(() => {
        commentRef.current?.present();
        setShouldOpenComment(false);
      });
    }
  }, [commentModalKey, shouldOpenComment]);

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

      {/* calender sheet */}
      <BottomSheetModal
        key={`calander-${modalKey}`}
        ref={calenderRef}
        index={0}
        enableDynamicSizing={false}
        snapPoints={calenderSnapPoints}
        onDismiss={closeCalenderSheet}
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
        {calenderContent}
      </BottomSheetModal>

      {/* time sheet */}
      <BottomSheetModal
        key={`time-${modalKey}`}
        ref={timeRef}
        index={0}
        enableDynamicSizing={false}
        snapPoints={timeSnapPoints}
        onDismiss={closeTimeSheet}
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
        {timeContent}
      </BottomSheetModal>

      {/* comment sheet */}
      <BottomSheetModal
        key={`comment-${modalKey}`}
        ref={commentRef}
        index={0}
        enableDynamicSizing={false}
        snapPoints={commentSnapPoints}
        onDismiss={closeCommentSheet}
        backgroundStyle={{ backgroundColor: "white" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
          />
        )}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        {commentContent}
      </BottomSheetModal>
    </>
  );
};
