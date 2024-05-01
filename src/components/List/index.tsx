import { VirtualizedList } from '@gluestack-ui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from '../ListItem';
import { useDispatch } from 'react-redux';
import { setTickerSelected } from '../../store/slices/serviceDataSlice';
import { Ticker } from '../../types/Ticker';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type ListProps = {
    dataList: Ticker[]
    navigation: NavigationProp<ParamListBase>
}

export const List = ({ dataList , navigation}: ListProps) => {
    const dispatch = useDispatch();

    function getItemCount(_data: unknown) {
        return dataList.length;
    }
    function getItem(_data: unknown, index: number) {
        return dataList[index];
    }

    const handleSelect = (item: Ticker) => {
        dispatch(setTickerSelected(item));
        navigation.navigate('Monthly Stock Chart');
    };

    return (
        <VirtualizedList
            getItemCount={getItemCount}
            getItem={getItem}
            renderItem={({ item, index }: {item: Ticker, index: number}) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                    <ListItem item={item} key={index} />
                </TouchableOpacity>

                )
            }
        />
    );
};
