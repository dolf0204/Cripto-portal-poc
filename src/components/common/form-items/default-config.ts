interface QInputStyle {
    outlined?: boolean;
    dense?: boolean;
    disable?: boolean;
    readonly?: boolean;
    useInput?: boolean;
    hideSelected?: boolean;
    clearable?: boolean;
    required?: boolean;
    label?: string | undefined;
}

const defaultStyle: QInputStyle = {
    outlined: true,
    dense: true,
    clearable: false,
    disable: false,
    useInput: false,
    hideSelected: false,
    readonly: false,
    label: undefined, // Qinput expect undefined
};

export {
    QInputStyle,
    defaultStyle,
};
