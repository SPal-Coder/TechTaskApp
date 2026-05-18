import {useColorScheme} from 'react-native'
import {DarkTheme,LightTheme} from './colors'

export const useAppTheme =()=>{
    const scheme = useColorScheme();
    return scheme ==='dark' ? DarkTheme : LightTheme
}