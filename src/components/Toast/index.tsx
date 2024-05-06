import { Toast, ToastDescription, VStack, ToastTitle } from '@gluestack-ui/themed';
import React from 'react';

export const ToastVfx = ({ title, message }: { title: string, message: string}) => {

    return (
        <Toast action="attention" variant="solid">
        <VStack space="xs">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>
           {message}
          </ToastDescription>
        </VStack>
      </Toast>
    );
};
