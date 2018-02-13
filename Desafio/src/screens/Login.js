import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

export default class Login extends Component {
    render(){
        return (
            <View style={{
                flex: 2,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 27,
                    marginBottom: 20,
                }}>Login</Text>
                <TextInput style={{

                }} placeholder='Usuário' />
                <TextInput placeholder='Senha' />
                <View style={{ marginTop: 30 }} />
                <Button
                    onPress={this.props.onLoginPress}
                    title='Entrar'
                />
            </View>
        )
    }
}