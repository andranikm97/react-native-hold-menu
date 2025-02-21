import React, { useEffect } from 'react';

import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import MenuList from './MenuList';

import styles from './styles';
import { useInternal } from '../../hooks';
import {
  HOLD_ITEM_TRANSFORM_DURATION,
  CONTEXT_MENU_STATE,
  SPRING_CONFIGURATION,
} from '../../constants';
import { BackHandler } from 'react-native';
import { HoldMenuProviderProps } from '../provider/types';

const MenuComponent = ({
  menuListStyle,
  useFontScale,
  menuRowHeight,
}: {
  menuListStyle?: HoldMenuProviderProps['menuListStyle'];
  useFontScale?: HoldMenuProviderProps['useFontScale'];
  menuRowHeight?: HoldMenuProviderProps['menuRowHeight'];
}) => {
  const { state, menuProps } = useInternal();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        if (state.value === CONTEXT_MENU_STATE.ACTIVE) {
          state.value = CONTEXT_MENU_STATE.END;
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [state]);

  const wrapperStyles = useAnimatedStyle(() => {
    const anchorPositionVertical = menuProps.value.anchorPosition.split('-')[0];

    const top =
      anchorPositionVertical === 'top'
        ? menuProps.value.itemHeight + menuProps.value.itemY + 8
        : menuProps.value.itemY - 8;
    const left = menuProps.value.itemX;
    const width = menuProps.value.itemWidth;
    const tY = menuProps.value.transformValue;

    return {
      top,
      left,
      width,
      zIndex: state.value === CONTEXT_MENU_STATE.ACTIVE ? 999 : -1,
      transform: [
        {
          translateY:
            state.value === CONTEXT_MENU_STATE.ACTIVE
              ? withSpring(tY, SPRING_CONFIGURATION)
              : withTiming(0, { duration: HOLD_ITEM_TRANSFORM_DURATION }),
        },
      ],
    };
  }, [menuProps]);

  return (
    <Animated.View style={[styles.menuWrapper, wrapperStyles]}>
      <MenuList
        menuRowHeight={menuRowHeight}
        useFontScale={useFontScale}
        menuListStyle={menuListStyle}
      />
    </Animated.View>
  );
};

const Menu = React.memo(MenuComponent);

export default Menu;
