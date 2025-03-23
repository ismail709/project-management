import { DarkModeContext } from '@/components/providers/DarkModeProvider';
import { useContext, useEffect, useMemo, useState } from 'react';

function useDarkMode() {
    return useContext(DarkModeContext);
}

export default useDarkMode;
