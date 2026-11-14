import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGastos } from '../../src/gastos';
import { Action, Categories, colors, ui } from '../interface';

export default function NovoGasto() {
  const { adicionarGasto } = useGastos();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('Alimentação');
  const [erro, setErro] = useState('');

  function voltar() {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }

  function salvar() {
    const texto = valor.trim();
    const numero = Number(texto.replace(',', '.'));
    if (!descricao.trim()) return setErro('Digite a descrição do gasto.');
    if (!/^\d+([,.]\d{1,2})?$/.test(texto) || !Number.isFinite(numero))
      return setErro('Digite um valor como 12,50.');
    if (numero <= 0) return setErro('O valor precisa ser maior que zero.');
    adicionarGasto(descricao.trim(), numero, categoria);
    voltar();
  }

  return (
    <SafeAreaView style={ui.page}>
      <KeyboardAvoidingView style={ui.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={ui.column}>
          <Pressable accessibilityRole="button" onPress={voltar} style={ui.tap}>
            <Text style={ui.link}>‹  Voltar</Text>
          </Pressable>
          <Text accessibilityRole="header" style={ui.title}>Novo gasto</Text>
          <View style={[ui.panel, styles.form]}>
            <Text style={ui.label}>Descrição</Text>
            <TextInput accessibilityLabel="Descrição" placeholder="Ex.: Café da manhã" placeholderTextColor={colors.muted}
              value={descricao} onChangeText={setDescricao} style={styles.field} />
            <Text style={ui.label}>Valor</Text>
            <View style={styles.amountField}>
              <Text style={styles.currency}>R$</Text>
              <TextInput accessibilityLabel="Valor em reais" keyboardType="decimal-pad" placeholder="0,00"
                placeholderTextColor={colors.muted} value={valor} onChangeText={setValor} style={styles.amountInput} />
            </View>
            <Text style={ui.label}>Categoria</Text>
            <Categories selected={categoria} choose={setCategoria} />
          </View>
          {!!erro && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{erro}</Text>}
          <Action title="Salvar gasto" onPress={salvar} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 },
  field: { color: colors.ink, fontSize: 17, padding: 13, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 12, marginBottom: 8 },
  amountField: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.paper, borderRadius: 12, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 13, marginBottom: 8 },
  currency: { color: colors.muted, fontSize: 18, fontWeight: '600' },
  amountInput: { flex: 1, fontSize: 22, color: colors.ink, paddingVertical: 12 },
  error: { color: colors.coral, fontSize: 15, fontWeight: '600' },
});
