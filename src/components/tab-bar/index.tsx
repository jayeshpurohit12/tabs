import React, {useEffect, useReducer, useRef} from 'react';
import {Pressable, View, Text, LayoutChangeEvent} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {styles} from './styles';
import Profile from '../Profile';
import Diary from '../Diary';
import Health from '../Health';
import Meal from '../Meal';
import Notes from '../Notes';

const Tab = createMaterialTopTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const TabBar = () => {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator tabBar={props => <AnimatedTabBar {...props} />}>
            <Tab.Screen component={Profile} name="Profile" />
            <Tab.Screen component={Diary} name="Diary" />
            <Tab.Screen component={Health} name="Health" />
            <Tab.Screen component={Meal} name="Meal" />
            <Tab.Screen component={Notes} name="Notes" />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

const AnimatedTabBar = ({state: {index: activeIndex, routes}, navigation}) => {
  const {bottom} = useSafeAreaInsets();

  const reducer = (state: any, action: {x: number; index: number}) => {
    return [...state, {x: action.x, index: action.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({index}) => index === activeIndex)!.x;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
    };
  });

  return (
    <View style={[styles.tabBar, {paddingBottom: bottom}]}>
      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          return (
            <TabBarComponent
              key={route.key}
              active={active}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
              routeName={route.name}
            />
          );
        })}
        <View style={styles.bottomTabLineContainer} />
      </View>

      <AnimatedSvg
        width={100}
        height={63}
        viewBox="0 0 100 59"
        style={[styles.activeBackground, animatedStyles]}>
        <Path
          fill="#40C1AC"
          d="M100 58s-11.165.048-16.415-27.228c-1.725-8.958-3.426-15.466-5.299-19.978C75.427 3.9 70.777 0 65.922 0H34.078c-4.863 0-9.505 3.899-12.364 10.794-1.873 4.512-3.574 11.02-5.3 19.978C11.166 58.048 0 58 0 58"
        />
        <Path
          fill="#40C1AC"
          d="M100 58s-11.165.033-16.415-18.564c-1.725-6.108-3.426-10.546-5.299-13.622-2.859-4.701-7.509-7.36-12.364-7.36H34.078c-4.863 0-9.505 2.659-12.364 7.36-1.873 3.076-3.574 7.514-5.3 13.622C11.166 58.033 0 58 0 58"
        />
        <Path
          fill="#F0F8F6"
          d="M98 58s-8.5 3.955-15.791-25.99c-1.66-8.55-3.296-14.764-5.098-19.07-2.75-6.582-7.223-10.304-11.894-10.304H34.583c-4.679 0-9.144 3.722-11.894 10.304-1.802 4.306-3.232 10.593-5.098 19.07C11 61.955 1.8 58 1.8 58"
        />
      </AnimatedSvg>
    </View>
  );
};

type TabBarComponentProps = {
  active?: boolean;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
  routeName: string;
};

const TabBarComponent = ({
  active,
  onLayout,
  onPress,
  routeName,
}: TabBarComponentProps) => {
  const ref = useRef(null);

  const showTabBarIcon = () => {
    switch (routeName) {
      case 'Profile':
        return (
          <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={40}
            fill={active ? '#40C1AC' : 'grey'}>
            <Path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
          </Svg>
        );
      case 'Diary':
        return (
          <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={40}
            fill={active ? '#40C1AC' : 'grey'}>
            <Path d="M480-60q-78-69-170.5-106T120-203v-429q94 0 186.5 43T480-469q81-77 173.5-120T840-632v429q-97 0-189.5 37T480-60Zm0-77q71-51 146.5-81.5T780-257v-310q-68 11-143.5 54.5T480-392q-88-81-160-123t-140-52v310q78 8 153.5 38.5T480-137Zm3-475q-65 0-109.5-44.5T329-766q0-65 44.5-109.5T483-920q65 0 109.5 44.5T637-766q0 65-44.5 109.5T483-612Zm.159-60Q522-672 549.5-699.659q27.5-27.66 27.5-66.5Q577-805 549.341-832.5q-27.66-27.5-66.5-27.5Q444-860 416.5-832.341q-27.5 27.66-27.5 66.5Q389-727 416.659-699.5q27.66 27.5 66.5 27.5ZM482-768Zm-2 416Z" />
          </Svg>
        );
      case 'Health':
        return (
          <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={40}
            fill={active ? '#40C1AC' : 'grey'}>
            <Path d="M440-360h80v-100h100v-80H520v-100h-80v100H340v80h100v100Zm40 279q-140-35-230-162.5T160-523v-238l320-120 320 120v238q0 152-90 279.5T480-81Zm0-62q115-38 187.5-143.5T740-523v-196l-260-98-260 98v196q0 131 72.5 236.5T480-143Zm0-337Z" />
          </Svg>
        );
      case 'Meal':
        return (
          <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={40}
            fill={active ? '#40C1AC' : 'grey'}>
            <Path d="m165-120-42-42 420-420q-22-48-10-99.5t57-96.5q45-44 109-56.5T804-806q42 42 28.5 105T772-590q-41 42-91.5 55t-94.5-6l-67 67 312 312-42 42-312-312-312 312Zm125-351L171-590q-51-51-53-121t46-124l245 245-119 119Z" />
          </Svg>
        );
      default:
        return (
          <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={40}
            fill={active ? '#40C1AC' : 'grey'}>
            <Path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
          </Svg>
        );
    }
  };

  useEffect(() => {
    if (active && ref?.current) {
      ref.current.play();
    }
  }, [active]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
    };
  });

  const tabBarIcon = showTabBarIcon();

  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      style={[styles.component, active && {zIndex: 1}]}>
      <Animated.View style={[animatedComponentCircleStyles]} />
      {!active && (
        <Svg width={100} height={59} viewBox="0 0 100 59">
          <Path
            fill="#F0F8F6"
            d="M100 58s-11.165.048-16.415-27.228c-1.725-8.958-3.426-15.466-5.299-19.978C75.427 3.9 70.777 0 65.922 0H34.078c-4.863 0-9.505 3.899-12.364 10.794-1.873 4.512-3.574 11.02-5.3 19.978C11.166 58.048 0 58 0 58"
          />
        </Svg>
      )}

      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}>
        {tabBarIcon}
        <Text
          style={[
            styles.routeName,
            {
              color: active ? '#40C1AC' : 'grey',
            },
          ]}>
          {routeName}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default TabBar;
