import { Box, Text } from "@gluestack-ui/themed";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

export default () => {
  const loading = useSelector(state => state.global.loading)

  if(!loading.flag)
    return null;

  return (
    <Box style={styles.container}>
      <Box style={styles.inner}>
        <ActivityIndicator size='120' color="#075E45" />
        <Text style={styles.text}>{loading.message}</Text>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C7FBD144',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 999
  },
  text: {
    marginTop: 10,
    color: "#075E45"
  },
  inner: {
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})