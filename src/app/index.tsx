import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

import {Button, FlatList} from 'react-native';
import {router} from 'expo-router';
import {categorias, useGastos} from '../gastos';
import {useState} from 'react';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const {gastos, excluirGasto, editarCategoria} = useGastos();
  const [idEmEdicao, setIdEmEdicao] = useState<string|null>(null);
  const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0);
  
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Minhas Finanças
          </ThemedText>
          <ThemedText>
            Total Gasto= R$ {total.toFixed (2).replace('.', ',')}
          </ThemedText>
          <Button
            title= "Adicionar gasto"
            onPress={() => {
              console.log ('Abrindo /novo-gasto');
              router.push ('/novo-gasto');
            }
            }
          />
        </ThemedView>

        <FlatList
        data={gastos}
        keyExtractor={(item) =>item.id}
        renderItem={({item}) => (
          <ThemedView >
            <ThemedText style={item.valor > 100 ? { color: '#FF5733' } : undefined}>
              {item.descricao} - R$ {item.valor.toFixed(2).replace('.', ',')}
            </ThemedText>
            <ThemedText> Categoria: {item.categoria ?? 'Sem Categoria'}</ThemedText>
            <Button title = {idEmEdicao === item.id ? 'Cancelar': 'Editar categoria'} onPress = {() => setIdEmEdicao(idEmEdicao === item.id ? null: item.id)}/>
              {idEmEdicao === item.id && categorias.map(opcao =>(
                <Button key={opcao} title = {opcao} onPress={()=>{
                  editarCategoria(item.id, opcao);
                  setIdEmEdicao(null);
                }}/>
              ))}
            <Button title = 'Excluir' onPress={() => excluirGasto(item.id)}/>
          </ThemedView>

        )}
        />



        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
