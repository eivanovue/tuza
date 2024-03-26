import { createContext, Context } from 'react';
import { LineContextType } from '../../types';

const LineContext: Context<LineContextType> = createContext<LineContextType>({});

export default LineContext;