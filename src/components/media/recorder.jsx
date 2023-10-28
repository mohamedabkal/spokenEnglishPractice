import { Box } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const Recorder = ({isRecording}) => {

  const [active, setActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;

    if(!isRecording) {
      clearInterval(interval)
      return;
    }
    if (active) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [active, isRecording]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.marker}></Box>
      <Text style={styles.text}>{formatTime(elapsedTime)}</Text>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#444",
    width: 80,
    height: 22,
    borderRadius: 99,
    display: 'flex',
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },

  marker: {
    backgroundColor: '#c33',
    width: 8,
    height: 8,
    borderRadius: 99
  },

  text: {
    fontSize: 12,
    color: "white",
    textAlign: 'center',
    flex: 1,
  }
})

export default Recorder;