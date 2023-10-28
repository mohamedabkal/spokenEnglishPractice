import { Box } from "@gluestack-ui/themed";
import { useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import GLOBAL from "../../const/global";
import { clearAlert } from "../../store/alert";

const AlertItem = ({data, onFinish}) => {
  
  const [animation] = useState(new Animated.Value(0));
  const background = useMemo(() => GLOBAL.ALERT[data.type]['background'], [data])
  const foreground = useMemo(() => GLOBAL.ALERT[data.type]['foreground'], [data])
  const color = useMemo(() => GLOBAL.ALERT[data.type]['color'], [data])
  const icon = useMemo(() => GLOBAL.ALERT[data.type]['icon'], [data])
  
  useState(() => {
    Animated.sequence([
      Animated.timing(
        animation,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }
      ),
      Animated.delay(data.time*1000),
      Animated.timing(
        animation,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }
      ),
    ]).start(({finished}) => {
      if(finished) {
        onFinish()
      }
    })
  });
  
  return (
    <Animated.View style={{...alertItemStyles.container, backgroundColor: background, opacity: animation}}>
      <Icon style={{margin: 15}} name={icon} size={36} color={color} />
      <Box style={{flex: 1}}>
        <Text style={{...alertItemStyles.title, color: foreground}}>{data.title}</Text>
        <Text style={{...alertItemStyles.message, color: color}}>{data.message}</Text>
      </Box>
    </Animated.View>
  )
}

const alertItemStyles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: '#5CB35Ecc',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6
  },
  message: {
  },
  progress: {
  }
})

export default () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.alert.data);
  const [data, setData] = useState([])
  useEffect(() => {
    if(store.length == 0)
      return;
    setData(prevData => [...prevData, ...store])
    dispatch(clearAlert());
  }, [store])

  const onAlertExit = (alert) => {
    setData(prevData => prevData.filter((item) => {
      return alert.uid != item.uid
    }));
  }

  return (
    <Box style={styles.container}>
      {
        data.map((alert, index) => {
          return <AlertItem data={alert} key={`alert_item_${alert.uid}`} onFinish={() => onAlertExit(alert)} />
        })
      }
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    zIndex: 999
  },
})