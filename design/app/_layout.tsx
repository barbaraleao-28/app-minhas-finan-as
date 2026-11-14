import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GastosProvider } from '../../src/gastos';
import { colors } from '../interface';

export default function Layout() {
  return (
    <GastosProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }} />
    </GastosProvider>
  );
}
