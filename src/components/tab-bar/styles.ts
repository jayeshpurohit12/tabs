import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  tabBar: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
  },
  component: {
    width: '19%',
    height: 60,
    left: -10,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 15,
    alignItems: 'center',
    width: '90%',
    paddingTop: 10,
  },
  bottomTabLineContainer: {
    borderBottomWidth: 1.8,
    width: width,
    bottom: 0.1,
    position: 'absolute',
    borderBottomColor: '#40C1AC',
    backgroundColor: '#40C1AC',
  },
  routeName: {
    textAlign: 'center',
    fontSize: 12,
  },
});
