import React from 'react';
import { Input, InputField } from '@gluestack-ui/themed';


export const InputText = ({ text, handleText }: { text: string, handleText: (args: string) => void }) => {

    return <Input
        variant="rounded"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}

    >
        <InputField onChangeText={handleText} value={text}
        />
    </Input>;
};
