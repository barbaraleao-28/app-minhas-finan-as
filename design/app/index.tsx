import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGastos } from '../../src/gastos';
import { Action, Categories, categoryName, colors, money, ui } from '../interface';

export default function Inicio() {
  const { gastos, editarCategoria, excluirGasto } = useGastos();
  const [editing, setEditing] = useState<string | null>(null);
  const total = gastos.reduce((sum, item) => sum + item.valor, 0);
  return (
    <SafeAreaView style={ui.page}>
      <FlatList data={gastos} keyExtractor={item => item.id} contentContainerStyle={ui.column}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text accessibilityRole="header" style={ui.title}>Minhas finanças</Text>
            <View style={styles.balance}>
              <View pointerEvents="none" style={styles.arc} />
              <View pointerEvents="none" style={[styles.arc, styles.innerArc]} />
              <Text style={styles.balanceLabel}>Total gasto</Text>
              <Text style={styles.amount}>{money(total)}</Text>
              <Text style={styles.count}>{gastos.length} {gastos.length === 1 ? 'lançamento' : 'lançamentos'}</Text>
            </View>
            <Action title="＋  Adicionar gasto" onPress={() => router.push('/novo-gasto')} />
            <Text accessibilityRole="header" style={[ui.section, styles.listTitle]}>Lançamentos</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={ui.panel}>
            <Text style={ui.label}>Nenhum gasto por aqui</Text>
            <Text style={ui.detail}>Toque em “Adicionar gasto” para registrar seu primeiro lançamento.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={ui.panel}>
            <View style={styles.itemTop}>
              <Text style={styles.description}>{item.descricao}</Text>
              <Text style={[styles.price, item.valor > 100 && { color: colors.coral }]}>{money(item.valor)}</Text>
            </View>
            <Text style={styles.badge}>{categoryName(item.categoria)}</Text>
            <View style={styles.row}>
              <Pressable accessibilityRole="button" style={ui.tap}
                onPress={() => setEditing(editing === item.id ? null : item.id)}>
                <Text style={ui.link}>{editing === item.id ? 'Cancelar' : 'Editar categoria'}</Text>
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel={'Excluir ' + item.descricao}
                style={ui.tap} onPress={() => excluirGasto(item.id)}>
                <Text style={[ui.link, { color: colors.coral }]}>Excluir</Text>
              </Pressable>
            </View>
            {editing === item.id && <Categories selected={item.categoria} choose={value => {
              editarCategoria(item.id, value);
              setEditing(null);
            }} />}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { gap: 16 },
  balance: { backgroundColor: colors.ink, borderRadius: 24, padding: 24, overflow: 'hidden', gap: 8 },
  arc: { position: 'absolute', right: -90, top: -85, width: 230, height: 230, borderRadius: 115, borderWidth: 18, borderColor: '#23565B' },
  innerArc: { right: -58, top: -53, width: 166, height: 166, borderRadius: 83, borderColor: '#2E696D' },
  balanceLabel: { color: colors.cyan, fontSize: 15, fontWeight: '600' },
  amount: { color: colors.white, fontSize: 40, fontWeight: '700', letterSpacing: -1.5, fontVariant: ['tabular-nums'] },
  count: { color: '#C4DFDD', marginTop: 8, fontSize: 14 },
  listTitle: { marginTop: 10 },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  description: { color: colors.ink, fontSize: 18, fontWeight: '700', flexShrink: 1 },
  price: { color: colors.ink, fontSize: 17, fontWeight: '700', fontVariant: ['tabular-nums'] },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.pale, color: colors.ink, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth },
});
