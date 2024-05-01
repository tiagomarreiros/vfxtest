import { Spinner } from '@gluestack-ui/themed';
import React from 'react';


export const SpinnerVfx = ({size}: {size: 'small' | 'large'}) => {
    return <Spinner size={size} />;

};
