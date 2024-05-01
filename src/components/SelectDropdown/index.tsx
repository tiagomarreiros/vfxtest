import React from 'react';
import { Select, SelectTrigger, SelectInput, SelectIcon, Icon, ChevronDownIcon, SelectPortal, SelectBackdrop,
    SelectContent, SelectItem, SelectDragIndicatorWrapper,  SelectDragIndicator} from '@gluestack-ui/themed';


export const SelectDropdown = ({options, placeholder, value, handleSelect}:
    {options: {label: string, value: string}[], placeholder: string, value?: string, handleSelect: (value: string) => void}) => {
    return <Select onValueChange={handleSelect} selectedValue={value}>
      <SelectTrigger variant="rounded" >
        <SelectInput placeholder={placeholder}/>
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop/>
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {
            options.map( (option, index) =>
                <SelectItem
                    key={index}
                    label={option.label}
                    value={option.value}
                />
            )
          }
        </SelectContent>
      </SelectPortal>
    </Select>;

};
