import * as React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ImageSourcePropType} from 'react-native';

export type Router = {
  name: string; // 跳转路径, 必须唯一
  title: string; //头部展示标题
  component: React.ComponentType<any>; //Screen
  headerShown?: boolean; //是否显示头部, 默认为true
  icon?: ImageSourcePropType; //Icon, tab时生效
  selectIcon?: ImageSourcePropType; //选中icon，tab时生效
};

/**
 * 对Prop进行封装
 */
export type Props = NativeStackScreenProps<any>;

export type GenericValue = string | object | number | boolean | undefined | null;

export interface IDataObject {
  [key: string]: GenericValue | IDataObject | GenericValue[] | IDataObject[];
}
