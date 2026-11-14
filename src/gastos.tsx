import { createContext,useEffect, useContext, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_GASTOS = 'gastos';

export const categorias = [ 'Alimentação', 'Transporte', 'Lazer', 'Educação', 'Vestimentas', 'Eletronicos', 'Saúde'];


type Gasto = {
  id: string;
  descricao: string;
  valor: number;
  categoria?: string;
};

type DadosDosGastos = {
  gastos: Gasto[];
  adicionarGasto: (descricao: string, valor: number, categoria: string) => void;
  editarCategoria: (id: string, categoria: string) =>void;
  excluirGasto: (id: string) => void;
};

const GastosContext = createContext<DadosDosGastos | null>(null);

export function GastosProvider({ children }: { children: ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
  async function carregarGastos() {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_GASTOS);

      if (dados !== null) {
        setGastos(JSON.parse(dados));
      }

      setCarregado(true);
    } catch (erro) {
      console.error('Erro ao carregar os gastos:', erro);
    }
  }

  carregarGastos();
}, []);
    useEffect(() => {
  if (!carregado) return;

  AsyncStorage.setItem(CHAVE_GASTOS, JSON.stringify(gastos))
    .catch((erro) => {
      console.error('Erro ao salvar os gastos:', erro);
    });
}, [gastos, carregado]);


  function adicionarGasto(descricao: string, valor: number, categoria: string) {
    const novoGasto = { id: Date.now().toString(), descricao, valor, categoria };
    setGastos((listaAtual) => [...listaAtual, novoGasto]);
  }

  function editarCategoria(id: string, categoria: string) {
    setGastos((listaAtual) => listaAtual.map((gasto) => 
    gasto.id === id ? {...gasto, categoria}: gasto));
  }

  function excluirGasto(id: string) {
    setGastos((listaAtual) => listaAtual.filter((gasto) => gasto.id !== id));
  }

  return (
    <GastosContext.Provider value={{ gastos, adicionarGasto, editarCategoria, excluirGasto }}>
      {children}
    </GastosContext.Provider>
  );
}

export function useGastos() {
  const contexto = useContext(GastosContext);
  if (contexto === null) {
    throw new Error('Use GastosProvider ao redor das telas.');
  }
  return contexto;
}