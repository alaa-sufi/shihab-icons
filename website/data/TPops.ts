import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    variant?: 'Line' | 'TwoTone';
};

