import { StyleProp, TextStyle } from 'react-native';
import { TransformOriginAnchorPosition } from '../../utils/calculations';

export type MenuItemProps = {
  key: string;
  text: string;
  textProps?: StyleProp<TextStyle>;
  icon?: () => JSX.Element;
  onPress?: (...args: any[]) => void;
  isTitle?: boolean;
  isDestructive?: boolean;
  withSeparator?: boolean;
};

export type MenuListProps = {
  items: MenuItemProps[];
};

export type MenuInternalProps = {
  items: MenuItemProps[];
  itemHeight: number;
  itemWidth: number;
  itemY: number;
  itemX: number;
  anchorPosition: TransformOriginAnchorPosition;
  menuHeight: number;
  transformValue: number;
  actionParams: {
    [name: string]: (string | number)[];
  };
};
