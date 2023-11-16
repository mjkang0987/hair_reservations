import {ButtonSquare} from '../common/Buttons';
import {ButtonText} from '../common/ButtonText';

interface ReservationType {
    key: string;
    padding: (number | string)[];
    height: string;
    backgroundColor: string;
    transform: string;
    fontSize: string;
    text: string | string[];
    method: Function;
}

export const Reservation = ({
    padding,
    height,
    backgroundColor,
    transform,
    fontSize,
    text,
    method
}: ReservationType) => {
    return (<ButtonSquare padding={padding}
                          height={height}
                          backgroundColor={backgroundColor}
                          transform={transform}
                          onClick={method()}>
        {!Array.isArray(text) && <ButtonText a11y={false}
                                                 fontSize={fontSize}>{text}</ButtonText>}
        {Array.isArray(text) && text.map((t) => <ButtonText key={t}
                                                            a11y={false}
                                                            fontSize={fontSize}>{t}</ButtonText>)}
    </ButtonSquare>);
};