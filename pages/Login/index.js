import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

// Async Storage = semelhante ao localStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigation} ) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvar = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
          // saving error
        }
      }

    const Logar = () => {

        const corpo = {
            email : email,
            senha : senha
        }

        fetch('http://192.168.0.46:5000/api/Account/login',{
            method : 'POST',
            headers :{
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(corpo)
        }) 
        .then(response => response.json())
        .then(data =>{
            if(data.status != 404){
                alert('Seja bem vindx');
                console.log(data.token);
                salvar(data.token);
                navigation.push('Autenticado');
            }else{
                alert('Email ou senha inválidos! :(');
            }
        })
    } 
    
    return(
        <View style={styles.container}>
            <Text>
                Login
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Digite seu Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholder="Digite seu Senha"
                secureTextEntry={true}
            />   

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input : {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop : 20,
        padding : 5,
        borderRadius : 6,
    },
    button : {
        backgroundColor : 'black',
        width : '90%',
        padding : 10,
        marginTop : 20,
        borderRadius : 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton : {
        color : 'white',
        padding : 6
    }
  });

export default Login;