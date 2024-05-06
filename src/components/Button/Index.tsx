import {
    Button,
    ButtonText,
  } from '@gluestack-ui/themed';
import React from 'react';


export const ButtonVfx = ({text, onPress}: {text: string, onPress: () => void}) => {

    return (

        <Button
            size="xs"
            variant="solid"
            action="positive"
            onPress={onPress}
            >
            <ButtonText>{text}</ButtonText>
        </Button>
    );
};
