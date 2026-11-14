import {View, Text, TextInput, Button, Pressable} from 'react-native';
import {router} from 'expo-router';
import {categorias, useGastos} from '../gastos';
import {useState} from "react";



export default function NovoGasto(){
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('Alimentação');
    const [erro, setErro] = useState('');
    const {adicionarGasto} = useGastos();

    function ValidacaoGasto() {
        if(descricao.trim() === ''){setErro('Digite descrição do gasto');
            return;
        }
        const textoValor = valor.trim();
        if (!/^\d+([,.]\d{1,2})?$/.test(textoValor)) {
            setErro('Digite um valor: 0,00');
            return;
        }
        const valorNumerico = Number(textoValor.replace(',','.'));
        if (valorNumerico <=0) {
            setErro('O valor precisa ser maior que 0');
            return;
        }
        setErro('');
        adicionarGasto(descricao.trim(), valorNumerico, categoria);
        router.back();
    }

    return( 
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F6'}}> 
            <Text style={{ fontSize: 20, color: 'black'}}> Meus Gastos Novos </Text>
            <Text style={{color: 'black'}}> Descrição do Gasto </Text>
            <TextInput
             value={descricao}
             onChangeText={setDescricao}
             placeholder='Descrição'
             placeholderTextColor='#666'
            style={{width: '80%', borderWidth: 1, padding: 2, color: 'black'}}/>

            <Text style={{color: 'black'}}> Valor (R$) </Text>
            <TextInput
             value={valor}
             onChangeText={setValor}
             keyboardType= 'decimal-pad'
             placeholder='0,00'
             placeholderTextColor='#666'
            style={{width: '80%', borderWidth: 1, padding: 2, color: 'black'}}/>

            <Text style= {{color: 'black'}}> Categoria: {categoria} </Text>
            {categorias.map((opcao)=>(
                <Pressable
                    key={opcao}
                    title={opcao}
                    onPress={()=> setCategoria(opcao)}
                    style= {{backgroundColor: '#A5F3FC', borderRadius: 20, padding: 8}}
                  >
                    <Text style= {{color: '#164E63'}}> {opcao} </Text>
                 </Pressable>
            ))}

            {erro !=='' && <Text style={{color:'red'}}> {erro}</Text>}
            <Button title='Salvar' onPress={ValidacaoGasto} /> 
        </View>
    );
}