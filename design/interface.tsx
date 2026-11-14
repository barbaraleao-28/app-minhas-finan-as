import { Pressable, StyleSheet, Text, View } from 'react-native';
import { categorias } from '../src/gastos';

export const colors = {
  paper: '#F7F6F0', ink: '#123D42', muted: '#48656A', line: '#CDDAD6',
  cyan: '#A1EBE9', pale: '#DEF6F4', coral: '#B63E23', white: '#FFFFFF',
};
export const money = (value: number) => value.toLocaleString('pt-BR', {
  style: 'currency', currency: 'BRL',
});
export const categoryName = (value?: string) =>
  value === 'Eletronicos' ? 'Eletrônicos' : value || 'Sem categoria';

export function Action({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}
      style={({ pressed }) => [ui.action, pressed && { opacity: 0.8 }]}>
      <Text style={ui.actionText}>{title}</Text>
    </Pressable>
  );
}

export function Categories({ selected, choose }: { selected?: string; choose: (value: string) => void }) {
  return (
    <View style={ui.chips}>
      {categorias.map(value => (
        <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: selected === value }}
          onPress={() => choose(value)} style={[ui.chip, selected === value && ui.selected]}>
          <Text style={ui.chipText}>{selected === value ? '✓  ' : ''}{categoryName(value)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export const ui = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.paper },
  column: { width: '100%', maxWidth: 630, alignSelf: 'center', padding: 20, paddingBottom: 40, gap: 14 },
  title: { color: colors.ink, fontSize: 34, fontWeight: '800', letterSpacing: -1.4 },
  section: { color: colors.ink, fontSize: 21, fontWeight: '700', letterSpacing: -0.6 },
  label: { color: colors.ink, fontSize: 16, fontWeight: '600' },
  detail: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  panel: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 18, padding: 18, gap: 10 },
  action: { backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', borderRadius: 14, minHeight: 52, padding: 10 },
  actionText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 44, justifyContent: 'center', borderRadius: 22, backgroundColor: colors.pale, paddingHorizontal: 14, borderWidth: 1, borderColor: colors.line },
  selected: { backgroundColor: colors.cyan, borderColor: colors.ink },
  chipText: { color: colors.ink, fontSize: 14, fontWeight: '600' },
  link: { color: colors.ink, fontWeight: '700', fontSize: 14 },
  tap: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 4 },
});
